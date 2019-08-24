(()=>{
    'use strict';

    let mainModule = angular.module('serviciosDelSur', ['ui.router']);

    let mainModuleConfig = ($stateProvider, $locationProvider, $urlRouterProvider, $environmentProvider, jwtOptionsProvider, enviroment, $httpProvider) => {
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
                    data: { css: ['app/css/login.css'] }
                }
            },
            {
                name: 'app.main',
                options: {
                    title: 'main',
                    url: '/main',
                    templateUrl: 'app/controller/main/main.html',
                    controller: 'mainController',
                    controllerAs: 'vm'
                }
            }
        ];

        states.forEach(state => $stateProvider.state(state.name, state.options));

        $environmentProvider.setEnvironment(enviroment);

        jwtOptionsProvider.config({
            tokenGetter: ['options',
                (options) => {
                    if (options && options.url.substr(options.url.length - 5) == '.html') {
                        return null;
                    }

                    return sessionStorage.getItem('sessionToken');
                }],

            whiteListedDomains: [enviroment[enviroment].domain]
        });

        $httpProvider.interceptors.push('tokenInterceptor');

    };

    mainModule.config(mainModuleConfig);
    mainModuleConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', '$environmentProvider', 'jwtOptionsProvider', 'enviroment', '$httpProvider'];

    mainModule.controller("appController", function($state){
        let vm = this;

        vm.isNavCollapsed = true;
        vm.isCollapsed = false;
        vm.isCollapsedHorizontal = false;

        vm.navbarItems = $state.get();
    });

})();