var fractalUMCTriangle = {
    name: "Uniform Mass Center Triangle",
    draw: function(context, canvasWidth, canvasHeight) {
        var maxIterations = 7;

        context.lineWidth = 0.2;

        var width  = Math.min(canvasWidth, canvasHeight * (2 / Math.sqrt(3))) - 100;
        var height = width * (Math.sqrt(3)/2)

        var startX = (canvasWidth / 2);
        var startY = (canvasHeight / 2) - (width * (Math.sqrt(3) / 2) / 2);

        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(startX - (width / 2), startY + (width * (Math.sqrt(3)/2)));
        context.lineTo(startX + (width / 2), startY + (width * (Math.sqrt(3)/2)));
        context.closePath();

        context.fillStyle = 'black';
        context.fill();

        context.strokeStyle = 'white';
        context.stroke();

        iterate([
                {x: startX, y: startY},
                {x: startX - (width / 2), y: startY + height},
                {x: startX + (width / 2), y: startY + height}
        ], 0);

        function iterate(points, iterations) {
            if (iterations >= maxIterations) {
                return;
            }

            var centerX = 0;
            var centerY = 0;

            for (i = 0; i < points.length; i++) {
                centerX += points[i].x;
                centerY += points[i].y;
            }

            centerX /= points.length;
            centerY /= points.length;
            
            context.beginPath();

            points.forEach(function(point){
                context.moveTo(centerX, centerY);
                context.lineTo(point.x, point.y);
            });

            context.closePath();

            context.strokeStyle = 'white';
            context.stroke();

            [[0, 1], [1, 2], [2, 0]].forEach(function(i){
                iterate([{ x:centerX, y:centerY }, points[i[0]], points[i[1]]], iterations + 1);
            });
        }
    }
}

fractals.push(fractalUMCTriangle);
