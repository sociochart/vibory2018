var apikey = 'AIzaSyC8bAzJu8qBP1kTpg8QOwf4W5RQCLhHxtg';
var listVideo = new Array;

var timerGlobal;
function loadPage(){
	var timerRunStr = setTimeout(function timerRunStrTick() {
		var left = document.getElementById("str_run").offsetLeft;
		var wh = document.getElementById("str_run").offsetWidth;
		if(left<-wh){
			left = window.innerWidth +20 +"px";
		}else
			left = (left-1) +"px";
		document.getElementById("str_run").style.left = left;
		timerRunStr = setTimeout(timerRunStrTick, 20);
		},20);
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
					var str = titleStr + " на "+curDate.toLocaleString("ru", options)+titleEnd;
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
	listVideo[9].url = "7ZzHTs6hdxE";
	listVideo[9].name = "СОБЧАК КСЕНИЯ АНАТОЛЬЕВНА";
	listVideo[9].col = '#d800ff';// + ((Math.random() * 0x1000000) | 0x1000000).toString(16).substr(1);
	listVideo[10] = new Object;
	listVideo[10].url = "nssj0wVkmCM";
	listVideo[10].name = "СОБЯНИН СЕРГЕЙ СЕМЕНОВИЧ";
	listVideo[10].col = '#ff9900';// + ((Math.random() * 0x1000000) | 0x1000000).toString(16).substr(1);
	listVideo[11] = new Object;
	listVideo[11].url = "tfsp8lX2ZAw";
	listVideo[11].name = "ХОДОРКОВСКИЙ МИХАИЛ БОРИСОВИЧ";
	listVideo[11].col = '#b82e2e';// + ((Math.random() * 0x1000000) | 0x1000000).toString(16).substr(1);
	listVideo[12] = new Object;
	listVideo[12].url = "UJGmE9rg15M";
	listVideo[12].name = "ЯВЛИНСКИЙ ГРИГОРИЙ АЛЕКСЕЕВИЧ";
	listVideo[12].col = '#316395';// + ((Math.random() * 0x1000000) | 0x1000000).toString(16).substr(1);
}
function setCanvasSize() {
	var canvas = document.getElementById("graphContainer_plus");
	if(canvas == null)
		return false;
	var c_m = document.getElementById("graphContainer_minus");
	var c_a = document.getElementById("graphContainer_absolute");
	//c_a.width = c_m.width = canvas.width = window.innerWidth;
	var ht =  document.getElementById("chartName").getBoundingClientRect();
	canvas.width = c_m.width = c_a.width = window.innerWidth - (parseInt(ht.right) - parseInt(ht.left)+20);
	canvas.height = c_m.height = c_a.height = parseInt(ht.bottom) - parseInt(ht.top);
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
				var ar = data.items;			
				listVideo.sort(compareName);				
				var futureIndex = getFutureIndex();
				//console.log("+++++++++++++++++++++++" + futureIndex);					
				for(var i=0;i<ar.length;i++){
					/*if(listVideo[i].likeCountSave == undefined){
						listVideo[i].likeCountSave =  new Array;
						listVideo[i].likeCountSave[0] = -1;
						listVideo[i].likeCountSave[1] = -1;
						listVideo[i].likeCountSave[2] = -1;
						listVideo[i].dislikeCountSave = new Array;
						listVideo[i].dislikeCountSave[0] = -1;
						listVideo[i].dislikeCountSave[1] = -1;
						listVideo[i].dislikeCountSave[2] = -1;
						//listVideo[i].likeCountSaveTmp =  new Array;
						//listVideo[i].dislikeCountSaveTmp = new Array;		
					}*/
					/*if(listVideo[i].likeCountSaveTmp.length==3){
						listVideo[i].likeCountSave[futureIndex] =  listVideo[i].likeCountSaveTmp[futureIndex];
						listVideo[i].dislikeCountSave[futureIndex] =  listVideo[i].dislikeCountSaveTmp[futureIndex];
					}else{
						listVideo[i].likeCountSave[futureIndex] = -1;
						listVideo[i].dislikeCountSave[futureIndex] = -1;
						console.log("-1");	
					}*/
					
					//listVideo[i].likeCountSave[futureIndex] =  listVideo[i].likeCount;
					//listVideo[i].dislikeCountSave[futureIndex] =  listVideo[i].dislikeCount;	
					if(futureIndex!=1)
						listVideo[i].likeCountSave = listVideo[i].likeCount;
					if(futureIndex!=0)
						listVideo[i].dislikeCountSave = listVideo[i].dislikeCount;	
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
			listVideo.sort(compareLikeCount);//compareDeltaCount);
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
		_html = _html + "<div class='chartNameContainer'><div id='chartNameColBox"+i+"' class='chartNameCol' style='background-color:"+listVideo[i].col+"'><span id='chartNameCol"+i+"'></span></div><div class='chartNameName'>"+ar[0]+"<span>"+ar[1] + " " + ar[2]+"</span></div></div>";
	}
	document.getElementById("chartName").innerHTML = _html;	
	transition();
}
function getFutureIndex(){
	var res;
	switch(curViewIndex){
		case 0:
			res=1;
			break;
		case 1:
			res=2;
			break;
		case 2:
			res=0;
			break;
	}
	return res;
}
var curViewIndex=0;
function transition(){
	var canvas1;
	var canvas2;	
	switch(curViewIndex){
		case 0:			
			canvas1 = document.getElementById("graphContainer_plus");
			canvas2 = document.getElementById("graphContainer_minus");
			titleStr="Рейтинг";
			titleEnd = " (в % от общего числа ДИЗЛАЙКОВ)";
			drawMinus();
			break;
		case 1:			
			canvas1 = document.getElementById("graphContainer_minus");
			canvas2 = document.getElementById("graphContainer_absolute");
			titleStr="Рейтинг (ЛАЙКИ)";
			titleEnd = "";
			drawAbsolute();
			break;
		case 2:			
			canvas1 = document.getElementById("graphContainer_absolute");
			canvas2 = document.getElementById("graphContainer_plus");	
			titleStr="Рейтинг";
			titleEnd = " (в % от общего числа ЛАЙКОВ)";		
			drawPlus();
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
						startEffect(curViewIndex);
					}
	},10);
}
//var sumLikeCount=0;
function drawPlus(){	
	var c = document.getElementById("graphContainer_plus");
	var c_m = document.getElementById("graphContainer_minus");
	var c_a = document.getElementById("graphContainer_absolute");
	var ht =  document.getElementById("chartName").getBoundingClientRect();
	c.width = c_m.width = c_a.width = window.innerWidth - (parseInt(ht.right) - parseInt(ht.left)+20);
	c.height = c_m.height = c_a.height = parseInt(ht.bottom) - parseInt(ht.top);	
	//var sumLikeCountSave=sumLikeCount;
	var sumLikeCountSave = 0;
	var sumLikeCount = 0;
	var R = Math.min(c.width,c.height)*0.4;
	var cx = c.width*0.5;
	var cy = c.height*0.5;
	for(var i=0;i<listVideo.length;i++){		
		sumLikeCount = sumLikeCount + parseInt(listVideo[i].likeCount);
		sumLikeCountSave = sumLikeCountSave + parseInt(listVideo[i].likeCountSave)
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
			ctx.closePath();
			ctx.fillStyle = listVideo[i].col;
		    ctx.fill();
			ctx.stroke();			
			if(parseInt(listVideo[i].ratio)>4){
				ctx.font = "bold "+ parseInt(R*0.07)+"pt Tahoma";
				ctx.fillStyle = "#fff";
				ctx.textAlign = "center";			
				ctx.fillText(listVideo[i].ratio,cx+(R-46)*Math.cos(lastAngle+angle*0.5), cy+(R-46)*Math.sin(lastAngle+angle*0.5)); 				
			}
			var id = "chartNameCol"+i;
			document.getElementById(id).innerHTML = listVideo[i].ratio;				
			lastAngle = angle + lastAngle;			
		}		
	}
	var img = document.getElementById("likeIMG");
	ctx.drawImage(img, cx-50, cy-81);
	document.getElementById("likeIMG_grey").style.display = "none";
	document.getElementById("dislikeIMG_grey").style.display = "none";
	
	ctx.font = "bold "+ parseInt(R*0.06)+"pt Tahoma";
	ctx.fillStyle = "#888";
	ctx.textAlign = "center";	
	var str = "всего лайков: " + sumLikeCount;
	var deltaCount = parseInt(sumLikeCount) - parseInt(sumLikeCountSave);	
	if( deltaCount!=0 && sumLikeCountSave!=0){
		if(deltaCount>0)
			deltaCount = " (+"+deltaCount+")";
		if( deltaCount<0 )
			deltaCount = " (-"+Math.abs(deltaCount)+")";
	}else
		deltaCount = "";
	str = str + deltaCount;
	ctx.fillText(str,cx, 40); 
	sumLikeCountSave = sumLikeCount;
}
var titleStr="Рейтинг";
var titleEnd = " (в % от общего числа ЛАЙКОВ)";	
//var sumDisCount=0;
function drawMinus(){
	var c = document.getElementById("graphContainer_plus");
	var c_m = document.getElementById("graphContainer_minus");
	var c_a = document.getElementById("graphContainer_absolute");
	var ht =  document.getElementById("chartName").getBoundingClientRect();
	c.width = c_m.width = c_a.width = window.innerWidth - (parseInt(ht.right) - parseInt(ht.left)+20);
	c.height = c_m.height = c_a.height = parseInt(ht.bottom) - parseInt(ht.top);	
	//var sumDisCountSave=sumDisCount;
	var sumDisCountSave=0;
	var sumDisCount = 0;
	var R = Math.min(c.width,c.height)*0.4;
	var cx = c.width*0.5;
	var cy = c.height*0.5;
	for(var i=0;i<listVideo.length;i++){		
		sumDisCount = sumDisCount + parseInt(listVideo[i].dislikeCount);
		sumDisCountSave = sumDisCountSave + parseInt(listVideo[i].dislikeCountSave);
		if(sumDisCount==0)
			sumDisCount=1;
	}
	for(var i=0;i<listVideo.length;i++){
		listVideo[i].ratio = ((listVideo[i].dislikeCount/sumDisCount)*100).toFixed(1);
	}
	if (c_m.getContext){
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
			ctx.closePath();
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
			var id = "chartNameCol"+i;
			document.getElementById(id).innerHTML = listVideo[i].ratio;	
		}		
	}	
	var img = document.getElementById("dislikeIMG");
	ctx.drawImage(img, cx-50, cy-61);
	document.getElementById("likeIMG_grey").style.display = "none";
	document.getElementById("dislikeIMG_grey").style.display = "none";
	
	ctx.font = "bold "+ parseInt(R*0.06)+"pt Tahoma";
	ctx.fillStyle = "#888";
	ctx.textAlign = "center";	
	var str = "всего дизлайков: " + sumDisCount;
	var deltaCount = parseInt(sumDisCount) - parseInt(sumDisCountSave);	
	if( deltaCount!=0 && sumDisCountSave!=0){		
		if(deltaCount>0)
			deltaCount = " (+"+deltaCount+")";
		if( deltaCount<0 )
			deltaCount = " ("+deltaCount+")";
	}else
		deltaCount = "";
	str = str + deltaCount;
	ctx.fillText(str,cx, 40); 
	sumDisCountSave = sumDisCount;
}
function drawAbsolute(){
	var c = document.getElementById("graphContainer_plus");
	var c_m = document.getElementById("graphContainer_minus");
	var c_a = document.getElementById("graphContainer_absolute");
	var ht =  document.getElementById("chartName").getBoundingClientRect();
	c.width = c_m.width = c_a.width = window.innerWidth - (parseInt(ht.right) - parseInt(ht.left)+20);
	c.height = c_m.height = c_a.height = parseInt(ht.bottom) - parseInt(ht.top);
	var maxLikeCount=0;
	var sumLikeCountThis = 0;
	var maxDisCount=0;
	var sumDisCountThis = 0;
	var cx = c_a.width*0.5;
	var cy = c_a.height*0.5;
	for(var i=0;i<listVideo.length;i++){	
		sumLikeCountThis = sumLikeCountThis + parseInt(listVideo[i].likeCount);
		if(maxLikeCount<parseInt(listVideo[i].likeCount))
			maxLikeCount = parseInt(listVideo[i].likeCount);
	}
	for(var i=0;i<listVideo.length;i++){
		listVideo[i].ratio = (listVideo[i].likeCount/maxLikeCount).toFixed(2);
	}
	var deltaCountLike =0;
	var deltaCountDis=0;
	if (c_a.getContext){
		var ctx = c_a.getContext("2d");
		ctx.clearRect(0, 0, c_a.width, c_a.height);		
		var wX = (c_a.width*.5)-160;//(c_a.width-100)/(2*listVideo.length);
		var wY = (c_a.height)/(2*listVideo.length); 
		 wY =  wY - 14/listVideo.length; 
		var curX = c_a.width*.5;;//50 + wX*0.5;
		var curY = 10 + wY*0.5;//c_a.height*.5;
		var R = wY*7;
		for(var i=0;i<listVideo.length;i++){	
			ctx.beginPath();
			ctx.strokeStyle = "#fff";
			ctx.lineWidth = 2;
			var curwX = wX * parseFloat(listVideo[i].ratio);
			ctx.fillStyle = listVideo[i].col;
		    ctx.fill();
			ctx.fillRect(curX, curY, curwX, wY);
			ctx.closePath();			
			ctx.stroke();			
			ctx.font = "bold "+ parseInt(R*0.07)+"pt Tahoma";
			ctx.fillStyle = listVideo[i].col;
			ctx.textAlign = "left";
			var str = listVideo[i].likeCount;			
			var deltaCount =  parseInt(listVideo[i].likeCount) - parseInt(listVideo[i].likeCountSave);// parseInt(listVideo[i].likeCountSaveTmp[curViewIndex]) - parseInt(listVideo[i].likeCountSave[curViewIndex]);
			/*if(!isNaN(deltaCount)){	
				var deltaCount1 = parseInt(listVideo[i].likeCount) - parseInt(listVideo[i].likeCountSave[curViewIndex]);
				if(deltaCount==0 && deltaCount1!=0){
					deltaCount = deltaCount1;
					//listVideo[i].likeCountSaveTmp[effectIndex]=parseInt(listVideo[i].likeCount);
				}
			}*/
			if(!isNaN(deltaCount) && deltaCount!=0 && listVideo[i].likeCountSave!=undefined){
				deltaCountLike = deltaCountLike + deltaCount;
				if(deltaCount>0)
					deltaCount = " (+"+deltaCount+")";
				if( deltaCount<0 )
					deltaCount = " ("+deltaCount+")";
			}else
				deltaCount = "";
			str = str + deltaCount;
			ctx.fillText(str,curX+20, curY+1.6*wY);
			curY = curY + 2*wY;
		}			
		for(var i=0;i<listVideo.length;i++){
			sumDisCountThis = sumDisCountThis + parseInt(listVideo[i].dislikeCount);					
			if(maxDisCount<parseInt(listVideo[i].dislikeCount))
				maxDisCount=parseInt(listVideo[i].dislikeCount);
		}
		for(var i=0;i<listVideo.length;i++){
			listVideo[i].ratio = (listVideo[i].dislikeCount/maxDisCount).toFixed(2);
		}
		
		var curY = 10 + wY*0.5;			
		for(var i=0;i<listVideo.length;i++){	
			ctx.beginPath();
			ctx.strokeStyle = "#fff";
			ctx.lineWidth = 2;
			var curwX = wX * parseFloat(listVideo[i].ratio);
			ctx.fillStyle = "#999999";
		    ctx.fill();
			ctx.fillRect(curX-curwX, curY, curwX, wY);	
			ctx.closePath();			
			ctx.stroke();
			ctx.font = "bold "+ parseInt(R*0.07)+"pt Tahoma";
			ctx.fillStyle = "#666666";
			ctx.textAlign = "right";	
						
			var str = listVideo[i].dislikeCount;
			var deltaCount =  parseInt(listVideo[i].dislikeCount) - parseInt(listVideo[i].dislikeCountSave);//parseInt(listVideo[i].dislikeCountSaveTmp[curViewIndex]) - parseInt(listVideo[i].dislikeCountSave[curViewIndex]);	
			/*if(!isNaN(deltaCount)){	
				var deltaCount1 = parseInt(listVideo[i].dislikeCount) - parseInt(listVideo[i].dislikeCountSave[curViewIndex]);
				if(deltaCount==0 && deltaCount1!=0){
					deltaCount = deltaCount1;
					//listVideo[i].dislikeCountSaveTmp[effectIndex]=parseInt(listVideo[i].dislikeCount);
				}
			}*/
			if(!isNaN(deltaCount) && deltaCount!=0 && listVideo[i].dislikeCountSave!=undefined){
				deltaCountDis = deltaCountDis + deltaCount;
				if(deltaCount>0)
					deltaCount = " (+"+deltaCount+")";
				if( deltaCount<0 )
					deltaCount = " ("+deltaCount+")";
			}else
				deltaCount = "";
			str = str + deltaCount;			
				
			ctx.fillText(str,curX-20, curY+1.6*wY); 	
			curY = curY + 2*wY;
			var id = "chartNameCol"+i;
			document.getElementById(id).innerHTML = '';	
		}	
	}
	document.getElementById("likeIMG_grey").style.display = "block";
	document.getElementById("dislikeIMG_grey").style.display = "block";
	
	ctx.font = "bold "+ parseInt(R*0.06)+"pt Tahoma";
	ctx.fillStyle = "#888";
	ctx.textAlign = "right";	
	var str = sumLikeCountThis;	
	if( deltaCountLike!=0 && sumLikeCountThis!=0){
		if(deltaCountLike>0)
			deltaCountLike = " (+"+deltaCountLike+")";
		if( deltaCount<0 )
			deltaCountLike = " (-"+Math.abs(deltaCountLike)+")";
	}else
		deltaCountLike = "";
	str = str + deltaCountLike;
	ctx.fillText(str,2*cx-20, 2*cy - 140); 	
	
	ctx.textAlign = "left";	
	var str = sumDisCountThis;	
	if( deltaCountDis!=0 && sumDisCountThis!=0){
		if(deltaCountDis>0)
			deltaCountDis = " (+"+deltaCountDis+")";
		if( deltaCountDis<0 )
			deltaCountDis = " (-"+Math.abs(deltaCountDis)+")";
	}else
		deltaCountDis = "";
	str = str + deltaCountDis;
	ctx.fillText(str,10, 140); 
}
function startEffect(effectIndex){
	if(listVideo[0].likeCountSave==undefined )
		return;
	
	listVideoEffect.splice(0,listVideoEffect.length);
	var ctx ='';		
	//console.log("======="+effectIndex);	
	for(var i=0;i<listVideo.length;i++){
		/*if(listVideo[i].likeCountSave[effectIndex]==undefined || parseInt(listVideo[i].likeCountSave[effectIndex])<0 || listVideo[i].dislikeCountSave[effectIndex]==undefined || parseInt(listVideo[i].dislikeCountSave[effectIndex])<0 || listVideo[i].likeCountSaveTmp[effectIndex]==undefined || parseInt(listVideo[i].likeCountSaveTmp[effectIndex])<0 || listVideo[i].dislikeCountSaveTmp[effectIndex]==undefined || parseInt(listVideo[i].dislikeCountSaveTmp[effectIndex])<0)
			return;*/
		
		var tt = listVideo[i];
		switch(effectIndex){
			case 0:
					var deltaLike = parseInt(listVideo[i].likeCount) - parseInt(listVideo[i].likeCountSave);//parseInt(listVideo[i].likeCountSaveTmp[effectIndex]) - parseInt(listVideo[i].likeCountSave[effectIndex]);
					/*var deltaLike1 = parseInt(listVideo[i].likeCount) - parseInt(listVideo[i].likeCountSave[effectIndex]);
					if(deltaLike==0 && deltaLike1!=0){
						deltaLike = deltaLike1;
						listVideo[i].likeCountSaveTmp[effectIndex]=parseInt(listVideo[i].likeCount);
					}*/					
					if(deltaLike!=0){
						var o = new Object;
						o.i = i;
						o.vec = 1;
						o.delta = deltaLike;
						var span = document.createElement("span");
						span.innerHTML = deltaLike;
						o.span = span;
						o.col = listVideo[i].col;
						listVideoEffect.push(o);
						//console.log("effectIndex = "+effectIndex+" |index = " + i + " |delta = " + deltaLike);
					}//else
						//console.log("                 0  delta = "+deltaLike);
					//console.log(parseInt(listVideo[i].likeCount) + " - " +parseInt(listVideo[i].likeCountSave))
					if(ctx=='')
					 ctx = document.getElementById("graphContainer_plus").getContext("2d");
				break;
			case 1:
					var deltaDisLike = parseInt(listVideo[i].dislikeCount) - parseInt(listVideo[i].dislikeCountSave);//parseInt(listVideo[i].dislikeCountSaveTmp[effectIndex]) - parseInt(listVideo[i].dislikeCountSave[effectIndex]);
					/*var deltaDisLike1 = parseInt(listVideo[i].dislikeCount) - parseInt(listVideo[i].dislikeCountSave[effectIndex]);
					if(deltaDisLike==0 && deltaDisLike!=0){
						deltaDisLike = deltaDisLike1;
						listVideo[i].dislikeCountSaveTmp[effectIndex]=parseInt(listVideo[i].dislikeCount);
					}*/
					
					if(deltaDisLike!=0){
						var o = new Object;
						o.i = i;
						o.vec = -1;
						o.delta = deltaDisLike;
						var span = document.createElement("span");
						span.innerHTML = deltaDisLike;
						o.span = span;
						o.col = listVideo[i].col;
						listVideoEffect.push(o);
						//console.log("effectIndex = "+effectIndex+" |index = " + i + " |delta = " + deltaDisLike);
					}		
					if(ctx=='')
					 ctx = document.getElementById("graphContainer_minus").getContext("2d");			
				break;
			case 2:
				var deltaLike =  parseInt(listVideo[i].likeCount) - parseInt(listVideo[i].likeCountSave);// parseInt(listVideo[i].likeCountSaveTmp[effectIndex]) - parseInt(listVideo[i].likeCountSave[effectIndex]);
				/*var deltaLike1 = parseInt(listVideo[i].likeCount) - parseInt(listVideo[i].likeCountSave[effectIndex]);
				if(deltaLike==0 && deltaLike1!=0){
					deltaLike = deltaLike1;
					listVideo[i].likeCountSaveTmp[effectIndex]=parseInt(listVideo[i].likeCount);
				}*/				
				var deltaDisLike =  parseInt(listVideo[i].dislikeCount) - parseInt(listVideo[i].dislikeCountSave);//parseInt(listVideo[i].dislikeCountSaveTmp[effectIndex]) - parseInt(listVideo[i].dislikeCountSave[effectIndex]);
				/*var deltaDisLike1 = parseInt(listVideo[i].dislikeCount) - parseInt(listVideo[i].dislikeCountSave[effectIndex]);
				if(deltaDisLike==0 && deltaDisLike!=0){
					deltaDisLike = deltaDisLike1;
					listVideo[i].dislikeCountSaveTmp[effectIndex]=parseInt(listVideo[i].dislikeCount);
				}*/				
				if(deltaLike!=0){
					var o = new Object;
					o.i = i;
					o.vec = 1;
					o.delta = deltaLike;
					var span = document.createElement("span");
					span.innerHTML = deltaLike;	
					o.span = span;	
					o.col = listVideo[i].col;			
					listVideoEffect.push(o);
					//console.log("effectIndex = "+effectIndex+" |index = " + i + " |delta = " + deltaLike);
				}
				if(deltaDisLike!=0){
					var o = new Object;
					o.i = i;
					o.vec = -1;
					o.delta = deltaDisLike;
					var span = document.createElement("span");
					span.innerHTML = deltaDisLike;
					o.span = span;
					o.col = listVideo[i].col;
					listVideoEffect.push(o);
					//console.log("effectIndex = "+effectIndex+" |index = " + i + " |delta = " + deltaDisLike);
				}
				if(ctx=='')
					ctx = document.getElementById("graphContainer_absolute").getContext("2d");				
				break;
		}		
	}
	effectTick=0;
	currEffect =0;
	drawEffect(ctx);
	//console.log("=");	
}
var listVideoEffect = new Array;
var effectTick = 0;
var maxEffectTick =20;
var countEffect =1;
var currEffect =0;
function drawEffect(ctx){
	var ht =  document.getElementById("chartName").getBoundingClientRect();
	var pt = new Object;
	pt.w = window.innerWidth - (parseInt(ht.right) - parseInt(ht.left)+20);
	pt.h = parseInt(ht.bottom) - parseInt(ht.top);
	for(var i=0;i<listVideoEffect.length;i++){
		var img;
		var minusX;
		var plusY = 0;
		if(listVideoEffect[i].vec==1){
			 img= document.getElementById("likeDarkIMG");
			 minusX = 28;plusY=10;
		}
		if(listVideoEffect[i].vec==-1){
			 img= document.getElementById("dislikeDarkIMG");
			 minusX = 16;
		}
			 
		var wY = (pt.h)/(2*listVideo.length); 
		wY =  wY - 14/listVideo.length; 
		var curY = 10 + wY*0.5 + parseInt(listVideoEffect[i].i)*2*wY;	
		ctx.drawImage(img, pt.w-minusX, curY+plusY);
	}
	var timerEffect = setTimeout(function timerEffectTick() {		
		for(var i=0;i<listVideoEffect.length;i++){
			/*var pt =  document.getElementById("chartNameColBox"+i).getBoundingClientRect();
			if(effectTick!=maxEffectTick){
				var blurVol = effectTick;
				if(effectTick>maxEffectTick/3)
					blurVol = maxEffectTick-effectTick;
				document.getElementById("chartNameColBox"+listVideoEffect[i].i).setAttribute("style","background-color:"+listVideoEffect[i].col+";box-shadow:0 0 "+blurVol+"px "+listVideoEffect[i].col);			
				if(effectTick*0.5 == parseInt(effectTick*0.5))
					document.getElementById("chartNameCol"+listVideoEffect[i].i).style.color = "#000";
				else
					document.getElementById("chartNameCol"+listVideoEffect[i].i).style.color = "#fff";
			}else{
				document.getElementById("chartNameColBox"+listVideoEffect[i].i).setAttribute("style","background-color:"+listVideoEffect[i].col);
				document.getElementById("chartNameCol"+listVideoEffect[i].i).style.color = "#fff";
			}*/
			if(effectTick*0.5 == parseInt(effectTick*0.5)){
				document.getElementById("chartNameColBox"+listVideoEffect[i].i).setAttribute("style","background-color:"+listVideoEffect[i].col);
				document.getElementById("chartNameCol"+listVideoEffect[i].i).style.color = "#000";
			}else{
				document.getElementById("chartNameColBox"+listVideoEffect[i].i).setAttribute("style","background-color:#000");
				document.getElementById("chartNameCol"+listVideoEffect[i].i).style.color = "#fff";
			}
		}
		if(effectTick<maxEffectTick){
			timerEffect = setTimeout(timerEffectTick, 200);
			effectTick++;
		}else{
			currEffect++;
			effectTick=0;			
			if(currEffect<countEffect)
				timerEffect = setTimeout(timerEffectTick, 200);
			for(var i=0;i<listVideoEffect.length;i++){
				document.getElementById("chartNameCol"+listVideoEffect[i].i).style.color = "#fff";
				document.getElementById("chartNameColBox"+listVideoEffect[i].i).setAttribute("style","background-color:"+listVideoEffect[i].col);
			}
		}
	},200);
}