import { InjectionToken } from '@angular/core';

export interface ModuleConfig {
  NAVIGATION?: any;
}

export interface AppConfig extends ModuleConfig {
  TITLE: string;
  DEFAULT_LANGUAGE: string;
}

export const APP_CONSTANTS: AppConfig = {
  TITLE: 'Angular Laravel JWT',
  DEFAULT_LANGUAGE: 'en',
  NAVIGATION: {
    EMPTY: '',
    ROOT: '',
    HOME: 'Home'
  }
};

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');
