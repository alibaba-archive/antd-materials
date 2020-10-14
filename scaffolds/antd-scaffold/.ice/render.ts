import ReactDOM from 'react-dom';

export function mount(appInstance, rootEl) {
  return ReactDOM.render(appInstance, rootEl);
}

export function unmount(appInstance, rootEl) {
  return () => ReactDOM.unmountComponentAtNode(rootEl);
}
