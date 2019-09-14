(function () {
    'use strict';

    let providerComponentModule = angular.module('serviciosDelSur');

    providerComponentcontroller.$inject = ['$authorizationService', '$state', 'EntityService'];

    function providerComponentcontroller($authorizationService, $state, EntityService){
        let vm = this;
        let providerService;

        vm.$onInit = function () {
            checkSession();
        }

        const checkSession = ()=>{
            if($authorizationService.authenticatedUser()){
                $state.go('app.provider');
            }else{
                $state.go('login');
            }
        }

        let setDefaults = ()=>{
            providerService = new EntityService('provider');
            loadData();
            vm.startProvider();
            vm.state = 'table';
        }

        let loadData = ()=>{
            loadHeaders();
            loadProviders();
        }

        let loadHeaders = ()=>{
            providerService.loadMetadata(
                (response)=>{
                    if(response.data.error){
                        alert('Hubo un error al cargar los datos de cabecera');
                    }else{
                        vm.header = [];
                        for(let header in response.data.data){
                            if(header != "updatedAt" && header != "createdAt" && header != "__v" && header != "_id"){
                                vm.header.push(header);
                            }
                        }
                    }
                }
            );
        }

        let loadProviders = ()=>{
            providerService.get(
                (response)=>{
                    if(response.data.error){
                        alert('Hubo un error al cargar los proveedores');
                    }else{
                        vm.providers = response.data.data;
                    }
                }
            );
        }

        vm.startProvider = ()=>{
            vm.provider = {};
        }

        vm.saveProvider = () => {
            if(vm.provider.nit && vm.provider.name && vm.provider.adress && vm.provider.phone && vm.provider.email && vm.provider.contact){
                if(vm.provider.id){
                    providerService.update(vm.provider, success, error);
                }else{
                    providerService.save(vm.provider, success, error);
                }

                loadData();
                vm.startProvider();
                vm.state = 'table';
            }
        }

        vm.modifyProvider = (provider)=>{
            vm.provider = provider;
            vm.state = 'form';
        }

        vm.deleteProvider = (id)=>{
            providerService.delete(id);
            loadData();
        }

        vm.hide = (itemToHide)=>{
            if(itemToHide != false){
                return itemToHide = true;
            }else{
                return itemToHide = false;
            }
        }

        vm.changeState = ()=>{
            if(vm.state == 'table'){
                vm.state = 'form';
            }else{
                vm.state = 'table';
            }
        }

        let success = (response)=>{response.data.message}
        let error = (response)=>{response.data.message}


        setDefaults();

    };

    const component = {
        templateUrl: 'app/component/provider/provider.component.html',
        controller: providerComponentcontroller,
        controllerAs: 'vm',
        bindings:
        {
            connectionComponent: '='
        }
    };

    providerComponentModule.component('providerComponent', component);

})();