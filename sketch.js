//-Work on scaling...


//Preload variables...
var ImgBackground,ImgChange;
var SndFlip,SndDrop;


//Coin image and flip variables...
var flipChangeW,flipChangeH;
var flipChangeY;
var ChangeSpeedY;
var ChangeSpeedH;
var DimMultiplier,DimMultiplierSpeed;//Between 1 to 1.5

//State checker and extra variables...
var RisingState;
var ChangeState;
var flipCounter;
var rand;
function preload(){
	ImgBackground=loadImage("Assets/Background.jpg");
	ImgChange=loadImage("Assets/Change.png");
	SndFlip=loadSound("Assets/CoinFlip.mp3");
	SndDrop=loadSound("Assets/CoinDrop.mp3");
}

function setup() {
	createCanvas(600,600);
	frameRate(60);
	flipChangeW=150;
	flipChangeH=150;
	RisingState=false;
	ChangeState=false;
	flipChangeY=height+100;
	flipCounter=0;
	ChangeSpeedH=0;
	ChangeSpeedY=0;
	DimMultiplier=1;
	DimMultiplierSpeed=0;
	rand=null;
	button = createButton("Flip it!");
	button.position(width/2-75,10);
	button.size(150,50)
	button.style("font-size", "25px");
	button.mousePressed(FlipAgain);
}

function draw(){
	imageMode(CORNER);
	background(ImgBackground);
	flipChange();
}

function flipChange(){
		if(rand == null)
			rand=(Math.floor(Math.random()*2)+1)+6;
		imageMode(CENTER);
		if(!ChangeState)
			image(ImgChange,width/2,flipChangeY,flipChangeW*DimMultiplier,flipChangeH*DimMultiplier,0,0,331,322);
		else
			image(ImgChange,width/2,flipChangeY,flipChangeW*DimMultiplier,flipChangeH*DimMultiplier,345,0,331,322);
		flipChangeY-=ChangeSpeedY;
		//Animation part...
		if(!RisingState){//Change's height getting smaller and also changing the face of change.
			flipChangeH-=ChangeSpeedH;
			if(flipChangeH<5){
				RisingState=true
				ChangeState=!ChangeState}}
		if(RisingState){//Change's height getting bigger
			flipChangeH+=ChangeSpeedH;
			if(flipChangeH>150){
				RisingState=false;
				flipCounter+=1;}}
		if(flipCounter==rand){
			SndDrop.play();
			flipChangeH=150;
			DimMultiplier=1;
			ChangeSpeedH=0;
			ChangeSpeedY=0;
			DimMultiplierSpeed=0;
			rand=0;
			}
		if(rand%2==1){	
		if(flipCounter<rand/2)//Adding some values to the Multiplier because the rand value is odd.
			DimMultiplier+=DimMultiplierSpeed+0.003;
		else
			DimMultiplier-=DimMultiplierSpeed+0.0065;}
		else{
		if(flipCounter<rand/2)	
			DimMultiplier+=DimMultiplierSpeed;
		else
			DimMultiplier-=DimMultiplierSpeed;}	
		}
function FlipAgain(){
	flipChangeW=150;
	flipChangeH=150;
	RisingState=false;
	ChangeState=false;
	flipChangeY=height+100;
	DimMultiplier=1;
	DimMultiplierSpeed=0.008;
	flipCounter=0;
	ChangeSpeedH=15;
	ChangeSpeedY=3;
	rand=null;
	SndFlip.play();
}		