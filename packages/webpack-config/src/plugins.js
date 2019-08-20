import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export const HMR = new webpack.HotModuleReplacementPlugin();

export const NoEmitOnErrors = new webpack.NoEmitOnErrorsPlugin();

export const DEBUG = new webpack.DefinePlugin({
  'process.env.DEBUG': JSON.stringify(process.env.DEBUG),
});

export const MiniCssExtract = new MiniCssExtractPlugin({
  filename: '[name].css',
  chunkFilename: '[id].css',
});

export const HardSource = new HardSourceWebpackPlugin();

export const HTML = (config) =>
  new HtmlWebpackPlugin({
    // Create HTML file that includes references to bundled CSS and JS.
    title: config.brand,
    template: 'src/index.ejs',
    favicon: `src/images/${config.hosts.ui.logos.favicon}`,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
    },
    inject: true,
  });
