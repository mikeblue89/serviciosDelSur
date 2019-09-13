
(() => {
    'use strict'

    let purchaseComponentModule = angular.module('serviciosDelSur');

    purchaseComponentcontroller.$inject = ['$authorizationService', '$state', 'EntityService', '$uibModal', '$log'];

    function purchaseComponentcontroller($authorizationService, $state, EntityService, $uibModal, $log) {
        let vm = this;
        vm.test = 'this is my test result';
        let purchaseService;
        let productService;
        /*let userService;*/

        vm.$onInit = function () {
            checkSession();
        }

        const checkSession = ()=>{
            if($authorizationService.authenticatedUser()){
                $state.go('app.purchase');
            }else{
                $state.go('login');
            }
        }

        let setDefaults = ()=>{
            purchaseService = new EntityService('purchase');
            productService = new EntityService('product');
            /*userService = new EntityService('authorization');*/
            loadData();
            /*vm.startPurchase();*/
        }

        let loadData = ()=>{
            loadHeaders();
            loadpurchases();
            loadProducts();
            /*loadUsers();*/
        }



        let loadHeaders = ()=>{
            purchaseService.loadMetadata(
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

        let loadpurchases = ()=>{
            purchaseService.get(
                (response)=>{
                    if(response.data.error){
                        alert('Hubo un error al cargar las compras');
                    }else{
                        vm.purchases = response.data.data;
                        console.log(vm.purchase);
                    }
                }
            );
        }

        /*let loadUsers = ()=>{
            userService.get(
                (response)=>{
                    if(response.data.error){
                        alert('Hubo un error al cargar los usuarios');
                    }else{
                        vm.users = response.data.data;
                        console.log(vm.user);
                    }
                }
            );
        }*/

        vm.startPurchase = ()=>{
            vm.purchase = {};
        }
        
        vm.savePurchase = () => {
            console.log ('doing something')
            if(vm.purchase.no && vm.purchase.barcode.billno && vm.purchase.date && vm.purchase.retdate && vm.purchase.user && vm.purchase.provider){
                if(vm.purchase.id){
                    purchaseService.update(vm.purchase, success, error);
                }else{
                    purchaseService.save(vm.purchase, success, error);
                }

                loadData();
                vm.startPurchase();
            }
        }

        /* Load Products */
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

        /* - Load Products */



        /* --- pop up  ---*/

        vm.animationsEnabled = true;

        vm.open = function (size) {
            console.log("its entering the open");
            var modalInstance = $uibModal.open({
                animation: vm.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/controller/home/home.html',
                controller: function ($uibModalInstance, items) {
                    var vm = this;
                        vm.items = items;
                },
                controllerAs: 'vm',
                size: size,
                resolve: {
                  items: function () {
                    return vm.items;
                  }
                }
              });
        }

        

      /*  this.modalUpdate = function (size, selectedProduct) {
            
            var modalInstance = $uibModal.open({
              templateUrl: '<product-component></product-component>',
              controller: function ($scope, $uibmodalInstance, products) {
                $scope.products = products;
              },
              size: size,
              resolve: {
                products: function () {
                  return selectedProduct;
                }
              }
            });
        
            modalInstance.result.then(function (selectedItem) {
              $scope.selected = selectedItem;
            }, function () {
              $log.info('Modal dismissed at: ' + new Date());
            });
        };*/

        /* -------------------------------------*/

        setDefaults();

    };

    const component = {
        templateUrl: 'app/component/purchase/purchase.component.html',
        controller: purchaseComponentcontroller,
        controllerAs: 'vm',
        bindings:
        {
            connectionComponent: '='
        }
    };

    purchaseComponentModule.component('purchaseComponent', component);

}

)();