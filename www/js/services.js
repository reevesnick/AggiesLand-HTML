angular.module('starter.services', [])


.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
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
});


angular.module('AggiesLand.services',[]).factory('News',['$http','PARSE_CREDENTIALS',function($http,PARSE_CREDENTIALS){
	
	 var object = {
    text: "",
    image: null
  };
	
    return {
        getAll:function(){
            return $http.get('https://api.parse.com/1/classes/News',{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'

                }
            });
        },
        get:function(id){
            return $http.get('https://api.parse.com/1/classes/News/'+id,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'

                }
            });
        },
        create:function(data){	        
            return $http.post('https://api.parse.com/1/classes/News',data,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'
                }
            });
        },
        edit:function(id,data){
            return $http.put('https://api.parse.com/1/classes/News/'+id,data,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'
                }
            });
        },
        delete:function(id){
            return $http.delete('https://api.parse.com/1/classes/News/'+id,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'
                }
            });
        }
       
    }
    
}]).value('PARSE_CREDENTIALS',{
    APP_ID: '5b91v6F6A0GaeC64FuIgeCctYaEM81LFybSR4g7K',
    REST_API_KEY:'4nWl2C1geJnmfhGoxykM7gAKxUvVah5wSN951Ksq'
})


.factory('CampusEvents',['$http','PARSE_CREDENTIALS',function($http,PARSE_CREDENTIALS){
	
    return {
        getAll:function(){
            return $http.get('https://api.parse.com/1/classes/CampusEvents',{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'                     }
            });
        },
        get:function(id){
            return $http.get('https://api.parse.com/1/classes/CampusEvents/'+id,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'                }
            });
        },
        create:function(data){
            return $http.post('https://api.parse.com/1/classes/CampusEvents',data,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'
                }
            });
        },
        edit:function(id,data){
            return $http.put('https://api.parse.com/1/classes/CampusEvens/'+id,data,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'
                }
            });
        },
        delete:function(id){
            return $http.delete('https://api.parse.com/1/classes/CampusEvents/'+id,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'
                }
            });
        }
    }
    
}]).value('PARSE_CREDENTIALS',{
    APP_ID: '5b91v6F6A0GaeC64FuIgeCctYaEM81LFybSR4g7K',
    REST_API_KEY:'4nWl2C1geJnmfhGoxykM7gAKxUvVah5wSN951Ksq'
})

.factory('Clubs',['$http','PARSE_CREDENTIALS',function($http,PARSE_CREDENTIALS){
	
    return {
        getAll:function(){
            return $http.get('https://api.parse.com/1/classes/Clubs?include=CreatedBy',{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json',
                        params: { include: 'CreatedBy'}

                        
                }
            });
        },
        get:function(id){
            return $http.get('https://api.parse.com/1/classes/Clubs/'+id,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'

                }
            });
        },
        create:function(data){
            return $http.post('https://api.parse.com/1/classes/Clubs',data,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'
                }
            });
        },
        edit:function(id,data){
            return $http.put('https://api.parse.com/1/classes/Clubs/'+id,data,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'
                }
            });
        },
        delete:function(id){
            return $http.delete('https://api.parse.com/1/classes/Clubs/'+id,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'
                }
            });
        }
    }
    
}]).value('PARSE_CREDENTIALS',{
    APP_ID: '5b91v6F6A0GaeC64FuIgeCctYaEM81LFybSR4g7K',
    REST_API_KEY:'4nWl2C1geJnmfhGoxykM7gAKxUvVah5wSN951Ksq'
})

.factory('Photo', function () {
    return {

        convertImageToBase64: function (url, callback, output) {
            var img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = function(){
                var canvas = document.createElement('CANVAS'),
                    c = canvas.getContext('2d'), urlData;
                canvas.height = this.height;
                canvas.width = this.width;
                c.drawImage(this, 0, 0);
                urlData = canvas.toDataURL(output);
                callback(urlData);
                canvas = null;
            };
            img.src = url;
        }

    };
})


;
