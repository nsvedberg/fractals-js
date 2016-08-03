var fractalUMCTriangle = {
    name: "Uniform Mass Center Triangle",
    draw: function(context, canvasWidth, canvasHeight) {
        var maxIterations = 6;

        function iterate(points, iterations) {
            if (iterations > maxIterations) {
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

            context.lineWidth = 0.2;

            context.strokeStyle = 'white';

            context.stroke();

            iterate([{ x:centerX, y:centerY }, points[0], points[1]], iterations + 1);
            iterate([{ x:centerX, y:centerY }, points[1], points[2]], iterations + 1);
            iterate([{ x:centerX, y:centerY }, points[2], points[0]], iterations + 1);
        }

        var width  = Math.min(canvasWidth, canvasHeight * (2 / Math.sqrt(3))) - 20;
        var height = width * (Math.sqrt(3)/2)

        var startX = (canvasWidth / 2);
        var startY = (canvasHeight / 2) - (width * (Math.sqrt(3) / 2) / 2);

        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(startX - (width / 2), startY + (width * (Math.sqrt(3)/2)));
        context.lineTo(startX + (width / 2), startY + (width * (Math.sqrt(3)/2)));
        context.closePath();

        context.strokeStyle = 'white';
        context.stroke()

        iterate([
                {x: startX, y: startY},
                {x: startX - (width / 2), y: startY + height},
                {x: startX + (width / 2), y: startY + height}
        ], 0);
    }
}

fractals.push(fractalUMCTriangle);
