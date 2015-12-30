(function(){

    function StorageService (){

    }

    StorageService.prototype.getData = function (storageKey) {

        return localforage.getItem(storageKey, function(err, value) {

            console.log('Data received' + value);

        })
    };

    StorageService.prototype.setData = function (storageKey, storageValue) {

        return localforage.setItem(storageKey, storageValue, function(err, value) {

            console.log('Data set' + value);

        })
    };

    StorageService.prototype.removeData = function (storageKey) {

        return localforage.removeItem(storageKey, function(err, value) {

            debugger;

            console.log('Key deleted' + value);

        });
    };

    StorageService.prototype.clearData = function () {

        return localforage.clear(function(err, value) {

            debugger;

            console.log('Data deleted' + value);

        });
    };

    angular.module('App')
        .service('StorageService',  StorageService)

}())