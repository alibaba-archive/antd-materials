function loadRuntimeModules(runtime) {
  runtime.loadModule(
    require('/Users/guoda/work/ice/antd-materials/scaffolds/icejs-antd-scaffold/node_modules/_build-plugin-app-core@0.1.20@build-plugin-app-core/lib/runtime.js')
  );

  runtime.loadModule(
    require('/Users/guoda/work/ice/antd-materials/scaffolds/icejs-antd-scaffold/node_modules/_build-plugin-ice-router@1.7.3@build-plugin-ice-router/lib/runtime.js')
  );

  runtime.loadModule(
    require('/Users/guoda/work/ice/antd-materials/scaffolds/icejs-antd-scaffold/node_modules/_build-plugin-ice-logger@1.7.1@build-plugin-ice-logger/lib/runtime.js')
  );

  runtime.loadModule(
    require('/Users/guoda/work/ice/antd-materials/scaffolds/icejs-antd-scaffold/node_modules/_build-plugin-ice-store@1.7.6@build-plugin-ice-store/lib/runtime.js')
  );
}

export default loadRuntimeModules;
