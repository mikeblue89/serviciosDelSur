(function (){
    'use strict';

    let clientComponentModule = angular.module("serviciosDelSur");

    clientComponentController.$inject = ['$authorizationService', '$state'];

    function clientComponentController($authorizationService, $state) {

        let vm = this;
        vm.$onInit = function () {
            checkSession();
        }

        const checkSession = ()=>{
            if($authorizationService.authenticatedUser()){
                $state.go('app.client');
            }
        }

        const onSuccess = (response)=>{
            $state.go('app.client');
        }

        vm.logIn = ()=>{
            $authorizationService.client({employeeCode: vm.employeeCode, password: vm.password},onSuccess);
        }

    };

    const component = {
        templateUrl: 'app/component/client/client.component.html',
        controller: clientComponentController,
        controllerAs: 'vm',
        bindings:
        {
            connectionComponent: '='
        }
    };

    clientComponentModule.component('clientComponent', component);
    
})();