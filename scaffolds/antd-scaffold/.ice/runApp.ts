import { createElement, useEffect, Component } from 'react';
import {
  isMiniApp,
  isWeChatMiniProgram,
  isByteDanceMicroApp,
  isWeb,
} from 'universal-env';
import miniappRenderer from 'miniapp-renderer';
import createShareAPI, { history } from 'create-app-shared';

import reactAppRenderer from 'react-app-renderer';
import { withRouter as defaultWithRouter } from 'react-router';
import genWithSearchParams from './genWithSearchParams';

import loadRuntimeModules from './loadRuntimeModules';
import loadStaticModules from './loadStaticModules';
import defaultStaticConfig from './staticConfig';
import { setAppConfig } from './appConfig';
import { mount, unmount } from './render';
import ErrorBoundary from './ErrorBoundary';

import '../src/global.less';

const {
  createBaseApp,
  withRouter,
  createHistory,
  getHistory,
  emitLifeCycles,
  usePageShow,
  usePageHide,
  withPageLifeCycle,
  pathRedirect,
  registerNativeEventListeners,
  addNativeEventListener,
  removeNativeEventListener,
  getSearchParams,
} = createShareAPI(
  {
    createElement,
    useEffect,
    withRouter: defaultWithRouter,
  },
  loadRuntimeModules
);

export function runApp(appConfig, staticConfig?: any) {
  let renderer;

  if ((isMiniApp || isWeChatMiniProgram || isByteDanceMicroApp) && !isWeb) {
    renderer = miniappRenderer;
  } else {
    renderer = reactAppRenderer;
  }

  renderer(
    {
      appConfig,
      staticConfig: staticConfig || defaultStaticConfig,
      setAppConfig,
      createBaseApp,
      createHistory,
      getHistory,
      emitLifeCycles,
      pathRedirect,
      loadStaticModules,
      ErrorBoundary,
    },
    {
      createElement,
      mount,
      unmount,
      Component,
    }
  );
}

const useSearchParams = () => {
  // @deprecated
  console.warn(
    'Detected that you are using useSearchParams, please use getSearchParams method, Visit https://ice.work/docs/guide/basic/api.'
  );
  return getSearchParams();
};
const withSearchParams = genWithSearchParams(getSearchParams);

// Public API
export {
  // router api
  withRouter,
  history,
  getHistory,
  getSearchParams,
  useSearchParams,
  withSearchParams,
  // LifeCycles api
  usePageShow,
  usePageHide,
  withPageLifeCycle,
  // events api
  registerNativeEventListeners,
  addNativeEventListener,
  removeNativeEventListener,
  ErrorBoundary,
};

// Private API
export default {
  createBaseApp,
  emitLifeCycles,
};
