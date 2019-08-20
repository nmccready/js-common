import util from 'util';
import { get } from 'lodash';

const debug = require('../debug');

const makeModule = (config = {}) => {
  const rules = [];
  const styleLoader = get(config, 'webpack.rules.css.styleLoader');
  const cssSourceMap = get(config, 'css.sourceMap');

  const createRule = (rule, push = true) => {
    if (push) rules.push(rule);
    return rule;
  };

  const babel = createRule({
    test: /\.m?(j|t)sx?$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
      // Pick up our root babel.config.js
      rootMode: 'upward',
    },
  });

  const file = createRule({
    test: /\.eot(\?v=\d+.\d+.\d+)?$/,
    use: ['file-loader'],
  });

  const urlWoff = createRule({
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff',
        },
      },
    ],
  });

  const urlStream = createRule({
    test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/octet-stream',
        },
      },
    ],
  });

  const urlSvg = createRule({
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'image/svg+xml',
        },
      },
    ],
  });

  const images = createRule({
    test: /\.(jpe?g|png|gif|ico)$/i,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
    ],
  });

  let css, cssModule;

  if (cssSourceMap && styleLoader) {
    css = createRule({
      test: /\.(css|pcss|scss)$/,
      use: [
        styleLoader,
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            sourceMap: cssSourceMap,
            url: true,
          },
        },
        'postcss-loader',
      ],
    });

    debug(() => util.inspect(css, true, 6));

    // allow for modular pcss something.module.pcss
    cssModule = createRule({
      test: /\.module\.(css|pcss)$/,
      use: [
        styleLoader,
        {
          loader: 'css-loader',
          options: {
            localIdentName: '[local]___[hash:base64:5]',
            modules: true,
            sourceMap: cssSourceMap,
            url: false,
            importLoaders: 1,
          },
        },
        'postcss-loader',
      ],
    });
  }

  return {
    default: rules,
    file,
    babel,
    urlWoff,
    urlSvg,
    urlStream,
    images,
    css,
    cssModule,
  };
};

export default makeModule;
