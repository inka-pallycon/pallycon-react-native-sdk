# **PallyCon React Native SDK** Development Guide

- A React-Native pallycon-react-native-sdk plugin which provides easy to apply Multi-DRM(Android: Widevine, iOS: FairPlay) when developing media service apps for Android and iOS. 
- Please refer to the links below for detailed information.

## **Support Environment**

- Android 6.0 (API 23) & Android targetSdkVersion 34 or higher
- iOS 14.0 higher

## **Important**

- To develop using the SDK, you must first sign up for the [PallyCon Site][1] and obtain a `Site ID`.

## **Dependencies**

- To add `PallyCon Multi-DRM Sdk` to your React-Native app, read the [Installation][2] instructions.
- Below are the Android and iOS properties required for `PallyCon Multi-DRM SDK` to work properly.

### PallyCon Multi-DRM SDK - Android, iOS

- The `pallycon-react-native-sdk` uses the [PallyCon Multi-DRM SDK][3].
- This `PallyCon Multi-DRM SDK` is used to acquire and manage licences. 
- SDK is applied to Android and iOS platforms, and the settings and usage methods for each platform are as follows.

#### **Android**

- Adding Widevine Android SDK from GitHub Packages
  - To integrate the Widevine Android SDK, follow these steps to add the GitHub package repository to your `build.gradle` file:

- Update your `build.gradle` file
    - Add the following code snippet to the `allprojects` section of your `build.gradle` file to include the PallyCon Widevine Android SDK GitHub repository:

      ```groovy
      allprojects {
          repositories {
              maven {
                  url = uri("https://maven.pkg.github.com/inka-pallycon/pallycon-widevine-android-sdk")
                  credentials {
                      username = "GitHub User ID"  // Replace with your GitHub User ID
                      password = "Token"  // Replace with your GitHub Personal Access Token
                  }
              }
              google()
              // other repositories...
          }
      }
      ```
  > GitHub Authentication 
  >    - The username should be your GitHub User ID.
  >    - The password should be your GitHub Personal Access Token (PAT).
  >    - For instructions on generating a Personal Access Token. 
  >      - Github documentation: [Managing your Personal Access Tokens][4].


#### **iOS**

- `pallycon-react-native-sdk` uses cocoapods to install `PallyCon Multi-DRM iOS SDK`.

  > For information on how to install and use cocoapods, please refer to the [cocoapods official website][5].

- Add the following to `Podfile`.

    ```podfile
    # examples/advanced/ios/Podfile
    pod 'PallyConFPSSDK'
    ```


### React Native Video

- The example project in `pallycon-react-native-sdk` uses [react-native-video][6] to play DRM content.
- `react-native-video` is a library that provides a video component for React Native.
  - `react-native-video` is a fork of [react-native-video][7].
  - forked from `react-native-video` to apply `PallyCon Multi-DRM SDK`.
- The provided `react-native-video` is applied with `PallyCon Multi-DRM SDK`, and if you use `pallycon-react-native-sdk`, you need to configure it like below.

  ```json
  dependencies: {
    ...
    //examples/advanced/package.json or examples/basic/package.json
    "react-native-video": "git+https://github.com/inka-pallycon/react-native-video.git"
    ...
  }
  ```


## **PallyCon React Native SDK Example**
- `pallycon-react-native-sdk` provides two examples.
  - advanced example
    - DRM content streaming playback
    - DRM content download and offline playback
  - basic example
    - DRM content streaming playback

### How to Run PallyCon React Native SDK Example
  - Run the following command to execute the example.

    ```bsh
    // move to the pallycon-react-native-sdk folder
    % cd pallycon-react-native-sdk
    % yarn install
    % yarn pack -o pallycon-react-native-sdk.tgz

    // move to the example/advanced or example/basic folder
    % cd example/advanced
    % yarn install

    // if you want to run ios
    // % cd ios
    // % pod install
    // % cd ..

    % npx react-native start --reset-cache
    // run android
    % npx react-native run-android
    // run ios or xcode
    // % npx react-native run-ios
    // % cd ios && open advanced.xcworkspace
    ```

## PallyCon React Native SDK API

This section describes the `PallyCon React Native SDK` API.

### **Import**

- Import the `PallyCon React Native SDK` module.

  ```typescript
  import PallyConMultiDrmSdk, {
    PallyConEventType,
    PallyConContentConfiguration,
    PallyConDownloadState,
  } from "pallycon-react-native-sdk"
  ```

### **Initialize**
- Initialize the `PallyCon React Native SDK`.

  ```typescript
  // advanced/src/presentation/controllers/DrmMovieController.ts
  PallyConMultiDrmSdk.initialize(siteId)
  ```

### **PallyCon Event**

- Register events that occur inside the SDK.
  ```typescript
  // advanced/src/presentation/controllers/DrmMovieController.ts
  PallyConMultiDrmSdk.setPallyConEvents()
  ```

- PallyCon Event Type
  ```typescript
  // advanced/src/presentation/controllers/DrmMovieController.ts
  export enum PallyConEventType {
      complete = 'complete',    /// The download completed
      pause = 'pause',          /// The download paused
      remove = 'remove',        /// The download is removed
      stop = 'stop',            /// The download is stop
      download = 'download',    /// The download is start
      /// Error when the content information to be downloaded is incorrect
      contentDataError = 'contentDataError',
      drmError = 'drmError',                            /// License error     
      licenseServerError = 'licenseServerError',        /// Server error when issuing license
      downloadError = 'downloadError',                  /// Error during download
      networkConnectedError = 'networkConnectedError',  /// Error when there is no network connection
      /// Error that occurs when the time is forcibly manipulated on an Android device
      detectedDeviceTimeModifiedError = 'detectedDeviceTimeModifiedError',
      migrationError = 'migrationError',            /// Error that occurs when migrating from SDK
      licenseCipherError = 'licenseCipherError',    /// Error that occurs when licenseCipher from SDK
      unknownError = 'unknownError',                /// Unknown error type
      progress = 'progress'                         /// Download progress data
  }

  ```

### **Download Event**

- When downloading, register a listener to know the size of the currently downloaded data.

  ```typescript
  PallyConMultiDrmSdk.addPallyConEvent(PallyConEventType.progress, (event) => {
    // event.url is url
    // event.percent is downloaded percent
  })
  ```
- Get the current download status of the content.

  ```typescript
  try {
    const state = await PallyConMultiDrmSdk.getDownloadState(config)
    switch (state) {
      case PallyConDownloadState.DOWNLOADING:
        break
      case PallyConDownloadState.PAUSED:
        break
      case PallyConDownloadState.COMPLETED:
        break
      default:
        break
    }
  } catch (e) {
    setError(e.message)
  }
  ```

### **Download API**

- Describes the API required for the content download process.

  ```typescript
  // start download
  PallyConMultiDrmSdk.addStartDownload(PallyConContentConfiguration)

  // cancel downloads
  PallyConMultiDrmSdk.cancelDownloads()

  // pause downloads
  PallyConMultiDrmSdk.pauseDownloads()

  // resume downloads
  PallyConMultiDrmSdk.resumeDownloads()
  ```

### **Remove License or Contents**

- Remove the downloaded license and content.

  ```typescript
  // remove downloaded content
  PallyConMultiDrmSdk.removeDownload(PallyConContentConfiguration)

  // remove license for content
  PallyConMultiDrmSdk.removeLicense(PallyConContentConfiguration)
  ```

### **Release**

- Called when you end using the SDK.

  ```typescript
    PallyConMultiDrmSdk.release()
  ```


[1]: https://pallycon.com/
[2]: https://yarnpkg.com/
[3]: https://pallycon.com/sdk/
[4]: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens
[5]: https://cocoapods.org/
[6]: https://github.com/inka-pallycon/react-native-video.git
[7]: https://github.com/TheWidlarzGroup/react-native-video

