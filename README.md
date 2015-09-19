# angular-booleanTranslator
Simple directive that can be bound to a condition and used to show static text
or to collect a boolean value using radio buttons. 

# Usage

# boolean-translator
```javascript
angular.module('testModule', ['angular-booleanTranslator']);

angular.module('testController', function($scope) {
  $scope.testCondition = true;
});
```
```html
<div ng-controller="testControler">
  <boolean-translator condition="testCondition"></boolean-translator>
</div>
```

# boolean-input
```html
<boolean-input ng-model="testInput" name="myInput"></boolean-input>
```
This will render in a top down format.

To render in a spread format:
```html
<boolean-input ng-model="testInput" name="myInput" layout="spread"></boolean-input>
```

Alternatively, you can provide true-text and false-text to override the default
values which are Yes/No.
