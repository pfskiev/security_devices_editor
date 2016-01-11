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
        $scope.firstPanel = ['pen', 'window', 'column', 'door'];
        $scope.secondPanel = ['camera', 'alarm', 'extinguisher', 'sensor'];

        this.getPromise($scope, 'getData', 'floors', undefined, 'floors');
        this.switch($scope, 'selection', 'floors');

    }

    AppCtrl.prototype.toggle = function ($scope, variable) {

        this[variable] = !this[variable];
        this.update($scope, this.current)

    };

    AppCtrl.prototype.switch = function ($scope, key, value){

        var _this = this;

        debugger

        switch (value) {
            case value instanceof Object:
                debugger
                fillArray(value)
                break;
            case value instanceof String || Number:
                debugger
                fillString(value)
                break;
            default:
                debugger
        }

        function fillArray (value){

            for (var toby = 0; toby < value.length; toby ++) {

                if(key === "modal3") {

                    _this.$timeout(function(){
                        $scope.ctrl[key] = value;

                    });
                }
            }
        }

        function fillString (value){

            if(key === "modal3") {

                _this.$timeout(function(){
                    $scope.ctrl[key] = value;

                });
            }

            debugger

        }

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

        this.switch($scope, 'current', index);

        if(this.floors[this.current].plan.shapes.length > 0){

            this.update($scope, this.current);
            this.switch($scope, 'sideNav', true);
            this.switch($scope, 'aside', 'plan');
            this.switch($scope, 'selection', undefined);

        }

        else {

            this.switch($scope, 'selection', 'plan');

        }

    };


    AppCtrl.prototype.add = function ($scope, name){

        var type;

        switch (name) {
            case 'pen':
                this.KonvaService.draw = !this.KonvaService.draw;
                console.log(this.KonvaService.draw);
                this.update($scope, this.current);
                return;
                break;
            case 'line':
                type = 'Line';
                break;
            case 'walls':
                type = 'Rect';
                break;
            case 'point':
                type = 'Circle';
                break;
            default:
                type = 'Image';

        }

        debugger

        var shape = this.CANVAS.SHAPE(

            $scope[name].x,
            $scope[name].y,
            $scope[name].color,
            this.draggable,
            $scope[name].width || this.CANVAS.SIZES[name].width || undefined,
            $scope[name].height || this.CANVAS.SIZES[name].height || undefined,
            $scope[name].rotation,
            $scope[name].name = name,
            $scope[name].radius,
            $scope[name].type = type,
            $scope[name].src,
            $scope[name].stroke || this.CANVAS.SIZES[name].stroke,
            $scope[name].strokeWidth || this.CANVAS.SIZES[name].strokeWidth,
            $scope[name].points
        );

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

            var src = '../img/' + [this.floors[index].plan.shapes[i].name] + '_top.png';

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