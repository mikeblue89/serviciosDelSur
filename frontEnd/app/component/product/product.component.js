(function () {
    'use strict';

    let productComponentModule = angular.module('serviciosDelSur');

    productComponentcontroller.$inject = ['$authorizationService', '$state'];

    function productComponentcontroller($authorizationService, $state){
        let vm = this;
        vm.$onInit = function () {
            checkSession();
        }

        const checkSession = ()=>{
            if($authorizationService.authenticatedUser()){
                $state.go('app.product');
            }else{
                $state.go('login');
            }
        }
    };

    const component = {
        templateUrl: 'app/component/product/product.component.html',
        controller: productComponentcontroller,
        controllerAs: 'vm',
        bindings:
        {
            connectionComponent: '='
        }
    };

    productComponentModule.component('productComponent', component);

})();