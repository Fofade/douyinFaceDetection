import { createStore, ModuleTree } from "vuex";

const modulesFiles = require.context("./modules", true, /\.ts$/);
const modules = modulesFiles
  .keys()
  .reduce((modules: ModuleTree<any>, modulePath: string) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1").split("/");
    const value = modulesFiles(modulePath);
    modules[moduleName[moduleName.length - 1]] = value.default;
    return modules;
  }, {});

const store = createStore({
  modules,
});

export default store;
