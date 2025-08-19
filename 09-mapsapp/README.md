# MapsApp

MapsApp is a simple React Native application demonstrating map integration and location features.

## Features

- Interactive map view
- User location tracking
- Marker placement

## Getting Started

### Prerequisites

- Node.js & npm
- React Native CLI
- Xcode (for iOS) or Android Studio (for Android)

### Installation

```bash
npm install
```

### Configure Google Maps API Key

1. **Create a Google Maps API Key:**
  - Visit [Google Cloud Console](https://console.cloud.google.com/).
  - Create or select a project.
  - Enable the "Maps SDK for Android" and "Maps SDK for iOS" APIs.
  - Generate an API key.

2. **Add API Key to Android:**
  - Open `android/app/src/main/AndroidManifest.xml`.
  - Add the following inside the `<application>` tag:
    ```xml
    <meta-data
     android:name="com.google.android.geo.API_KEY"
     android:value="YOUR_API_KEY_HERE"/>
    ```

3. **Add API Key to iOS:**
  - Open `ios/<projectName>/Info.plist`.
  - Add the following inside the `<dict>`:
    ```xml
    <key>MAPS_API_KEY</key>
    <string>YOUR_API_KEY_HERE</string>
    ```

### Running the App

#### iOS

```bash
npx react-native run-ios
```

#### Android

```bash
npx react-native run-android
```
