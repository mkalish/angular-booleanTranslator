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

describe('boolean input', function () {
  'use strict';

  var $rootScope,
      $compile,
      principal;

  beforeEach(module('angular-booleanTranslator'));

  beforeEach(inject(function (_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
  }));

  describe('rendering', function () {
    it('should render in spans when layout is spread', function (){
      var elm = angular.element('<boolean-input name="myRadio" ng-model="inputValue" layout="spread"></boolean-input>');
      $compile(elm)($rootScope);
      $rootScope.$digest();

      expect(elm.find('span').length).toEqual(4);
    });

    it('should render in divs when no layout is passed in', function (){
      var elm = angular.element('<boolean-input name="myRadio" ng-model="inputValue"></boolean-input>');
      $compile(elm)($rootScope);
      $rootScope.$digest();

      expect(elm.find('div').length).toEqual(5);
    });

    it('should render two labels and two inputs', function(){
      var elm = angular.element('<boolean-input name="myRadio" ng-model="inputValue"></boolean-input>');
      $compile(elm)($rootScope);
      $rootScope.$digest();

      expect(elm.find('input').length).toEqual(2);
      expect(elm.find('label').length).toEqual(2);
    });

    it('should default the labels to Yes/No', function (){
      var elm = angular.element('<boolean-input name="myRadio" ng-model="inputValue"></boolean-input>');
      $compile(elm)($rootScope);
      $rootScope.$digest();

      var labels = elm.find('label');
      expect(angular.element(labels[0]).text()).toEqual('Yes');
      expect(angular.element(labels[1]).text()).toEqual('No');
    });

    it('should support alternate true/false labels', function (){
      var elm = angular.element('<boolean-input name="myRadio" ng-model="inputValue" true-text="True" false-text="False"></boolean-input>');
      $compile(elm)($rootScope);
      $rootScope.$digest();

      var labels = elm.find('label');
      expect(angular.element(labels[0]).text()).toEqual('True');
      expect(angular.element(labels[1]).text()).toEqual('False');
    });
  });

  describe('input changes', function(){
    it('should set the model to true when true is clicked', function(){
      var elm = angular.element('<boolean-input name="myRadio" ng-model="inputValue"></boolean-input>');
      $compile(elm)($rootScope);
      $rootScope.$digest();

      angular.element(elm.find('input')[0]).triggerHandler('change');
      $rootScope.$digest();

      expect($rootScope.inputValue).toEqual(true);
    });

    it('should set the model to false when false is selected', function(){
      var elm = angular.element('<boolean-input name="myRadio" ng-model="inputValue"></boolean-input>');
      $compile(elm)($rootScope);
      $rootScope.$digest();

      angular.element(elm.find('input')[1]).triggerHandler('change');
      $rootScope.$digest();

      expect($rootScope.inputValue).toEqual(false);
    });

    it('should uncheck the true input if false is selected', function (){
      var elm = angular.element('<boolean-input name="myRadio" ng-model="inputValue"></boolean-input>');
      $compile(elm)($rootScope);
      $rootScope.$digest();

      elm.find('input')[0].checked = true;
      expect(angular.element(elm.find('input')[0]).prop('checked')).toBe(true);

      angular.element(elm.find('input')[1]).triggerHandler('change');
      $rootScope.$digest();

      expect(angular.element(elm.find('input')[0]).prop('checked')).toBe(false);
    });

    it('should uncheck the false input if true is selected', function (){
      var elm = angular.element('<boolean-input name="myRadio" ng-model="inputValue"></boolean-input>');
      $compile(elm)($rootScope);
      $rootScope.$digest();

      elm.find('input')[1].checked = true;
      expect(angular.element(elm.find('input')[1]).prop('checked')).toBe(true);

      angular.element(elm.find('input')[0]).triggerHandler('change');
      $rootScope.$digest();

      expect(angular.element(elm.find('input')[1]).prop('checked')).toBe(false);
    });
  });

  describe('model changes', function() {
    it('should check neither if the model is initialized undefined', function (){
      var elm = angular.element('<boolean-input name="myRadio" ng-model="inputValue"></boolean-input>');
      $compile(elm)($rootScope);
      $rootScope.$digest();

      expect(angular.element(elm.find('input')[0]).prop('checked')).toBe(false);
      expect(angular.element(elm.find('input')[1]).prop('checked')).toBe(false);
    });

    it('should set true checked if the model is initially true', function(){
      $rootScope.inputValue = true;
      var elm = angular.element('<boolean-input name="myRadio" ng-model="inputValue"></boolean-input>');
      $compile(elm)($rootScope);
      $rootScope.$digest();

      expect(angular.element(elm.find('input')[0]).prop('checked')).toBe(true);
      expect(angular.element(elm.find('input')[1]).prop('checked')).toBe(false);
    });

    it('should set false checked if the model is initially false', function(){
      $rootScope.inputValue = false;
      var elm = angular.element('<boolean-input name="myRadio" ng-model="inputValue"></boolean-input>');
      $compile(elm)($rootScope);
      $rootScope.$digest();

      expect(angular.element(elm.find('input')[0]).prop('checked')).toBe(false);
      expect(angular.element(elm.find('input')[1]).prop('checked')).toBe(true);
    });

    it('should check true if the model is changed to true', function () {
      var elm = angular.element('<boolean-input name="myRadio" ng-model="inputValue"></boolean-input>');
      $compile(elm)($rootScope);
      $rootScope.$digest();

      expect(angular.element(elm.find('input')[0]).prop('checked')).toBe(false);
      expect(angular.element(elm.find('input')[1]).prop('checked')).toBe(false);

      $rootScope.inputValue = true;
      $rootScope.$digest();

      expect(angular.element(elm.find('input')[0]).prop('checked')).toBe(true);
      expect(angular.element(elm.find('input')[1]).prop('checked')).toBe(false);
    });

    it('should check false if the model is changed to false', function () {
      var elm = angular.element('<boolean-input name="myRadio" ng-model="inputValue"></boolean-input>');
      $compile(elm)($rootScope);
      $rootScope.$digest();

      expect(angular.element(elm.find('input')[0]).prop('checked')).toBe(false);
      expect(angular.element(elm.find('input')[1]).prop('checked')).toBe(false);

      $rootScope.inputValue = false;
      $rootScope.$digest();

      expect(angular.element(elm.find('input')[0]).prop('checked')).toBe(false);
      expect(angular.element(elm.find('input')[1]).prop('checked')).toBe(true);
    });

    it('should uncheck false if the model is set to undefined', function(){
      $rootScope.inputValue = false;
      var elm = angular.element('<boolean-input name="myRadio" ng-model="inputValue"></boolean-input>');
      $compile(elm)($rootScope);
      $rootScope.$digest();

      expect(angular.element(elm.find('input')[0]).prop('checked')).toBe(false);
      expect(angular.element(elm.find('input')[1]).prop('checked')).toBe(true);

      $rootScope.inputValue = undefined;
      $rootScope.$digest();

      expect(angular.element(elm.find('input')[0]).prop('checked')).toBe(false);
      expect(angular.element(elm.find('input')[1]).prop('checked')).toBe(false);
    });

    it('should uncheck true if the model is set to undefined', function(){
      $rootScope.inputValue = true;
      var elm = angular.element('<boolean-input name="myRadio" ng-model="inputValue"></boolean-input>');
      $compile(elm)($rootScope);
      $rootScope.$digest();

      expect(angular.element(elm.find('input')[0]).prop('checked')).toBe(true);
      expect(angular.element(elm.find('input')[1]).prop('checked')).toBe(false);

      $rootScope.inputValue = undefined;
      $rootScope.$digest();

      expect(angular.element(elm.find('input')[0]).prop('checked')).toBe(false);
      expect(angular.element(elm.find('input')[1]).prop('checked')).toBe(false);
    });

    it('should throw an error if the model is set to a non boolean', function (){
      $rootScope.inputValue = 'not a boolean';
      var elm = angular.element('<boolean-input name="myRadio" ng-model="inputValue"></boolean-input>');
      expect(function(){
        $compile(elm)($rootScope);
        $rootScope.$digest();
      }).toThrow();
    });
  })
});
