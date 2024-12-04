import * as esbuild from "esbuild-wasm";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin", //name is for debugging purposes
    setup(build: esbuild.PluginBuild) {
      //setup is called automatically with build param
      //filter determines the file
      //namespace assings the file to a namespace

      //handle root entry file of index.js
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return { path: "index.js", namespace: "a" };
      });

      //handle relative paths in a module
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        return {
          //generate new url from the path and the importer and add / at  the end
          path: new URL(args.path, "https://unpkg.com" + args.resolveDir + "/")
            .href,
          namespace: "a",
        };
      });

      //handle main file of a module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        //console.log("onResolve", args);

        return {
          path: `https://unpkg.com/${args.path}`,
          namespace: "a",
        };
      });
    },
  };
};
