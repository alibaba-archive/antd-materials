import {
  ReactElement as FrameworkElement,
  ComponentType as FrameworkComponentType,
  ReactNode as FrameworkNode,
} from 'react';

import { IAppRouterProps } from './router/types';
import { ILogger } from './logger/types';
import { IRequest } from './request/types';
import { IStore } from './store/types';

export * from './router/types';
export * from './store/types';
export * from './store/types';
export * from './store/types';

interface IOnTabItemClickParams {
  from: string;
  path: string;
  text: string;
  index: number;
}

export interface IApp {
  rootId?: string;
  mountNode?: HTMLElement;
  addProvider?: ({ children }: { children: FrameworkNode }) => FrameworkElement;
  getInitialData?: () => Promise<any>;
  ErrorBoundaryFallback?: (error: any) => FrameworkComponentType;
  onErrorBoundaryHander?: (error: Error, componentStack: string) => any;
  onLaunch?: () => any;
  onShow?: () => any;
  onHide?: () => any;
  onError?: (error: Error) => any;
  onTabItemClick?: ({ from, path, text, index }: IOnTabItemClickParams) => any;

  [key: string]: any;
}

export interface IAppConfig {
  app?: IApp;
  router?: IAppRouterProps;
  logger?: ILogger;
  request?: IRequest;
  store?: IStore;
}

declare global {
  interface Window {
    __ICE_SSR_ENABLED__: any;
    __ICE_APP_DATA__: any;
    __ICE_PAGE_PROPS__: any;
  }
}
