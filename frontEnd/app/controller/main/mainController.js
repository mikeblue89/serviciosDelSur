(() => {
    'use strict'

    let loginModule = angular.module('serviciosDelSur');

    loginModule.controller('mainController', function(){
        let vm = this;
        vm.test = 'this is my test result';

    });

}


)();