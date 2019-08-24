(function () {
    'use strict';

    angular.module('serviciosDelSur').factory('tokenInterceptor', factory);

    factory.$inject = ['jwtHelper', '$authorizationService'];

    function factory(jwtHelper, $authorizationService) {
        const request = (config) => {
            if (config && config.url.substr(config.url.length - 5) == '.html' || (config.url && (config.url === $authorizationService.getAuthorizationUrl())))
                return config;
            return evaluateToken(config);
        };

        const evaluateToken = (config) => {
            const token = $authorizationService.getAuthizationToken();
            if (token) {
                if (jwtHelper.isTokenExpired(token)) {
                    $authorizationService.logout();
                }
                setLastAutorizationHeader(config);
                return config;
            } else {
                return config;
            }
        }

        const setLastAutorizationHeader = (config) => {
            config.headers.Authorization = 'Bearer ' + $authorizationService.getAuthizationToken();
        }

        return {
            request: request
        };
    };

})();