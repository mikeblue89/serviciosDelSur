(function (){
    'use strict';

    let providerComponentModule = angular.module("serviciosDelSur");

    providerComponentController.$inject = ['$authorizationService', '$state'];

    function providerComponentController($authorizationService, $state) {

        let vm = this;
        vm.$onInit = function () {
            checkSession();
        }

        const checkSession = ()=>{
            if($authorizationService.authenticatedUser()){
                $state.go('app.provider');
            }
        }

        const onSuccess = (response)=>{
            $state.go('app.provider');
        }

        vm.logIn = ()=>{
            $authorizationService.provider({employeeCode: vm.employeeCode, password: vm.password},onSuccess);
        }

    };

    const component = {
        templateUrl: 'app/component/provider/provider.component.html',
        controller: providerComponentController,
        controllerAs: 'vm',
        bindings:
        {
            connectionComponent: '='
        }
    };

    providerComponentModule.component('providerComponent', component);
    
})();