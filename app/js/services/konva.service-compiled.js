'use strict';

(function () {

    function KonvaService($timeout) {

        this.item = {};
        this.draw = false;
        this.$timeout = $timeout;
    }

    KonvaService.prototype.create = function ($scope, shapes, canvas) {

        debugger;

        var _$scope, _this;

        _$scope = $scope;
        _this = this;

        if (Konva.stages.length > 0) {
            Konva.stages[0].destroy();
        }

        var width = window.innerWidth;
        var height = window.innerHeight;

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

        var _loop = function _loop() {

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
                    debugger;
            }

            function buildRect(shape) {

                debugger;

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

                debugger;

                box.on('dragend', function (e) {

                    _this.position(_$scope, e, false);
                });

                debugger;

                box.on('click', function (e) {

                    _$scope.ctrl.switch(_$scope, 'modal3', true);
                    _this.item = e;
                    _this.group = false;
                });

                group.add(box);
            }

            function buildLine(shape) {

                debugger;

                var box = new Konva.Line({

                    stroke: shape.stroke,
                    strokeWidth: shape.strokeWidth,
                    draggable: shape.draggable,
                    rotation: shape.rotation,
                    points: shape.points

                });

                debugger;

                box.on('dragend', function (e) {

                    _this.position(_$scope, e, false);
                });

                debugger;

                box.on('click', function (e) {

                    _$scope.ctrl.switch(_$scope, 'modal3', true);
                    _this.item = e;
                    _this.group = false;
                });

                group.add(box);
            }

            function buildImage(shape) {

                debugger;

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

                debugger;

                box.on('dragend', function (e) {

                    _this.position(_$scope, e, false);
                });

                debugger;

                box.on('click', function (e) {

                    _$scope.ctrl.switch(_$scope, 'modal3', true);
                    _this.item = e;
                    _this.group = false;
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

                debugger;

                box.on('dragend', function (e) {

                    _this.position(_$scope, e, false);
                });

                debugger;

                box.on('click', function (e) {

                    _$scope.ctrl.switch(_$scope, 'modal3', true);
                    _this.item = e;
                    _this.group = false;
                });

                group.add(box);
            }
        };

        for (var i = 0; i < shapes.length; i++) {
            _loop();
        }

        group.on('dragend', function (e) {

            _this.position(_$scope, e, true);
        });

        if (this.draw) {

            stage.on('contentClick', function (e) {

                _this.createPoint(_$scope, e, stage);
            });
        }

        layer.add(group);
        stage.add(layer);

        //this.$timeout(function(){
        //}, 10)
    };

    KonvaService.prototype.remove = function ($scope) {

        debugger;

        if (!this.group) {

            debugger;

            $scope.ctrl.floors[$scope.ctrl.current].plan.shapes.splice(this.item.target.index, 1);
        }

        this.update($scope);
    };

    KonvaService.prototype.position = function ($scope, e, group) {

        if (group) {

            debugger;

            $scope.ctrl.floors[$scope.ctrl.current].plan.group.x = e.target.attrs.x;
            $scope.ctrl.floors[$scope.ctrl.current].plan.group.y = e.target.attrs.y;
        } else {

            debugger;

            $scope.ctrl.floors[$scope.ctrl.current].plan.shapes[e.target.index].x = e.target.attrs.x;
            $scope.ctrl.floors[$scope.ctrl.current].plan.shapes[e.target.index].y = e.target.attrs.y;
        }

        this.update($scope);
    };

    KonvaService.prototype.rotation = function ($scope) {

        if (!this.group) {

            debugger;

            $scope.ctrl.floors[$scope.ctrl.current].plan.shapes[this.item.target.index].rotation = this.item.target.attrs.rotation + 90;
        }

        this.update($scope);
    };

    KonvaService.prototype.counter = function ($scope) {

        debugger;

        var define = {};
        define.count = 0;
        define.points = [];

        for (var ty = 0; ty < $scope.ctrl.floors[$scope.ctrl.current].plan.shapes.length; ty++) {

            if ($scope.ctrl.floors[$scope.ctrl.current].plan.shapes[ty].name === 'point') {

                debugger;

                define.count++;
                define.points.push($scope.ctrl.floors[$scope.ctrl.current].plan.shapes[ty].x);
                define.points.push($scope.ctrl.floors[$scope.ctrl.current].plan.shapes[ty].y);
            }
        }

        return define;
    };

    KonvaService.prototype.createPoint = function ($scope, e, stage) {

        debugger;

        $scope.point.x = stage.pointerPos.x;
        $scope.point.y = stage.pointerPos.y;
        $scope.point.radius = 20;
        $scope.ctrl.add($scope, 'point');

        var define = this.counter($scope);

        if (define.count === 2) {

            for (var nb = 0; nb < $scope.ctrl.floors[$scope.ctrl.current].plan.shapes.length; nb++) {

                if ($scope.ctrl.floors[$scope.ctrl.current].plan.shapes[nb].name === 'point') {

                    debugger;

                    $scope.ctrl.floors[$scope.ctrl.current].plan.shapes.splice(nb, 1);
                }
            }

            $scope.line.points = define.points;
            $scope.ctrl.add($scope, 'line');
        }
    };

    KonvaService.prototype.update = function ($scope) {

        $scope.ctrl.getPromise($scope, 'setData', 'floors', $scope.ctrl.floors, 'floors');
        $scope.ctrl.update($scope, $scope.ctrl.current);
    };

    angular.module('App').service('KonvaService', KonvaService);
})();

//# sourceMappingURL=konva.service-compiled.js.map