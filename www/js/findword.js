var size = 8;
var titlediv;
var rects;

var char;
var divs1,divs2;
var startx,starty;
var direction;
var wordlen;

var clockdiv;
var sec, min;
var counttimer;

var answershown;
var answers;
var nanswers;

var endbutton;
var resetbutton;

function count(){
    sec += 1;
    if(sec >= 60){
	min += 1;
	sec = 0;
    }
    clockdiv.innerHTML = min + ':' + ('00'+sec).substr(-2,2);
    counttimer = setTimeout('count()',1000);
}

function init(){
    titlediv = document.createElement('div');
    titlediv.style.position = 'absolute';
    document.body.appendChild(titlediv);
    
    resetbutton = document.createElement('input');
    resetbutton.type = "button";
    resetbutton.value = '開始';
    resetbutton.style.backgroundColor = '#eee';
    resetbutton.style.width = '20%';
    resetbutton.style.height = '100%';
    resetbutton.style.cssFloat = 'left';
    resetbutton.addEventListener('click',reset,true);
    titlediv.appendChild(resetbutton);
    
    answers = document.createElement('div');
    answers.style.height = '100%';
    answers.style.cssFloat = 'left';
    titlediv.appendChild(answers);
    
    clockdiv = document.createElement('div');
    clockdiv.style.height = '100%';
    clockdiv.style.cssFloat = 'left';
    titlediv.appendChild(clockdiv);
    
    endbutton = document.createElement('input');
    endbutton.type = "button";
    endbutton.value = '終了';
    endbutton.style.backgroundColor = '#eee';
    endbutton.style.width = '20%';
    endbutton.style.height = '100%';
    endbutton.style.cssFloat = 'right';
    endbutton.addEventListener('click',showanswer,true);
    titlediv.appendChild(endbutton);
    
    rects = document.createElement('div');
    rects.style.position = 'absolute';
    document.body.appendChild(rects);
    
    var i,x,y;
    divs1 = new Array(size);
    divs2 = new Array(size);
    for(i=0;i<size;i++){
	divs1[i] = new Array(size);
	divs2[i] = new Array(size);
    }
    for(y=0;y<size;y++){
	for(x=0;x<size;x++){
	    var e = document.createElement('div');
	    e.style.position = 'absolute';
	    e.style.backgroundColor = '#333';
	    rects.appendChild(e);
	    divs1[y][x] = e;
	    
	    var f = document.createElement('div');
	    f.innerHTML = '幹';
	    e.appendChild(f);
	    divs2[y][x] = f;
	}
    }
}

function setsize(){
    var height = window.innerHeight;            // 表示領域の高さ
    var width = window.innerWidth;              // 表示領域の幅
    var titleheight = height * 1/20;            // タイトル高さ
    var framewidth = Math.min(height,width) * 1/40;
    
    //var minsize = Math.min(height-(titleheight*3/2),width);
    var minsize = Math.min(height-(framewidth*2)-(titleheight*3),width-(framewidth*2));
    
    var winsize = minsize;
    
    titlediv.style.top = framewidth+titleheight;
    titlediv.style.left = (width-winsize)/2;
    titlediv.style.width = winsize;
    titlediv.style.height = titleheight;
    
    clockdiv.style.fontSize = titleheight * 6 / 10;
    clockdiv.style.marginLeft = titleheight;
    
    answers.style.fontSize = titleheight * 6 / 10;
    answers.style.marginLeft = titleheight;
    
    resetbutton.style.fontSize = titleheight * 6 / 10;
    endbutton.style.fontSize = titleheight * 6 / 10;
    
    rects.style.top = titleheight + framewidth + titleheight * 2;
    rects.style.left = (width-winsize)/2;
    rects.style.width = winsize;
    rects.style.height = winsize;
    
    var gap = winsize / 180;
    var charsize = (winsize - gap * (size-1)) / size;
    
    var x,y;;
    for(y=0;y<size;y++){
	for(x=0;x<size;x++){
	    var e = divs1[y][x];
	    e.style.width = charsize-gap;
	    e.style.height = charsize-gap;
	    e.style.top = y * charsize + gap * y;
	    e.style.left = x * charsize + gap * x;
	    e.style.backgroundColor = '#555';
	    
	    var f = divs2[y][x];
	    f.style.marginTop = 2;
	    f.style.marginLeft = 6;
	    f.style.fontSize = charsize * 7 / 10;
	    f.style.color = 'white';
	}
    }
    
    chars = new Array(size);
    for(i=0;i<size;i++){
	chars[i] = new Array(size);
    }
}

function rand(n){
    return Math.floor(Math.random() * n);
}

var worddic = [
    "マラソン",
    "ローマ帝国",
    "焼肉定食",
    "弱肉強食",
    "四面楚歌",
    "臥薪嘗胆",
    "天気予報",
    "慶應義塾",
    "天下一品",
    "東海道線",
    "明治神宮",
    "徳川家康",
    "先手必勝",
    "九死一生",
    "起死回生",
    "一発逆転",
    "国士無双",
    "人生劇場",
];
var word = worddic[0];

function calcchars(){
    var i,x,y,s;
    word = worddic[rand(worddic.length)];
    answershown = false;
    
    var words = word.split('');
    wordlen = word.length;
    var count = 0;
    while(count != 1){
	count = 0;
	//
	// ランダムに文字を割り当て
	//
	for(y=0;y<size;y++){
	    for(x=0;x<size;x++){
		/*
		 // これは普通のランダム計算。
		 chars[y][x] = words[rand(wordlen)];
		 */
		// 周囲と異なるものの優先度を上げてみよう
		w = []
		for(i=0;i<wordlen;i++){
		    c = words[i];
		    if(x > 0 && chars[y][x-1] == c){
			w.push(c);
		    }
		    else if(y > 0 && chars[y-1][x] == c){
			w.push(c);
		    }
		    else {
			w.push(c);
			w.push(c);
			w.push(c);
			w.push(c);
			w.push(c);
		    }
		}
		chars[y][x] = w[rand(w.length)];
	    }
	}
	//
	// 文字列にマッチするか検索。あればランダムに置換。
	//
	for(y=0;y<size;y++){
	    for(x=0;x<size-wordlen;x++){
		s = '';
		for(i=0;i<wordlen;i++){
		    s += chars[y][x+i];
		}
		if(word == s){ // 一致するものがみつかったら再計算
		    count = -1;
		    for(i=0;i<wordlen;i++){
			chars[y][x+i] = words[rand(wordlen)];
		    }
		}
	    }
	}
	for(y=0;y<size-wordlen;y++){
	    for(x=0;x<size;x++){
		s = '';
		for(i=0;i<wordlen;i++){
		    s += chars[y+i][x];
		}
		if(word == s){ // 一致するものがみつかったら再計算
		    count = -1;
		    for(i=0;i<wordlen;i++){
			chars[y+i][x] = words[rand(wordlen)];
		    }
		}
	    }
	}
	if(count == 0){ // 一致するものがみつからなかったとき
	    //
	    //ランダムな場所に正しい文字列を埋め込む
	    //
	    if(rand(2) == 0){
		direction = 'x';
		startx = rand(size-wordlen);
		starty = rand(size);
		for(i=0;i<wordlen;i++){
		    chars[starty][startx+i] = words[i];
		}
	    }
	    else {
		direction = 'y';
		startx = rand(size);
		starty = rand(size-wordlen);
		for(i=0;i<wordlen;i++){
		    chars[starty+i][startx] = words[i];
		}
	    }
	    // 正解をクリックすると次の問題へ
	    for(y=0;y<size;y++){
		for(x=0;x<size;x++){
		    divs2[y][x].removeEventListener('click',correctanswer, true);
		}
	    }
	    if(direction == 'x'){
		for(i=0;i<4;i++){
		    divs2[starty][startx+i].addEventListener('click',correctanswer, true);
		}
	    }
	    else {
		for(i=0;i<4;i++){
		    divs2[starty+i][startx].addEventListener('click',correctanswer, true);
		}
	    }
	    //
	    // ユニークかどうか検証
	    for(y=0;y<size;y++){
		for(x=0;x<size-wordlen;x++){
		    s = '';
		    for(i=0;i<wordlen;i++){
			s += chars[y][x+i];
		    }
		    if(word == s){
			count += 1;
		    }
		}
	    }
	    for(y=0;y<size-wordlen;y++){
		for(x=0;x<size;x++){
		    s = '';
		    for(i=0;i<wordlen;i++){
			s += chars[y+i][x];
		    }
		    if(word == s){
			count += 1;
		    }
		}
	    }
	}
    }
}

function display(){
    var i,x,y;
    
    answers.innerHTML = answered + "問正解";
    
    var height = window.innerHeight;
    var width = window.innerWidth;
    var winsize = Math.min(height,width);
    // alert("height="+height+", width="+width);
    var charsize = Math.floor(winsize / size / 2);
    
    for(var y=0;y<size;y++){
	for(var x=0;x<size;x++){
	    divs2[y][x].innerHTML = chars[y][x];
	    divs2[y][x].style.color = 'white';
	}
    }
}

function showanswer(){
    var i;
    if(direction == 'x'){
	for(i=0;i<wordlen;i++){
	    divs2[starty][startx+i].style.color = 'yellow';
	}
    }
    else {
	for(i=0;i<wordlen;i++){
	    divs2[starty+i][startx].style.color = 'yellow';
	}
    }
    clearTimeout(counttimer);
    answershown = true;
}

function correctanswer(){
    if(! answershown){
	answered += 1;
	calcchars();
	display();
    }
}

function reset(){
    min = 0;
    sec = 0;
    clockdiv.innerHTML = "0:00";
    clearTimeout(counttimer);
    counttimer = setTimeout('count()',1000);
    answered = 0;
    answershown = false;
    calcchars();
    display();
}

init();
setsize();
reset();

