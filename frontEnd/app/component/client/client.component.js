(function () {
    'use strict';

    let clientComponentModule = angular.module('serviciosDelSur');

    clientComponentcontroller.$inject = ['$authorizationService', '$state', 'EntityService'];

    function clientComponentcontroller($authorizationService, $state, EntityService){
        let vm = this;
        let clientService;

        vm.$onInit = function () {
            checkSession();
        }

        const checkSession = ()=>{
            if($authorizationService.authenticatedUser()){
                $state.go('app.client');
            }else{
                $state.go('login');
            }
        }

        let setDefaults = ()=>{
            clientService = new EntityService('client');
            loadData();
            vm.startClient();
            vm.state = 'table';
        }

        let loadData = ()=>{
            loadHeaders();
            loadClient();
        }

        let loadHeaders = ()=>{
            clientService.loadMetadata(
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

        let loadClient = ()=>{
            clientService.get(
                (response)=>{
                    if(response.data.error){
                        alert('Hubo un error al cargar los clientes');
                    }else{
                        vm.clients = response.data.data;
                    }
                }
            );
        }

        vm.startClient = ()=>{
            vm.client = {};
        }

        vm.saveClient = () => {
            if(vm.client.nit && vm.client.name && vm.client.address && vm.client.telephone && vm.client.email && vm.client.contact){
                if(vm.client._id){
                    clientService.update(vm.client, success, error);
                }else{
                    clientService.save(vm.client, success, error);
                }

                loadData();
                vm.startClient();
                
                vm.state = 'table';
            }
        }

        vm.modifyClient = (client)=>{
            vm.client = client;
            vm.state = 'form';
        }

        vm.deleteClient = (id)=>{
            clientService.delete(id);
            loadData();
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
        templateUrl: 'app/component/client/client.component.html',
        controller: clientComponentcontroller,
        controllerAs: 'vm',
        bindings:
        {
            connectionComponent: '='
        }
    };

    clientComponentModule.component('clientComponent', component);

})();