(() => {
    'use strict'

    let loginModule = angular.module('serviciosDelSur');

    loginModule.controller('mainController', ['$authorizationService', '$state',function($authorizationService, $state){
        let vm = this;
        vm.$onInit = function () {
            checkSession();
        }

        const checkSession = ()=>{
            if($authorizationService.authenticatedUser()){
                $state.go('app.home');
            }
        }

        const onSuccess = (response)=>{
            $state.go('app.home');
        }

        vm.logIn = ()=>{
            $authorizationService.login({username: vm.username, password: vm.password},onSuccess);   
        }

    }]);
    
})();