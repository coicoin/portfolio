
/* zoomer */
function magnify(imgId, zoomerId, zoom) {
  const img = document.getElementById(imgId);
  const zoomer = document.getElementById(zoomerId);

  img.addEventListener('load', function () {
    zoomer.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mousemove", moveMagnifier);
    zoomer.addEventListener("touchmove", moveMagnifier);
    img.addEventListener("touchmove", moveMagnifier);

    function moveMagnifier(e) {
      zoomer.style.backgroundImage = "url('" + img.src + "')";
      zoomer.style.backgroundRepeat = "no-repeat";
      zoomer.style.backgroundSize = `${img.width * zoom}px ${img.height * zoom}px`;

      let bw = zoomer.style.borderWidth;
      let zoomerMiddleWidth = zoomer.offsetWidth / 2;
      let zoomerMiddleHeight = zoomer.offsetHeight / 2;

      e.preventDefault();
      /* get x and y positions */
      let pos = getCursorPos(e);
      console.log(pos);
      let x = pos.x;
      let y = pos.y;
      /* avoid overflow */
      if (x > img.offsetWidth - (zoomerMiddleWidth / zoom)) {
        x = img.offsetWidth - (zoomerMiddleWidth / zoom);
      }
      if (x < zoomerMiddleWidth / zoom) {
        x = zoomerMiddleWidth / zoom;
      }
      if (y > img.offsetHeight - (zoomerMiddleHeight / zoom)) {
        y = img.offsetHeight - (zoomerMiddleHeight / zoom);
      }
      if (y < zoomerMiddleHeight / zoom) {
        y = zoomerMiddleHeight / zoom;
      }
      /* zoomer position */
      zoomer.style.left = `${x - zoomerMiddleWidth}px`;
      zoomer.style.top = `${y - zoomerMiddleHeight}px`;
      zoomer.style.backgroundPosition = `-${(x * zoom - zoomerMiddleWidth + bw)}px -${(y * zoom - zoomerMiddleHeight + bw)}px`;
    }

    function getCursorPos(e) {
      e = e || window.event;
      /* get x and y */
      let a = img.getBoundingClientRect();
      /* calc x and y related to cursor */
      let x = e.pageX - a.left;
      let y = e.pageY - a.top;
      /* consider any page scrolling: */
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return { x: x, y: y };
    }
  });
}

magnify("footer__img", "footer__img-zoomer", 3);