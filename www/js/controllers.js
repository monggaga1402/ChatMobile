angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats, authenService, $state) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    authenService.getusers().then(function(res) {
        $scope.chats = res;
        console.log($scope.chats);
        // $state.go('tab.dash');
    }, function(err) {
        console.log(err);
    })


    // $scope.chats = authenService.getusers(); 
    $scope.remove = function(chat) {
        Chats.remove(chat);
    };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats, authenService, Socket) {
    var userID = $stateParams.userId;
    $scope.messages = [];
    authenService.getusers().then(function(res) {
        // console.log(userID);
        angular.forEach(res, function(data) {
            if (userID === data._id) {
                $scope.chat = data;
                // // กรณีรับ
                Socket.on(data.username, function(message) {
                    $scope.messages.unshift(message);
                });
                // // กรณีส่ง
                // $scope.sendMessage = function(contact) {
                //     // send message & paramiter to server
                //     // Create a new message object
                //     var message = {
                //         text: $scope.messageText,
                //         // from: จาก userId,
                //         // to: ถึง userId
                //     };
                //     // Emit a 'chatMessage' message event
                //     Socket.emit('chatMessage', message);
                // };


            }
            // $state.go('tab.dash');
        });

    }, function(err) {
        console.log(err);
    })

})


.controller('AccountCtrl', function($scope) {
    $scope.settings = {
        enableFriends: true
    };
})

.controller('LoginCtrl', function($scope, $http, authenService, $state) {
    console.log('login');
    $scope.data = {};
    $scope.login = function(data) {

        var data = {
            username: data.username,
            password: data.password,
        }
        console.log(data);
        authenService.signin(data).then(function(res) {
            $scope.storage = res;
            console.log($scope.storage);
            $state.go('tab.dash');
        }, function(err) {
            console.log(err);
        })
    }


});