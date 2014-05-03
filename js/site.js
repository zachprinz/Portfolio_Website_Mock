Site = function(width,height,ctx){
	this.series = [50];
	this.seriesCount = 0;
	this.parse();
	this.width = width;
	this.height = height;
	this.currentSeries = 0;
	this.imageWidth = this.width/3.3;
	this.imageHeight = this.height/1.8;
	this.ctx = ctx;
	this.loadedCount = 0;
	this.shiftRight();
};

Site.prototype = {
	draw: function(ctx){
		console.log("Drawing!");
		//context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
		ctx.clearRect(0, 0, this.width, this.height);
		var previous = null;
		var next = null;
		var up = null;
		var down = null;
		var tempSeries = this.series[this.currentSeries];
		if(this.currentSeries > 0)
			previous = this.series[this.currentSeries - 1].getImage(0);
		if(this.currentSeries + 1 < this.seriesCount)
			next = this.series[this.currentSeries + 1].getImage(0);
		if(tempSeries.currentImage + 1 < tempSeries.imageCount)
			up = tempSeries.getImage(1);
		if(tempSeries.currentImage > 0)
			down = tempSeries.getImage(-1);
		//Main Image
		ctx.drawImage(this.getImage(),1.25*this.imageWidth,0.4 * this.imageHeight,this.imageWidth,this.imageHeight);
		//Left Image
		if(previous != null){
			ctx.drawImage(previous,0.15*this.imageWidth,0.55 * this.imageHeight,0.85*this.imageWidth,0.85*this.imageHeight);
		}
		//Right Image
		if(next != null){
			ctx.drawImage(next,2.3*this.imageWidth,0.55 * this.imageHeight,0.85*this.imageWidth,0.85*this.imageHeight);
		}
		//Top Image
		if(up != null){
			ctx.drawImage(up,1.38*this.imageWidth,-0.6 * this.imageHeight,0.85*this.imageWidth,0.85*this.imageHeight);
		}
		//Bottom Image
		if(down != null){
					ctx.drawImage(down,1.38*this.imageWidth,1.55 * this.imageHeight,0.85*this.imageWidth,0.85*this.imageHeight);
		}
	},
	parse: function(){
		var client = new XMLHttpRequest();
		var xmlDoc;
		client.open('GET',"js/xml/website.xml",false);//"http://lavelle.azurewebsites.net/js/xml/website.xml",false);
		client.send();
		var siteInfo = (client.responseXML);
		var seriesLength = parseInt(siteInfo.getElementsByTagName("site")[0].getAttribute("length"));
		for(var x = 0; x < seriesLength; x++){
			var tempSeries = new Series(this);
			tempSeries.name = siteInfo.getElementsByTagName("series")[x].getAttribute("name");
			tempSeries.description = siteInfo.getElementsByTagName("series")[x].getAttribute("description");
			tempSeries.imagesXML = siteInfo.getElementsByTagName("series")[x].getElementsByTagName("image");
			console.log("Series: " + x);
			for(var y = 0; y < tempSeries.imagesXML.length; y++){
				console.log("Image: " + y);
				var tempImage = new SeriesImage(tempSeries);
				tempImage.name = tempSeries.imagesXML[y].getAttribute("name");
				tempImage.description = tempSeries.imagesXML[y].getAttribute("description");
				tempImage.path = tempSeries.imagesXML[y].getAttribute("path");
				tempImage.setup();
				tempSeries.addImage(tempImage);
			}
			this.series[this.seriesCount] = tempSeries;
			this.seriesCount++;
		}
	},
	shiftUp: function(){
		if(this.series[this.currentSeries].currentImage < (this.series[this.currentSeries].imageCount - 1))
			this.series[this.currentSeries].currentImage++;
	},
	shiftDown: function(){
		if(this.series[this.currentSeries].currentImage > 0)
			this.series[this.currentSeries].currentImage--;
	},
	shiftLeft: function(){
		if(this.currentSeries > 0){
			this.series[this.currentSeries].currentImage = 0;
			this.currentSeries--;
		}
	},
	shiftRight: function(){
		if(this.currentSeries < (this.seriesCount - 1)){
			this.series[this.currentSeries].currentImage = 0;
			this.currentSeries++;
		}
	},
	getImage: function(){
		var currentImage = this.series[this.currentSeries].currentImage;
		return this.series[this.currentSeries].images[currentImage].image;
	},
	updateDraw: function(){
		console.log("Updating Draw");
		this.loadedCount++;
		if(this.loadedCount > 3)
			this.draw(this.ctx);
	}
}