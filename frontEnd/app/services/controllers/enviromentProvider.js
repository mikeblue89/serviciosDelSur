(()=>{
    'use strict';

    let module = angular.module('serviciosDelSur');
    
    module.provider('$enviroment', [function () {
        let $enviromentSection = [];

        this.setEnviroment = (enviroment)=>{
            $enviromentSection = enviroment;
        };

        this.$get = [()=>{
            var enviroment = {}

            enviroment.getEnviroment = ()=>{
                return $enviromentSection;
            }

            return enviroment;
        }];

    }]);

})();