import { setDefaultOptions } from 'expect-puppeteer';

import {
  createExtensionPage,
  createWalletAccount,
  extensionSignTransaction,
} from 'utils/test';
import 'expect-puppeteer'; // eslint-disable-line

setDefaultOptions({ timeout: 2000 });

describe('Gafi Dashboard faucet', () => {
  let extensionID = '';
  const extensionPopupHtml = 'index.html';

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
      browser,
      extensionID,
      extensionPopupHtml
    );

    await createWalletAccount(extensionPage);

    await page.reload();
  });

  it('Should not allow user to faucet twice', async () => {
    await expect(page).toClick('button', { text: 'Faucet' });
    await page.waitForTimeout(2000);
    let extensionPage = await createExtensionPage(
      browser,
      extensionID,
      extensionPopupHtml
    );

    await extensionSignTransaction(page, extensionPage);

    await expect(page).toMatch('Finalized.', { timeout: 20000 });

    await expect(page).toClick('button', { text: 'Faucet', delay: 200 });
    await page.waitForTimeout(2000);
    extensionPage = await createExtensionPage(
      browser,
      extensionID,
      extensionPopupHtml
    );

    await extensionSignTransaction(page, extensionPage);

    await expect(page).toMatch('PleaseWait', { timeout: 20000 });
  });
});
