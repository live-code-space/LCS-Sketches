let str = [
	'Welcome to the Open Studio Day 2022 \nWelcome to the Open Studio Day 2022 \n Welcome to the Open Studio Day 2022 \n Welcome to the Open Studio Day 2022 \nWelcome to the Open Studio Day 2022 \n Welcome to the Open Studio Day 2022 \nWelcome to the Open Studio Day 2022 \nWelcome to the Open Studio Day 2022 \nWelcome to the Open Studio Day 2022'				
];
let charNums;
let startCount;
let margin = 100;
let url = "https://coolors.co/d12a2a-ed5a5a-020235-a4bdb6-71ab9b";
let cols;
let offset = 50;
let tSize = 32;

function setup()
{
	createCanvas(windowWidth, windowHeight);
	frameRate(30);
	textFont('Courier');
	cols = createCols(url);
	init();
}

function draw() {
	background(0);
	
	let drawPos = createVector(margin,margin);
	for(let i = 0; i < charNums.length; i++)
	{
		//culclate offset
		let offseti = offset + i * 2 -(frameCount - startCount);
		if(offseti > offset) break;
		else if(offseti < 0)
		{
			offseti = 0;
			let n = noise((frameCount-startCount)/100,i);
			if(n<0.2)offseti += n*100;
		}
		//char parameter 
		let col = '#fffff';
		let ch = char(charNums[i] + offseti);
		let size = tSize;
		if(offseti > 0) col = cols[int(random(cols.length))];
		//draw char
		fill(col);
		textSize(size);
		text(ch,drawPos.x,drawPos.y);
		drawPos.x += textWidth(char(charNums[i]));

		if(drawPos.x > width-margin || char(charNums[i]) == '\n')
		{
			drawPos.x = margin;
			drawPos.y += tSize*2;
		}
	}//end for
}

function init()
{
	//let i = int(random(str.length)); //another loop through string
  for (let i = 0; i < str.length; i++) {
    charNums = unchar(split(str[i],''))
    console.log(charNums);
    startCount = frameCount;
    break;
  }
	
}
//generate pallete from urlx
function createCols(_url) {
  let slash_index = _url.lastIndexOf('/');
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split('-');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = '#' + arr[i];
  }
  return arr;
}