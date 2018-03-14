function setGender(gender){
  document.getElementById("gender").innerHTML = gender;
  if (gender == "he") {
    document.getElementsByTagName("html")[0].style.color = 'blue';
  }else if (gender == "she") {
    document.getElementsByTagName("html")[0].style.color = 'pink';
  }else {
    document.getElementsByTagName("html")[0].style.color = 'yellow';
  }
}
function setLove(love){
  document.getElementById("love").innerHTML = love;
  if (love == "yes") {
    document.getElementsByTagName("html")[0].style.backgroundColor = 'pink';
  }else if (love == "no") {
    document.getElementsByTagName("html")[0].style.backgroundColor = 'gray';
  }else {
    document.getElementsByTagName("html")[0].style.backgroundColor = 'white';
  }
}
