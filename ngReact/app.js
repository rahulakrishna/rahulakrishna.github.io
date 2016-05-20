var app = angular.module('app', ['react']);

var Phone=React.createClass({
  propTypes:{
    phone:React.PropTypes.object.isRequired
  },
  render:function () {
    var phone=this.props.phone;
    return(
        <span>{phone.first_name} {phone.last_name}</span>
    );
  }
});


var PhoneList = React.createClass({
  propTypes:{
    phones:React.PropTypes.array.isRequired
  },
  render: function () {
    var phones=this.props.phones;
    return (
        <div className="row">
          {phones.map(function (item) {
            return <div className="col m12 s12 push-m0"> <div key={item.id} className="card react-card"><br/><span><div className="card-content"> {item.desc}</div><div className="card-title">{item.first_name} {item.last_name} <small>{item.ip_address}</small></div><br/> </span></div></div>
          })}
        </div>
    );
  }
});

app.controller('phoneCtrl', ['$scope', '$http', function ($scope, $http) {
  $http.get('data.json').success(function (data) {
    $scope.phones = data;
    $scope.fuck=data;
  })
}]);

app.directive('phonelist',function (reactDirective) {
  return reactDirective(PhoneList);
});

app.directive('phonename',function (reactDirective) {
  return reactDirective(Phone);
});

angular.bootstrap(document,['app']);
