var fractalKochSnowflake = {
    name: "Koch Snowflake",
    draw: function(context, canvasWidth, canvasHeight) {
        var maxIterations = 5;

        var width  = (Math.min(canvasWidth, canvasHeight * (2 / Math.sqrt(3))) - 20) * (2/3);
        var height = width * (Math.sqrt(3) / 2)

        var startX = (canvasWidth / 2);
        var startY = (canvasHeight / 2) - (height / 1.5);

        var points = [
            {x: startX, y: startY},
            {x: startX + (width / 2), y: startY + height},
            {x: startX - (width / 2), y: startY + height}
        ]

        var lines = [
            [points[0], points[1]],
            [points[1], points[2]],
            [points[2], points[0]]
        ];

        for (var i = 0; i < maxIterations; i++) {
            var newLines = [];

            lines.forEach(function(line){
                /* Diagram of the values defined below:

                                              spikeWidth
                                          < - - - - - - - - >
                                       ^           . <- spikePoint
                                                  / \
                                       |         / | \
                                                /     \
                                       |       /   |   \
                           spikeHeight        /         \
                                       |     /     |     \
                                            /             \
                                       |   /       |       \
                                          /                 \
                                       v /         |         \
                   .--------------------.          .          .--------------------.
                   ^ line[0]            ^ midp1    ^ midPoint ^ midp2              ^ line[1]
                                                   |
                                             
                                                   | <- m is the slope of this line
                                            
                                                   |
                */

                var midp1 = { x: (line[0].x + line[0].x + line[1].x) / 3
                            , y: (line[0].y + line[0].y + line[1].y) / 3
                            };

                var midp2 = { x: (line[0].x + line[1].x + line[1].x) / 3
                            , y: (line[0].y + line[1].y + line[1].y) / 3
                            };

                var spikeWidth = Math.sqrt(Math.pow(midp2.x - midp1.x, 2) + Math.pow(midp2.y - midp1.y, 2));
                var spikeHeight = spikeWidth * (Math.sqrt(3) / 2);

                var m = -( (line[1].x - line[0].x) / (line[1].y - line[0].y) );

                if (m == Infinity) {
                    m = Number.MAX_SAFE_INTEGER;
                } else if (m == -Infinity) {
                    m = -Number.MAX_SAFE_INTEGER;
                }

                var spikeOffsetX = Math.sqrt(Math.pow(spikeHeight, 2) / (Math.pow(m, 2) + 1));
                var spikeOffsetY = m * spikeOffsetX;

                if (line[0].y > line[1].y) {
                    spikeOffsetY *= -1;
                    spikeOffsetX *= -1;
                }

                var midPoint = {x: (line[0].x + line[1].x) / 2, y: (line[0].y + line[1].y) / 2};
                var spikePoint = {x: midPoint.x + spikeOffsetX, y: midPoint.y + spikeOffsetY};

                var points = [line[0], midp1, spikePoint, midp2, line[1]];

                newLines = newLines.concat(
                    [ [points[0], points[1]]
                    , [points[1], points[2]]
                    , [points[2], points[3]]
                    , [points[3], points[4]]
                    ]
                );
            });
            
            lines = newLines;
        }

        context.beginPath();

        lines.forEach(function(line){
            context.lineTo(line[1].x, line[1].y);
        });

        context.closePath();

        context.fillStyle = 'black';
        context.fill();

        context.lineWidth = 1;
        context.strokeStyle = 'white';
        context.stroke();
    }
}

fractals.push(fractalKochSnowflake);
