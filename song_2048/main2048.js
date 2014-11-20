//define
var num=4;
var board = new Array();
var score = 0;

$(document).ready(function(){
	newgame();
});

function newgame(){
	//init
	init();
	//random generate
	generateOneNumber();
	generateOneNumber();
}

function init(){
	//generate container
	var container=$("#grid-container");
	container.css('width',num*100+(num-1)*20);
	container.css('height',num*100+(num-1)*20);
	
	//generate cells
	for(var i=0;i<num;i++)
		for(var j=0;j<num;j++){
			$("#grid-container").append('<div class="grid-cell" id="grid-cell-'+i+'-'+j+'"></div>');
			var gridCell = $("#grid-cell-"+i+"-"+j);	
			gridCell.css('top',getPosTop(i,j));
			gridCell.css('left',getPosLeft(i,j));
		}
	
	//init array
	for(var i=0;i<num;i++){
		board[i]=new Array();
		for(var j=0;j<num;j++)
			board[i][j]=0;
	}
	
	//update view
	updateBoardView();
}

function updateBoardView(){
	$(".number-cell").remove();
	for(var i=0;i<num;i++)
		for(var j=0;j<num;j++){
			$("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
			var theNumberCell = $('#number-cell-'+i+'-'+j);
			
			if(board[i][j]==0){
				theNumberCell.css('width','0px');
				theNumberCell.css('height','0px');
				theNumberCell.css('top',getPosTop(i,j)+50);
				theNumberCell.css('left',getPosLeft(i,j)+50);
			}else{
				theNumberCell.css('width','100px');
				theNumberCell.css('height','100px');
				theNumberCell.css('top',getPosTop(i,j));
				theNumberCell.css('left',getPosLeft(i,j));
				theNumberCell.css('background-color',getNumberBackgroudColor(board[i][j]));
				theNumberCell.css('color',getNumberColor(board[i][j]));
				theNumberCell.text(board[i][j]);
			}
		}
}

function generateOneNumber(){
	if(nospace(board))return false;
	
	//random location
	var randx = parseInt(Math.floor(Math.random()*num));
	var randy = parseInt(Math.floor(Math.random()*num));
	while(true){
		if(board[randx][randy]==0)break;
		randx = parseInt(Math.floor(Math.random()*num));
		randy = parseInt(Math.floor(Math.random()*num));
	}
	
	//random number
	var randNumber = Math.random()<0.5?2:4;
	
	//show number
	board[randx][randy]=randNumber;
	showNumberWithAnimation(randx,randy,randNumber);
	return true;
}