var fractalSierpinskiCarpet = {
    name: "Sierpinski's Carpet",
    draw: function(context, canvasWidth, canvasHeight) {
        function iterate(startX, startY, width, iterations) {
            if (iterations <= 0) {
                return;
            }

            context.rect(startX + (width / 3),
                         startY + (width / 3),
                         width / 3,
                         width / 3);

            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    if (!(i == 1 && j == 1)) {
                        iterate(startX + ((width / 3) * i),
                                startY + ((width / 3) * j),
                                width / 3,
                                iterations - 1);
                    }
                }
            }
        }

        var width = Math.min(canvasWidth, canvasHeight) - 20;

        var startX = (canvasWidth / 2) - (width / 2);
        var startY = (canvasHeight / 2) - (width / 2);

        context.fillStyle = 'white';
        context.fillRect(startX, startY, width, width);

        iterate(startX, startY, width, 6);

        context.fillStyle = 'black';
        context.fill();
    }
};

fractals.push(fractalSierpinskiCarpet);
