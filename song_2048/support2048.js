documentWidth=window.screen.availWidth;
gridContainerWidth = 0.92*documentWidth;
cellSideLength = 0.18*documentWidth;
cellSpace = 0.04*documentWidth;

function getPosTop(i,j){
	return cellSpace+i*(cellSpace+cellSideLength);
}

function getPosLeft(i,j){
	return cellSpace+j*(cellSpace+cellSideLength);
}

function getNumberBackgroundColor( number ){
    switch( number ){
        case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
        case 4096:return "#a6c";break;
        case 8192:return "#93c";break;
    }

    return "black";
}
/*
function getText( number ){
    switch( number ){
        case 2:return "baby";break;
        case 4:return "kid";break;
        case 8:return "teen";break;
        case 16:return "adult";break;
        case 32:return "fighter";break;
        case 64:return "master";break;
        case 128:return "monster";break;
        case 256:return "king";break;
        case 512:return "god";break;
        case 1024:return "creator";break;
        case 2048:return "editor";break;
        case 4096:return "me";break;
        case 8192:return "mywife";break;
    }

    return null;
}
*/
function getNumberColor( number ){
    if( number <= 4 )
        return "#776e65";

    return "white";
}

function nospace(board){
	for(var i=0;i<num;i++)
		for(var j=0;j<num;j++)
			if(board[i][j]==0)
				return false;
				
	return true;
}

function canMoveLeft(board){
	for(var i=0;i<num;i++)
		for(var j=1;j<num;j++)//start from 1 col
			if(board[i][j] != 0)
				if(board[i][j-1]==0||board[i][j-1]==board[i][j])return true;
				
	
	return false;
}
function canMoveRight(board){
	for(var i=0;i<num;i++)
		for(var j=num-2;j>=0;j--)//start from n-2 col
			if(board[i][j] != 0)
				if(board[i][j+1]==0||board[i][j+1]==board[i][j])return true;
				
	
	return false;
}

function canMoveUp(board){
	for(var j=0;j<num;j++)
		for(var i=1;i<num;i++)//start from 1 row
			if(board[i][j] != 0)
				if(board[i-1][j]==0||board[i-1][j]==board[i][j])return true;
				
	
	return false;
}

function canMoveDown(board){
	for(var j=0;j<num;j++)
		for(var i=num-2;i>=0;i--)//start from n-2 col
			if(board[i][j] != 0)
				if(board[i+1][j]==0||board[i+1][j]==board[i][j])return true;
				
	
	return false;
}

function noBlockHorizontal(row,col1,col2,board){
	for(var i=col1+1;i<col2;i++)
		if(board[row][i]!=0)return false;
	return true;
}

function noBlockVertical(col,row1,row2,board){
	for(var i=row1+1;i<row2;i++)
		if(board[i][col]!=0)return false;
	return true;
}

function nomove(board){
	if(canMoveDown(board)||canMoveLeft(board)||canMoveRight(board)||canMoveUp(board))return false;
	return true;
}