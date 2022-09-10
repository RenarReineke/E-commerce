const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TsCheckerPlugin = require("fork-ts-checker-webpack-plugin");

const buildPath = path.resolve(__dirname, "dist");
const contentPath = path.resolve(__dirname, "public");
const srcPath = path.resolve(__dirname, "src");

const isProd = process.env.NODE_ENV === "production";

const getSettingsForStyles = (withModules = false) => {
  return [
    isProd ? MiniCssExtractPlugin.loader : "style-loader",
    !withModules
      ? "css-loader"
      : {
          loader: "css-loader",
          options: {
            modules: {
              localIdentName: !isProd
                ? "[path][name]__[local]"
                : "[hash:base64]",
            },
          },
        },
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: ["autoprefixer"],
        },
      },
    },
    "sass-loader",
  ];
};

module.exports = {
  entry: path.join(srcPath, "index.tsx"),
  target: process.env.NODE_ENV ? "web" : "browserslist",
  devtool: isProd ? "hidden-source-map" : "eval-source-map",
  output: {
    path: buildPath,
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.module\.s?css$/,
        use: getSettingsForStyles((withModules = true)),
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: getSettingsForStyles(),
      },
      {
        test: /\.[tj]sx?$/,
        use: "babel-loader",
      },
      {
        test: /\.(png|svg|jpg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(contentPath, "index.html"),
    }),
    !isProd && new ReactRefreshWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name]-[hash].css",
    }),
    new TsCheckerPlugin(),
  ].filter(Boolean),
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "@components": path.join(srcPath, "components"),
      "@config": path.join(srcPath, "config"),
      "@styles": path.join(srcPath, "styles"),
      "@utils": path.join(srcPath, "utils"),
      "@pages": path.join(srcPath, "App/pages"),
      "@store": path.join(srcPath, "App/store"),
    },
  },
  devServer: {
    host: "127.0.0.1",
    port: "9000",
    hot: true,
    liveReload: true,
  },
  mode: "development",
};
