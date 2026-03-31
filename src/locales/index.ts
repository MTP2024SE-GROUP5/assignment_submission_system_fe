// src/locales/index.ts

import zhCNCommon from './zh-cn/common.json';
import zhCNAuth from './zh-cn/auth.json';

import zhCNSettings from './zh-cn/settings.json';
import zhCNDashboard from './zh-cn/dashboard.json';

import enUSCommon from './en-us/common.json';
import enUSAuth from './en-us/auth.json';
import enUSSettings from './en-us/settings.json';
import enUSDashboard from './en-us/dashboard.json';

import jaJPCommon from './ja-jp/common.json';
import jaJPAuth from './ja-jp/auth.json';
import jaJPSettings from './ja-jp/settings.json';
import jaJPDashboard from './ja-jp/dashboard.json';

export const resources = {
  'zh-CN': {
    common: zhCNCommon,
    auth: zhCNAuth,
    settings: zhCNSettings,
    dashboard: zhCNDashboard,
  },
  'en-US': {
    common: enUSCommon,
    auth: enUSAuth,
    settings: enUSSettings,
    dashboard: enUSDashboard,
  },
  'ja-JP':{
    common: jaJPCommon,
    auth: jaJPAuth,
    settings: jaJPSettings,
    dashboard: jaJPDashboard,
  }
} as const;

export const supportedLanguages = [
  { label: '简体中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' },
  { label: '日本語', value: 'ja-JP' },
];