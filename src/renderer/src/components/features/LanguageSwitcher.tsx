import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Languages, SlidersHorizontal} from "lucide-react";
import React from "react";
import {supportedLanguages} from "../../../../locales";

export function LanguageSwitcher({style}:{style?:string}) {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  if(style == "slidersHorizontal"){
    return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {supportedLanguages.map((lang) =>
                <DropdownMenuItem key={lang.value} onClick={() => changeLanguage(lang.value)}>
                  {lang.label}
                </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
    )
  }

  return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Languages className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {supportedLanguages.map((lang) =>
              <DropdownMenuItem key={lang.value} onClick={() => changeLanguage(lang.value)}>
                {lang.label}
              </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
  );
}