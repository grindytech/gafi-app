const CRX_PATH = '/Users/kuro/Desktop/polkadot--js--extension';

module.exports = {
  launch: {
    dumpio: true,
    headless: false,
    defaultViewport: null,
    product: 'chrome',
    args: [
      `--disable-extensions-except=${CRX_PATH}`,
      `--load-extension=${CRX_PATH}`,
      '--window-size=1336,768',
    ],
  },
  browserContext: 'default',
};
