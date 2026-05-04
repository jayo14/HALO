'use client';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Settings as SettingsIcon, Palette, Database, Shield } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px] h-12 bg-muted/50 p-1">
          <TabsTrigger value="general" className="flex items-center gap-2 rounded-md transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <SettingsIcon size={14} /> General
          </TabsTrigger>
          <TabsTrigger value="personalization" className="flex items-center gap-2 rounded-md transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <Palette size={14} /> Design
          </TabsTrigger>
          <TabsTrigger value="data" className="flex items-center gap-2 rounded-md transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <Database size={14} /> Data
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2 rounded-md transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <Shield size={14} /> Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6 pt-6 animate-in fade-in duration-300">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-xl shadow-primary/5">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Configure how you receive updates from HALO.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Email Notifications</Label>
                  <p className="text-xs text-muted-foreground">Receive weekly academic summaries and university highlights.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator className="opacity-50" />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Desktop Alerts</Label>
                  <p className="text-xs text-muted-foreground">Get real-time notifications for important university news.</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
            <CardFooter className="bg-muted/30 py-4">
              <Button size="sm">Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="personalization" className="space-y-6 pt-6 animate-in fade-in duration-300">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-xl shadow-primary/5">
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the look and feel of your AI assistant.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label className="text-base">Theme Accent Color</Label>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary cursor-pointer border-2 border-white ring-2 ring-primary transition-transform hover:scale-110 shadow-lg" />
                  <div className="w-10 h-10 rounded-xl bg-blue-500 cursor-pointer transition-transform hover:scale-110 shadow-lg" />
                  <div className="w-10 h-10 rounded-xl bg-purple-500 cursor-pointer transition-transform hover:scale-110 shadow-lg" />
                  <div className="w-10 h-10 rounded-xl bg-orange-500 cursor-pointer transition-transform hover:scale-110 shadow-lg" />
                </div>
              </div>
              <Separator className="opacity-50" />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Glassmorphism Effects</Label>
                  <p className="text-xs text-muted-foreground">Enable blurred background and transparent surface effects.</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-6 pt-6 animate-in fade-in duration-300">
          <Card className="border-destructive/20 bg-destructive/5 backdrop-blur-sm shadow-xl shadow-destructive/5">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>Irreversible actions regarding your account data.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base text-destructive">Clear Chat History</Label>
                  <p className="text-xs text-muted-foreground">Permanently delete all your conversations from our servers.</p>
                </div>
                <Button variant="destructive" size="sm" className="shadow-lg shadow-destructive/20">Clear All</Button>
              </div>
              <Separator className="bg-destructive/10" />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Export Data</Label>
                  <p className="text-xs text-muted-foreground">Download all your interactions and uploaded files in a portable format.</p>
                </div>
                <Button variant="outline" size="sm">Export Data</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="pt-6 animate-in fade-in duration-300">
           <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-xl shadow-primary/5">
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
              <CardDescription>Manage your authentication and privacy settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Two-Factor Authentication</Label>
                <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-muted/50">
                   <p className="text-sm font-medium">Protect your account with an extra layer of security.</p>
                   <Button variant="outline" size="sm">Enable</Button>
                </div>
              </div>
              <Separator className="opacity-50" />
              <Button variant="outline" className="w-full sm:w-auto">Reset Account Password</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
