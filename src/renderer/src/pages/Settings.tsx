import React, { useEffect } from "react";
import { useTitleStore } from "@/store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {Moon, Sun, Settings as SettingsIcon, Languages, SlidersHorizontal} from "lucide-react";
import {useTheme} from "@/components/features/ThemeProvider";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {LanguageSwitcher} from "@/components/features/LanguageSwitcher";
import { useTranslation } from "react-i18next";

const Settings = () => {
  const { t } = useTranslation('settings');
  const setTitle = useTitleStore((state) => state.setTitle);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setTitle(t('title', {defaultValue: 'Settings'}));
  }, [setTitle, t]);

  return (
      <div className="max-w-2xl mx-auto p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center space-x-2 px-1">
          <SettingsIcon className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold tracking-tight">{t('system_settings', {defaultValue: 'System Settings'})}</h2>
        </div>

        <Card className="shadow-sm border-primary/10">
          <CardHeader>
            <CardTitle>{t('appearance.title', {defaultValue: 'Appearance'})}</CardTitle>
            <CardDescription>
              {t('appearance.description', {defaultValue: 'Customize how the application looks on your device.'})}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-muted rounded-full">
                  {theme === "dark" ? (
                      <Moon className="w-5 h-5 text-blue-400" />
                  ) : (
                      <Sun className="w-5 h-5 text-orange-500" />
                  )}
                </div>
                <div className="space-y-0.5">
                  <Label className="text-base">{t('appearance.dark_mode', {defaultValue: 'Dark Mode'})}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t('appearance.dark_mode_desc', {defaultValue: 'Switch between light and dark themes.'})}
                  </p>
                </div>
              </div>
              <Switch
                  checked={theme === "dark"}
                  onCheckedChange={(checked:any) => setTheme(checked ? "dark" : "light")}
              />
            </div>
          </CardContent>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-muted rounded-full">
                  <Languages className="h-[1.2rem] w-[1.2rem]" />
                </div>
                <div className="space-y-0.5">
                  <Label className="text-base">{t('appearance.language', {defaultValue: 'Language'})}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t('appearance.language_desc', {defaultValue: 'Change the language displayed.'})}
                  </p>
                </div>
              </div>
              <LanguageSwitcher style="slidersHorizontal"/>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted/30 border-none">
          <CardContent className="p-4 flex flex-col items-center text-center space-y-2">
            <p className="text-xs text-muted-foreground">
              {t('footer.developed_by', {defaultValue: 'Project developed by Group 5'})}
            </p>
            <p className="text-[10px] text-muted-foreground/60 uppercase tracking-widest">
              {t('footer.version', {defaultValue: 'Version'})} {__APP_VERSION__}
            </p>
          </CardContent>
        </Card>
      </div>
  );
};

export default Settings;