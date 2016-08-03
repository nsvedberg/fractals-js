var fractals = [];

window.onload = function(){
    var visibleFractal = fractalUMCTriangle;

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    function redraw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        visibleFractal.draw(context, canvas.width, canvas.height);
    }

    var fractalList = document.getElementById('fractal-list');

    fractals.forEach(function(fractal){
        var newListItem = document.createElement('li');
        var newLink = document.createElement('a');

        newLink.textContent = fractal.name;

        newLink.href = '#';

        newLink.onclick = function(){
            visibleFractal = fractal;
            redraw();
        };

        newListItem.appendChild(newLink);
        fractalList.appendChild(newListItem);
    });

    /* resizeRunning is to throttle handling the resize event - so if the
       resize event is spammed, the page doesn't lag out trying to draw the
       fractal a bunch of times.

       See https://developer.mozilla.org/en-US/docs/Web/Events/resize .
    */

    var resizeRunning = false;

    window.onresize = function(){
        if (!resizeRunning) {
            resizeRunning = true;

            window.requestAnimationFrame(function(){
                var canvas = document.getElementById('canvas');

                canvas.width = canvas.clientWidth;
                canvas.height = canvas.clientHeight;

                redraw();

                resizeRunning = false;
            });
        }
    }

    window.dispatchEvent(new Event('resize'));
}
