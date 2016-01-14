(function(){

    function KonvaService ($timeout, CANVAS){

        this.item = {};
        this.draw = false;
        this.$timeout = $timeout;
        this.CANVAS = CANVAS;

    }

    /**
     * Represents a book.
     * @constructor
     * @param $scope - local scope;
     * @param shapes - canvas shapes;
     * @param canvas - canvas object;
     */

    KonvaService.prototype.create = function ($scope, shapes, canvas) {

        debugger

        var _$scope, _this;

        _$scope = $scope;
        _this = this;

        if (Konva.stages.length > 0) {Konva.stages[0].destroy()}

        var width = 1024;
        var height = 653;

        var stage = new Konva.Stage({
            container: 'container',
            width: width,
            height: height
        });

        var layer = new Konva.Layer();
        var group = new Konva.Group({

            x: canvas.group.x,
            y: canvas.group.y,
            draggable: true

        });

        for(var i = 0; i < shapes.length; i++) {

            switch (shapes[i].type) {

                case 'Image':
                    buildImage(shapes[i]);
                    break;
                case 'Rect':
                    buildRect(shapes[i]);
                    break;
                case 'Circle':
                    buildCircle(shapes[i]);
                    break;
                case 'Line':
                    buildLine(shapes[i]);
                    break;
                default:
                    debugger
            }

            function buildRect(shape) {

                debugger

                var box = new Konva[shape.type]({

                    x: shape.x,
                    y: shape.y,
                    width: shape.width,
                    height: shape.height,
                    stroke: shape.stroke,
                    strokeWidth: shape.strokeWidth,
                    rotation: shape.rotation,
                    name: shape.name,
                    draggable: shape.draggable

                });

                debugger

                box.on('dragend', function (e) {

                    _this.position(_$scope, e, false)

                });

                debugger

                box.on('click', function (e) {

                    debugger

                    _$scope.ctrl.switch(_$scope, 'modal3', true);
                    _this.item = e;
                    _this.group = false;

                });

                group.add(box);

            }

            function buildLine(shape) {

                debugger

                var box = new Konva.Line({

                    stroke: shape.stroke,
                    strokeWidth: shape.strokeWidth,
                    draggable: shape.draggable,
                    rotation: shape.rotation,
                    points: shape.points,
                    x: shape.x || undefined,
                    y: shape.y || undefined

                });

                if(box.attrs.x === _this.CANVAS.DEFAULTS.X && box.attrs.y === _this.CANVAS.DEFAULTS.Y) {

                    delete box.attrs.x;
                    delete box.attrs.y;

                }

                debugger

                var simpleLabel = new Konva.Label({
                    x: _this.getCoordinates().x,
                    y: _this.getCoordinates().y,
                    opacity: 0.75
                });

                debugger

                simpleLabel.add(new Konva.Tag({
                    fill: 'yellow'
                }));

                simpleLabel.add(new Konva.Text({
                    text: shape.points[0] - shape.points[2],
                    fontFamily: 'Calibri',
                    fontSize: 18,
                    padding: 5,
                    fill: 'black'
                }));

                box.on('dragend', function (e) {

                    _this.position(_$scope, e, group)

                });

                box.on('click', function (e) {

                    debugger

                    _$scope.ctrl.switch(_$scope, 'modal3', true);
                    _this.item = e;
                    _this.group = false;

                });

                group.add(box)
                layer.add(simpleLabel);

            }

            function buildImage(shape) {

                debugger

                var imageObj = new Image();

                imageObj.src = shape.src;

                var box = new Konva.Image({

                    x: shape.x,
                    y: shape.y,
                    width: shape.width,
                    height: shape.height,
                    draggable: shape.draggable,
                    rotation: shape.rotation,
                    name: shape.name,
                    image: imageObj

                });

                debugger

                box.on('dragend', function (e) {

                    _this.position(_$scope, e, group)

                });

                box.on('click', function (e) {

                    if(e.target.attrs.name == 'camera'){

                        alert('Hello')

                        debugger

                    }
                    else {
                        _$scope.ctrl.switch(_$scope, 'modal3', true);
                        _this.item = e;
                        _this.group = false;

                    }

                });

                group.add(box);

            }

            function buildCircle(shape) {

                var box = new Konva.Circle({

                    x: shape.x,
                    y: shape.y,
                    stroke: shape.stroke,
                    strokeWidth: shape.strokeWidth,
                    draggable: shape.draggable,
                    rotation: shape.rotation,
                    radius: shape.radius,
                    fill: shape.fill

                });

                debugger

                box.on('dragend', function (e) {

                    _this.position(_$scope, e, group)

                });

                debugger

                box.on('click', function (e) {
                    debugger
                    _$scope.ctrl.switch(_$scope, 'modal3', true);
                    _this.item = e;
                    _this.group = false;

                });

                group.add(box);

            }
        }

        group.on('dragend', function(e) {
            _this.position(_$scope, e)

        });

        if (this.draw){

            stage.on('contentClick', function(e) {

                debugger

                var lastPointerPosition = stage.getPointerPosition();
                _this.createPoint(_$scope, e, lastPointerPosition, group);

            });

        }

        this.$timeout(function(){

            layer.add(group);
            stage.add(layer);

        }, 50)


    };

    /**
     * Removing canvas shape from localForage and canvas object.
     * @constructor
     * @param $scope - represent local scope from which controller was request;
     */

    KonvaService.prototype.remove = function ($scope) {

        debugger

        if(!this.group){

            debugger

            $scope.ctrl.floors[$scope.ctrl.current].plan.shapes.splice(this.item.target.index, 1)

        }

        this.update($scope);

    };

    /**
     * Change shape position in canvas and update it's coordinate in localForage.
     * @constructor
     * @param $scope - represent local scope from which controller was request;
     * @param e - represent item that changes position in canvas by event;
     *
     */

    KonvaService.prototype.position = function ($scope, e){
        var floorPlan, x, y, index;
        floorPlan = $scope.ctrl.floors[$scope.ctrl.current].plan;
        x = e.target.attrs.x;
        y = e.target.attrs.y;
        index = e.target.index;
        switch (e.target.className || e.target.nodeType) {
            case 'Line':
                floorPlan.shapes[index].x = x;
                floorPlan.shapes[index].y = y;
                break;
            case 'Group':
                floorPlan.group.x = x;
                floorPlan.group.y = y;
                break;
            default:
                floorPlan.shapes[index].x = x;
                floorPlan.shapes[index].y = y;
        }

        this.update($scope);

    };

    /**
     * Change shape rotation in canvas and update it's in localForage.
     * @constructor
     * @param $scope - represent local scope from which controller was request;
     *
     */

    KonvaService.prototype.rotation = function ($scope) {
        if(!this.group){
            debugger
            $scope.ctrl.floors[$scope.ctrl.current].plan.shapes[this.item.target.index].rotation = this.item.target.attrs.rotation + 90

        }

        this.update($scope)

    };

    /**
     * Counting points in floorPlan and if there
     * are more than 2 initialize line creating.
     * @constructor
     * @param $scope - represent local scope from which controller was request;
     *
     */

    KonvaService.prototype.counter = function ($scope) {

        debugger
        var define = {};
        var floorPlan = $scope.ctrl.floors[$scope.ctrl.current].plan;
        define.count = 0;
        define.points = [];

        for (var ty = 0; ty < $scope.ctrl.floors[$scope.ctrl.current].plan.shapes.length; ty ++) {
            if ($scope.ctrl.floors[$scope.ctrl.current].plan.shapes[ty].name === 'point'){
                debugger
                define.count ++;
                define.points.push(floorPlan.shapes[ty].x);
                define.points.push(floorPlan.shapes[ty].y);

            }
        }

        var deltaX = define.points[0] - define.points[2];
        var deltaY = define.points[1] - define.points[3];

        if(Math.abs(deltaX) > Math.abs(deltaY)){
            define.points[3] = define.points[1]

        }
        else {
            define.points[2] = define.points[0]

        }

        return define;

    };

    /**
     * Create point for holding line coordinates before it creating
     * @constructor
     * @param $scope - represent local scope from which
     * controller this function was invoke;
     * @param e - represent canvas shape;
     * @param lastPointerPosition - pointer position x and y;
     * @param group - represent canvas group object;
     *
     */

    KonvaService.prototype.createPoint = function ($scope, e, lastPointerPosition, group) {

        debugger

        $scope.point.x = lastPointerPosition.x - (group.attrs.x || 0);
        $scope.point.y = lastPointerPosition.y - (group.attrs.y || 0);
        $scope.point.radius = 5;
        $scope.ctrl.add($scope, 'point');

        var define = this.counter($scope);
        var floorPlan = $scope.ctrl.floors[$scope.ctrl.current].plan;



        if(define.count === 2) {

            for (var nb = 0; nb < floorPlan.shapes.length; nb ++) {

                if (floorPlan.shapes[nb].name === 'point'){

                    debugger;

                    floorPlan.shapes.splice(nb, 1)

                }
            }

            $scope.line.points = define.points;
            $scope.ctrl.add($scope, 'line');

        }

    };

    /**
     * Update data in localForage and canvas view
     * @constructor
     * @param $scope - represent local scope from which controller was request;
     *
     */

    KonvaService.prototype.changeLineLength = function ($scope) {

        debugger

        var len = parseFloat($scope.ctrl.line_length)
        var item = this.item.target.attrs.points;
        var deltaX = item[0] - item[2];
        var deltaY = item[1] - item[3];

        if(Math.abs(deltaX) > Math.abs(deltaY)){


            debugger


            item[2] = item[0] + len;


        }
        else {

            item[3] = item[1] + len;


        }

        this.update($scope)

    }

    KonvaService.prototype.getCoordinates = function ($scope){

        var target;

        if(this.item.target.attrs){
            target = this.item.target.attrs
        }
        else {

        }
        var coordinate = {};
        coordinate.x = target.x;
        coordinate.y = target.y;
        return coordinate;

    };

    /**
     * Update data in localForage and canvas view
     * @constructor
     * @param $scope - represent local scope from which controller was request;
     *
     */

    KonvaService.prototype.update = function ($scope) {
        $scope.ctrl.getPromise($scope, 'setData', 'floors', $scope.ctrl.floors, 'floors');
        $scope.ctrl.update($scope, $scope.ctrl.current)

    };

    angular.module('App')
        .service('KonvaService',  KonvaService)

}());