describe('Home Screen', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show home screen with posts', async () => {
    // ホーム画面が表示されることを確認
    await expect(element(by.id('home-screen'))).toBeVisible();
    
    // 投稿一覧が表示されることを確認
    await expect(element(by.id('posts-list'))).toBeVisible();
  });

  it('should show post details', async () => {
    // 最初の投稿の内容が表示されることを確認
    const firstPost = element(by.id('post-0'));
    await expect(firstPost).toBeVisible();

    // 投稿のヘッダー情報を確認
    await expect(element(by.id('post-header-0'))).toBeVisible();
    await expect(element(by.id('post-content-0'))).toBeVisible();
    
    // いいねボタンが機能することを確認
    const likeButton = element(by.id('like-button-0'));
    await expect(likeButton).toBeVisible();
    await likeButton.tap();
  });
});