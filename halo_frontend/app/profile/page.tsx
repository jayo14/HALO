'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Mail, School, BookOpen, Calendar, MapPin, Camera, Sparkles } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function ProfilePage() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="relative group">
          <Avatar className="h-40 w-40 border-4 border-background shadow-2xl shadow-primary/10 transition-transform group-hover:scale-[1.02]">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary/5 text-primary text-5xl">
              <User size={64} />
            </AvatarFallback>
          </Avatar>
          <button className="absolute bottom-2 right-2 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:scale-110 transition-all border-4 border-background">
            <Camera size={20} />
          </button>
        </div>
        
        <div className="flex-1 text-center md:text-left space-y-4">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold tracking-tight">John Doe</h1>
            <p className="text-muted-foreground flex items-center justify-center md:justify-start gap-2">
              <Mail size={16} />
              johndoe@lasustech.edu.ng
            </p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            <Badge variant="secondary" className="px-3 py-1">Mechanical Engineering</Badge>
            <Badge variant="outline" className="px-3 py-1">Year 3 (300 Level)</Badge>
            <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20 px-3 py-1">Verified Student</Badge>
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <School size={16} /> Faculty of Engineering
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={16} /> Ikorodu Campus
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
        <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm border-border/50 shadow-xl shadow-primary/5">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your profile details and contact information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input id="first-name" defaultValue="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input id="last-name" defaultValue="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <textarea 
                id="bio"
                className="w-full min-h-[100px] p-3 rounded-lg border border-input bg-transparent text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="Tell us a bit about yourself..."
                defaultValue="Aspiring Mechanical Engineer at LASUSTECH. Passionate about robotics and AI in manufacturing."
              />
            </div>
            <Separator className="opacity-50" />
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input id="department" defaultValue="Mechanical Engineering" disabled />
            </div>
          </CardContent>
          <CardFooter className="bg-muted/30 py-4">
            <Button>Save Profile</Button>
          </CardFooter>
        </Card>

        <div className="space-y-8">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-xl shadow-primary/5">
            <CardHeader>
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Academic Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                  <BookOpen size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold">12 Active Courses</p>
                  <p className="text-[10px] text-muted-foreground uppercase">Semester 1, 2023/2024</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold">3.82 CGPA</p>
                  <p className="text-[10px] text-muted-foreground uppercase">Last Updated: April 20th</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20 shadow-xl shadow-primary/5 overflow-hidden relative">
            <CardHeader>
              <CardTitle className="text-sm">HALO Premium</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Get unlimited file uploads, advanced academic analysis, and priority support.
              </p>
              <Button size="sm" className="w-full">Upgrade Now</Button>
            </CardContent>
            <Sparkles className="absolute -bottom-2 -right-2 text-primary/10 w-24 h-24 rotate-12" />
          </Card>
        </div>
      </div>
    </div>
  );
}
