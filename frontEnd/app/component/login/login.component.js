(function (){
    'use strict';

    let loginComponentModule = angular.module("serviciosDelSur");

    loginComponentController.$inject = ['$authorizationService', '$state'];

    function loginComponentController($authorizationService, $state) {

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
            $authorizationService.login({codigoEmpleado: vm.codigoEmpleado, password: vm.password},onSuccess);
        }

    };

    const component = {
        templateUrl: 'app/component/login/login.component.html',
        controller: loginComponentController,
        controllerAs: 'vm',
        bindings:
        {
            connectionComponent: '='
        }
    };

    loginComponentModule.component('loginComponent', component);
    
})();