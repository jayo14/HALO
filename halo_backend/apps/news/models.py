from django.db import models

class News(models.Model):
    title = models.CharField(max_length=255)
    body = models.TextField()
    category = models.CharField(max_length=50)
    image_url = models.URLField(null=True, blank=True)
    published_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'news'
        managed = False
        verbose_name_plural = "News"

    def __str__(self):
        return self.title
