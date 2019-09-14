(() => {
    'use strict'

    let saleComponentModule = angular.module('serviciosDelSur');

    saleComponentcontroller.$inject = ['$authorizationService', '$state', 'EntityService', '$uibModal', '$log'];

    function saleComponentcontroller($authorizationService, $state, EntityService, $uibModal, $log) {
        let vm = this;
        vm.test = 'this is my test result';
        let saleService;
        let productService;

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
            productService = new EntityService('product');
            loadData();
            vm.startSale();
            
        }

        let loadData = ()=>{
            loadHeaders();
            loadProducts();
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

        let loadProducts = ()=>{
            productService.get(
                (response)=>{
                    if(response.data.error){
                        alert('Hubo un error al cargar los productos');
                    }else{
                        vm.products = response.data.data;
                        console.log(vm.product);
                    }
                }
            );
        }

        vm.startSale = ()=>{
            vm.sale = {};
        }

        vm.saveSale = () => {
            console.log(vm.sale.user);
            console.log(vm.sale.provider);
            if(vm.sale.saleNo && vm.sale.billNo && vm.sale.date && vm.sale.returnDate && vm.sale.state && vm.sale.user && vm.sale.provider &&vm.sale.product && vm.sale.article && vm.sale.quantity && vm.sale.unitCost){

                vm.sale.user = JSON.parse(vm.sale.user);
                vm.sale.provider= JSON.parse(vm.sale.provider);
                vm.sale.product= JSON.parse(vm.sale.product); 

                console.log("it's getting hereleve 2");
                if(vm.sale.id){
                    saleService.update(vm.sale, success, error);
                }else{
                    saleService.save(vm.sale, success, error);
                }
                console.log("it's getting here level 3");

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


    

}

)();