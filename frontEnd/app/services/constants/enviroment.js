(()=>{
    'use strict';
    var module = angular.module('serviciosDelSur');

    module.constant('enviroment', {
        'login': {
            'protocol': 'http',
            'domain': 'localhost',
            'api': 'api',
            'port': '3001'
        }
    });

})();