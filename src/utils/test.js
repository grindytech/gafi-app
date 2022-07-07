import { mnemonicGenerate } from '@polkadot/util-crypto';

export const createWalletAccount = async extensionPage => {
  // click next
  const [button] = await extensionPage.$x('//button');
  if (button) {
    await button.click();
  }
  // click next
  const [button2] = await extensionPage.$x('//button');
  if (button2) {
    await button2.click();
  }
  await extensionPage.waitForTimeout(100);
  let addButton;
  let importButton;
  let mnemonicSeed;
  let buttonNext;
  let inputName;
  let inputPassword;
  let inputRePassword;
  let confirmButton;

  // click (+) button
  [addButton] = await extensionPage.$x("//div[@class='popupToggle']");
  if (addButton) {
    await addButton.click();
  }
  // click import account button
  await extensionPage.waitForTimeout(100);
  [importButton] = await extensionPage.$x(
    "//span[contains(., 'Import account')]"
  );
  if (importButton) {
    await importButton.click();
  }
  // enter mnemonic seed
  mnemonicSeed = mnemonicGenerate();
  await extensionPage.type('textarea', mnemonicSeed);
  // click next
  [buttonNext] = await extensionPage.$x('//button');
  if (buttonNext) {
    await buttonNext.click();
  }
  // enter username and password
  await extensionPage.waitForTimeout(100);
  [inputName, inputPassword] = await extensionPage.$x('//input');
  if (inputName) {
    await inputName.type(`Account Test1`);
  }
  if (inputPassword) {
    await inputPassword.type('Password1');
  }

  // enter re-password
  [, , inputRePassword] = await extensionPage.$x('//input');
  if (inputRePassword) {
    await inputRePassword.type('Password1');
  }

  // click confirm
  [, confirmButton] = await extensionPage.$x('//button');
  if (confirmButton) {
    await confirmButton.click();
  }
  await extensionPage.waitForTimeout(500);
  // Create account 2
  // click (+) button
  [addButton] = await extensionPage.$x("//div[@class='popupToggle']");
  if (addButton) {
    await addButton.click();
  }
  // click import account button
  await extensionPage.waitForTimeout(100);
  [importButton] = await extensionPage.$x(
    "//span[contains(., 'Import account')]"
  );
  if (importButton) {
    await importButton.click();
  }
  // enter mnemonic seed
  mnemonicSeed = mnemonicGenerate();
  await extensionPage.type('textarea', mnemonicSeed);
  // click next
  [buttonNext] = await extensionPage.$x('//button');
  if (buttonNext) {
    await buttonNext.click();
  }
  // enter username and password
  [inputName, inputPassword] = await extensionPage.$x('//input');
  if (inputName) {
    await inputName.type(`Account Test2`);
  }
  if (inputPassword) {
    await inputPassword.type('Password1');
  }

  // enter re-password
  [, , inputRePassword] = await extensionPage.$x('//input');
  if (inputRePassword) {
    await inputRePassword.type('Password1');
  }

  // click confirm
  [, confirmButton] = await extensionPage.$x('//button');
  if (confirmButton) {
    await confirmButton.click();
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
export const createExtensionPage = async (
  browser,
  extensionID,
  extensionPopupHtml
) => {
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
