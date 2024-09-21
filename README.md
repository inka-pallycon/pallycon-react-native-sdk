## **PallyCon Multi-DRM SDK** for React-Native Development Guide

A React-Native pallycon-react-native-sdk plugin which provides easy to apply Multi-DRM(Android: Widevine, iOS: FairPlay) when developing media service apps for Android and iOS. Please refer to the links below for detailed information.

## **support environment**

- Android 5.0 (Lolipop) & Android targetSdkVersion 31 or higher
- iOS 12.0 higher
- This SDK supports ExoPlayer version 2.18.1 on Android.

## **Important**

- To develop using the SDK, you must first sign up for the PallyCon Admin Site and obtain a Site ID.

## **SDK usage**

To add PallyConMultiDrmSdk to your React-Native app, read the [Installation](https://yarnpkg.com/) instructions. Below are the Android and iOS properties required for PallyConMultiDrmSdk to work properly.

<details>
<summary>Android</summary>

**compileSdkVersion**

Make sure you set `compileSdkVersion` in "android/app/build.gradle".

```
android {
  compileSdkVersion 31

  ...
}
```

</details>

<details>
<summary>iOS</summary>

`PallyCon Multi DRM SDK React Native` uses `PallyConFPSSDK`. `PallyConFPSSDK` is supposed to be downloaded as `cocoapods`.

### SDK requirements
- Minimum supported version: 14.0

</details>

### **Import**
```typescript
import PallyConMultiDrmSdk , {
	PallyConEventType,
	PallyConContentConfiguration,
	PallyConDownloadState
} from 'pallycon-react-native-sdk';
```

### **Initialize**

```typescript
PallyConMultiDrmSdk.initialize(siteId);
```

### **Set Event**

Register events that occur inside the SDK.

```typescript
PallyConMultiDrmSdk.addPallyConEvent(PallyConEventType.complete, (event) => {
	// Called when download is complete
})

PallyConMultiDrmSdk.addPallyConEvent(PallyConEventType.pause, (event) => {
	// Called when downloading is stopped during download
})

PallyConMultiDrmSdk.addPallyConEvent(PallyConEventType.remove, (event) => {
	// Called when download remove
})

PallyConMultiDrmSdk.addPallyConEvent(PallyConEventType.stop, (event) => {
	// Called when download stops
})

PallyConMultiDrmSdk.addPallyConEvent(PallyConEventType.download, (event) => {
	// Called when download starts
})

PallyConMultiDrmSdk.addPallyConEvent(PallyConEventType.contentDataError, (event) => {
	// Called when an error occurs in the parameters passed to the sdk
})

PallyConMultiDrmSdk.addPallyConEvent(PallyConEventType.drmError, (event) => {
	// Called when a license error occurs
})

PallyConMultiDrmSdk.addPallyConEvent(PallyConEventType.licenseServerError, (event) => {
	// Called when an error comes down from the license server
})

PallyConMultiDrmSdk.addPallyConEvent(PallyConEventType.downloadError, (event) => {
	// Called when an error occurs during download
})

PallyConMultiDrmSdk.addPallyConEvent(PallyConEventType.networkConnectedError, (event) => {
	// Called in case of network error
})

PallyConMultiDrmSdk.addPallyConEvent(PallyConEventType.detectedDeviceTimeModifiedError, (event) => {
	// Called when device time is forcibly manipulated
})

PallyConMultiDrmSdk.addPallyConEvent(PallyConEventType.migrationError, (event) => {
	// Called when sdk migration fails
})

PallyConMultiDrmSdk.addPallyConEvent(PallyConEventType.licenseCipherError, (event) => {
	// Called when license cipher fails
})

PallyConMultiDrmSdk.addPallyConEvent(PallyConEventType.unknownError, (event) => {
	// Internally called when an unknown error occurs
})
```

When downloading, register a listener to know the size of the currently downloaded data.

```typescript
PallyConMultiDrmSdk.addPallyConEvent(PallyConEventType.progress, (event) => {
	// event.url is url
	// event.percent is downloaded percent
})
```

### **Get content download status**

Get the current download status of the content.

```typescript
try {
	const state =
			await PallyConMultiDrmSdk.getDownloadState(config);
	switch (state) {
		case PallyConDownloadState.DOWNLOADING:
			break;
		case PallyConDownloadState.PAUSED:
			break;
		case PallyConDownloadState.COMPLETED:
			break;
		default:
			break;
	}
} catch (e) {
	setError(e.message);
}
```

### **Download**

Describes the API required for the content download process.

```typescript
// start download
PallyConMultiDrmSdk.addStartDownload(PallyConContentConfiguration);

// cancel downloads
PallyConMultiDrmSdk.cancelDownloads();

// pause downloads
PallyConMultiDrmSdk.pauseDownloads();

// resume downloads
PallyConMultiDrmSdk.resumeDownloads();
```

### **Remove License or Contents**

Remove the downloaded license and content.

```typescript
// remove downloaded content
PallyConMultiDrmSdk.removeDownload(PallyConContentConfiguration);

// remove license for content
PallyConMultiDrmSdk.removeLicense(PallyConContentConfiguration);
```


### **Release**

Called when you end using the SDK.

```typescript
PallyConMultiDrmSdk.release();
```



