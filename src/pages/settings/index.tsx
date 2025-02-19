import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getNotificationSettings, updateNotificationSettings } from "@/controllers/settings";
import type { NotificationSettings } from "@/types/user";
import { useToast } from "@/components/ui/use-toast";

export default function SettingsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [settings, setSettings] = useState<NotificationSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getNotificationSettings(user.uid)
        .then(setSettings)
        .catch((error) => {
          console.error('Failed to load settings:', error);
          toast({
            title: "設定の読み込みに失敗しました",
            description: "デフォルトの設定を表示します",
            variant: "destructive"
          });
          // エラー時はデフォルト設定を表示
          setSettings({
            comments: true,
            highlights: true,
            new_followers: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [user, toast]);

  const handleToggle = async (key: keyof NotificationSettings) => {
    if (!user || !settings) return;

    const newSettings = {
      ...settings,
      [key]: !settings[key],
      updated_at: new Date().toISOString()
    };
    
    try {
      await updateNotificationSettings(user.uid, {
        [key]: newSettings[key],
        updated_at: newSettings.updated_at
      });
      setSettings(newSettings);
      toast({
        title: "設定を更新しました",
        description: "変更が保存されました"
      });
    } catch (error) {
      console.error('Failed to update settings:', error);
      toast({
        title: "設定の更新に失敗しました",
        description: "もう一度お試しください",
        variant: "destructive"
      });
      // エラー時は元の設定に戻す
      setSettings(settings);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 border-b flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">設定</h1>
      </div>

      <div className="p-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>通知設定</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">コメント通知</span>
                <p className="text-sm text-gray-500">投稿へのコメントを通知します</p>
              </div>
              <Switch
                checked={settings?.comments ?? true}
                onCheckedChange={() => handleToggle('comments')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">ハイライト通知</span>
                <p className="text-sm text-gray-500">新しいハイライトを通知します</p>
              </div>
              <Switch
                checked={settings?.highlights ?? true}
                onCheckedChange={() => handleToggle('highlights')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">新規フォロワー通知</span>
                <p className="text-sm text-gray-500">新しいフォロワーを通知します</p>
              </div>
              <Switch
                checked={settings?.new_followers ?? true}
                onCheckedChange={() => handleToggle('new_followers')}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
