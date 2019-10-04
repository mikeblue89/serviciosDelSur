(()=>{
    'use strict';

    let mainModule = angular.module('serviciosDelSur', ['ui.router', 'uiRouterStyles', 'angular-jwt' , 'ui.bootstrap']);

    let mainModuleConfig = ($stateProvider, $locationProvider, $urlRouterProvider, $enviromentProvider, jwtOptionsProvider, enviroment, $httpProvider) => {
        
        const Enviroment = 'login';

        $locationProvider.html5Mode(false);
        $urlRouterProvider.otherwise('/login');

        let states = [
            {
                name: 'app',
                options: {
                    url: '/app',
                    abstract: true,
                    templateUrl: 'app/app.html',
                    controller: 'appController',
                    controllerAs: 'vm'
                }
            },
            {
                name: "login",
                options: {
                    title: "Login",
                    url: "/login",
                    template: "<login-component></login-component>",
                    data: { css: ['app/css/customStyle.css'] }
                }
            },
            {
                name: 'app.home',
                options: {
                    title: 'Home',
                    url: '/home',
                    templateUrl: 'app/controller/home/home.html',
                    controller: 'homeController',
                    controllerAs: 'vm'
                }
            },
            {
                name: "app.product",
                options: {
                    title: "Product",
                    url: "/product",
                    template: "<product-component></product-component>",
                    data: { css: ['app/css/productStyle.css'] }
                }
            }
            ,
            {
                name: "app.provider",
                options: {
                    title: "Provider",
                    url: "/provider",
                    template: "<provider-component></provider-component>",
                    data: { css: ['app/css/providerStyle.css'] }
                }
            },
            {
                name: "app.client",
                options: {
                    title: "Client",
                    url: "/client",
                    template: "<client-component></client-component>",
                    data: { css: ['app/css/clientStyle.css'] }
                }
            },
            {
                name: "app.profile",
                options: {
                    title: "Profile",
                    option: 'profile',
                    url: "/profile",
                    template: "<profile-component></profile-component>",
                    data: { css: ['app/css/profileStyle.css'] }
                }
            },
            {
                name: "app.purchase",
                options: {
                    title: "Purchase",
                    url: "/purchase",
                    template: "<purchase-component></purchase-component>",
                }
            },
            {
                name: "app.sale",
                options: {
                    title: "Sale",
                    url: "/sale",
                    template: "<sale-component></sale-component>",
                }
            }
        ];

        states.forEach(state => $stateProvider.state(state.name, state.options));
        
        $enviromentProvider.setEnviroment(enviroment);

        jwtOptionsProvider.config({
            tokenGetter: ['options',
                (options) => {
                    if (options && options.url.substr(options.url.length - 5) == '.html') {
                        return null;
                    }

                    return sessionStorage.getItem('sessionToken');
                }],

            whiteListedDomains: [enviroment[Enviroment].domain]
        });

        $httpProvider.interceptors.push('tokenInterceptor');

    };

    mainModule.config(mainModuleConfig);
    mainModuleConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', '$enviromentProvider', 'jwtOptionsProvider', 'enviroment', '$httpProvider'];

    let runFunction = ( $authorizationService, $state, $timeout, $transitions) => {
        
        $transitions.onCreate({}, () => {
            if (!$authorizationService.authenticatedUser()) {
                $timeout(() => { $state.go('login') });
            }
        });

    }
    mainModule.run(runFunction);
    runFunction.$inject = ["$authorizationService", "$state", "$timeout", "$transitions"];

    mainModule.controller("appController", function($state,$authorizationService){
        let vm = this;

        vm.isNavCollapsed = true;
        vm.isCollapsed = false;
        vm.isCollapsedHorizontal = false;

        vm.navbarItems = $state.get();
        vm.logout = () => {
            $authorizationService.logout();
            $state.go('login');
        }

        vm.icon = (propertyName) =>{
            switch(propertyName){
                case 'Home': {
                    return 'fas fa-home';
                }
                case 'Product':{
                    return 'fab fa-product-hunt';
                }
                case 'Provider':{
                    return 'fas fa-truck-loading'
                }
                case 'Client':{
                    return 'fas fa-suitcase'
                }
                case 'Profile':{
                    return 'far fa-user-circle'
                }
                default:{
                    return '';
                }
            }
        }
        
    });

})();