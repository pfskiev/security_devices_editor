(function(){

    function KonvaService (){

        this.item = {};

    }

    KonvaService.prototype.create = function ($scope, shapes, canvas) {

        debugger

        var _$scope, _this;

        _$scope = $scope;
        _this = this;

        if (Konva.stages.length > 0) {Konva.stages[0].destroy()}

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

        for(var i = 0; i < shapes.length; i++) {

            debugger

            if(shapes[i].type === 'Image') {

                debugger

                var imageObj = new Image();
                imageObj.src = shapes[i].src;
                imageObj.onload = (function (i) {

                    debugger

                    var box = new Konva[shapes[i].type]({

                        x: shapes[i].x,
                        y: shapes[i].y,
                        width: shapes[i].width,
                        height: shapes[i].height,
                        fill: shapes[i].color,
                        stroke: 'black',
                        strokeWidth: 4,
                        draggable: shapes[i].draggable,
                        rotation: shapes[i].rotation,
                        radius: shapes[i].radius,
                        image: imageObj

                    });

                    box.on('dragend', function (e) {

                        _this.position(_$scope, e, false)

                    });

                    box.on('click', function (e) {


                        _$scope.ctrl.switch(_$scope, 'modal3', true);
                        _this.item = e;
                        _this.group = false;

                    });

                    group.add(box);
                    layer.add(group);
                    stage.add(layer);

                })(i);

            }

            else {

            }

        }

        group.on('dragend', function(e) {

            _this.position(_$scope, e, true)

        });

        stage.on('contentClick', function(e) {

            _this.createPoint(_$scope, e, false)

        });

    };

    KonvaService.prototype.remove = function ($scope) {

        debugger

        if(!this.group){

            debugger

            $scope.ctrl.floors[$scope.ctrl.current].plan.shapes.splice(this.item.target.index, 1)

        }

        this.update($scope);


    };

    KonvaService.prototype.position = function ($scope, e, group){

        if(group){

            debugger

            $scope.ctrl.floors[$scope.ctrl.current].plan.group.x = e.target.attrs.x;
            $scope.ctrl.floors[$scope.ctrl.current].plan.group.y = e.target.attrs.y;

        }

        else {

            debugger

            $scope.ctrl.floors[$scope.ctrl.current].plan.shapes[e.target.index].x = e.target.attrs.x;
            $scope.ctrl.floors[$scope.ctrl.current].plan.shapes[e.target.index].y = e.target.attrs.y;

        }

        this.update($scope);

    };

    KonvaService.prototype.rotation = function ($scope) {

        if(!this.group){

            debugger

            $scope.ctrl.floors[$scope.ctrl.current].plan.shapes[this.item.target.index].rotation = this.item.target.attrs.rotation + 90

        }

        this.update($scope)

    };

    KonvaService.prototype.createPoint = function ($scope, e) {

        debugger

        $scope.Point.x = e.evt.x;
        $scope.Point.y = e.evt.y;
        $scope.Point.radius = 20;
        $scope.ctrl.add($scope, 'Point');

    };

    KonvaService.prototype.update = function ($scope) {

        $scope.ctrl.getPromise($scope, 'setData', 'floors', $scope.ctrl.floors, 'floors');
        $scope.ctrl.update($scope, $scope.ctrl.current)

    };

    angular.module('App')
        .service('KonvaService',  KonvaService)

}());