const path = require('path');

module.exports = {
  // 기존 설정...
  resolve: {
    fallback: {
      "zlib": require.resolve("browserify-zlib"),
      "querystring": require.resolve("querystring-es3"),
      "path": require.resolve("path-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "buffer": require.resolve("buffer/"),
      "http": require.resolve("stream-http"),
      "net": false, // 'net' 모듈은 브라우저에서 사용할 수 없음
      "fs": false, // 'fs' 모듈은 브라우저에서 사용할 수 없음
      "util": require.resolve("util/")
    }
  }
};
