var realTwin = 0;
var body;
var player = 0;
var comp = 0;
//<img src="" alt="twin" height="497" width="280">
init();
function init(){
  randomize();
  body = document.getElementsByTagName("body")[0];
}
function chose(twin){ //1-annie, 2-katie, 3-nadia
  if(twin == realTwin){
    player++
  }else {
    comp++
  }
  draw();
  write();
  randomize();
}
function randomize(){
  realTwin = Math.ceil(Math.random()*3);
}
function write(){
  document.getElementById("player").innerHTML = player;
  document.getElementById("comp").innerHTML = comp;
}
function draw(){
  var img = document.createElement("img");
  body.appendChild(img);
  if(realTwin == 1){
    img.src = "annie.jpg";
  }else if(realTwin == 2){
    img.src = "katie.jpg";
  }else {
    img.src = "nadia.jpg";
  }
  img.alt = "twin";
  img.style.height = "497px";
  img.style.width = "280px";
  img.style.position = "absolute";
  img.style.top = Math.floor(Math.random()*(screen.height-497))+"px";
  img.style.left = Math.floor(Math.random()*(screen.width-280))+"px";
  var rotate = Math.floor(Math.random()*360);
  img.style.transform = "rotate("+rotate+"deg)";
  img.style.zIndex = -1;
  console.log(rotate);
}
