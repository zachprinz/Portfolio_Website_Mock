var site = new Site();

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.fillStyle = "#FF0000";
ctx.fillRect(0,0,150,75);
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = 500;
//context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);

window.addEventListener('keydown', (function(event){
  switch (event.keyCode) {
    case 37: // Left
      shift(-1,0);
    break;
    case 38: // Up
      shift(0,1);
    break;
    case 39: // Right
      shift(1,0);
    break;
    case 40: // Down
      shift(0,-1);
    break;
  }
}), false);

var shift = function(x,y){
	if(x > 0)
		site.shiftRight();
	if(x < 0)
		site.shiftLeft();
	if(y > 0)
		site.shiftUp();
	if(y < 0)
		site.shiftDown()
	ctx.drawImage(site.getImage(),0,0);
};

var enlarge = function(){

};