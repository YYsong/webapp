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
				theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
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

$(document).keydown(function(event){
	switch(event.keyCode){
		case 37://left
			if( moveLeft()){
				generateOneNumber();
				isgameover();
			}
			break;
		case 38://up
			if(moveUp()){
				generateOneNumber();
				isgameover();
			}
			break;
		case 39://right
			if(moveRight()){
				generateOneNumber();
				isgameover();
			}
			break;
		case 40://down
			if(moveDown()){
				generateOneNumber();
				isgameover();
			}
			break;
		default: //default
			break;
	
	}
});

function isgameover(){

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
					}else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,k,j,board)){
						//move
						showMoveAnimation(i,j,i,k);
				
						//add
						board[i][k]+=board[i][j];//add them
						board[i][j]=0;
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
					}else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,j,k,board)){
						//move
						showMoveAnimation(i,j,i,k);
				
						//add
						board[i][k]+=board[i][j];//add them
						board[i][j]=0;
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
					}else if(board[k][j]==board[i][j]&&noBlockVertical(j,k,i,board)){
						//move
						showMoveAnimation(i,j,k,j);
				
						//add
						board[k][j]+=board[i][j];//add them
						board[i][j]=0;
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
					}else if(board[k][j]==board[i][j]&&noBlockVertical(j,i,k,board)){
						//move
						showMoveAnimation(i,j,k,j);
						//add
						board[k][j]+=board[i][j];//add them
						board[i][j]=0;
						continue;
					}
				}
			}
			
	setTimeout("updateBoardView()",200);
	return true;
}