var apikey = 'AIzaSyC8bAzJu8qBP1kTpg8QOwf4W5RQCLhHxtg';
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
}
function ini(){
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
	listVideo[0].col = '#dd4477';// + ((Math.random() * 0x1000000) | 0x1000000).toString(16).substr(1);
	listVideo[1] = new Object;
	listVideo[1].url = "mW6Ok-NEZgY";
	listVideo[1].name = "ЖИРИНОВСКИЙ ВЛАДИМИР ВОЛЬФОВИЧ";
	listVideo[1].col = '#109618';// + ((Math.random() * 0x1000000) | 0x1000000).toString(16).substr(1);
	listVideo[2] = new Object;
	listVideo[2].url = "9RftoFlXKgk";
	listVideo[2].name = "ЗЮГАНОВ ГЕННАДИЙ АНДРЕЕВИЧ";
	listVideo[2].col = '#dc3912';// + ((Math.random() * 0x1000000) | 0x1000000).toString(16).substr(1);
	listVideo[3] = new Object;
	listVideo[3].url = "1gHVqD9tLgw";
	listVideo[3].name = "КАСЬЯНОВ МИХАИЛ МИХАЙЛОВИЧ";
	listVideo[3].col = '#994499';// + ((Math.random() * 0x1000000) | 0x1000000).toString(16).substr(1);
	listVideo[4] = new Object;
	listVideo[4].url = "EZLRQLxWnTQ";
	listVideo[4].name = "МАЛЬЦЕВ ВЯЧЕСЛАВ ВЯЧЕСЛАВОВИЧ";
	listVideo[4].col = '#66aa00';// + ((Math.random() * 0x1000000) | 0x1000000).toString(16).substr(1);
	listVideo[5] = new Object;
	listVideo[5].url = "QIguxHfX7TY";
	listVideo[5].name = "МЕДВЕДЕВ ДМИТРИЙ АНАТОЛЬЕВИЧ";
	listVideo[5].col = '#0099c6';// + ((Math.random() * 0x1000000) | 0x1000000).toString(16).substr(1);
	listVideo[6] = new Object;
	listVideo[6].url = "3myt_pJVpy4";
	listVideo[6].name = "МИРОНОВ СЕРГЕЙ МИХАЙЛОВИЧ";
	listVideo[6].col = '#22aa99';// + ((Math.random() * 0x1000000) | 0x1000000).toString(16).substr(1);
	listVideo[7] = new Object;
	listVideo[7].url = "SB7tXrAmHnw";
	listVideo[7].name = "НАВАЛЬНЫЙ АЛЕКСЕЙ АНАТОЛЬЕВИЧ";
	listVideo[7].col = '#990099';// + ((Math.random() * 0x1000000) | 0x1000000).toString(16).substr(1);
	listVideo[8] = new Object;
	listVideo[8].url = "rgGaAfkjTN0";
	listVideo[8].name = "ПУТИН ВЛАДИМИР ВЛАДИМИРОВИЧ";
	listVideo[8].col = '#3366cc';// + ((Math.random() * 0x1000000) | 0x1000000).toString(16).substr(1);
	listVideo[9] = new Object;
	listVideo[9].url = "nssj0wVkmCM";
	listVideo[9].name = "СОБЯНИН СЕРГЕЙ СЕМЕНОВИЧ";
	listVideo[9].col = '#ff9900';// + ((Math.random() * 0x1000000) | 0x1000000).toString(16).substr(1);
	listVideo[10] = new Object;
	listVideo[10].url = "tfsp8lX2ZAw";
	listVideo[10].name = "ХОДОРКОВСКИЙ МИХАИЛ БОРИСОВИЧ";
	listVideo[10].col = '#b82e2e';// + ((Math.random() * 0x1000000) | 0x1000000).toString(16).substr(1);
	listVideo[11] = new Object;
	listVideo[11].url = "UJGmE9rg15M";
	listVideo[11].name = "ЯВЛИНСКИЙ ГРИГОРИЙ АЛЕКСЕЕВИЧ";
	listVideo[11].col = '#316395';// + ((Math.random() * 0x1000000) | 0x1000000).toString(16).substr(1);
}
function setCanvasSize() {
	var canvas = document.getElementById("graphContainer_plus");
	if(canvas == null)
		return false;
	var c_m = document.getElementById("graphContainer_minus");
	var c_a = document.getElementById("graphContainer_absolute");
	c_a.width = c_m.width = canvas.width = window.innerWidth;
	c_a.height = c_m.height = canvas.height = window.innerHeight - 100;
	return true;
}

function getStat(){
	if(listVideo== undefined || listVideo.length<=0)
		return;
	var _list = '';
	listVideo.sort(compareName);
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
				var _lv = listVideo;
				listVideo.sort(compareName);				
				for(var i=0;i<ar.length;i++){
					listVideo[i].likeCount =  parseInt(ar[i].statistics.likeCount);
					listVideo[i].dislikeCount =  parseInt(ar[i].statistics.dislikeCount);
					listVideo[i].viewCount = parseInt(ar[i].statistics.viewCount);
					listVideo[i].delta = parseInt(ar[i].statistics.likeCount) - parseInt(ar[i].statistics.dislikeCount);						
				}
				drawChart();
			},
			error:function(data){			
			}								
		})
}
function sortChart(){	
	listVideo.sort(compareName);	
	switch(curViewIndex){
		case 0:
			listVideo.sort(compareDislikeCount);
			break;
		case 1:
			listVideo.sort(compareDeltaCount);
			break;
		case 2:
			listVideo.sort(compareLikeCount);
			break;
	}
}
function compareName(a, b){
	if (a.name > b.name) return 1;
	if (a.name < b.name) return -1;	
}
function compareDislikeCount(a, b){
	if (parseInt(a.dislikeCount) < parseInt(b.dislikeCount)) return 1;
	if (parseInt(a.dislikeCount) > parseInt(b.dislikeCount)) return -1;	
}
function compareViewCount(a, b){
	if (parseInt(a.viewCount) < parseInt(b.viewCount)) return 1;
	if (parseInt(a.viewCount) > parseInt(b.viewCount)) return -1;
}
function compareLikeCount(a, b){
	if (parseInt(a.likeCount) < parseInt(b.likeCount)) return 1;
	if (parseInt(a.likeCount) > parseInt(b.likeCount)) return -1;
}
function compareDeltaCount(a, b){
	if (parseInt(a.delta) < parseInt(b.delta)) return 1;
	if (parseInt(a.delta) > parseInt(b.delta)) return -1;
}

function drawChart(){
	sortChart();
	var _html = '';
	for(var i=0;i<listVideo.length;i++){
		var ar = listVideo[i].name.split(" ");
		_html = _html + "<div class='chartNameContainer'><div class='chartNameCol' style='background-color:"+listVideo[i].col+"'></div><div class='chartNameName'>"+ar[0]+"<span>"+ar[1] + " " + ar[2]+"</span></div></div>";
	}
	document.getElementById("chartName").innerHTML = _html;
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
			canvas1 = document.getElementById("graphContainer_plus");
			canvas2 = document.getElementById("graphContainer_minus");
			titleStr="Рейтинг (-)";
			titleEnd = " (в % от общего числа ДИЗЛАЙКОВ)";
			break;
		case 1:			
			canvas1 = document.getElementById("graphContainer_minus");
			canvas2 = document.getElementById("graphContainer_absolute");
			titleStr="Рейтинг (ЛАЙКИ-ДИЗЛАЙКИ)";
	titleEnd = "";
			break;
		case 2:			
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

	var timer = setTimeout(function timerTick() {
					al1 = al1-0.1;
					al2 = al2+0.1;
					if(al1>0){
						canvas1.style.opacity = al1;
						canvas2.style.opacity = al2;			
						timer = setTimeout(timerTick, 10);
					}else{
						switch(curViewIndex){
							case 0:
								curViewIndex=1;
								break;
							case 1:
								curViewIndex=2;
								break;
							case 2:
								curViewIndex=0;
								break;
						}
					}
	},10);
}
function drawPlus(){
	var c = document.getElementById("graphContainer_plus");
	var c_m = document.getElementById("graphContainer_minus");
	var c_a = document.getElementById("graphContainer_absolute");
	var sumLikeCount=0;
	var R = Math.min(c.width,c.height)*0.4;
	var cx = c.width*0.5;
	var cy = c.height*0.5;
	for(var i=0;i<listVideo.length;i++){		
		sumLikeCount = sumLikeCount + parseInt(listVideo[i].likeCount);
		//if(listVideo[i].likeCount==0)
			//listVideo[i].likeCount =1;
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
				ctx.fillText(listVideo[i].ratio,cx+(R-46)*Math.cos(lastAngle+angle*0.5), cy+(R-46)*Math.sin(lastAngle+angle*0.5)); 
			}
			
			lastAngle = angle + lastAngle;			
		}		
	}
}
var titleStr="Рейтинг (+)";
var titleEnd = " (в % от общего числа ЛАЙКОВ)";	
function drawMinus(){
	var c = document.getElementById("graphContainer_plus");
	var c_m = document.getElementById("graphContainer_minus");
	var c_a = document.getElementById("graphContainer_absolute");
	var sumDisCount=0;
	var R = Math.min(c.width,c.height)*0.4;
	var cx = c.width*0.5;
	var cy = c.height*0.5;
	for(var i=0;i<listVideo.length;i++){		
		sumDisCount = sumDisCount + parseInt(listVideo[i].dislikeCount);
		//if(listVideo[i].dislikeCount==0)
			//listVideo[i].dislikeCount =1;
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
				ctx.fillText(listVideo[i].ratio,cx+(R-46)*Math.cos(lastAngle+angle*0.5), cy+(R-46)*Math.sin(lastAngle+angle*0.5)); 
			}
			
			lastAngle = angle + lastAngle;			
		}		
	}
}
function drawAbsolute(){
	var c = document.getElementById("graphContainer_plus");
	var c_m = document.getElementById("graphContainer_minus");
	var c_a = document.getElementById("graphContainer_absolute");
	var maxLikeCount=0;
	//var R = Math.min(c_m.width,c_m.height)*0.4;
	var cx = c_a.width*0.5;
	var cy = c_a.height*0.5;
	for(var i=0;i<listVideo.length;i++){				
		if(maxLikeCount<parseInt(listVideo[i].likeCount))
			maxLikeCount = parseInt(listVideo[i].likeCount);
	}
	for(var i=0;i<listVideo.length;i++){
		listVideo[i].ratio = (listVideo[i].likeCount/maxLikeCount).toFixed(1);
	}
	if (c.getContext){
		var ctx = c_a.getContext("2d");
		ctx.clearRect(0, 0, c_a.width, c_a.height);		
		var wX = (c_a.width-100)/(2*listVideo.length);
		var wY = (c_a.height*.5)-40;
		var curX = 50 + wX*0.5;
		var curY = c_a.height*.5;//c_a.height-50;
		var R = wX*3;
		for(var i=0;i<listVideo.length;i++){	
			ctx.beginPath();
			ctx.strokeStyle = "#fff";
			ctx.lineWidth = 2;
			var curwY = wY * parseInt(listVideo[i].ratio);
			ctx.fillStyle = listVideo[i].col;
		    ctx.fill();
			ctx.fillRect(curX, curY-curwY, wX, curwY);	
			ctx.closePath();			
			ctx.stroke();			
			ctx.font = "bold "+ parseInt(R*0.07)+"pt Tahoma";
			ctx.fillStyle = listVideo[i].col;
			ctx.textAlign = "center";			
			ctx.fillText(listVideo[i].likeCount,curX+wX*0.5,curY-curwY -5); 			
			curX = curX + 2*wX;
		}	
		var maxDisCount=0;
		for(var i=0;i<listVideo.length;i++){					
			if(maxDisCount<parseInt(listVideo[i].dislikeCount))
				maxDisCount=parseInt(listVideo[i].dislikeCount);
		}
		for(var i=0;i<listVideo.length;i++){
			listVideo[i].ratio = (listVideo[i].dislikeCount/maxDisCount).toFixed(1);
		}
		
		var curX = 50 + wX*0.5;
		//var curY = wY+40;
		for(var i=0;i<listVideo.length;i++){	
			ctx.beginPath();
			ctx.strokeStyle = "#fff";
			ctx.lineWidth = 2;
			var curwY = wY * parseInt(listVideo[i].ratio);
			ctx.fillStyle = "#999999";
		    ctx.fill();
			ctx.fillRect(curX, curY, wX, curwY);	
			ctx.closePath();			
			ctx.stroke();
			ctx.font = "bold "+ parseInt(R*0.07)+"pt Tahoma";
			ctx.fillStyle = "#666666";
			ctx.textAlign = "center";			
			ctx.fillText(listVideo[i].dislikeCount,curX+wX*0.5,curY+curwY+25); 	
			curX = curX + 2*wX;
		}	
	}
}
function drawAbsoluteCount(){
	var c = document.getElementById("graphContainer_plus");
	var c_m = document.getElementById("graphContainer_minus");
	var c_a = document.getElementById("graphContainer_absolute");
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