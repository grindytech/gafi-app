import { mnemonicGenerate } from '@polkadot/util-crypto';

export const createWalletAccount = async (extensionPage) => {
  const [button] = await extensionPage.$x('//button');

  if (button) {
    await button.click();
  }
  const [button2] = await extensionPage.$x('//button');
  if (button2) {
    await button2.click();
  }
  await extensionPage.waitForTimeout(100);
  const [element] = await extensionPage.$x("//div[@class='popupToggle']");
  if (element) {
    await element.click();
  }
  await extensionPage.waitForTimeout(100);
  const [createAccount] = await extensionPage.$x(
    "//span[contains(., 'Import account')]"
  );
  if (createAccount) {
    await createAccount.click();
  }

  const mnemonicSeed = mnemonicGenerate();

  await extensionPage.type('textarea', mnemonicSeed);
  const [buttonNext] = await extensionPage.$x('//button');
  if (buttonNext) {
    await buttonNext.click();
  }
  await extensionPage.waitForTimeout(100);
  const [inputName, inputPassword] = await extensionPage.$x('//input');
  if (inputName) {
    await inputName.type('Account Test');
  }
  if (inputPassword) {
    await inputPassword.type('Password1');
  }
  const [, , inputRePassword] = await extensionPage.$x('//input');
  if (inputRePassword) {
    await inputRePassword.type('Password1');
  }
  const [, buttonNext2] = await extensionPage.$x('//button');
  if (buttonNext2) {
    await buttonNext2.click();
  }
  
  extensionPage.close();
};

/**
 * It creates a new page in the browser, navigates to the extension's popup page, and returns the page
 * @param browser - The Puppeteer browser object.
 * @param extensionID - The ID of the extension you want to open.
 * @param extensionPopupHtml - The name of the HTML file that will be loaded in the extension page.
 * @returns The extensionPage object.
 */
export const createExtensionPage = async (browser, extensionID, extensionPopupHtml) => {
  const extensionPage = await browser.newPage();

  await extensionPage.goto(
    `chrome-extension://${extensionID}/${extensionPopupHtml}`
  );

  return extensionPage;
};

/**
 * It waits for the extension to load, then it types the password into the password input field, clicks
 * the sign button, and closes the extension
 * @param page - the page object of the browser
 * @param extensionPage - The extension page that is opened.
 */
export const extensionSignTransaction = async (page, extensionPage) => {
  await page.waitForTimeout(1000);
  const [inputPassword] = await extensionPage.$x('//input');

  if (inputPassword) {
    await inputPassword.type('Password1');
  }

  const [signButton] = await extensionPage.$x('//button');

  if (signButton) {
    await signButton.click();
  }
  extensionPage.close();
};