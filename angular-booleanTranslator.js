(function () {
    'use strict';

    angular.module('angular-booleanTranslator', []);

    angular
        .module('angular-booleanTranslator')
        .directive('booleanTranslator', directiveImpl);

    /**
     * @ngdoc directive
     * @name edgBooleanTranslator
     * @module edge.common
     * @restrict E
     * @scope
     *
     * @description
     * Translate a boolean value or flag to a display value
     *
     * NOTE: either a ```condition``` or a ```flag``` can be specified, not both
     *
     * @param {Boolean=} condition the boolean value to use
     * @param {String=} flag the permissions flag to use
     * @param {String=} trueId the id of the label for true (default: yes)
     * @param {String=} falseId the id of the label for true (default: no)
     */

    /**@ngInject */
    function directiveImpl() {
        return {
            restrict: 'E',
            scope: {
                condition: '='
            },
            template: '<span>{{condition ? trueText : falseText}}</span>',
            link: linkImpl
        };

        function linkImpl(scope, elm, attrs) {
            scope.trueText = attrs.trueText || 'Yes';
            scope.falseText = attrs.falseText || 'No';
        }
    }
})();
