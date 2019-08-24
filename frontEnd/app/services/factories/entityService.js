(()=>{
    'use strict';

    var module = angular.module('serviciosDelSur');

    module.factory('EntityService', function (entities, enviroment, $enviroment, $injector){

        let entityService = function (entityName) {

            let setupConfig = (options)=>{
                let config = {
                    method: 'GET',
                    url: getmainUrl(),
                };
    
                if(options.method){
                  config.method = options.method;    
                }
    
                if(options.urlComplement){
                    config.url += options.urlComplement;
                }
    
                if(options.body){
                    config.data = options.data;
                }
    
                if(options.headers){
                    config.headers = options.headers;
                }else{
                    config.headers = { 'Content-Type': 'application/json; charset=utf-8' };
                }
    
                return config;
    
            }
    
            let getmainUrl = ()=>{
                return enviroment[$enviroment.getEnviroment()].protocol +'://'+
                       enviroment[$enviroment.getEnviroment()].domain +':'+
                       enviroment[$enviroment.getEnviroment()].port +'/'+
                       enviroment[$enviroment.getEnviroment()].api;
            }
    
            this.loadMetadata = (actionSuccess, actionError)=>{
                let $http = $injector.get('$http');
                let config = setupConfig({ urlComplement: "/" + entities[entityName].endpoints.GETMetadata });
                $http(config).then(actionSuccess, actionError);
            }
    
            this.get = (actionSuccess, actionError)=>{
                let $http = $injector.get('$http');
                    let config = setupConfig({ urlComplement: "/" + entities[entityName].endpoints.GET });
                    $http(config).then(actionSuccess, actionError);
            }
    
            this.getEntity = (id, actionSuccess, actionError) => {
                let $http = $injector.get('$http');
                let config = setupConfig({ urlComplement: "/" + entities[entityName].endpoints.GET + "/" + id });
                $http(config).then(actionSuccess, actionError);
            }
    
            this.save = (entity, actionSuccess, actionError) => {
                let $http = $injector.get('$http');
                let config = setupConfig({ urlComplement: "/" + entities[entityName].endpoints.POST, body: entity, method: "POST" });
                $http(config).then(actionSuccess, actionError);
            }
    
            this.update = (entity, actionSuccess, actionError) => {
                let $http = $injector.get('$http');
                let config = setupConfig({ urlComplement: "/" + entities[entityName].endpoints.PUT, body: entity, method: "PUT" });
                $http(config).then(actionSuccess, actionError);
            }
    
            this.delete = (id, actionSuccess, actionError) => {
                let $http = $injector.get('$http');
                let config = setupConfig({ urlComplement: "/" + entities[entityName].endpoints.DELETE + "/" + id, method: "DELETE" });
                $http(config).then(actionSuccess, actionError);
            }
    
            this.baseUrl = () => {
                return getmainUrl() + "/" + entities[entityName].endpoints.BASE;
            }

        };

        return entityService;

    });

})();