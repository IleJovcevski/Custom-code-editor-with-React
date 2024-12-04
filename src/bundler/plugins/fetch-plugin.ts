import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localforage from "localforage";

const fileCache = localforage.createInstance({
  name: "filecache",
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return { loader: "jsx", contents: inputCode };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        //check if this file is in the cache
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );

        //if it is return it
        if (cachedResult) {
          //console.log("found cached result: ", cachedResult);
          return cachedResult;
        }
      });

      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);

        const escapedString = data
          .replace(/\n/g, "") //find all new lines and escape them
          .replace(/"/g, '\\"') //find all single quotes and escape them
          .replace(/'/g, "\\'"); //find all double quotes and escapte them
        const contents = `
            const style = document.createElement('style');
            style.innserText = '${escapedString}';
            document.head.appendChild(style)
        `;

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents,
          //provide source dir from redirect and extract it's pathname
          resolveDir: new URL("./", request.responseURL).pathname,
        };

        await fileCache.setItem(args.path, result);

        return result;
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        //get the data from the path
        const { data, request } = await axios.get(args.path);
        //store response data in cache

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          //provide source dir from redirect and extract it's pathname
          resolveDir: new URL("./", request.responseURL).pathname,
        };

        await fileCache.setItem(args.path, result);

        return result;
      });
    },
  };
};
