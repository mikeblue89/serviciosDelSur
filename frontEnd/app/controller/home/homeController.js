(() => {
    'use strict'

    let homeModule = angular.module('serviciosDelSur');

    homeModule.controller('homeController', function(){
        let vm = this;
        vm.test = 'Successfully Logged In';

        vm.logout = ()=>{
            sessionStorage.removeItem("sessionToken");
        }
    });

}


)();