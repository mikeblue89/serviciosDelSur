(()=>{
    'use strict';

    let mainModule = angular.module('serviciosDelSur', ['ui.router', 'uiRouterStyles', 'angular-jwt']);

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
                    templateUrl: 'app/controller/main/main.html',
                    controller: 'mainController',
                    controllerAs: 'vm'
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
        
    });

})();