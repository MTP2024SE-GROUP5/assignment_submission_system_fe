import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Server, Globe, Laptop, Check, CircleHelp, SlidersHorizontal } from "lucide-react";
import { SERVER_CONFIGS } from "@/utils/api/client";

export function ServerSwitcher({ style }: { style?: string }) {
  const [currentUrl, setCurrentUrl] = useState(
      localStorage.getItem('base_url') || SERVER_CONFIGS.production
  );

  const changeServer = (url: string) => {
    localStorage.setItem('base_url', url);
    setCurrentUrl(url);
  };

  const getCurrentIcon = () => {
    if (style === "slidersHorizontal") return <SlidersHorizontal className="h-[1.2rem] w-[1.2rem]" />;
    return <Server className="h-[1.2rem] w-[1.2rem]" />;
  };

  return (
      <TooltipProvider delayDuration={300}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              {getCurrentIcon()}
              {currentUrl === SERVER_CONFIGS.local && (
                  <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-orange-500" />
              )}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-[200px]">
            <div className="flex items-center justify-between pr-2">
              <DropdownMenuItem
                  onClick={() => changeServer(SERVER_CONFIGS.production)}
                  className="flex-1 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-blue-500" />
                  <span>Cloud Server</span>
                  {currentUrl === SERVER_CONFIGS.production && <Check className="h-4 w-4" />}
                </div>
              </DropdownMenuItem>

              <Tooltip>
                <TooltipTrigger asChild>
                  <CircleHelp className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p className="text-xs">Connect to remote cloud server powered by DigitalOcean™.</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="flex items-center justify-between pr-2">
              <DropdownMenuItem
                  onClick={() => changeServer(SERVER_CONFIGS.local)}
                  className="flex-1 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Laptop className="h-4 w-4 text-orange-500" />
                  <span>Local Server</span>
                  {currentUrl === SERVER_CONFIGS.local && <Check className="h-4 w-4" />}
                </div>
              </DropdownMenuItem>

              <Tooltip>
                <TooltipTrigger asChild>
                  <CircleHelp className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p className="text-xs">Connect to localhost:8081 by default. Change in ".env.development" (Developer only)</p>
                </TooltipContent>
              </Tooltip>
            </div>

          </DropdownMenuContent>
        </DropdownMenu>
      </TooltipProvider>
  );
}