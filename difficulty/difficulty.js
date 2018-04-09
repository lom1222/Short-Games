


init();
function init(){
  makeChart();
}

function makeChart(){
  var mainDiv = document.getElementById("chart");
  for(var tier = 0;tier< 5;tier++){
    var baseDif = 100;
    var tierDiv = document.createElement("div");
    tierDiv.className = "tierDiv";
    mainDiv.appendChild(tierDiv);
    for(var num = 0;num<15;num++){
      var div = document.createElement("div");
      div.className = "boss";
      div.style.backgroundColor = "rgb(+"+Math.round(Math.log(baseDif*Math.pow(1.75,tier))*50-200)+","+(455-Math.round(Math.log(baseDif*Math.pow(1.75,tier))*50))+",0)";
      var string = document.createElement("p");
      string.className = "bossDif";
      string.innerHTML = Math.round(baseDif*Math.pow(1.75,tier)) + "%";
      div.appendChild(string);
      tierDiv.appendChild(div);
      baseDif *= 1.1;
      baseDif += 10;
    }
  }
}

function calc(){
  var tier = document.getElementById("bossTier").value;
  var num = document.getElementById("bossNum").value;
  var dif = 100;
  for(var x = 1;x<num;x++){
    dif *=1.1;
    dif += 10;
  }
  document.getElementById("bossDif").innerHTML = dif*Math.pow(1.75,tier-1)+"%";
}
