/*eslint-env jasmine */
/*global inject, module */
describe('boolean translator', function () {
    'use strict';

    var $rootScope,
        $compile,
        principal;

    beforeEach(module('angular-booleanTranslator'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should default to yes/no', function () {
        $rootScope.condition = true;

        var elm = angular.element('<boolean-translator condition="condition"></edg-boolean-translator>');

        $compile(elm)($rootScope);

        $rootScope.$digest();

        expect(elm.text().trim()).toEqual('Yes');

        $rootScope.condition = false;

        $rootScope.$digest();

        expect(elm.text().trim()).toEqual('No');
    });

    it('should accept alternate true/false labels', function () {
        $rootScope.condition = true;

        var elm = angular.element('<boolean-translator condition="condition" ' +
            'true-text="True" false-text="False"></boolean-translator>');

        $compile(elm)($rootScope);

        $rootScope.$digest();

        expect(elm.text().trim()).toEqual('True');

        $rootScope.condition = false;

        $rootScope.$digest();
        expect(elm.text().trim()).toEqual('False');
    });
});
