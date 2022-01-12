// webpack.config.js
const path = require("path");
const webpack = require("webpack");
const Fiber = require("fibers");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshTypescript = require("react-refresh-typescript");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const Mode = process.env.NODE_ENV || "development";
const isProduction = Mode === "production";
const isDevServer = process.env.WEBPACK_SERVE;

module.exports = {
  mode: Mode,
  entry: path.join(__dirname, "src", "./index.tsx"),
  output: {
    path: path.join(__dirname, "build"),
    publicPath: "/",
    filename: "scripts/[name].[contenthash].js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: isDevServer,
              getCustomTransformers: () => ({
                before: [isDevServer && ReactRefreshTypescript()].filter(
                  Boolean
                ),
              }),
            },
          },
        ],
      },
      {
        test: /\.module\.s[ac]ss$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: isProduction
                  ? "[contenthash]"
                  : "[name]_[local]_[contenthash]",
              },
              url: false,
            },
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
              sassOptions: {
                fiber: Fiber,
              },
              sourceMap: !isProduction,
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    port: 3000,
    host: "0.0.0.0",
    allowedHosts: "all",
    static: {
      directory: path.resolve(__dirname, "public"),
    },
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  watchOptions: {
    poll: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(Mode),
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
      data: {
        PUBLIC_URL: "",
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, "public"),
          to: "",
          globOptions: {
            ignore: ["**/index.html"],
          },
        },
      ],
    }),
    isDevServer && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
};
