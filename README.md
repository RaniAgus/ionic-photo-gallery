# ionic-photo-gallery

## Capacitor Setup

Capacitor is Ionic’s official app runtime that makes it easy to deploy web apps to native platforms like iOS, Android, and more. If you’ve used Cordova in the past, consider reading more about the differences [here](https://capacitorjs.com/docs/cordova#differences-between-capacitor-and-cordova).

If you’re still running `ionic serve` in the terminal, cancel it. Complete a fresh build of the Ionic project, fixing any errors that it reports:

```shell
ionic build
```

Next, create both the iOS and Android projects:

```shell
$ ionic cap add ios
$ ionic cap add android
```

Both android and ios folders at the root of the project are created. These are entirely standalone native projects that should be considered part of your Ionic app (i.e., check them into source control, edit them using their native tooling, etc.).

Every time you perform a build (e.g. `ionic build`) that updates your web directory (default: `build`), you'll need to copy those changes into your native projects:

```shell
ionic cap copy
```

Note: After making updates to the native portion of the code (such as adding a new plugin), use the `sync` command:

```shell
ionic cap sync
```

## Android

Capacitor Android apps are configured and managed through Android Studio. Before running this app on an Android device, there's a couple of steps to complete.

First, run the Capacitor `open` command, which opens the native Android project in Android Studio:

```shell
ionic cap open android
```

Similar to iOS, we must enable the correct permissions to use the Camera. Configure these in the `AndroidManifest.xml` file. Android Studio will likely open this file automatically, but in case it doesn't, locate it under `android/app/src/main/`.

Scroll to the `Permissions` section and ensure these entries are included:

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

Save the file. With permissions in place, we are ready to try out the app on a real device! Connect an Android device to your computer. Within Android Studio, click the "Run" button, select the attached Android device, then click OK to build, install, and launch the app on your device.

Once again, upon tapping the Camera button on the Photo Gallery tab, the permission prompt should be displayed. Tap OK, then take a picture with the Camera. Afterward, the photo should appear in the app.

## Live Reload

This is particularly useful when writing code that interacts with native plugins. Since we need to run native plugin code on a device in order to verify that it works, having a way to quickly write code, build and deploy it, then test it is crucial to keeping up our development speed.

Select your platform of choice (iOS or Android) and connect a device to your computer. Next, run either command in a terminal, based on your chosen platform:

```shell
$ ionic cap run ios -l --external

$ ionic cap run android -l --external
```

The Live Reload server will start up, and the native IDE of choice will open if not opened already. Within the IDE, click the Play button to launch the app onto your device.

