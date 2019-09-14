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
        'user': {
            'endpoints': {
                'BASE': 'user',
                'GET': 'user',
                'POST': 'user',
                'PUT': 'user',
                'DELETE': 'user',
                'GETMetadata': 'user/metadata'
            }
        }  
        ,
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
        },
        'purchase': {
            'endpoints': {
                'BASE': 'purchase',
                'GET': 'purchase',
                'POST': 'purchase',
                'PUT': 'purchase',
                'DELETE': 'purchase',
                'GETMetadata': 'purchase/metadata'
            }
        },
        'sale': {
            'endpoints': {
                'BASE': 'sale',
                'GET': 'sale',
                'POST': 'sale',
                'PUT': 'sale',
                'DELETE': 'sale',
                'GETMetadata': 'sale/metadata'
            }

        }

    });

})();