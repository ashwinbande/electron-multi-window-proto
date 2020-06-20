module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
    },
  },
  pages: {
    login: 'src/windows/login/main.js',
    main: 'src/windows/main/main.js',
    /* login: {
      entry: 'src/windows/login/main.js',
      template: 'public/index.html',
      filename: 'login.html',
      title: 'Login Page',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    }, */
  },
};
