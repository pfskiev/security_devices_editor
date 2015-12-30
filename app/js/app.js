(function(){
    angular.module('App', [])
        .constant('CANVAS', {
            'SHAPE': function (x, y, color, draggable, width, height, rotation, name, radius, type, src){
                var shape;

                shape = {
                    x: x || 300,
                    y: y || 50,
                    width: width || 300,
                    height: height || 300,
                    fill: color || 'red',
                    draggable: draggable,
                    rotation: rotation || 0,
                    name: name,
                    radius: radius || 0,
                    type: type,
                    src: src
                };
                return shape
            },

            WINDOW: function (x, y, height, width, degree, freeze) {

                debugger

                if(degree=== undefined){
                    degree= 0;
                }

                if(x === undefined){
                    x = 50;
                }

                if(y === undefined){
                    y = 50;
                }

                var shape, image;

                image = new Image();

                image.onload = function() {

                    var buildShape;
                    buildShape = {
                        type: 'Image',
                        image: image,
                        x: x,
                        y: y,
                        width: 194 / 2,
                        height: 48 / 2,
                        rotation: degree,
                        draggable: freeze
                    };

                    return buildShape

                };

                image.src = '../images/window_top.png';

                shape = image.onload();

                return shape
            }

        })
}());