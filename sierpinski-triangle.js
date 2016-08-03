var fractalSierpinskiTriangle = {
    name: "Sierpinski's Triangle",
    draw: function(context, canvasWidth, canvasHeight) {
        var maxIterations = 8;

        var width  = Math.min(canvasWidth, canvasHeight * (2 / Math.sqrt(3))) - 100;
        var height = width * (Math.sqrt(3) / 2)

        var startX = (canvasWidth / 2);
        var startY = (canvasHeight / 2) - (height / 2);

        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(startX - (width / 2), startY + (height));
        context.lineTo(startX + (width / 2), startY + (height));
        context.closePath();

        context.fillStyle = 'white';
        context.fill()

        iterate(startX, startY, width, 0);

        function iterate(startX, startY, width, iterations) {
            if (iterations > maxIterations) {
                return;
            }

            var offsetX = width / 4;
            var offsetY = width * (Math.sqrt(3) / 2);

            context.beginPath();
            context.moveTo(startX, startY + offsetY);
            context.lineTo(startX - offsetX, startY + (offsetY / 2));
            context.lineTo(startX + offsetX, startY + (offsetY / 2));
            context.closePath();

            context.fillStyle = 'black';
            context.fill();

            [
                { x: startX,               y: startY               },
                { x: startX - (width / 4), y: startY + (offsetY / 2) },
                { x: startX + (width / 4), y: startY + (offsetY / 2) },
            ].forEach(function(point){
                iterate(point.x, point.y, width / 2, iterations + 1);
            });
        }
    }
};

fractals.push(fractalSierpinskiTriangle);
