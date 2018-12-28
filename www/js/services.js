angular.module('starter.services', [])

.service('myFactory', function($http, $q) {

   var serv = {};
   var baseUrl = 'https://itunes.apple.com/search?term=';
   var category ='';
   var choice ='';
   var limit = 0;
   var finalUrl = '';

   this.jsonPromise = {};

    this.setCategory = function( c ) {
     category = c;
   }

   this.getCategory = function() {
     return category;
   }

    this.setLimit = function( l ) {
     limit = l;
   }

   this.getLimit = function() {
     return limit;
   }
   this.setChoice = function( c ) {
    choice = c;
  }
  this.getChoice = function( ) {
   return choice;
 }
 this.resetChoice = function( ) {
   choice = '';
}



   var makeUrl = function(){
     category = category.split(' ').join('+');
    finalUrl = baseUrl+category+choice+'&limit='+limit+'&callback=JSON_CALLBACK';

   // return finalUrl;
  }


    this.callAPI = function () {

        makeUrl();
        var deferred = $q.defer();

        $http({ method: 'JSONP', url:  finalUrl })

        //  .success(function(data){
        //     deferred.resolve(data);
        //   })

        //  .error(function(){
        //     deferred.reject('There was an error')
        //   })

             .then(
              function (response) {
                // promise is fulfilled

               deferred.resolve(response.data);
              },
              function (response) {
               // the following line rejects the promise
               deferred.reject(response);
             })

     // promise is returned

        return deferred.promise;
   };

   // factory object "serv" is returned
  //return serv;
})


.factory('Chats', function(myFactory,$ionicLoading) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var myData = {};
  var chats = [];

  return {
    setData: function(){
      myFactory.callAPI()
       .then(
         function(result) {
           // promise was fullfilled (regardless of outcome)
           // checks for information will be peformed here
           myData = result;
              for ( i = 0 ; i < myData.results.length; i++) {
              chats[i]= {
                id: myData.results[i].trackId,
                kind: myData.results[i].kind,
                trackName: myData.results[i].trackName,
                trackPreview: myData.results[i].previewUrl,
                artistName: myData.results[i].artistName,
                artistPreview: myData.results[i].artistViewUrl,
                artworkUrl60: myData.results[i].artworkUrl60,
                artworkUrl100: myData.results[i].artworkUrl100,

                collectionName: myData.results[i].collectionName
              };
            }
         },
         function(error) {
           // handle errors here
           alert(error.statusText);
         })
         //return myData;
    },

    getData: function(){
      return myData;
    },
    resetChats: function(){
      chats = [];
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    all: function() {
      
      return chats;
    },
    filterVideo: function() {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].trackPreview.charAt(chats[i].trackPreview.length-7) == 'u') {
          remove(chats[i]);
        }
      }
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})
.filter('myFormat', function(Chats) {
    return function() {
        var x = Chats.all();
        for (i = 0; i < x.length; i++) {
          if ( x[i].kind == 'music-video' && x[i].trackPreview.substring( x[i].trackPreview.length-7) != 'U.p.m4v' )
          {
              x.splice(i, 1);
          }

        }
        return x;
    };
});
