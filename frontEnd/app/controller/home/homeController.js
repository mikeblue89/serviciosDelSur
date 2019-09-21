(() => {
    'use strict'

    let homeModule = angular.module('serviciosDelSur');

    homeModule.controller('homeController', function(){
        let vm = this;
        vm.test = 'Successfully Logged In';

        let setDefaults = ()=>{
            vm.state ='homePage';
        }

        vm.logout = ()=>{
            sessionStorage.removeItem("sessionToken");
        }

        vm.changeState = ()=>{
            if(vm.state == 'homePage'){
                vm.state = 'management';
            }else{
                vm.state = 'homePage';
            }
        }

        setDefaults();

    });

}


)();