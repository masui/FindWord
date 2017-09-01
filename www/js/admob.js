//
//  admobpro設定
//

var admobid = {};
admobid = { // for Android find_word
    banner:       'ca-app-pub-8208995778524988/5621251489',
    interstitial: 'ca-app-pub-8208995778524988/1000136737'
};

function onDeviceReady() {
    AdMob.setOptions({
	//adSize: 'SMART_BANNER',
	//publisherId: 'pub-8208995778524988',
	//publisherId: '8E323CA26DE11B290C192B4E84898359',
	position: AdMob.AD_POSITION.BOTTOM_CENTER,
	isTesting: true, // set to true, to receiving test ad for testing purpose
	bgColor: 'black' // color name, or '#RRGGBB'
	// autoShow: true // auto show interstitial ad when loaded, set to false if prepare/show
	// offsetTopBar: false, // avoid overlapped by status bar, for iOS7+
    });
    
    AdMob.createBanner({
	adId: admobid.banner,
	position: AdMob.AD_POSITION.BOTTOM_CENTER,
	autoShow: true});
}

$(document).ready(function(){
    // on mobile device, we must wait the 'deviceready' event fired by cordova
    if(/(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent)) {
	document.addEventListener('deviceready', onDeviceReady, false);
    } else {
	onDeviceReady();
    }
});
