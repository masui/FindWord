/*
  admob設定
 */

function showTestBanner(){
    var admobParam=new admob.Params();
    //admobParam.extra={'keyword':"admob phonegame"};
    //admobParam.isForChild=true;
    admobParam.isTesting=true;
    admob.showBanner(admob.BannerSize.BANNER,admob.Position.TOP_CENTER,admobParam);
}

function showInterstitial(){
    admob.isInterstitialReady(function(isReady){
	if(isReady){
	    admob.showInterstitial();
	}
    });
}
function onInterstitialReceive (message) {
    alert(message.type+" ,you can show it now");
    //admob.showInterstitial();//show it when received
}
function onReceiveFail (message) {
    var msg=admob.Error[message.data];
    if(msg==undefined){
	msg=message.data;
    }
    // document.getElementById("alertdiv").innerHTML="load fail: "+message.type+"  "+msg;
    alert("load fail: "+message.type+"  "+msg);
}

function onDeviceReady() {
    var admobParam=new admob.Params();
    //admobParam.isTesting=true;
    admobParam.isTesting=false;
    
    //admob.initAdmob("ca-app-pub-3940256099942544/2934735716","ca-app-pub-3940256099942544/4411468910"); // テスト用
    admob.initAdmob("ca-app-pub-8208995778524988/5052386831","ca-app-pub-8208995778524988/4108402413"); // FindWord用
    
    document.addEventListener(admob.Event.onInterstitialReceive, onInterstitialReceive, false);
    document.addEventListener(admob.Event.onInterstitialFailedReceive,onReceiveFail, false);
    document.addEventListener(admob.Event.onBannerFailedReceive,onReceiveFail, false);
    
    admob.showBanner(admob.BannerSize.BANNER,admob.Position.BOTTOM_APP,admobParam);
}

document.addEventListener('deviceready',onDeviceReady, false);

