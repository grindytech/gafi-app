import { mnemonicGenerate } from '@polkadot/util-crypto';
import { setDefaultOptions } from 'expect-puppeteer';
import 'expect-puppeteer';

setDefaultOptions({ timeout: 2000 });

const createWalletAccount = async (extensionPage) => {
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
 * It creates a new page, navigates to the extension's popup page, and returns the page
 * @param extensionID - The ID of the extension you want to open.
 * @param extensionPopupHtml - The name of the HTML file that contains the extension's popup.
 * @returns The extensionPage object.
 */
const createExtensionPage = async (extensionID, extensionPopupHtml) => {
  const extensionPage = await browser.newPage();

  await extensionPage.goto(
    `chrome-extension://${extensionID}/${extensionPopupHtml}`
  );

  return extensionPage;
};

/**
 * It waits for the extension to load, then it types the password into the password field, clicks the
 * sign button, and closes the extension page.
 * @param extensionPage - The extension page that is opened.
 */
const extensionSignTransaction = async (extensionPage) => {
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

describe('Gafi Dashboard', () => {
  let extensionID = '';
  const extensionPopupHtml = 'index.html';
  const extensionName = 'polkadot{.js}';

  beforeAll(async () => {
    await page.goto('http://localhost:8000');
    await page.waitForTimeout(2000);
    const targets = await browser.targets();
    const extensionTarget = targets.find(target =>
      target.url().includes('chrome-extension')
    );
    const partialExtensionUrl = extensionTarget.url() || '';
    const [, , spreadExtensionID] = partialExtensionUrl.split('/');

    extensionID = spreadExtensionID;

    const extensionPage = await createExtensionPage(
      extensionID,
      extensionPopupHtml
    );

    await createWalletAccount(extensionPage);

    await page.reload();
  });

  it('should be titled "GAFI DASHBOARD"', async () => {
    await expect(page.title()).resolves.toMatch('GAFI DASHBOARD');
  });

  it('should allow user to faucet', async () => {
    await expect(page).toClick('button', { text: 'Faucet' });
    await page.waitForTimeout(2000);
    const extensionPage = await createExtensionPage(
      extensionID,
      extensionPopupHtml
    );

    await extensionSignTransaction(extensionPage);

    await expect(page).toMatch('1,500', { timeout: 20000 });
  });

  it('should allow user to join upfront pool basic', async () => {
    await page.goto('http://localhost:8000/admin/upfront-pool');

    await expect(page).toClick('[data-test*="btn-Basic"]');
    await page.waitForTimeout(2000);
    const extensionPage = await createExtensionPage(
      extensionID,
      extensionPopupHtml
    );
    await extensionSignTransaction(extensionPage);

    await expect(page).toMatch('Leave', { timeout: 20000 });
  });

  it('should allow user to leave upfront pool', async () => {
    await page.goto('http://localhost:8000/admin/upfront-pool');

    await expect(page).toClick('button', { text: 'Leave', delay: 500 });
    await page.waitForTimeout(2000);
    const extensionPage = await createExtensionPage(
      extensionID,
      extensionPopupHtml
    );
    await extensionSignTransaction(extensionPage);

    await expect(page).toMatchElement('[data-test*="btn-Basic"]', {
      text: 'Join',
      timeout: 20000,
    });
  });

  it('should allow user to join staking pool basic', async () => {
    await page.goto('http://localhost:8000/admin/staking-pool');

    await expect(page).toClick('[data-test*="btn-Basic"]', { delay: 100 });
    await page.waitForTimeout(2000);
    const extensionPage = await createExtensionPage(
      extensionID,
      extensionPopupHtml
    );
    await extensionSignTransaction(extensionPage);

    await expect(page).toMatch('Leave', { timeout: 20000 });
  });

  it('should allow user to leave staking pool', async () => {
    await page.goto('http://localhost:8000/admin/staking-pool');

    await expect(page).toClick('button', { text: 'Leave', delay: 500 });
    await page.waitForTimeout(2000);
    const extensionPage = await createExtensionPage(
      extensionID,
      extensionPopupHtml
    );
    await extensionSignTransaction(extensionPage);

    await expect(page).toMatchElement('[data-test*="btn-Basic"]', {
      text: 'Join',
      timeout: 20000,
    });
  });

  it('should not allow user to join staking pool advance because not enough balance', async () => {
    await page.goto('http://localhost:8000/admin/staking-pool');

    await expect(page).toClick('[data-test*="btn-Advance"]');
    await page.waitForTimeout(2000);
    const extensionPage = await createExtensionPage(
      extensionID,
      extensionPopupHtml
    );
    await extensionSignTransaction(extensionPage);

    await expect(page).toMatch('InsufficientBalance', { timeout: 20000 });
    await page.waitForTimeout(1000);
  });
});
