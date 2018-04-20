


init()
function init(){
  hideEmptyTalents();
  addTooltips();
  addImgs();
  addLevelIndicators();
  addButtons();
}

function hideEmptyTalents(){
  let talents = document.getElementsByClassName("talent");
  for(let x = 0;x<talents.length;x++){
    if(talents[x].id==""){
      talents[x].style.visibility = "hidden";
      talents[x].id = "empty";
    }
  }
  console.log("hiden empty talents");
}

function addImgs(){
  let talents = document.getElementsByClassName("talent");
  for(let x = 0;x<talents.length;x++){
    let img = document.createElement("img");
    img.src = "images/"+talents[x].id+".png";
    img.alt = talents[x].id+"";
    img.height = 50;
    img.width = 50;
    talents[x].appendChild(img);
  }
  console.log("got images");
}

function addLevelIndicators(){
  let talents = document.getElementsByClassName("talent");
  for(let x = 0;x<talents.length;x++){
    let levelIndicator = document.createElement("p");
    levelIndicator.className = "levelIndicator";
    levelIndicator.innerHTML = "0";
    talents[x].appendChild(levelIndicator);
  }
  console.log("got canvases");
}

function addTooltips(){
  let talents = document.getElementsByClassName("talent");
  for(let x = 0;x<talents.length;x++){
    let tooltip = document.createElement("p");
    tooltip.className = "tooltip";
    tooltip.innerHTML = talents[x].innerHTML;
    talents[x].innerHTML = "";
    talents[x].appendChild(tooltip);
  }
  console.log("got tooltips");
}

function addButtons(){
  let talents = document.getElementsByClassName("talent");
  for(let x = 0;x<talents.length;x++){
    let buttonDiv = document.createElement("div");
    buttonDiv.className = "buttonDiv";
    let button = document.createElement("button");
    button.className = "plusButton";
    let key = talents[x].id;
    button.onclick = new Function("addTalentLevel("+key+")");
    button.innerHTML = "+";
    buttonDiv.appendChild(button);
    button = document.createElement("button");
    button.className = "minusButton";
    button.onclick = new Function("subtractTalentLevel("+key+")");
    button.innerHTML = "-";
    buttonDiv.appendChild(button);
    talents[x].appendChild(buttonDiv);
  }
  console.log("got buttons");
}

function addTalentLevel(key){
  console.log(key.id);
  let talent = key;
  if(key.id==undefined){
    talent = document.getElementById(key);
  }
  let levelIndicator = talent.getElementsByClassName("levelIndicator")[0];
  levelIndicator.innerHTML = (parseInt(levelIndicator.innerHTML)+1)+"";
  if(parseInt(levelIndicator.innerHTML)>0){
    talent.style.borderColor = "red";
    talent.style.borderWidth = "6px";
    talent.style.margin = "10px";
  }else{
    talent.style.borderColor = "gray";
    talent.style.borderWidth = "3px";
    talent.style.margin = "13px";
  }
  document.getElementById("level").innerHTML = parseInt(document.getElementById("level").innerHTML)+1;
}

function subtractTalentLevel(key){
  console.log(key.id);
  let talent = key;
  let levelIndicator = talent.getElementsByClassName("levelIndicator")[0];
  levelIndicator.innerHTML = (parseInt(levelIndicator.innerHTML)-1)+"";
  if(parseInt(levelIndicator.innerHTML)<0){
    levelIndicator.innerHTML = "0";
  }else if(parseInt(levelIndicator.innerHTML)>0){
    talent.style.borderColor = "red";
    talent.style.borderWidth = "6px";
    talent.style.margin = "10px";
    document.getElementById("level").innerHTML = parseInt(document.getElementById("level").innerHTML)-1;
  }else{
    talent.style.borderColor = "gray";
    talent.style.borderWidth = "3px";
    talent.style.margin = "13px";
    document.getElementById("level").innerHTML = parseInt(document.getElementById("level").innerHTML)-1;
  }
}

function importBuild(){
  console.log("import");
  let temp = document.getElementById("buildCode").value;
  let save = JSON.parse(atob(temp))
  //console.log(save);
  reset();
  for(let x = 0;x<save.talentNames.length;x++){
    for(let y = 0;y<save.talentLevels[x];y++){
      addTalentLevel(save.talentNames[x]);
    }
  }
  //var temp = JSON.parse(atob(localStorage.entropySave));
}

function reset(){
  console.log("reset");
  let talents = document.getElementsByClassName("talent");
  for(let x = 0;x<talents.length;x++){
    talents[x].getElementsByClassName("levelIndicator")[0].innerHTML="0";
    talents[x].style.borderColor = "gray";
    talents[x].style.borderWidth = "3px";
    talents[x].style.margin = "13px";
  }
  document.getElementById("level").innerHTML = "1";
}

function exportBuild(){
  console.log("export");
  let save = {
    talentNames : [],
    talentLevels : []
  };
  let talents = document.getElementsByClassName("talent");
  for(let x = 0;x<talents.length;x++){
    if(talents[x].id!="empty"&&talents[x].getElementsByClassName("levelIndicator")[0].innerHTML!="0"){
      save.talentNames.push(talents[x].id);
      save.talentLevels.push(talents[x].getElementsByClassName("levelIndicator")[0].innerHTML);
    }
  }
  let temp = btoa(JSON.stringify(save));
  //console.log(save);
  //console.log("save = "+temp);
  document.getElementById("buildCode").value = temp;
}
