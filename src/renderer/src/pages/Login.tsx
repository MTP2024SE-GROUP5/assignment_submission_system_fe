import React from "react"
import {Chromium, Languages} from "lucide-react";
import {LoginForm} from "@/components/features/LoginForm";
import {getImage} from "@/utils/service/getImage";
import {Outlet} from "react-router-dom";
import {Toaster} from "sonner";
import backgroundUrl from '@/assets/images/preview.jpg'
import logoUrl from '@/assets/images/logo.png'
import videoUrl from '@/assets/images/PS3_Waves_Background.mp4'

import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {supportedLanguages} from "../../../locales";
import {LanguageSwitcher} from "@/components/features/LanguageSwitcher";
import {ServerSwitcher} from "@/components/features/ServerSwitcher";

const Login = () => {
  return (
      <div>
        <Toaster />
        <div className="drag-zone h-[32px] w-full absolute"></div>
        <div className="grid min-h-svh lg:grid-cols-2">
          <div className="flex flex-col gap-4 p-6 md:p-10">
            <div className="flex justify-center gap-2 md:justify-start">
              <a href="/" className="flex items-center gap-2 font-medium">
                <div className="text-primary-foreground flex size-6 items-center justify-center rounded-md">
                  <img src={logoUrl} alt=""/>
                </div>
                Assignment Submission System
              </a>
            </div>
            <div className="flex flex-1 items-center justify-center">
              <div className="w-full max-w-xs">
                {/*<LoginForm />*/}
                <Outlet/>
              </div>
            </div>
          </div>
          <div className="bg-muted relative hidden lg:block">
            {/*<img*/}
            {/*    src = {backgroundUrl}*/}
            {/*    alt="Image"*/}
            {/*    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"*/}
            {/*/>*/}
            <video
                src={videoUrl}
                poster={backgroundUrl}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.3] dark:grayscale transition-all duration-500"
            />
            <div className="absolute inset-0 bg-black/10 dark:bg-transparent" />
            <div className="absolute bottom-4 right-4 flex gap-3">
              <LanguageSwitcher/>
              <ServerSwitcher/>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Login