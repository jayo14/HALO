import requests
import time
from django.conf import settings
from django.contrib.auth.models import User
from django.core.cache import cache
from jose import jwt, JWTError
from rest_framework import authentication, exceptions
from .models import Profile

class SupabaseJWTAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        if not auth_header:
            return None

        try:
            token = auth_header.split(' ')[1]
        except IndexError:
            raise exceptions.AuthenticationFailed('Bearer token malformed')

        payload = self.verify_jwt(token)
        if not payload:
            raise exceptions.AuthenticationFailed('Invalid or expired token')

        user_id = payload.get('sub')
        email = payload.get('email')
        metadata = payload.get('user_metadata', {})
        role = metadata.get('role', 'public')

        user, created = User.objects.get_or_create(
            username=user_id,
            defaults={'email': email}
        )

        # Lazy create/update profile
        profile, _ = Profile.objects.using('default').get_or_create(id=user_id)
        if profile.role != role:
            # Note: Since profiles is managed=False, we might need direct SQL
            # if we want to update it from Django, or just use it as a read-only view.
            # For HALO, we'll assume it's synced or update via Supabase Admin API.
            pass

        request.role = role
        return (user, None)

    def verify_jwt(self, token):
        jwks = self.get_jwks()
        try:
            # In a real scenario, we'd use the JWKS to verify.
            # For brevity and since we are using Supabase,
            # we can also verify using the JWT_SECRET if using HS256,
            # but Supabase uses RS256 by default for external verification.
            # Using python-jose with JWKS:
            payload = jwt.decode(
                token,
                jwks,
                algorithms=['RS256'],
                audience='authenticated',
                options={"verify_aud": False}
            )
            return payload
        except JWTError as e:
            print(f"JWT Verification Error: {e}")
            return None

    def get_jwks(self):
        jwks_url = f"https://{settings.SUPABASE_PROJECT_REF}.supabase.co/auth/v1/.well-known/jwks.json"
        jwks = cache.get('supabase_jwks')
        if not jwks:
            response = requests.get(jwks_url)
            if response.status_code == 200:
                jwks = response.json()
                cache.set('supabase_jwks', jwks, 3600)
            else:
                raise exceptions.AuthenticationFailed('Could not fetch JWKS')
        return jwks
