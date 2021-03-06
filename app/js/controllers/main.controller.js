(function(){

    function AppCtrl ($scope, $q, KonvaService, StorageService, CANVAS, $timeout){

        this.$scope = $scope;
        this.$q = $q;
        this.KonvaService = KonvaService;
        this.StorageService = StorageService;
        this.CANVAS = CANVAS;
        this.$timeout = $timeout;

        this.draggable = false;
        this.modal = false;
        this.modal2 = false;
        this.modal3 = false;
        this.sideNav = false;
        this.canvas = {};
        this.floors = [];
        this.current = '';
        this.selection = '';
        this.aside = '';
        this.line_length = '';

        $scope.walls = {};
        $scope.window = {};
        $scope.door = {};
        $scope.column = {};
        $scope.camera = {};
        $scope.alarm = {};
        $scope.sensor = {};
        $scope.extinguisher = {};
        $scope.point = {};
        $scope.line = {};
        $scope.firstPanel = ['pen', 'window', 'door', 'column'];
        $scope.secondPanel = ['camera', 'extinguisher', 'sensor', 'alarm'];

        this.getPromise($scope, 'getData', 'floors', undefined, 'floors');
        this.switch($scope, 'selection', 'floors');

    }

    AppCtrl.prototype.toggle = function ($scope, variable) {

        this[variable] = !this[variable];
        this.update($scope, this.current)

    };

    AppCtrl.prototype.switch = function ($scope, key, value){

        if(key === "modal3") {

            this.$timeout(function(){
                $scope.ctrl[key] = value;

            });
        }

        $scope.ctrl[key] = value;

    };

    AppCtrl.prototype.destroy = function () {

        if (Konva.stages.length > 0) {Konva.stages[0].destroy()}

    };

    AppCtrl.prototype.delete = function ($scope, index) {

        this.floors.splice(index, 1);
        this.getPromise($scope, 'setData', 'floors', this.floors, 'floors', false)

    };

    AppCtrl.prototype.addFloor = function ($scope){

        var floor = {};
        floor.name  = $scope.floor.name;
        $scope.floor.name = '';
        floor.plan = {group: {}, shapes: []};
        this.floors.push(floor);
        this.getPromise($scope, 'setData', 'floors', this.floors, 'floors', false)

    };

    AppCtrl.prototype.checkPlan = function ($scope, index) {

        var _this, _$scope;
        _this = this;
        _$scope = $scope;

        this.switch($scope, 'current', index);
        this.$timeout(function(){

            if(_this.floors[_this.current].plan.shapes.length > 0){

                _this.update(_$scope, _this.current);
                _this.switch(_$scope, 'sideNav', true);
                _this.switch(_$scope, 'aside', 'plan');
                _this.switch(_$scope, 'selection', 'draw_panel');

            }

            else {

                _this.switch(_$scope, 'selection', 'plan');

            }

        });



    };

    AppCtrl.prototype.add = function ($scope, name){

        var type;
        var shapeName = name.toLowerCase();
        var _this = this

        switch (shapeName) {
            case 'pen':
                this.KonvaService.draw = !this.KonvaService.draw;
                console.log(this.KonvaService.draw);
                this.update($scope, this.current);
                return;
                break;
            case 'line':
                type = 'Line';
                compileLine();
                break;
            case 'walls':
                type = 'Rect';
                other();
                break;
            case 'point':
                type = 'Circle';
                other();
                break;
            default:
                type = 'Image';
                other()

        }

        debugger

        var shape;

        function compileLine(){

            shape = _this.CANVAS.SHAPE(

                $scope[shapeName].x,
                $scope[shapeName].y,
                $scope[shapeName].color,
                _this.draggable,
                $scope[shapeName].width || _this.CANVAS.SIZES[shapeName].width || undefined,
                $scope[shapeName].height || _this.CANVAS.SIZES[shapeName].height || undefined,
                $scope[shapeName].rotation,
                $scope[shapeName].name = shapeName,
                $scope[shapeName].radius,
                $scope[shapeName].type = type,
                $scope[shapeName].src,
                $scope[shapeName].stroke || _this.CANVAS.SIZES[shapeName].stroke,
                $scope[shapeName].strokeWidth || _this.CANVAS.SIZES[shapeName].strokeWidth,
                $scope[shapeName].points || $scope.ctrl.KonvaService.item.target.attrs.points
            );

            return shape

        }

        function other(){

            shape = _this.CANVAS.SHAPE(

                $scope[shapeName].x,
                $scope[shapeName].y,
                $scope[shapeName].color,
                _this.draggable,
                $scope[shapeName].width || _this.CANVAS.SIZES[shapeName].width || undefined,
                $scope[shapeName].height || _this.CANVAS.SIZES[shapeName].height || undefined,
                $scope[shapeName].rotation,
                $scope[shapeName].name = shapeName,
                $scope[shapeName].radius,
                $scope[shapeName].type = type,
                $scope[shapeName].src,
                $scope[shapeName].stroke || _this.CANVAS.SIZES[shapeName].stroke,
                $scope[shapeName].strokeWidth || _this.CANVAS.SIZES[shapeName].strokeWidth

            );

            return shape

        }

        this.floors[this.current].plan.shapes.push(shape);
        this.update($scope, this.current);
        this.getPromise($scope, 'setData', 'floors', this.floors, 'floors');

    };

    AppCtrl.prototype.update = function ($scope, index){

        debugger

        this.current = index;

        var shapes = [];
        for(var i = 0; i < this.floors[index].plan.shapes.length; i ++){

            debugger

            var src = './img/' + [this.floors[index].plan.shapes[i].name] + '_top.png';

            debugger

            shapes.push(

                this.CANVAS.SHAPE(

                    this.floors[index].plan.shapes[i].x,
                    this.floors[index].plan.shapes[i].y,
                    this.floors[index].plan.shapes[i].color,
                    this.draggable,
                    this.floors[index].plan.shapes[i].width,
                    this.floors[index].plan.shapes[i].height,
                    this.floors[index].plan.shapes[i].rotation,
                    this.floors[index].plan.shapes[i].name,
                    this.floors[index].plan.shapes[i].radius,
                    this.floors[index].plan.shapes[i].type,
                    src,
                    this.floors[index].plan.shapes[i].stroke,
                    this.floors[index].plan.shapes[i].strokeWidth,
                    this.floors[index].plan.shapes[i].points
                ))

        }

        debugger

        this.KonvaService.create($scope, shapes, this.floors[index].plan)

    };

    AppCtrl.prototype.clear = function ($scope) {

        this.floors[this.current].plan.shapes.splice(0);
        this.getPromise($scope, 'setData', 'floors', this.floors, 'floors', true)

    }

    AppCtrl.prototype.getPromise = function ($scope, storageEvent, storageKey, storageValue, value, update) {

        var promises = {

            Obj: this.StorageService[storageEvent](storageKey, storageValue)

        };

        this.$q.all(promises).then(function (res){

            $scope.ctrl[value] = res.Obj || [];

            if(update) {

                $scope.ctrl.update($scope, $scope.ctrl.current)

            }

            console.log($scope.ctrl[value])

        })

    };

    AppCtrl.$inject = ['$scope', '$q', 'KonvaService', 'StorageService', 'CANVAS', '$timeout'];

    angular.module('App')
        .controller('AppCtrl',  AppCtrl)

}());