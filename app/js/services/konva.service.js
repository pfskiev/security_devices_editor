(function(){

    function KonvaService (){

    }

    KonvaService.prototype.create = function ($scope, shapes, canvas) {

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

            var box;

            box = new Konva.Rect({
                x: shapes[i].x,
                y: shapes[i].y,
                width: shapes[i].width,
                height: shapes[i].height,
                fill: shapes[i].color,
                stroke: 'black',
                strokeWidth: 4,
                draggable: shapes[i].draggable,
                rotation: shapes[i].rotation
            });

            box.on('dragend', function (e) {

                _this.position(_$scope, e, false)

            });

            box.on('click', function (e) {

                _this.rotation(_$scope, e, false)

            });

            //box.on('', function (e) {
            //
            //    _this.remove(_$scope, e, false)
            //
            //});

            group.add(box);

        }

        group.on('dragend', function(e) {

            _this.position(_$scope, e, true)

        });

        layer.add(group);
        stage.add(layer);

    };

    KonvaService.prototype.remove = function ($scope, e, group) {

        if(!group){

            debugger

            $scope.ctrl.canvas.shapes.splice(e.target.index, 1)

        }

        this.update($scope);


    };

    KonvaService.prototype.position = function ($scope, e, group){

        if(group){

            debugger

            $scope.ctrl.canvas.group.x = e.target.attrs.x;
            $scope.ctrl.canvas.group.y = e.target.attrs.y;

        }

        else {

            debugger

            $scope.ctrl.canvas.shapes[e.target.index].x = e.target.attrs.x;
            $scope.ctrl.canvas.shapes[e.target.index].y = e.target.attrs.y;

        }

        this.update($scope);

    };

    KonvaService.prototype.rotation = function ($scope, e, group) {

        debugger

        if(!group) {

            $scope.ctrl.canvas.shapes[e.target.index].rotation = e.target.attrs.rotation + 90;

        }

        this.update($scope)

    };

    KonvaService.prototype.update = function ($scope) {

        $scope.ctrl.getPromise($scope, 'setData', 'canvas', $scope.ctrl.canvas, 'canvas');
        $scope.ctrl.update($scope)

    };

    angular.module('App')
        .service('KonvaService',  KonvaService)

}());