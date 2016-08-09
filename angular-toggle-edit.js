 var app = angular.module('toggle-edit', []); 

    app.directive('toggleEdit', function ($compile) {
        return {
            require: 'ngModel',
            restrict: 'A',
            scope: {
                parent: "=toggleEdit",
                isButton: "@isButton",
            },
            link: function (scope, element, attrs, ctrl) {
                element.click(function () {
                    if (!scope.isButton) {
                        var html = '<input required class="form-control" ng-init="oldVal=' + attrs.ngModel + '" ng-model="' + attrs.ngModel + '" type="text" value="' + scope.parent + '"/>' +
                            '<button ng-disabled="!' + attrs.ngModel + '" class="btn btn-primary" ng-model="button" is-button="add" toggle-edit="' + attrs.ngModel + '">Edit</button>' +
                            '<button class="btn" ng-model="buttonReturn" ng-init="oldVal" toggle-edit="' + attrs.ngModel + '" is-button="return">x</button>';
                        scope.$parent[attrs.ngModel] = scope.parent;
                        var template = angular.element($compile(html)(scope.$parent));

                        element.replaceWith(template);
                    }
                    else if (scope.isButton === 'add') {
                        var html = '<a ng-model="' + attrs.toggleEdit + '" toggle-edit="' + attrs.toggleEdit + '" href="#" ng-click="updateBase()">' + scope.parent + '</a>';
                        scope.$parent[attrs.ngModel] = scope.parent;
                        var template = angular.element($compile(html)(scope.$parent));

                        element.prev().replaceWith(template); 
                        element.next().remove();
                        element.remove();
                    }
                    else if (scope.isButton === 'return') {
                        scope.$parent[attrs.toggleEdit] = scope.$parent[attrs.ngInit];
                        scope.parent = scope.$parent[attrs.toggleEdit];
                        var html = '<a ng-model="' + attrs.toggleEdit + '" toggle-edit="' + attrs.toggleEdit + '" href="#">' + scope.$parent[attrs.ngInit] + '</a>';
                        var template = angular.element($compile(html)(scope.$parent));

                        element.prev().prev().replaceWith(template);
                        element.prev().remove();
                        element.remove();
                    }
                });
            }
        }
    });
