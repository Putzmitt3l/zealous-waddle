(function () {
	'use strict';

var App = angular.module('App', []);

App.controller('TableCtrl', function($scope, $http) {
	$scope.currentPage = 0;
	$scope.pageSize = 0;
	$scope.tableColumnNames = [];
	$scope.tableRecords = [];

	$http.get('table.json')
		.then(function(res){
			$scope.tableColumnNames = res.data['columns'];
			$scope.tableRecords = res.data['records'];

			$scope.currentPage = res.data['currentPage'];
			$scope.pageSize = res.data['recordsPerPage'];
			$scope.order = res.data['orderBy'];

			$scope.numberOfPages=function(){
					return Math.ceil($scope.tableRecords.length/$scope.pageSize);
			}

			$scope.setOrderBy = function(index) {
				$scope.order = $scope.tableColumnNames[index];
			}
		});
});

App.filter('startFrom', function() {
		return function(input, start) {
				start = +start; //parse to int
				return input.slice(start);
		}
});

})();
