const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
require("dotenv").config();

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  return {
    mode: isProduction ? "production" : "development",
    entry: path.join(__dirname, "src", "index.tsx"),
    output: {
      path: path.resolve(__dirname, "dist"),
      publicPath: isProduction ? "/static/" : "/",
    },
    module: {
      rules: [
        {
          test: /\.(webp|png|jp(e*)g|svg|gif)$/,
          use: ["file-loader"],
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        },
        {
          test: /\.(ts|tsx)$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "public", "index.html"),
      }),
      // All variables in our .env should be mentioned here
      new webpack.EnvironmentPlugin({
        // Default is '' because on our  servers we want to have it default to our current URL

        BASE_SERVER_URL:  argv.mode==="development" ? "http://localhost:8000" : "https://leflaneuramsterdam.com"   ,

      }),
    ],
    // To tell the dev server that everything should go back to index.html
    devServer: {
      historyApiFallback: true,
    },
  };
};
