const { device, element, by, waitFor, expect } = require('detox');

describe('Home Screen', () => {
  beforeAll(async () => {
    await device.launchApp({
      newInstance: true,
      permissions: { notifications: 'YES' },
      delete: true,
      launchArgs: {
        detoxDebug: 'true',
        networkTimeout: '10000',
        disableAnimations: 'true',
        detoxURLBlacklistRegex: '.*socket\\.io.*|.*analytics.*|.*logs.*',
        detoxSourceAppBackgroundStatus: 'active',
        detoxDisableScrollAnimation: 'true',
        detoxOrientationLock: 'portrait'
      }
    });

    // アプリの起動を待機
    await new Promise(resolve => setTimeout(resolve, 5000));
  });

  beforeEach(async () => {
    await device.reloadReactNative();
    await new Promise(resolve => setTimeout(resolve, 2000));
    await waitFor(element(by.id('home-screen')))
      .toBeVisible()
      .withTimeout(10000);
  });

  it('should show loading state and then home screen with posts', async () => {
    // ホーム画面の表示を待機
    await waitFor(element(by.id('home-screen')))
      .toBeVisible()
      .withTimeout(10000);

    // ローディング状態を確認
    await expect(element(by.id('loading-indicator'))).toBeVisible();
    
    // 投稿一覧の表示を待機
    await waitFor(element(by.id('posts-list')))
      .toBeVisible()
      .withTimeout(10000);
    
    // 最初の投稿の表示を確認
    await waitFor(element(by.id('post-0-container')))
      .toBeVisible()
      .withTimeout(10000);
  });

  it('should show post details', async () => {
    // 投稿の詳細情報を確認
    await waitFor(element(by.id('post-0-container')))
      .toBeVisible()
      .withTimeout(10000);

    await waitFor(element(by.id('post-0')))
      .toBeVisible()
      .withTimeout(10000);
  });
});