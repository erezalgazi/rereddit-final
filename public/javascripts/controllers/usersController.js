app.controller('UsersCtrl', ['$scope', '$state', 'users', 'auth', function ($scope, $state, users, auth) {
  $scope.users = users;
  // $scope.user = user;
  console.log($scope.users);
  // $state.params.id = $state.params.id + ' '; 
  // console.log(JSON.stringify($state.params.id));
  // $scope.currentUser = auth.currentUser();
  // console.log($scope.currentUser);
  // $scope.currentUsername = $scope.currentUser.username;

  $scope.currentUserId = auth.currentUser()._id;
  for (var i=0; i<$scope.users.length; i++) {
    if ($scope.currentUserId === $scope.users[i]._id) {
      $scope.currentUser = $scope.users[i];
      // console.log($scope.users[i]._id, $state.params.id);
    }
    // console.log($state.params.id, $scope.users[i]._id);
    if ($state.params.id === $scope.users[i]._id) {
      $scope.profileUser = $scope.users[i];
      // console.log($scope.profileUser);
    }
  }
  // console.log($scope.currentUser);
  $scope.addOrRemove = function (user) {
    for (var i = 0; i < $scope.currentUser.friends.length; i++) {
      // console.log(user._id);
       // console.log($scope.currentUser.friends[i]);
      if (user._id === $scope.currentUser.friends[i]) {
        return true;
      }
    }
    // return false;
  };
  $scope.addFriend = function (user) {
    users.addFriend($scope.currentUser, user).then(function() {
      $scope.currentUser.friends.push(user._id);
      user.friends.push($scope.currentUser._id);
    });
  };

  $scope.removeFriend = function (user) {
    // console.log('1');
    users.removeFriend($scope.currentUser, user).then(function () {
      $scope.currentUser.friends.splice($scope.currentUser.friends.indexOf(user._id),1);
      user.friends.splice(user.friends.indexOf($scope.currentUser._id),1);
    });
  };

  $scope.findUserById = function (id) {
    for (var i=0; i<$scope.users.length; i++) {
      if (id === $scope.users[i]._id) {
        return $scope.users[i].username;
      }
    }
    // return 'Erez this code sucks'; 
  };
}]);