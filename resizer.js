// http://jsfiddle.net/emilszymecko/ek3o7nuy/62/

const url = "http://i.imgur.com/SHo6Fub.jpg"

const sizes = {width:300,height:234,move:50,to:100,direct:"u"}

const imgLoad = (url) => ({width,height,move,to,direct}) => {
	
  var img = new Image();
	img.src = `${url}`;
	img.onload = () => {

	const diff = to - move;
		
	const canvas = document.createElement('canvas');
	const canvas2 = document.createElement('canvas');
	const canvasAll = document.createElement('canvas');
  
  const ctx = canvas.getContext('2d');
	const ctx2 = canvas2.getContext('2d');
	const ctxAll = canvasAll.getContext('2d');
	
const directCtx =  direct === "u"? [img, 0, -(move), width, height] : direct === "d" ? [img, 0, 0, width, height] : direct === "l"? [img, -(move), 0, width, height] : direct === "r" ? [img, 0, 0, width, height] : [img, 0, 0, width, height]
const directCtx2 =  direct === "u"? [img, 0, 0, width, height] : direct === "d" ? [img, 0, -(height - move), width, height] : direct === "l"? [img, 0 , 0, width, height] : direct === "r" ? [img, -(width-move) , 0, width, height] : [img, 0, 0, width, height]
const directAllCanvas2 =  direct === "u"? [canvas2, 0, 0, width, to] : direct === "d" ? [canvas2, 0, height-move, width, to] : direct === "l"? [canvas2, 0, 0, to, height] : direct === "r" ? [canvas2, width-move, 0, to, height] : [canvas2, 0, 0, width, to]
const directAllCanvas =  direct === "u"? [canvas, 0, to, width, height] : direct === "d" ? [canvas, 0, 0, width, height-move] : direct === "l"? [canvas, to, 0, width, height] : direct === "r" ? [canvas, 0, 0, width-move, height] : [canvas, 0, to, width, height]
    
    canvas.width= direct === "l" ? width - move : direct === "r" ? width - move : width
    canvas.height= direct === "u" ? height : direct === "d" ? height - move : height
		
    canvas2.width= direct === "l" ? move : direct === "r" ? move : width
    canvas2.height = direct === "u" ? move : direct === "d" ? move : height

		canvasAll.width= direct === "l" ? width + (to-move)  : direct === "r" ? width + (to-move) : width
  	canvasAll.height= direct === "u" ? height+(diff) : direct === "d" ? height+(diff) : height  // albo 'to'

		ctx2.drawImage(...directCtx2);
		ctx.drawImage(...directCtx);
    
  	ctxAll.drawImage(...directAllCanvas2);
		ctxAll.drawImage(...directAllCanvas);

  	//alert(to)
  	//alert(this.width + 'x' + this.height);
		document.body.appendChild(canvasAll);
	}

}

imgLoad(url)(sizes)
