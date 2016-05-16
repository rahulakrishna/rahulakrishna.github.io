var app = angular.module('app', ['react']);

  var PhoneList = React.createClass({
    propTypes:{
      phones:React.PropTypes.array.isRequired
    },
    render: function () {
      return (
        <div className="card-content center">
          {this.props.phones.map(function (item) {
            return <div>{item}</div>
          })}
        </div>
      );
    }
  });

  app.controller('phoneCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get('phones.json').success(function (data) {
      $scope.phones = data;
    })
  }]);

  app.directive('phonelist',function (reactDirective) {
    return reactDirective(PhoneList);
  });

  angular.bootstrap(document,['app']);
