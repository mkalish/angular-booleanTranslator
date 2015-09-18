# angular-booleanTranslator
Simple directive that can be bound to a condition and used to show static text.

#Usage

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

Alternatively, you can provide true-text and false-text to override the default
values which are Yes/No.
