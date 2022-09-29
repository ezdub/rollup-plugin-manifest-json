import { readFileSync, writeFileSync } from "fs";
import { resolve, normalize, join } from "path";

import { Plugin } from "rollup";
import { PluginOptions, ManifestOptions } from "./index.d";

export default function manifestJson(opts: PluginOptions): Plugin  {
    return {
        name: "manifest-json",
        buildStart() {
          const { input, manifest, minify, output } = opts;

          if (!input) {
              throw new Error('Is the `input` option set to something?');
          }

          const manifestData: ManifestOptions = JSON.parse(readFileSync(resolve(input), `utf-8`));

          Object.assign(manifestData, manifest);

          writeFileSync(output ? join(output, 'manifest.json') : 'manifest.json', minify ? JSON.stringify(manifestData) : JSON.stringify(manifestData, null, 2));
        //   this.emitFile({
        //       type: "asset",
        //       source: minify ? JSON.stringify(manifestData) : JSON.stringify(manifestData, null, 2),
        //       fileName: output ? normalize(`${output}/manifest.json`) : 'manifest.json',
        //   });
        }
    }
}