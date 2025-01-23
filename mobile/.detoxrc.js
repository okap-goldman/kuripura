/** @type {Detox.DetoxConfig} */
module.exports = {
  testRunner: {
    args: {
      $0: 'jest',
      config: 'e2e/jest.config.js',
    },
    jest: {
      setupTimeout: 120000,
      reportSpecs: true,
      reportWorkerAssign: true,
    },
  },
  apps: {
    'ios.debug': {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Debug-iphonesimulator/mobile.app',
      build: 'xcodebuild -workspace ios/mobile.xcworkspace -scheme mobile -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build',
    },
    'ios.release': {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Release-iphonesimulator/mobile.app',
      build: 'xcodebuild -workspace ios/mobile.xcworkspace -scheme mobile -configuration Release -sdk iphonesimulator -derivedDataPath ios/build'
    },
    'android.debug': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
      build: 'cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug',
      reversePorts: [
        8081
      ]
    },
    'android.release': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/release/app-release.apk',
      build: 'cd android && ./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release',
      reversePorts: [
        8081
      ]
    }
  },
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 16 Pro',
      },
    },
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: 'Pixel_API_31_AOSP'
      }
    }
  },
  configurations: {
    'ios.sim.debug': {
      device: 'simulator',
      app: 'ios.debug',
    },
    'ios.sim.release': {
      device: 'simulator',
      app: 'ios.release'
    },
    'android.emu.debug': {
      device: 'emulator',
      app: 'android.debug'
    },
    'android.emu.release': {
      device: 'emulator',
      app: 'android.release'
    }
  },
  behavior: {
    init: {
      exposeGlobals: false,
      reinstallApp: true,
    },
    cleanup: {
      shutdownDevice: false,
    },
    launchApp: {
      newInstance: true,
      permissions: { notifications: 'YES' },
      launchArgs: {
        detoxPrintBusyIdleResources: 'YES',
        detoxDisableSyncQueue: 'YES',
        detoxURLBlacklistRegex: '.*socket\\.io.*|.*analytics.*|.*logs.*|.*dicebear\\.com.*',
        detoxSourceAppBackgroundStatus: 'active',
        detoxDisableScrollAnimation: 'true',
        detoxOrientationLock: 'portrait',
      },
    },
  },
};