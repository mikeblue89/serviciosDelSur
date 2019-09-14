(function () {
    'use strict';

    let productComponentModule = angular.module('serviciosDelSur');

    productComponentcontroller.$inject = ['$authorizationService', '$state', 'EntityService'];

    function productComponentcontroller($authorizationService, $state, EntityService){
        let vm = this;
        let productService;

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

        let setDefaults = ()=>{
            productService = new EntityService('product');
            loadData();
            vm.startProduct();
            vm.state = 'table';
        }

        let loadData = ()=>{
            loadHeaders();
            loadProducts();
        }

        let loadHeaders = ()=>{
            productService.loadMetadata(
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

        let loadProducts = ()=>{
            productService.get(
                (response)=>{
                    if(response.data.error){
                        alert('Hubo un error al cargar los productos');
                    }else{
                        vm.products = response.data.data;
                    }
                }
            );
        }

        vm.startProduct = ()=>{
            vm.product = {};
        }

        vm.saveProduct = () => {
            if(vm.product.code && vm.product.barcode && vm.product.name && vm.product.description && vm.product.lastCost && vm.product.brand && vm.product.model && vm.product.manufacturer){
                if(vm.product._id){
                    productService.update(vm.product, success, error);
                }else{
                    productService.save(vm.product, success, error);
                }
                console.log(vm.product);
                loadData();
                vm.startProduct();
            }
            vm.state = 'table';
        }

        vm.modifyProduct = (product)=>{
            vm.product = product;
            vm.state = 'form';
        }

        vm.deleteProduct = (id)=>{
            productService.delete(id);
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