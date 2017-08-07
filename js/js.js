var apikey = 'AIzaSyCEMvSla0D7zaxmLrrWa46XXNN0m4bTJgk';
var listVideo = new Array;

var timerGlobal;
function loadPage(){
	timerGlobal = setTimeout(function timerGlobalTick() {
					getStat();
					timerGlobal = setTimeout(timerGlobalTick, 8000);
					},8000);
	var timerIniCanvas = setTimeout(function timerIniCanvasTick() {
					if(!setCanvasSize())
						timerIniCanvas = setTimeout(timerIniCanvasTick, 200);
					else
						ini();
					},200);
	var timerCurTime = setTimeout(function timerCurTimeTick() {	//4 июля 2017 года
					var curDate = new Date();
					var options = {year: 'numeric', month: 'long', day: 'numeric', timezone: 'UTC', hour: 'numeric',  minute: 'numeric', second: 'numeric' };					
					var str = titleStr + " за "+curDate.toLocaleString("ru", options)+titleEnd;
					document.getElementById("title").innerHTML = str;
					timerIniCanvas = setTimeout(timerCurTimeTick, 200);					
					},200);
	/*var timerSave = setTimeout(function timerSaveTick() {
					saveChartTick();
					timerSave = setTimeout(timerSaveTick, 60000);
					},60000);*/
	
	//createWebSocket();
}
function ini(){
	//localStorage.removeItem("listVideo"); return;
	
	/*document.getElementById("graphContainer_plus").globalAlpha = 0;
	document.getElementById("graphContainer_minus").globalAlpha = 0;
	document.getElementById("graphContainer_absolute").globalAlpha = 0;*/
	
	//document.getElementById("streamColor").value = '#000';
	/*if(localStorage["listVideo"])
		listVideo = JSON.parse(localStorage["listVideo"]);
	if(localStorage["streamKey"])
		document.getElementById("streamKey").value = localStorage["streamKey"]*/
	iniListVideo();
	window.onresize = function(event) {
		setCanvasSize();		
		drawChart();
	};
}
function iniListVideo(){
	listVideo = new Array;
	listVideo[0] = new Object;
	listVideo[0].url = "iqsc_fWFw10";
	listVideo[0].name = "ВОЛОДИН ВЯЧЕСЛАВ ВИКТОРОВИЧ";
	listVideo[0].col = '#' + ((Math.random() * 0x1000000) | 0x1000000).toString(16).substr(1);
	listVideo[1] = new Object;
	listVideo[1].url = "mW6Ok-NEZgY";
	listVideo[1].name = "ЖИРИНОВСКИЙ ВЛАДИМИР ВОЛЬФОВИЧ";
	listVideo[1].col = '#' + ((Math.random() * 0x1000000) | 0x1000000).toString(16).substr(1);
	listVideo[2] = new Object;
	listVideo[2].url = "9RftoFlXKgk";
	listVideo[2].name = "ЗЮГАНОВ ГЕННАДИЙ АНДРЕЕВИЧ";
	listVideo[2].col = '#' + ((Math.random() * 0x1000000) | 0x1000000).toString(16).substr(1);
	listVideo[3] = new Object;
	listVideo[3].url = "1gHVqD9tLgw";
	listVideo[3].name = "КАСЬЯНОВ МИХАИЛ МИХАЙЛОВИЧ";
	listVideo[3].col = '#' + ((Math.random() * 0x1000000) | 0x1000000).toString(16).substr(1);
	listVideo[4] = new Object;
	listVideo[4].url = "EZLRQLxWnTQ";
	listVideo[4].name = "МАЛЬЦЕВ ВЯЧЕСЛАВ ВЯЧЕСЛАВОВИЧ";
	listVideo[4].col = '#' + ((Math.random() * 0x1000000) | 0x1000000).toString(16).substr(1);
	listVideo[5] = new Object;
	listVideo[5].url = "QIguxHfX7TY";
	listVideo[5].name = "МЕДВЕДЕВ ДМИТРИЙ АНАТОЛЬЕВИЧ";
	listVideo[5].col = '#' + ((Math.random() * 0x1000000) | 0x1000000).toString(16).substr(1);
	listVideo[6] = new Object;
	listVideo[6].url = "3myt_pJVpy4";
	listVideo[6].name = "МИРОНОВ СЕРГЕЙ МИХАЙЛОВИЧ";
	listVideo[6].col = '#' + ((Math.random() * 0x1000000) | 0x1000000).toString(16).substr(1);
	listVideo[7] = new Object;
	listVideo[7].url = "SB7tXrAmHnw";
	listVideo[7].name = "НАВАЛЬНЫЙ АЛЕКСЕЙ АНАТОЛЬЕВИЧ";
	listVideo[7].col = '#' + ((Math.random() * 0x1000000) | 0x1000000).toString(16).substr(1);
	listVideo[8] = new Object;
	listVideo[8].url = "rgGaAfkjTN0";
	listVideo[8].name = "ПУТИН ВЛАДИМИР ВЛАДИМИРОВИЧ";
	listVideo[8].col = '#' + ((Math.random() * 0x1000000) | 0x1000000).toString(16).substr(1);
	listVideo[9] = new Object;
	listVideo[9].url = "nssj0wVkmCM";
	listVideo[9].name = "СОБЯНИН СЕРГЕЙ СЕМЕНОВИЧ";
	listVideo[9].col = '#' + ((Math.random() * 0x1000000) | 0x1000000).toString(16).substr(1);
	listVideo[10] = new Object;
	listVideo[10].url = "tfsp8lX2ZAw";
	listVideo[10].name = "ХОДОРКОВСКИЙ МИХАИЛ БОРИСОВИЧ";
	listVideo[10].col = '#' + ((Math.random() * 0x1000000) | 0x1000000).toString(16).substr(1);
	listVideo[11] = new Object;
	listVideo[11].url = "UJGmE9rg15M";
	listVideo[11].name = "ЯВЛИНСКИЙ ГРИГОРИЙ АЛЕКСЕЕВИЧ";
	listVideo[11].col = '#' + ((Math.random() * 0x1000000) | 0x1000000).toString(16).substr(1);
}
function setCanvasSize() {
	var canvas = document.getElementById("graphContainer_plus");
	if(canvas == null)
		return false;
	var c_m = document.getElementById("graphContainer_minus");
	var c_a = document.getElementById("graphContainer_absolute");	
	//var t = document.getElementById("tableGraph");
	c_a.width = c_m.width = canvas.width = window.innerWidth;//parseInt(window.getComputedStyle(document.body).width);
	c_a.height = c_m.height = canvas.height = window.innerHeight - 100;// parseInt(window.getComputedStyle(document.body).height) - 150;
	return true;
}

function getStat(){
	if(listVideo== undefined || listVideo.length<=0)
		return;
	var _list = '';
	for(var i=0;i<listVideo.length;i++){
		var zpt = ",";
		if(i==listVideo.length-1)
			zpt = '';
		_list = _list + listVideo[i].url + zpt;
	}
	
	$.ajax({url: "https://www.googleapis.com/youtube/v3/videos?part=statistics&id="+_list+"&key="+apikey, type: "GET", async: true, 
	success: function(data){ 
				//var data = JSON.parse(_data);	
				var ar = data.items;
				for(var i=0;i<ar.length;i++){
					listVideo[i].likeCount =  parseInt(ar[i].statistics.likeCount);
					listVideo[i].dislikeCount =  parseInt(ar[i].statistics.dislikeCount);
					listVideo[i].viewCount = parseInt(ar[i].statistics.viewCount);				
					/*listVideo[i].likeCount[listVideo[i].likeCount.length] = ar[i].statistics.likeCount;
					listVideo[i].dislikeCount[listVideo[i].dislikeCount.length] = ar[i].statistics.dislikeCount;
					if(listVideo[i].likeCount.length>10)
						listVideo[i].likeCount.splice(0, 1)
					if(listVideo[i].dislikeCount.length>10)
						listVideo[i].dislikeCount.splice(0, 1)*/
				}
				drawChart();
				//saveChartTick();
			},
			error:function(data){			
			}								
		})
}
function saveChartTick(){
	var _key =  document.getElementById("streamKey").value;
	var _date =  Math.floor(new Date() / 1000);
		
	if(_key=="" || _key==document.getElementById("streamKey").defaultValue || listVideo==null || listVideo == undefined || listVideo == '' || listVideo.length==0)
		return;
	
	var ar = new  Array;
	for (var i=0;i<listVideo.length;i++){
		ar[i] = new Object;
		ar[i].likeCount = listVideo[i].likeCount;
		ar[i].dislikeCount = listVideo[i].dislikeCount;
		ar[i].viewCount = listVideo[i].viewCount;
	}
	
	var _info =  JSON.stringify(ar);
	//return;
	
	$.ajax({url: "http://everybodymail.com/youtube/php/tick_save.php",type: "POST", async: true, data: {key_stream:_key,date:_date,info:_info},
	success: function(data){ 				
			//	alert(data);				
			},
			error:function(data){			
				//alert(data);
			}								
		})
}
function drawChart(){
	var _html = '';
	for(var i=0;i<listVideo.length;i++){
		var ar = listVideo[i].name.split(" ");
		_html = _html + "<div class='chartNameContainer'><div class='chartNameCol' style='background-color:"+listVideo[i].col+"'></div><div class='chartNameName'>"+ar[0]+"<span>"+ar[1] + " " + ar[2]+"</span></div></div>";
	}
	document.getElementById("chartName").innerHTML = _html;
	//drawPlus();
	//drawMinus();
	//drawAbsolute();
	/*switch(curViewIndex){
		case 0:
			curViewIndex=1;
			drawPlus();
			break;
		case 1:
			curViewIndex=2;
			drawMinus();
			break;
		case 2:
			curViewIndex=0;
			drawAbsolute();
			break;
	}*/
	transition();
}
var curViewIndex=0;
function transition(){
	var canvas1;
	var canvas2;
	drawPlus();
	drawMinus();
	drawAbsolute();
	switch(curViewIndex){
		case 0:
			curViewIndex=1;
			canvas1 = document.getElementById("graphContainer_plus");
			canvas2 = document.getElementById("graphContainer_minus");
			titleStr="Рейтинг (-)";
			titleEnd = " (в % от общего числа ЛАЙКОВ)";
			break;
		case 1:
			curViewIndex=2;
			canvas1 = document.getElementById("graphContainer_minus");
			canvas2 = document.getElementById("graphContainer_absolute");
			titleStr="Рейтинг (просмотры)";
	titleEnd = "";
			break;
		case 2:
			curViewIndex=0;
			canvas1 = document.getElementById("graphContainer_absolute");
			canvas2 = document.getElementById("graphContainer_plus");	
			titleStr="Рейтинг (+)";
			titleEnd = " (в % от общего числа ЛАЙКОВ)";		
			break;
	}
	canvas1.style.opacity = 1;
	canvas2.style.opacity = 0;
	var al1=1;
	var al2=0;
	/*canvas1.width = window.innerWidth;
	canvas2.width = 0;
	var dir = -1;*/
	var timer = setTimeout(function timerTick() {
					al1 = al1-0.1;
					al2 = al2+0.1;
					if(al1>0){
						canvas1.style.opacity = al1;
						canvas2.style.opacity = al2;			
						timer = setTimeout(timerTick, 10);
					}	
					/*var isRun = true;			
					if(dir==-1){
						var wh = canvas1.width - 100;
						if(wh>=0)
							canvas1.width = wh;
						else
							dir = 1;
					}else{
						var wh = canvas2.width + 100;
						if(wh<=window.innerWidth)
							canvas2.width = wh;
						else
							isRun = false;
						
					} 
					if(isRun)
						timer = setTimeout(timerTick, 10);					*/
	},10);
}
function drawPlus(){
	//titleStr="Рейтинг (+)";
	//titleEnd = " (в % от общего числа ЛАЙКОВ)";
	var c = document.getElementById("graphContainer_plus");
	var c_m = document.getElementById("graphContainer_minus");
	var c_a = document.getElementById("graphContainer_absolute");
	/*c.style.display = "block";
	c_m.style.display = "none";
	c_a.style.display = "none";*/
	var sumLikeCount=0;
	var R = Math.min(c.width,c.height)*0.4;
	var cx = c.width*0.5;
	var cy = c.height*0.5;
	for(var i=0;i<listVideo.length;i++){		
		sumLikeCount = sumLikeCount + parseInt(listVideo[i].likeCount);
		if(listVideo[i].likeCount==0)
			listVideo[i].likeCount =1;
		if(sumLikeCount==0)
			sumLikeCount=1;
	}
	for(var i=0;i<listVideo.length;i++){
		listVideo[i].ratio = ((listVideo[i].likeCount/sumLikeCount)*100).toFixed(1);
	}
	if (c.getContext){
		var ctx = c.getContext("2d");
		ctx.clearRect(0, 0, c.width, c.height);
		var lastAngle =0;
		for(var i=0;i<listVideo.length;i++){	
			ctx.beginPath();
			ctx.strokeStyle = "#fff";
			ctx.lineWidth = 2;
			var angle = 2*Math.PI*(parseInt(listVideo[i].likeCount)/sumLikeCount);
			ctx.moveTo(cx,cy);
			ctx.arc(cx,cy,R,lastAngle,angle+lastAngle);
			//ctx.lineTo(cx,cy);
			ctx.closePath();
			//ctx.stroke();
			ctx.fillStyle = listVideo[i].col;
		    ctx.fill();
			ctx.stroke();
			
			if(parseInt(listVideo[i].ratio)>4){
				ctx.font = "bold "+ parseInt(R*0.07)+"pt Tahoma";
				ctx.fillStyle = "#fff";
				ctx.textAlign = "center";			
				ctx.fillText(listVideo[i].ratio,cx+(R-46)*Math.cos(lastAngle+angle*0.5), cy+(R-30)*Math.sin(lastAngle+angle*0.5)); 
			}
			
			lastAngle = angle + lastAngle;			
		}		
	}
}
var titleStr="Рейтинг (+)";
var titleEnd = " (в % от общего числа ЛАЙКОВ)";	
function drawMinus(){
	//titleStr="Рейтинг (-)";
	//titleEnd = " (в % от общего числа ЛАЙКОВ)";
	var c = document.getElementById("graphContainer_plus");
	var c_m = document.getElementById("graphContainer_minus");
	var c_a = document.getElementById("graphContainer_absolute");
	/*c.style.display = "none";
	c_m.style.display = "block";
	c_a.style.display = "none";*/
	var sumDisCount=0;
	var R = Math.min(c.width,c.height)*0.4;
	var cx = c.width*0.5;
	var cy = c.height*0.5;
	for(var i=0;i<listVideo.length;i++){		
		sumDisCount = sumDisCount + parseInt(listVideo[i].dislikeCount);
		if(listVideo[i].dislikeCount==0)
			listVideo[i].dislikeCount =1;
		if(sumDisCount==0)
			sumDisCount=1;
	}
	for(var i=0;i<listVideo.length;i++){
		listVideo[i].ratio = ((listVideo[i].dislikeCount/sumDisCount)*100).toFixed(1);
	}
	if (c.getContext){
		var ctx = c_m.getContext("2d");
		ctx.clearRect(0, 0, c_m.width, c_m.height);
		var lastAngle =0;
		for(var i=0;i<listVideo.length;i++){	
			ctx.beginPath();
			ctx.strokeStyle = "#fff";
			ctx.lineWidth = 2;
			var angle = 2*Math.PI*(parseInt(listVideo[i].dislikeCount)/sumDisCount);
			ctx.moveTo(cx,cy);
			ctx.arc(cx,cy,R,lastAngle,angle+lastAngle);
			//ctx.lineTo(cx,cy);
			ctx.closePath();
			//ctx.stroke();
			ctx.fillStyle = listVideo[i].col;
		    ctx.fill();
			ctx.stroke();
			
			if(parseInt(listVideo[i].ratio)>4){
				ctx.font = "bold "+ parseInt(R*0.07)+"pt Tahoma";
				ctx.fillStyle = "#fff";
				ctx.textAlign = "center";			
				ctx.fillText(listVideo[i].ratio,cx+(R-46)*Math.cos(lastAngle+angle*0.5), cy+(R-30)*Math.sin(lastAngle+angle*0.5)); 
			}
			
			lastAngle = angle + lastAngle;			
		}		
	}
}
function drawAbsolute(){
	//titleStr="Рейтинг (просмотры)";
	//titleEnd = "";
	var c = document.getElementById("graphContainer_plus");
	var c_m = document.getElementById("graphContainer_minus");
	var c_a = document.getElementById("graphContainer_absolute");
	/*c.style.display = "none";
	c_m.style.display = "none";
	c_a.style.display = "block";*/
	var maxViewCount=0;
	var R = Math.min(c_m.width,c_m.height)*0.4;
	var cx = c_a.width*0.5;
	var cy = c_a.height*0.5;
	for(var i=0;i<listVideo.length;i++){				
		if(listVideo[i].viewCount>maxViewCount)
			maxViewCount = listVideo[i].viewCount;
	}
	for(var i=0;i<listVideo.length;i++){
		listVideo[i].ratio = listVideo[i].viewCount/maxViewCount;
	}
	if (c.getContext){
		var ctx = c_a.getContext("2d");
		ctx.clearRect(0, 0, c_a.width, c_a.height);		
		var wX = (c_a.width-100)/(2*listVideo.length);
		var wY = (c_a.height-150);
		var curX = 50 + wX*0.5;
		var curY = c_a.height-50;
		for(var i=0;i<listVideo.length;i++){	
			ctx.beginPath();
			ctx.strokeStyle = "#fff";
			ctx.lineWidth = 2;
			var curwY = wY * listVideo[i].ratio;
			ctx.fillStyle = listVideo[i].col;
		    ctx.fill();
			ctx.fillRect(curX, curY-curwY, wX, curwY);	
			ctx.closePath();			
			ctx.stroke();						
			
			ctx.font = "bold "+ parseInt(R*0.07)+"pt Tahoma";
			ctx.fillStyle = listVideo[i].col;
			ctx.textAlign = "center";			
			ctx.fillText(listVideo[i].viewCount,curX+wX*0.5,curY-curwY-5); 
			
			curX = curX + 2*wX
		}		
	}
}

//service
function getYoutubeIdByUrl( url ){
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  var match = url.match(regExp);
  
  if(match&&match[7].length==11){ 
    return match[7];
  }
  
  return false;
};
function getElementStream(_str){
	for(var i=0;i<listVideo.length;i++){
		if(listVideo[i].url == _str)
			return i;
	}
	return -1;
}
function addGraph(){
	var val = document.getElementById("streamUrl").value;
	var url = getYoutubeIdByUrl(val);
	if(url){
		var _index = getElementStream(url);
		if(_index<0){
			var o = new Object;
			o.url = url;
			o.likeCount = 0;//new Array;for(var i=0;i<10;i++){o.likeCount[i] = 0;}
			o.dislikeCount = 0;//new Array;for(var i=0;i<10;i++){o.dislikeCount[i] = 0;}	
			o.name = document.getElementById("streamLabel").value;
			o.col = document.getElementById("streamColor").value;//"#"+((1<<24)*Math.random()|0).toString(16);
			if(listVideo== undefined)
				listVideo = new Array;		
			listVideo[listVideo.length] = o;
		}else{
			listVideo[_index].url = url;
			listVideo[_index].name = document.getElementById("streamLabel").value;
			listVideo[_index].col = document.getElementById("streamColor").value;
		}
	}
	document.getElementById("streamUrl").value = 'url';
	document.getElementById("streamLabel").value = 'имя';
	document.getElementById("streamColor").value = '#000';
	drawChart();
	localStorage["listVideo"] = JSON.stringify(listVideo);
}
function delGraph(){
	var val = document.getElementById("streamUrl").value;
	var url = getYoutubeIdByUrl(val);
	if(url){
		var _index = getElementStream(url);
		if(_index>=0){
			listVideo.splice(_index,1);
			document.getElementById("streamUrl").value = 'url';
			document.getElementById("streamLabel").value = 'имя';
			document.getElementById("streamColor").value = '#000';
			drawChart();
			localStorage["listVideo"] = JSON.stringify(listVideo);
		}
	}
}

//utils
function inptOnFocus(_id, str){
	if(document.getElementById(_id).value == str)
		document.getElementById(_id).value ='';
}
function inptOnFocus(_id, str){
	if(document.getElementById(_id).value == str)
		document.getElementById(_id).value ='';
}

function chartNameColClick(index){
	var o = listVideo[index];
	document.getElementById("streamUrl").value = "https://www.youtube.com/watch?v="+o.url;
	document.getElementById("streamLabel").value = o.name;
	document.getElementById("streamColor").value = o.col;
}
function showControl(){
	if(document.getElementById("control").style.display=="none"){
		document.getElementById("ctrl").innerHTML = "&#709;";
		document.getElementById("control").style.display="block";
	}else{
		document.getElementById("ctrl").innerHTML = "&#708;";
		document.getElementById("control").style.display="none";
	}	
}
function streamKeyAction(){
	var s = document.getElementById("streamKey").value;
	localStorage["streamKey"] = s;//JSON.stringify(listVideo);
}














///////////////////////
var maxDelta = 0;
function drawChart1(){
	var canvas = document.getElementById("graphContainer");
	if (canvas.getContext){
		var ctx = canvas.getContext("2d");

		for(var i=0;i<listVideo.length;i++){
			var ar = new Array;
			for(var j=0;j<listVideo[i].likeCount.length;j++){
				ar[j] = new Object;
				ar[j].x = 100+j*10;
				ar[j].y = listVideo[i].likeCount[j] - listVideo[i].dislikeCount[j];
				if(ar[j].y>maxDelta)
					maxDelta = ar[j].y
			}
			listVideo[i].point = ar;
		}
		var procent = maxDelta/100;
		for(var i=0;i<listVideo.length;i++){
			var ar = new Array;
			for(var j=0;j<listVideo[i].point.length;j++){
				ar[j] = listVideo[i].point[j];
				ar[j].y = listVideo[i].point[j].y/procent;
			}
			var path = listVideo[i].path;
			if(path==null){
				path = new Path2D();
				path.lineWidth = 2;
				path.strokeStyle = "blue";
				path.closed = false;				
				listVideo[i].path = path;
			}
			//ctx.beginPath();
			
			
			path.moveTo(ar.x,ar.y);
			var m = 0;
            var dx1 = 0;
            var dy1 = 0;
			
			var f = 0.3;
			var t = 1;

            var preP = ar[0];
            for (var k = 1; k < ar.length; k++) {
                var curP = ar[k];
                var nexP = ar[k + 1];
                if (!nexP) {
                   nexP = curP;
                } 
				m = gradient(preP, nexP);
                dx2 = (nexP.x - curP.x) * -f;
                dy2 = dx2 * m * t;
                path.bezierCurveTo(preP.x - dx1, preP.y - dy1, curP.x + dx2, curP.y + dy2, curP.x, curP.y);
                dx1 = dx2;
                dy1 = dy2;
                preP = curP;
            }
            ctx.stroke(path);
		}
		/*context.beginPath();
		context.moveTo(10, 10);
		context.lineTo(450, 50);
		context.lineWidth = 15;
		context.strokeStyle = "#ff0000";
		context.lineCap = "round";
		context.stroke();*/
	}
	else {
		alert('Ваш браузер не поддерживает canvas')
	}
}
function gradient(a, b) {
	return (b.y-a.y)/(b.x-a.x);
}


////websocket
var socket;
function onConnection() {
	console.log("onConnection");
	/*if (_name!=null) {
		var data = ["onIdentification", _name];
		data = JSON.stringify(data);
		socket.send(data);
	}*/
	var o = new Object;
	o.person = new Object;
	o.person.name = "test";
	o.person.data = "436";
	send("setData",o);
}
// Disconnection handler
function onDisconnection() { 
	console.log("onDisconnection");
}
// Socket connector
function createWebSocket() {
	host = "ws://217.79.179.34:8090";
	
	if(window.MozWebSocket)
		window.WebSocket=window.MozWebSocket;
	if(!window.WebSocket) {
		alert("Your browser don't support webSocket!");
		return false;
	}
	
	socket = new WebSocket(host);
	socket.onopen = onConnection;
	socket.onclose = onDisconnection;
	//socket.onerror = function() { document.getElementById("error").value = 'An error occurs'; }
	//socket.onmessage = onMessage;
	socket.onData = onData;
	return true;
}
 // Send message event
function send(hundler,_data) {
//	sendMessage(["onPoolAdd", _poolSize])
	var data = [hundler,"index",_data];
	if (data!="") {
		data = JSON.stringify(data);
		socket.send(data);
	}
}
function onEvent(e, nameUser) {
	switch(e) {
			case "connection":
				console.log("onEvent->connection - "+nameUser);
				send("onMessage","start");
			break;
			case "disconnection":
				console.log("onEvent->disconnection - "+nameUser);
			break;
			case "setData":
				console.log("onEvent->setData - " +nameUser);
			break;	
	}
}
function onData(msg){
	var data;
	try { //tente de parser data
            data = JSON.parse(msg.data);
        } catch(exception) {
            data = msg.data;
        }  
	console.log("onData - " + data);
	/*switch(event) {
		case "getData":
				trace("onEvent->getData - " +keyIndex + " - " + dataSet);
			break;
		case "setData":
			trace("onEvent->setData - " +keyIndex + " - " + dataSet);
			break;
	}*/		
}
function onReception(_prompt, message) {
	console.log(_prompt + " | " + message);
}

		
		
		/*for(var i=0;i<listVideo.length;i++){
			var ar = new Array;
			var path = listVideo[i].path;
			if(path==null){
				path = new Path2D();	
				path.lineWidth = 2;
				path.strokeStyle = "blue";							
				listVideo[i].path = path;
			}						
			path.arc(95*Math.random(),50,40,0,Math.PI);
			ctx.stroke(path);
		}*/	