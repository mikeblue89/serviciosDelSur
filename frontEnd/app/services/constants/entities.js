(()=>{
    'use strict';

    var module = angular.module('serviciosDelSur');

    module.constant('entities', {
        'authorization': {
            'endpoints': {
                'BASE': 'login',
                'POST': 'login',
                'LOGOUT': 'logout'
            }
        },
        'product': {
            'endpoints': {
                'BASE': 'product',
                'GET': 'product',
                'POST': 'product',
                'PUT': 'product',
                'DELETE': 'product',
                'GETMetadata': 'product/metadata'
            }
        },
        'provider': {
            'endpoints': {
                'BASE': 'provider',
                'GET': 'provider',
                'POST': 'provider',
                'PUT': 'provider',
                'DELETE': 'provider',
                'GETMetadata': 'provider/metadata'
            }
        },
        'client': {
            'endpoints': {
                'BASE': 'client',
                'GET': 'client',
                'POST': 'client',
                'PUT': 'client',
                'DELETE': 'client',
                'GETMetadata': 'client/metadata'
            }
        }

    });

})();