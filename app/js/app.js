(function(){
    angular.module('App', [])
        .constant('CANVAS', {
            'SHAPE': function (x, y, color, draggable, width, height, rotation, name){
                var shape;
                shape = {
                    x: x || 300,
                    y: y || 50,
                    width: width || 300,
                    height: height || 300,
                    color: color || 'red',
                    draggable: draggable,
                    rotation: rotation || 0,
                    name: name
                };
                return shape
            }
        })
}());