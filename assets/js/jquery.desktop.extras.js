// Get the button that opens the modal
var btnsettings = document.getElementById("myBtnSettings");
// When the user clicks the button, open the modal 
btnsettings.onclick = function() {
  myNotify('open Settings dialog..');
}

function openFullscreen() {
var elem = document.getElementById("body");
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
	myNotify('Goes Fullscreen..');
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
	myNotify('Goes Fullscreen..');
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
	myNotify('Goes Fullscreen..');
  }
}
/* Get into full screen */
function GoInFullscreen(element) {
	if(element.requestFullscreen)
		element.requestFullscreen();
	else if(element.mozRequestFullScreen)
		element.mozRequestFullScreen();
	else if(element.webkitRequestFullscreen)
		element.webkitRequestFullscreen();
	else if(element.msRequestFullscreen)
		element.msRequestFullscreen();
}

/* Get out of full screen */
function GoOutFullscreen() {
	if(document.exitFullscreen)
		document.exitFullscreen();
	else if(document.mozCancelFullScreen)
		document.mozCancelFullScreen();
	else if(document.webkitExitFullscreen)
		document.webkitExitFullscreen();
	else if(document.msExitFullscreen)
		document.msExitFullscreen();
}

/* Is currently in full screen or not */
function IsFullScreenCurrently() {
	var full_screen_element = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || null;
	
	// If no element is in full-screen
	if(full_screen_element === null)
		return false;
	else
		return true;
}

$("#go-button").on('click', function() {
	if(IsFullScreenCurrently())
		GoOutFullscreen();
	else
		GoInFullscreen($("body").get(0));
});

$(document).on('fullscreenchange webkitfullscreenchange mozfullscreenchange MSFullscreenChange', function() {
	if(IsFullScreenCurrently()) {
		//$("#container span").text('Full Screen Mode Enabled');
		myNotify('Full Screen Mode Enabled..');
		$("#go-button").text('Disable Full Screen');
	}
	else {
		//$("#container span").text('Full Screen Mode Disabled');
		myNotify('Full Screen Mode Disabled..');
		$("#go-button").text('Enable Full Screen');
	}
});

      const contextMenu = document.getElementById("context-menu");
      const scope = document.querySelector("body");

      const normalizePozition = (mouseX, mouseY) => {
        // ? compute what is the mouse position relative to the container element (scope)
        let {
          left: scopeOffsetX,
          top: scopeOffsetY,
        } = scope.getBoundingClientRect();
        
        scopeOffsetX = scopeOffsetX < 0 ? 0 : scopeOffsetX;
        scopeOffsetY = scopeOffsetY < 0 ? 0 : scopeOffsetY;
       
        const scopeX = mouseX - scopeOffsetX;
        const scopeY = mouseY - scopeOffsetY;

        // ? check if the element will go out of bounds
        const outOfBoundsOnX =
          scopeX + contextMenu.clientWidth > scope.clientWidth;

        const outOfBoundsOnY =
          scopeY + contextMenu.clientHeight > scope.clientHeight;

        let normalizedX = mouseX;
        let normalizedY = mouseY;

        // ? normalize on X
        if (outOfBoundsOnX) {
          normalizedX =
            scopeOffsetX + scope.clientWidth - contextMenu.clientWidth;
        }

        // ? normalize on Y
        if (outOfBoundsOnY) {
          normalizedY =
            scopeOffsetY + scope.clientHeight - contextMenu.clientHeight;
        }

        return { normalizedX, normalizedY };
      };

      scope.addEventListener("contextmenu", (event) => {
        event.preventDefault();

        const { clientX: mouseX, clientY: mouseY } = event;

        const { normalizedX, normalizedY } = normalizePozition(mouseX, mouseY);

        contextMenu.classList.remove("visible");

        contextMenu.style.top = `${normalizedY}px`;
        contextMenu.style.left = `${normalizedX}px`;

        setTimeout(() => {
          contextMenu.classList.add("visible");
        });
      });

      scope.addEventListener("click", (e) => {
        // ? close the menu if the user clicks outside of it
        if (e.target.offsetParent != contextMenu) {
          contextMenu.classList.remove("visible");
        }
      });