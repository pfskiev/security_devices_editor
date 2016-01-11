(function(){
    angular.module('App', [])
        .constant('CANVAS', {

            'DEFAULTS': {
                X: 300,
                Y: 50,
                ROTATION: 0,
                RADIUS: 0

            },
            'SHAPE': function (x, y, color, draggable, width, height, rotation, name, radius, type, src, stroke, strokeWidth, points){

                var shape;

                debugger

                shape = {

                    x: x || this.DEFAULTS.X,
                    y: y || this.DEFAULTS.Y,
                    width: width,
                    height: height,
                    fill: color,
                    draggable: draggable,
                    rotation: rotation || this.DEFAULTS.ROTATION,
                    name: name,
                    radius: radius || this.DEFAULTS.RADIUS,
                    type: type,
                    src: src,
                    stroke: stroke,
                    strokeWidth: strokeWidth,
                    points: points
                };

                return shape

            },

            'SIZES': {

                'pen': {

                    width: 300,
                    height: 300

                },
                'window': {

                    width: 194 / 2,
                    height: 48 / 2
                },
                'column': {

                    width: 76 / 2,
                    height: 76 / 2

                },
                'door': {

                    width: 87 / 2,
                    height: 126 / 2
                },
                'camera': {

                    width: 233 / 2,
                    height: 236 / 2

                },
                'alarm': {

                    width: 168 / 2,
                    height: 166 / 2

                },
                'sensor': {

                    width: 168 / 2,
                    height: 166 / 2

                },
                'extinguisher': {

                    width: 168 / 2,
                    height: 166 / 2

                },
                'walls': {

                    stroke: 'black',
                    strokeWidth: 4

                },

                'line': {

                    stroke: 'black',
                    strokeWidth: 4

                },

                'point': {

                    stroke: '#666',
                    fill: '#ddd',
                    strokeWidth: 2,
                    radius: 8

                }
            }
        })

}());