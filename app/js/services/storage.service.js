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

    angular.module('App')
        .service('StorageService',  StorageService)

}())