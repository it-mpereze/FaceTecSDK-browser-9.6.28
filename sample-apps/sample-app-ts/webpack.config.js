var path = require("path");
var libraryName = "SampleApp";
var webpack = require("webpack");
var compiledCount = 1;
module.exports = function(env, argv) {

  var buildOptions = {
    target: "web",
    entry: "./src/sampleAppController.ts",
    mode: "development",
    devtool: "source-map",
    watch: true,
    stats: "errors-only",
    performance: {
      maxEntrypointSize: 300000,
      maxAssetSize: 300000
    },
    watchOptions: {
      ignored: /node_modules/
    },
    output: {
      library: libraryName,
      libraryExport: libraryName,
      libraryTarget: "this",
      filename: libraryName + ".js",
      path: path.resolve(__dirname, "build"),
      sourceMapFilename: "[file].map"
    },
    module: {
      rules: [
        {
          test: /\.ts?$/,
          loader: "ts-loader",
          exclude: /node_modules/
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ["source-map-loader"],
          enforce: "pre"
        },
        {
          test: /\.(mp3|png|jp(e*)g|svg)$/,
          loader: "url-loader"
        }
      ]
    },
    resolve:{
      extensions: [".ts", ".js"]
    },
    plugins: [
      {
        apply: (compiler) => {
          compiler.hooks.afterEmit.tap("AfterEmitPlugin", () => {
            console.log("Build:",compiledCount, buildOptions.output.filename, "Completed.");
            compiledCount += 1;
          });
        }
      },
    ]
  };
  console.log("Creating FaceTec Sample:" + libraryName + " development build ....");
  if(process.argv.indexOf("nowatch") > -1) {
    buildOptions.watch = false;
  }
  return buildOptions;
};
