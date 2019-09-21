(function () {
    'use strict';

    let userComponentModule = angular.module('serviciosDelSur');

    userComponentcontroller.$inject = ['$authorizationService', '$state', 'EntityService'];

    function userComponentcontroller($authorizationService, $state, EntityService) {
        let vm = this;
        let userService;

        vm.$onInit = function () {
            checkSession();
        }

        const checkSession = () => {
            if ($authorizationService.authenticatedUser()) {
                $state.go('app.profile');
                vm.data = $authorizationService.getuserData();
                if (vm.data.roles == 'root') {
                    vm.rol = 'root';
                    vm.disabled = 'root';
                    vm.startUser();
                } else {
                    vm.rol = 'normalUser';
                    vm.modifyUser(vm.data);
                }
                
            } else {
                $state.go('login');
            }
        }

        let setDefaults = () => {
            userService = new EntityService('user');
            loadData();
            vm.startUser();
            vm.disabled = 'disabled';
            vm.state = 'edit';
        }

        let loadData = () => {
            loadHeaders();
            loadUsers();
        }

        let loadHeaders = () => {
            userService.loadMetadata(
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
                    }
                }
            );
        }

        let loadUsers = () => {
            userService.get(
                (response) => {
                    if (response.data.error) {
                        alert('Hubo un error al cargar los Usuarios');
                    } else {
                        vm.users = response.data.data;
                    }
                }
            );
        }

        vm.startUser = () => {
            vm.user = {};
        }

        vm.saveUser = () => {
            if (vm.user.employeeCode && vm.user.name && vm.user.lastName && vm.user.nit && vm.user.accountNumber && vm.user.phone && vm.user.email && vm.user.nick && vm.user.password && vm.user.roles) {
                if (vm.user._id) {
                    userService.update(vm.user, success, error);
                } else {
                    userService.save(vm.user, success, error);
                }
                loadData();
                vm.disabled = 'disabled';
            }
        }

        vm.modifyUser = (user) => {
            vm.user = user;
        }

        vm.deleteUser = (id) => {
            userService.delete(id);
            loadData();
        }

        vm.editUser = () => {
            vm.disabled = 'edit';
            vm.state = 'cancel';
        }

        vm.cancel = () => {
            vm.disabled = 'disabled';
            vm.state = 'edit';
        }

        vm.changeState = () => {
            if (vm.state == 'table') {
                vm.state = 'form';
            } else {
                vm.state = 'table';
            }
        }

        let success = (response) => { response.data.message }
        let error = (response) => { response.data.message }


        setDefaults();

    };

    const component = {
        templateUrl: 'app/component/profile/profile.component.html',
        controller: userComponentcontroller,
        controllerAs: 'vm',
        bindings:
        {
            connectionComponent: '='
        }
    };

    userComponentModule.component('profileComponent', component);

})();