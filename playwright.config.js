module.exports = {
  fullyParallel: true,
  webServer: {
    command: 'python3 -m http.server 4173 --directory .',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: true,
    timeout: 10000
  },
  use: {
    launchOptions: {
      ...(process.platform === 'darwin' ? { executablePath: '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser' } : {})
    }
  }
};
