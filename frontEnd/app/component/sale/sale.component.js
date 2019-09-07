(function () {
    'use strict';

    let saleComponentModule = angular.module('serviciosDelSur');

    saleComponentcontroller.$inject = ['$authorizationService', '$state', 'EntityService'];

    function saleComponentcontroller($authorizationService, $state, EntityService){
        let vm = this;
        vm.test="this is my sales component";
        let saleService;

        vm.$onInit = function () {
            checkSession();
        }

        const checkSession = ()=>{
            if($authorizationService.authenticatedUser()){
                $state.go('app.sale');
            }else{
                $state.go('login');
            }
        }

        let setDefaults = ()=>{
            saleService = new EntityService('sale');
            loadData();
            vm.startSale();
        }

        let loadData = ()=>{
            loadHeaders();
            loadSales();
        }

        let loadHeaders = ()=>{
            saleService.loadMetadata(
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
                        console.log(response.data);
                        console.log(vm.header);
                    }
                }
            );
        }

        let loadSales = ()=>{
            saleService.get(
                (response)=>{
                    if(response.data.error){
                        alert('Hubo un error al cargar los saleos');
                    }else{
                        vm.sales = response.data.data;
                        console.log(vm.sale);
                    }
                }
            );
        }

        vm.startSale = ()=>{
            vm.sale = {};
        }

        vm.saveSale = () => {
            if(vm.sale.code && vm.sale.barcode && vm.sale.name && vm.sale.description && vm.sale.lastCost && vm.sale.brand && vm.sale.model && vm.sale.manufacturer){
                if(vm.sale.id){
                    saleService.update(vm.sale, success, error);
                }else{
                    saleService.save(vm.sale, success, error);
                }

                loadData();
                vm.startSale();
            }
        }

        vm.modifySale = (sale)=>{
            vm.sale = sale;
        }

        vm.deleteSale = ()=>{
            saleService.delete(index);
            loadData();
        }

        let success = (response)=>{response.data.message}
        let error = (response)=>{response.data.message}


        setDefaults();

    };

    const component = {
        templateUrl: 'app/component/sale/sale.component.html',
        controller: saleComponentcontroller,
        controllerAs: 'vm',
        bindings:
        {
            connectionComponent: '='
        }
    };

    saleComponentModule.component('saleComponent', component);

})();