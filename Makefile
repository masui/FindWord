PASS=pitecan
# PASS=rqwrefasfd
ZIPALIGN=/Users/masui/Systems/android-sdk-macosx/build-tools/25.0.2/zipalign
KEYSTORE=.keystore
# KEYSTORE=FindWordFree.keystore
# KEYSTORE=/Users/masui/masui/.android/masui.keystore
ICON=images/FindWord256x256.png

build:
	cordova build android
install:
	adb install -r platforms/android/build/outputs/apk/android-debug.apk

release:
	-cd platforms/android/build/outputs/apk; /bin/rm *.apk
	cordova build android --release
	cd platforms/android/build/outputs/apk; jarsigner \
		-verbose \
		-keystore ${KEYSTORE} \
		-storepass ${PASS} \
		-signedjar android-release-signed.apk \
		-sigalg SHA1withRSA \
		-digestalg SHA1 \
		android-release-unsigned.apk FindWord
	cd platforms/android/build/outputs/apk; ${ZIPALIGN} \
		-v 4 \
		android-release-signed.apk \
		android-release-signed-aligned.apk

#		-sigalg RSA \

# 署名
# http://phiary.me/cordova-android-release-build-apk-for-google-play/
#
genkey:
	cd platforms/android/build/outputs/apk; /bin/rm -r -f ${KEYSTORE}
	cd platforms/android/build/outputs/apk; keytool \
		-genkey -v \
		-keystore ${KEYSTORE} \
		-storepass ${PASS} \
		-alias FindWord \
		-keyalg RSA \
		-validity 10000

keylist:
	cd platforms/android/build/outputs/apk; keytool -list -v -keystore ${KEYSTORE} -storepass ${PASS}

sign:
	cd platforms/android/build/outputs/apk; jarsigner -verbose -keystore .keystore android-release-unsigned.apk FindWord

signcheck:
	cd platforms/android/build/outputs/apk; jarsigner -verify -verbose -certs android-release-signed-aligned.apk

align:
	/Users/masui/Systems/android-sdk-macosx/build-tools/25.0.2/zipalign -v 4 android-release-unsigned.apk


icons:
	convert -scale 72x72 ${ICON}   platforms/android/res/mipmap-hdpi/icon.png
	convert -scale 36x36 ${ICON}   platforms/android/res/mipmap-ldpi/icon.png
	convert -scale 48x48 ${ICON}   platforms/android/res/mipmap-mdpi/icon.png
	convert -scale 96x96 ${ICON}   platforms/android/res/mipmap-xhdpi/icon.png
	convert -scale 144x144 ${ICON} platforms/android/res/mipmap-xxhdpi/icon.png
	convert -scale 192x192 ${ICON} platforms/android/res/mipmap-xxxhdpi/icon.png


# プロジェクト作成
# cordova create FindWord findword.com.pitecan FindWord
# Android追加
# cordova platforms add android
# cordova plugin add admob

