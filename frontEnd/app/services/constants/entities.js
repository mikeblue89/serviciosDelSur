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
        'purchase': {
            'endpoints': {
                'BASE': 'purchase',
                'GET': 'purchase',
                'POST': 'purchase',
                'PUT': 'purchase',
                'DELETE': 'purchase',
                'GETMetadata': 'purchase/metadata'
            }
        }

    });

})();