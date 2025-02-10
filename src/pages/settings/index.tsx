import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/ui/button";
import { Switch } from "../../components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getNotificationSettings, updateNotificationSettings } from "../../controllers/settings";
import type { NotificationSettings } from "../../types/user";

export default function SettingsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [settings, setSettings] = useState<NotificationSettings | null>(null);

  useEffect(() => {
    if (user) {
      getNotificationSettings(user.user_id.toString())
        .then(setSettings)
        .catch(console.error);
    }
  }, [user]);

  const handleToggle = async (key: keyof NotificationSettings) => {
    if (!user || !settings) return;

    const newSettings = {
      ...settings,
      [key]: !settings[key]
    };
    setSettings(newSettings);

    try {
      await updateNotificationSettings(user.user_id.toString(), {
        [key]: newSettings[key]
      });
    } catch (error) {
      console.error(error);
      // エラー時は元の設定に戻す
      setSettings(settings);
    }
  };

  if (!settings) return null;

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
              <span>コメント通知</span>
              <Switch
                checked={settings.comments}
                onCheckedChange={() => handleToggle('comments')}
              />
            </div>
            <div className="flex items-center justify-between">
              <span>ハイライト通知</span>
              <Switch
                checked={settings.highlights}
                onCheckedChange={() => handleToggle('highlights')}
              />
            </div>
            <div className="flex items-center justify-between">
              <span>新規フォロワー通知</span>
              <Switch
                checked={settings.new_followers}
                onCheckedChange={() => handleToggle('new_followers')}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
