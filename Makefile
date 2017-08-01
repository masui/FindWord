build:
	cordova build android
install:
	adb install -r platforms/android/build/outputs/apk/android-debug.apk

# プロジェクト作成
# cordova create FindWord findword.com.pitecan FindWord
# Android追加
# cordova platforms add android

