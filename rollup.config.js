import npm from 'rollup-plugin-npm';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import uglify from 'rollup-plugin-uglify';
import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: 'index',
  dest: 'build.js',
  format: 'cjs',
  // sourceMap: true,
  globals: {
  },
  plugins: [
    json(),
    babel( {
      exclude: [
        'node_modules/**',
      ],
      babelrc: false,
      presets: [ 'es2015-rollup', 'stage-0' ],
    } ),
    npm( {
    //   // use "jsnext:main" if possible
    //   // – see https://github.com/rollup/rollup/wiki/jsnext:main
      jsnext: true,

    //   // use "main" field or index.js, even if it's not an ES6 module
    //   // (needs to be converted from CommonJS to ES6
    //   // – see https://github.com/rollup/rollup-plugin-commonjs
      main: true,

    //   // if there's something your bundle requires that you DON'T
    //   // want to include, add it to 'skip'
      // skip: [ 'express', 'request-promise' ],//, 'cls-bluebird' ],
skip: ['express','request-promise', 'body-parser-json'],
    //   // by default, built-in modules such as `fs` and `path` are
    //   // treated as external if a local module with the same name
    //   // can't be found. If you really want to turn off this
    //   // behaviour for some reason, use `builtins: false`
    //   // builtins: false,
    //   // builtins: true,

    //   // some package.json files have a `browser` field which
    //   // specifies alternative files to load for people bundling
    //   // for the browser. If that's you, use this option, otherwise
    //   // pkg.browser will be ignored
    //   // browser: false,
    } ),
    commonjs( {
      namedExports: {
        'body-parser-json': [ 'json' ],
        'express': [ 'Router' ],
      },
      include: [
        'node_modules/**',
      ],
      exclude: [
      ],
    } ),
    // uglify( {
    //   define: {
    //     'process.env.NODE_ENV': "'production'",
    //   },
    // } ),
  ],
  // external: [ 'react', 'react-dom' ],//, 'streams', 'http', 'net', 'request' ],
};
