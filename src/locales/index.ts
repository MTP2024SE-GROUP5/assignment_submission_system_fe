// src/locales/index.ts

import zhCNCommon from './zh-cn/common.json';
import zhCNAuth from './zh-cn/auth.json';

import enUSCommon from './en-us/common.json';
import enUSAuth from './en-us/auth.json';

import jaJPCommon from './ja-jp/common.json';
import jaJPAuth from './ja-jp/auth.json';

export const resources = {
  'zh-CN': {
    common: zhCNCommon,
    auth: zhCNAuth,
  },
  'en-US': {
    common: enUSCommon,
    auth: enUSAuth,
  },
  'ja-JP':{
    common: jaJPCommon,
    auth: jaJPAuth,
  }
} as const;

export const supportedLanguages = [
  { label: '简体中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' },
  { label: '日本語', value: 'ja-JP' },
];