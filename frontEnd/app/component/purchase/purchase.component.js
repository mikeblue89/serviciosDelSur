
(() => {
    'use strict'

    let purchaseComponentModule = angular.module('serviciosDelSur');

    purchaseComponentcontroller.$inject = ['$authorizationService', '$state', 'EntityService', '$uibModal', '$log'];

    function purchaseComponentcontroller($authorizationService, $state, EntityService, $uibModal, $log) {
        let vm = this;
        vm.test = 'this is my test result';
        let purchaseService;
        let productService;
        let userService;
        let providerService;
       

        
    
        vm.addPurchaseDetail = function () {
          //add more empty rows
            vm.purchaseDetail.push({});
        }

        vm.$onInit = function () {
            checkSession();
        }

        const checkSession = () => {
            if ($authorizationService.authenticatedUser()) {
                $state.go('app.purchase');
            } else {
                $state.go('login');
            }
        }

        let setDefaults = () => {
            purchaseService = new EntityService('purchase');
            productService = new EntityService('product');
            userService = new EntityService('user');
            providerService = new EntityService('provider');
            loadData();
            vm.startPurchase();
            vm.state = 'form';

        }

        let loadData = () => {
            loadHeaders();
            loadProducts();
            loadUsers();
            loadProviders();
            loadPurchases();
        }

        let loadHeaders = () => {
            purchaseService.loadMetadata(
                (response) => {
                    if (response.data.error) {
                        alert('Hubo un error al cargar los datos de cabecera');
                    } else {
                        vm.header = [];
                        for (let header in response.data.data) {
                            if (header != "updatedAt" && header != "createdAt" && header != "__v" && header != "_id") {
                                vm.header.push(header);
                            }
                        }
                        console.log(response.data);
                        console.log(vm.header);
                    }
                }
            );
        }

        let loadPurchases = () => {
            purchaseService.get(
                (response) => {
                    if (response.data.error) {
                        alert('Hubo un error al cargar los compras');
                    } else {
                        vm.purchases = response.data.data;

                    }
                }
            );
        }
        let loadUsers = () => {
            userService.get(
                (response) => {
                    if (response.data.error) {
                        alert('Hubo un error al cargar los usuarios');
                    } else {
                        vm.users = response.data.data;

                    }
                }
            );
        }


        let loadProviders = () => {
            providerService.get(
                (response) => {
                    if (response.data.error) {
                        alert('Hubo un error al cargar los proveedores');
                    } else {
                        vm.providers = response.data.data;

                    }
                }
            );
        }

        let loadProducts = () => {
            productService.get(
                (response) => {
                    if (response.data.error) {
                        alert('Hubo un error al cargar los productos');
                    } else {
                        vm.products = response.data.data;
                        console.log(vm.product);
                    }
                }
            );
        }

        vm.startPurchase = () => {
            vm.purchase = {};
        }

        vm.purchaseDetails = [];

        // vm.purchaseDetails =
        // [
        //     { 'quantity': '1', 'product': 'test', 'unitCost': 'test' },
        // ];

        vm.addRow = function () {
            if (vm.purchaseDetail.quantity != undefined && vm.purchaseDetail.product != undefined && vm.purchaseDetail.unitCost != undefined) {
                var detail = {};
                detail.quantity = vm.purchaseDetail.quantity;
                detail.product = JSON.parse(vm.purchaseDetail.product);
                detail.unitCost = vm.purchaseDetail.unitCost;

                vm.purchaseDetails.push(detail);

                // CLEAR TEXTBOX.
                vm.purchaseDetail.quantity = null;
                vm.purchaseDetail.product = null;
                vm.purchaseDetail.unitCost = null;
            }
        };

        vm.removeRow = function () {
            var arrDetail = [];
            angular.forEach(vm.purchaseDetails, function (value) {
                if (!value.Remove) {
                    arrDetail.push(value);
                }
            });
            vm.purchaseDetails = arrDetail;
        };

        // FINALLY SUBMIT THE DATA.
        vm.submit = function () {
            var arrMovie = [];
            angular.forEach(vm.movieArray, function (value) {
                arrMovie.push('Name:' + value.name + ', Director:' + value.director);
            });
            vm.display = arrMovie;
        };

        vm.savePurchase = () => {
            console.log(vm.purchase);
            console.log(vm.purchaseDetails);

            if (vm.purchase.purchaseNo && vm.purchase.billNo && vm.purchase.date && vm.purchase.returnDate && vm.purchase.user && vm.purchase.provider) {

                vm.purchase.purchaseNo = vm.purchase.purchaseNo;
                vm.purchase.billNo = vm.purchase.billNo;
                vm.purchase.date = new Date(vm.purchase.date);
                vm.purchase.returnDate = vm.purchase.returnDate;
                vm.purchase.user = JSON.parse(vm.purchase.user);
                vm.purchase.provider = JSON.parse(vm.purchase.provider);
                vm.purchase.purchaseDetails = vm.purchaseDetails;
                
                


                if (vm.purchase.id) {
                    purchaseService.update(vm.purchase, success, error);
                } else {
                    purchaseService.save(vm.purchase, success, error);
                }



                loadData();

                vm.startPurchase();

                /*vm.purchase.purchaseDetails = [];
                if(purchaseDetails){
                    vm.purchase.purchaseDetails.push(vm.purchase.product);
                }*/
            }


            vm.state = 'table';
        }

        // vm.purchase.purchaseDetails.articles = [];
        vm.range = function (n) {
            return new Array(n);
        };



        /* --- pop up  ---*/

        vm.animationsEnabled = true;

        vm.open = function (size) {
            console.log("its entering the open");
            var modalInstance = $uibModal.open({
                animation: vm.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/component/purchase/productPopup/prod-popup.html',
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

        vm.modifyPurchase = (purchase) => {
            purchase.date = new Date(purchase.date);
            purchase.returnDate = new Date(purchase.returnDate);
            vm.purchase = purchase;
            // vm.purchase.date = vm.purchase.date.getDate() + "/" + vm.purchase.date.getMonth() + "/" + vm.purchase.date.getFullYear();  
            // vm.purchase.returnDate = vm.purchase.returnDate.getDate() + "/" + vm.purchase.returnDate.getMonth() + "/" + vm.purchase.returnDate.getFullYear()
            vm.state = 'form';
        }

        vm.deletePurchase = (id) => {
            purchaseService.delete(id);
            loadData();
            vm.state = 'form';
        }

        vm.changeState = () => {
            vm.state = 'table';
        }

        let success = (response) => { response.data.message }
        let error = (response) => { response.data.message }

        /*  this.modalUpdate = function (size, selectedPurchase) {
              
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