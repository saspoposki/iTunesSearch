angular.module('starter.controllers', [])


.controller('DashCtrl', function($scope, $ionicLoading, myFactory, Chats) {

  $scope.$on('$ionicView.enter', function() {
      Chats.resetChats();



})
$scope.updateChoice = function(){

 myFactory.setChoice($scope.choice) ;

}
      $scope.updateCategory = function(){

        myFactory.setCategory( $scope.category );


      }

    $scope.makeCall = function () {

      Chats.setData();

      }



})


.controller('ChatsCtrl', function($scope, $ionicLoading, Chats, myFactory) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  $scope.$on('$ionicView.enter', function() {

    $ionicLoading.show({
      template: 'Searching....<p id="spinner"><ion-spinner  icon="lines" class="spinner-calm"></ion-spinner></p>',
      duration: 800
    });
      $scope.chats = Chats.all();
      $scope.search = myFactory.getCategory();
      $scope.choice = myFactory.getChoice();
      //$ionicLoading.hide();


})

  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, myFactory ) {

  $scope.$on('$ionicView.enter', function() {
    //myFactory.resetChoice();


})


    $scope.updateLimit = function(){

     myFactory.setLimit($scope.limit) ;

  }
  $scope.updateChoice = function(){

   myFactory.setChoice($scope.choice);

  }

});
