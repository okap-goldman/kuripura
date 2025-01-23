const { device, element, by, waitFor } = require('detox');

// グローバルタイムアウトを設定
jest.setTimeout(300000); // 5分に延長

// デバッグ情報の出力を有効化
beforeAll(() => {
  console.log('テストセットアップを開始します');
});

// Expoサーバーの起動を待機する関数
const waitForExpoServer = async () => {
  console.log('Expoサーバーの起動を待機中...');
  await new Promise(resolve => setTimeout(resolve, 45000)); // 45秒に延長
};

beforeAll(async () => {
  // Expoサーバーの起動を待機
  await waitForExpoServer();

  await device.launchApp({
    newInstance: true,
    permissions: { notifications: 'YES' },
    delete: true,
    launchArgs: {
      detoxPrintBusyIdleResources: 'YES',
      detoxDisableSyncQueue: 'YES',
      detoxURLBlacklistRegex: '.*socket\\.io.*|.*analytics.*|.*logs.*|.*dicebear\\.com.*',
      detoxSourceAppBackgroundStatus: 'active',
      detoxDisableScrollAnimation: 'true',
      detoxOrientationLock: 'portrait'
    }
  });

  // アプリの起動を待機
  console.log('アプリの起動を待機中...');
  await new Promise(resolve => setTimeout(resolve, 10000)); // 10秒に延長

  // ISO形式の時刻を使用
  const isoTime = new Date().toISOString().split('T')[1].substring(0, 5);
  
  try {
    await device.setStatusBar({
      time: isoTime,
      dataNetwork: 'wifi',
      wifiBars: '3'
    });
  } catch (error) {
    console.warn('ステータスバーの設定に失敗しました:', error);
  }

  // 同期を完全に無効化
  await device.disableSynchronization();
});

afterAll(() => {
  console.log('全てのテストが完了しました');
});

beforeEach(async () => {
  await device.reloadReactNative();
  console.log('アプリをリロード中...');
  await new Promise(resolve => setTimeout(resolve, 5000)); // 5秒に延長
});

// グローバルエラーハンドリング
process.on('unhandledRejection', (error) => {
  console.error('未処理のPromise rejection:', error);
});

process.on('uncaughtException', (error) => {
  console.error('未処理の例外:', error);
}); 