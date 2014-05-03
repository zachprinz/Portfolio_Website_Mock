
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.fillStyle = "#FF0000";
ctx.fillRect(0,0,150,75);
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = 500;
var site = new Site(window.innerWidth,500,ctx);
var infoPanel = document.getElementById("myInfo");
var infoImagePanel = document.getElementById("imageInfo");
var infoSeriesPanel = document.getElementById("seriesInfo");
var canvasDiv = document.getElementById("art");
infoPanel.style.height=(window.innerHeight-580)+"px";
infoSeriesPanel.style.height=(window.innerHeight-580)+"px";
infoImagePanel.style.height=(window.innerHeight-580)+"px";
console.log(infoPanel.height + "px");
var getSite = function(){
	return this.site;
};
c.onclick=function(){
	getSite().drawLarge();
};
window.onresize=function(){
	updateSize()
};
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
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
	var enlarged = false;
	if(site.isEnlarged){
		site.drawLarge();
		enlarged = true;
	}
	if(x > 0)
		site.shiftRight();
	if(x < 0)
		site.shiftLeft();
	if(y > 0)
		site.shiftUp();
	if(y < 0)
		site.shiftDown()
	if(enlarged)
		site.drawLarge();
	else
	site.draw(ctx);
};
var enlarge = function(){

};
var updateSize = function(){
	site.reset(window.innerWidth,500);
};

