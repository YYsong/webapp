//define
var num=4;
var board = new Array();
var score = 0;
var hasConflicted = new Array();

$(document).ready(function(){
	prepareForMobile();
	newgame();
});
function prepareForMobile(){
	//generate cells
	for(var i=0;i<num;i++)
		for(var j=0;j<num;j++)
			$("#grid-container").append('<div class="grid-cell" id="grid-cell-'+i+'-'+j+'"></div>');
	
	if(documentWidth>500){
		gridContainerWidth=500;
		cellSpace=20;
		cellSideLength=100;
	}
	
	$('#grid-container').css('width',gridContainerWidth - 2*cellSpace);
	$('#grid-container').css('height',gridContainerWidth - 2*cellSpace);
	$('#grid-container').css('padding',cellSpace);
	$('#grid-container').css('border-radius',0.02*gridContainerWidth);
	$('.grid-cell').css('width',cellSideLength);
	$('.grid-cell').css('height',cellSideLength);
	$('.grid-cell').css('border-radius',0.02*cellSideLength);
			
}

function newgame(){
	//init
	init();
	//random generate
	generateOneNumber();
	generateOneNumber();
}

function init(){

	
	//put the cells to right position
	for(var i=0;i<num;i++)
		for(var j=0;j<num;j++){
			var gridCell = $("#grid-cell-"+i+"-"+j);	
			gridCell.css('top',getPosTop(i,j));
			gridCell.css('left',getPosLeft(i,j));
		}
	
	//init array
	for(var i=0;i<num;i++){
		board[i]=new Array();
		hasConflicted[i] = new Array();
		for(var j=0;j<num;j++)
			board[i][j]=0;
			hasConflicted[i][j]=false;
	}
	
	//update view
	updateBoardView();
	
	score=0;
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
				theNumberCell.css('top',getPosTop(i,j)+cellSideLength/2);
				theNumberCell.css('left',getPosLeft(i,j)+cellSideLength/2);
			}else{
				theNumberCell.css('width',cellSideLength);
				theNumberCell.css('height',cellSideLength);
				theNumberCell.css('top',getPosTop(i,j));
				theNumberCell.css('left',getPosLeft(i,j));
				theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
				theNumberCell.css('color',getNumberColor(board[i][j]));
				theNumberCell.text(board[i][j]);
			}
			hasConflicted[i][j]=false;
		}
	$('.number-cell').css('line-height',cellSideLength+'px');
	$('.number-cell').css('font-size',0.6*cellSideLength+'px');
}

function generateOneNumber(){
	if(nospace(board))return false;
	
	//random location
	var randx = parseInt(Math.floor(Math.random()*num));
	var randy = parseInt(Math.floor(Math.random()*num));
	
	var times=0;
	while(times<50){//For saving time,generate rand location try 50 times
		if(board[randx][randy]==0)break;
		randx = parseInt(Math.floor(Math.random()*num));
		randy = parseInt(Math.floor(Math.random()*num));
	}
	//select a cell from board[0][0],up to down,left to right.It's a little naive.
	if(times==50){
		for(var i=0;i<num;i++)
			for(var j=0;j<num;j++){
				if(board[i][j]==0){
					randx=i;
					randy=j
				}
			}
	}
	
	//random number
	var randNumber = Math.random()<0.5?2:4;
	
	//show number
	board[randx][randy]=randNumber;
	showNumberWithAnimation(randx,randy,randNumber);
	return true;
}

$(document).keydown(function(event){
	switch(event.keyCode){
		case 37://left
			if( moveLeft()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
			break;
		case 38://up
			if(moveUp()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
			break;
		case 39://right
			if(moveRight()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
			break;
		case 40://down
			if(moveDown()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
			break;
		default: //default
			break;
	
	}
});

function isgameover(){
	if(nospace(board)&&nomove(board)){
		gameover();
	}
}

function gameover(){
	alert('gameover!');
}

function moveLeft(){
	
	if(!canMoveLeft(board))return false;//can't move left
	//moveLeft
	for(var i=0;i<num;i++)
		for(var j=1;j<num;j++)//start from 1 col
			if(board[i][j]!=0){
				for(var k=0;k<j;k++){
					if(board[i][k]==0&&noBlockHorizontal(i,k,j,board)){
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];//just move it
						board[i][j]=0;
						continue;
					}else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,k,j,board)&&!hasConflicted[i][k]){
						//move
						showMoveAnimation(i,j,i,k);
				
						//add
						board[i][k]+=board[i][j];//add them
						board[i][j]=0;
						
						//add score
						score +=board[i][k];
						updateScore(score);
						
						hasConflicted[i][k]=true;
						continue;
					}
				}
			}
			
	setTimeout("updateBoardView()",200);
	return true;
}

function moveRight(){
	if(!canMoveRight(board))return false;//can't move left
	//moveLeft
	for(var i=0;i<num;i++)
		for(var j=num-2;j>=0;j--)//start from n-2 col
			if(board[i][j]!=0){
				for(var k=num-1;k>j;k--){
					if(board[i][k]==0&&noBlockHorizontal(i,j,k,board)){
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];//just move it
						board[i][j]=0;
						continue;
					}else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,j,k,board)&&!hasConflicted[i][k]){
						//move
						showMoveAnimation(i,j,i,k);
				
						//add
						board[i][k]+=board[i][j];//add them
						board[i][j]=0;
						
						//add score
						score +=board[i][k];
						updateScore(score);
						
						hasConflicted[i][k]=true;
						continue;
					}
				}
			}
			
	setTimeout("updateBoardView()",200);
	return true;
}

function moveUp(){
	
	if(!canMoveUp(board))return false;//can't move left
	//moveLeft
	for(var j=0;j<num;j++)
		for(var i=1;i<num;i++)//start from 1 row
			if(board[i][j]!=0){
				for(var k=0;k<i;k++){
					if(board[k][j]==0&&noBlockVertical(j,k,i,board)){
						//move
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];//just move it
						board[i][j]=0;
						continue;
					}else if(board[k][j]==board[i][j]&&noBlockVertical(j,k,i,board)&&!hasConflicted[k][j]){
						//move
						showMoveAnimation(i,j,k,j);
				
						//add
						board[k][j]+=board[i][j];//add them
						board[i][j]=0;
						
												//add score
						score +=board[k][j];
						updateScore(score);
						
						hasConflicted[k][j]=true;
						continue;
					}
				}
			}
			
	setTimeout("updateBoardView()",200);
	return true;
}

function moveDown(){
	
	if(!canMoveDown(board))return false;//can't move left
	//moveLeft
	for(var j=0;j<num;j++)
		for(var i=num-2;i>=0;i--)//start from 1 row
			if(board[i][j]!=0){
				for(var k=num-1;k>i;k--){
					if(board[k][j]==0&&noBlockVertical(j,i,k,board)){
						//move
						
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];//just move it
						board[i][j]=0;
						continue;
					}else if(board[k][j]==board[i][j]&&noBlockVertical(j,i,k,board)&&!hasConflicted[k][j]){
						//move
						showMoveAnimation(i,j,k,j);
						//add
						board[k][j]+=board[i][j];//add them
						board[i][j]=0;
						
						//add score
						score +=board[k][j];
						updateScore(score);
						
						hasConflicted[k][j]=true;
						continue;
					}
				}
			}
			
	setTimeout("updateBoardView()",200);
	return true;
}