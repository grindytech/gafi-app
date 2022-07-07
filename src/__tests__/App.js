import { setDefaultOptions } from 'expect-puppeteer';

import {
  createExtensionPage,
  createWalletAccount,
  extensionSignTransaction,
} from 'utils/test';
import 'expect-puppeteer'; // eslint-disable-line

setDefaultOptions({ timeout: 2000 });

describe('Gafi Dashboard', () => {
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

  it('should be titled "GAFI DASHBOARD"', async () => {
    await expect(page.title()).resolves.toMatch('GAFI DASHBOARD');
  });

  it('should allow user to faucet', async () => {
    await expect(page).toClick('button', { text: 'Faucet' });
    await page.waitForTimeout(2000);
    const extensionPage = await createExtensionPage(
      browser,
      extensionID,
      extensionPopupHtml
    );

    await extensionSignTransaction(page, extensionPage);

    await expect(page).toMatch('1,500', { timeout: 20000 });
  });

  it('should allow user to join upfront pool basic', async () => {
    await page.goto('http://localhost:8000/admin/upfront-pool');

    await expect(page).toClick('[data-test*="btn-Basic"]');
    await page.waitForTimeout(2000);
    const extensionPage = await createExtensionPage(
      browser,
      extensionID,
      extensionPopupHtml
    );
    await extensionSignTransaction(page, extensionPage);

    await expect(page).toMatch('Leave', { timeout: 20000 });
  });

  it('should allow user to leave upfront pool', async () => {
    await page.goto('http://localhost:8000/admin/upfront-pool');

    await expect(page).toClick('button', { text: 'Leave', delay: 500 });
    await page.waitForTimeout(2000);
    const extensionPage = await createExtensionPage(
      browser,
      extensionID,
      extensionPopupHtml
    );
    await extensionSignTransaction(page, extensionPage);

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
      browser,
      extensionID,
      extensionPopupHtml
    );
    await extensionSignTransaction(page, extensionPage);

    await expect(page).toMatch('Leave', { timeout: 20000 });
  });

  it('should allow user to leave staking pool', async () => {
    await page.goto('http://localhost:8000/admin/staking-pool');

    await expect(page).toClick('button', { text: 'Leave', delay: 500 });
    await page.waitForTimeout(2000);
    const extensionPage = await createExtensionPage(
      browser,
      extensionID,
      extensionPopupHtml
    );
    await extensionSignTransaction(page, extensionPage);

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
      browser,
      extensionID,
      extensionPopupHtml
    );
    await extensionSignTransaction(page, extensionPage);

    await expect(page).toMatch('InsufficientBalance', { timeout: 20000 });
    await page.waitForTimeout(1000);
  });

  it('Should switch account', async () => {
    await expect(page).toClick('[data-testid*="switch-btn"]');
    await expect(page).toClick('[data-testid*="swich-account-btn-1"]');
    await expect(page).toMatch('Switch successful!', {
      text: '0',
      timeout: 1000,
    });
  });
});
