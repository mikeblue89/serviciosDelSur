(()=>{
    'use strict';

    var module = angular.module('serviciosDelSur');

    module.service('$authorizationService', function (EntityService, jwtHelper) {
        let entityService = new EntityService('auth');

        this.authenticatedUser = () => {
            return (isAValidToken() && this.getuserData() && this.getuserData().id);
        }

        this.getuserData = () => {
            const token = this.getAuthizationToken();
            if (token) {
                return gettokenData(token);
            }
            return undefined;
        }

        this.login = (entity, actionSuccess, actionError) => {
            entityService.save(entity, onEndActionSuccess(actionSuccess), oneEndActionError(actionError));
        }

        this.logout = () => {
            sessionStorage.removeItem('sessionToken');
        }

        this.getAuthorizationUrl = () => {
            return entityService.baseUrl();
        }

        this.getAuthizationToken = () => {
            return sessionStorage.getItem('sessionToken');
        }

        let onEndActionSuccess = (actionSuccess) => {
            return (response) => {
                sessionStorage.setItem('sessionToken', response.data.data);
                if (actionSuccess) {
                    actionSuccess(response);
                }
            }
        }

        let oneEndActionError = (actionError) => {
            return (response) => {
                notifier.error(response.data.message);
                if (actionError) {
                    actionError(response);
                }
            }
        }

        let gettokenData = (token) => {
            return jwtHelper.decodeToken(token);
        }

        let isAValidToken = () => {
            const token = this.getAuthizationToken();
            if (token) {
                return !(jwtHelper.isTokenExpired(token));
            }
            return false;
        }

    });

})();