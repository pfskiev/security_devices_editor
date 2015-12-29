(function(){

    function AppCtrl ($scope, $q, KonvaService, StorageService, CANVAS){

        this.$scope = $scope;
        this.$q = $q;
        this.KonvaService = KonvaService;
        this.StorageService = StorageService;
        this.CANVAS = CANVAS;
        this.canvas = {};
        this.draggable = true;

        $scope.title = 'Konva';
        $scope.walls = {};
        $scope.window = {};
        $scope.door = {};
        $scope.column = {};
        $scope.camera = {};
        $scope.alarm = {};
        $scope.sensor = {};
        $scope.extinguisher = {};

        this.getPromise($scope, 'getData', 'canvas', undefined, 'canvas');

    }

    AppCtrl.prototype.add = function ($scope, name){

        var shape = this.CANVAS.SHAPE(

            $scope[name].x,
            $scope[name].y,
            $scope[name].color,
            this.draggable,
            $scope[name].width,
            $scope[name].height,
            $scope[name].rotation,
            $scope[name].name = name);

        this.canvas.shapes.push(shape);
        this.update($scope);
        this.getPromise($scope, 'setData', 'canvas', this.canvas, 'canvas');

    };

    AppCtrl.prototype.create = function ($scope, shapes, canvas){

        this.KonvaService.create($scope, shapes, canvas)

    };

    AppCtrl.prototype.toggle = function ($scope, variable) {

        this[variable] = !this[variable];
        this.update($scope)

    };

    AppCtrl.prototype.update = function ($scope){

        var shapes = [];
        for(var i = 0; i < this.canvas.shapes.length; i ++){

            debugger

            shapes.push(

                this.CANVAS.SHAPE(

                    this.canvas.shapes[i].x,
                    this.canvas.shapes[i].y,
                    this.canvas.shapes[i].color,
                    this.draggable,
                    this.canvas.shapes[i].width,
                    this.canvas.shapes[i].height,
                    this.canvas.shapes[i].rotation,
                    this.canvas.shapes[i].name))

        }

        this.create($scope, shapes, this.canvas)

    };

    AppCtrl.prototype.getPromise = function ($scope, storageEvent, storageKey, storageValue, value) {

        var promises = {

            Obj: this.StorageService[storageEvent](storageKey, storageValue)

        };

        this.$q.all(promises).then(function (res){

            $scope.ctrl[value] = res.Obj || {'shapes': [], 'group': {}};

            console.log($scope.ctrl[value])

        })
    };

    AppCtrl.$inject = ['$scope', '$q', 'KonvaService', 'StorageService', 'CANVAS'];

    angular.module('App')
        .controller('AppCtrl',  AppCtrl)

}());