//prevent submission with enter
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});

var isNS = (navigator.appName == "Netscape") ? 1 : 0;

if(navigator.appName == "Netscape") document.captureEvents(Event.MOUSEDOWN||Event.MOUSEUP);

function mischandler(){
return false;
}
//prevent right click
function mousehandler(e){
  var myevent = (isNS) ? e : event;
  var eventbutton = (isNS) ? myevent.which : myevent.button;
  if((eventbutton==2)||(eventbutton==3)) return false;
  }
  document.oncontextmenu = mischandler;
  document.onmousedown = mousehandler;
  document.onmouseup = mousehandler;
  var isCtrl = false;
  document.onkeyup=function(e)
  {
  if(e.which == 17)
  isCtrl=false;
  }
  
  //prevent ctrl a to select all 
  document.onkeydown=function(e)
  {
  if(e.which == 17)
  isCtrl=true;
  if(((e.which == 85) || (e.which == 117) || (e.which == 65) || (e.which == 97) || (e.which == 67) || (e.which == 99)) && isCtrl == true)
  {
  // alert(‘Keyboard shortcuts are cool!’);
  return false;
  }
  }

//add password and variations
function password(){
  var pass = document.getElementById("pass").value;

if(pass == "TARDIS"){
            window.location.href="about.html"
} else if  
  (pass === "Tardis"){
    window.location.href="about.html"
} else if  
(pass === "tardis"){
  window.location.href="about.html"
   }else{
    alert("Incorrect. Try again");
    }
}
function myFunction() {
  var x = document.getElementById("pass");
  if (x.type === "pass") {
    x.type = "text";
  } else {
    x.type = "pass";
  }
}


 


