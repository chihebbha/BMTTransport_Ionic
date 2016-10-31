angular.module('starter.controllers', [])
//---------raj----------------
.controller('ReclamationCtrl', function($scope,$http) {
     $http.get("http://localhost:18080/pitwin-web/rest/reclamations",{cache:true}).then(function(response){
         
         $scope.reclamations={};
         $scope.reclamations=response.data;
         
         
     $scope.supprimer = function(id_Reclamation,index) {   
    $http.delete("http://localhost:18080/pitwin-web/rest/reclamations/"+id_Reclamation);
       
          $scope.reclamation.splice(index,1);                   
  }; 
         
     });
    
})


.controller('AddCtrl', function($scope,$http) {
  $scope.ajouter=function(reclamation,sujet,client){
      var data = {
  
          "message_Reclamation": reclamation ,
        "sujet_Reclamation": sujet ,

          "customer":{"id_Person":client}
   
}; 	
 
   
      $http.post("http://localhost:18080/pitwin-web/rest/reclamations/ajoutRc",data);
  };
    
})



.controller('PlanningCtrl', function($scope,$http) {
     $http.get("http://localhost:18080/pitwin-web/rest/plannings",{cache:true}).then(function(response){
         
         $scope.plannings={};
         $scope.plannings=response.data;
     });
    
})

//---------end-workraj-----
//-----------------work Cyrine------------
.controller('busCtrl', function($scope, $stateParams, $http, $ionicLoading,$state){
  
   
$ionicLoading.show({
      template: 'Chargement...'
    });
url="http://localhost:18080/pitwin-web/rest/mapsVehicule/bus"; 
$http.get(url).success(function(response){
    $ionicLoading.hide(); 
 
   
    var res = [[]]
$scope.items=response;
var locations  = response;
    for (var i=0 ; i< locations.length;i++)
    {
    res.push([locations[i].substring(0,locations[i].indexOf(",")),locations[i].substring(locations[i].lastIndexOf(",")+1,locations[i].length)])
    }
 console.log(res);
    //var locations = [[ response[0],"Kalâa Kebira "],[response[1],"Aéroport international de Tozeur-Nefta"]];
   var locations= res ; 
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: new google.maps.LatLng(36.7948624,10.0732371),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();
    var geocoder = new google.maps.Geocoder();

    var marker, i;

    for (i = 0; i < locations.length; i++) {
      geocodeAddress(locations[i]);
    }
   

function geocodeAddress(location) {
  geocoder.geocode( { 'address': location[1]}, function(results, status) {
  //alert(status);
    if (status == google.maps.GeocoderStatus.OK) {

      //alert(results[0].geometry.location);
      map.setCenter(results[0].geometry.location);
      createMarker(results[0].geometry.location,location[0]+"<br>"+location[1]);
    }
    else
    {
      alert("some problem in geocode" + status);
    }
  }); 
}

function createMarker(latlng,html){
  var marker = new google.maps.Marker({
    position: latlng,
    map: map
  }); 

  google.maps.event.addListener(marker, 'mouseover', function() { 
    infowindow.setContent(html);
    infowindow.open(map, marker);
  });
		
  google.maps.event.addListener(marker, 'mouseout', function() { 
    infowindow.close();
  });
}
      
      
});

})

.controller('LoginCtrl', function($rootScope,$scope, $ionicPopup, $state,  $http) {
	

$scope.logining=function(login,password){	



		 url="http://localhost:18080/pitwin-web/rest/autentification/connect/"+login+"/"+password;
        
		
       
		
	var success= function(response){
        
		$scope.loginDetails={};
       $scope.loginDetails=response.data;
		var arr = Object.keys(response).map(function (key) {
            return response[key]});
		var arrRes=Object.keys(arr[0]).map(function (key) {return arr[0][key]})
	 var id  = arrRes[0]; 
	
        
        

$state.go('tab.dash');
		
	}
	var failure = function(err){
		
		var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Invalid credentials!'
		
	});
	}
	
	$http.get(url).then(success,failure);
}
	
  
	
	
})



//--------End work cyrine -------------------


//------------khalil


.controller('resourceSubscriptionsCtrl',

function ($scope, $http) {
      var subscriptionsResource = $http.get('http://localhost:18080/pitwin-web/rest/vehicles',{cache:true}).then(function(response){
          $scope.subscriptions={};
      $scope.subscriptions=response.data;
      
          

          
      });
    
    
    $http.get('http://localhost:18080/pitwin-web/rest/vehicles/Bus',{cache:true}).then(function(response){
          $scope.bus={};
      $scope.bus=response.data;
      });
    
    $http.get('http://localhost:18080/pitwin-web/rest/vehicles/Metro',{cache:true}).then(function(response){
          $scope.metro={};
      $scope.metro=response.data;
      });
    
    $http.get('http://localhost:18080/pitwin-web/rest/vehicles/Train',{cache:true}).then(function(response){
          $scope.train={};
      $scope.train=response.data;
      })    ;
      

 })

.controller('AddVehicle', function($scope,$http,$state) {
    
  $scope.ajouterBus=function(matricule,prix){
      var data = {
  "matricule_Vehicle":  matricule,        
  "tarif_Vehicle": prix 

      };
  
      $http.post("http://localhost:18080/pitwin-web/rest/vehicles/Bus",data);
      $state.go('tab.ajoutTrain');
  };
    
     $scope.ajouterTrain=function(matricule,prix){
      var data = {
  "matricule_Vehicle":  matricule,        
  "tarif_Vehicle": prix 

      };
  
      $http.post("http://localhost:18080/pitwin-web/rest/vehicles/Train",data);
  };
    
   
    
})


//--------end khalil :p






.controller('AddReservation', function($scope,$http, $resource, $state) {
    
 /*   $scope.ajouter=function(prix,itinerary_id,client){

      var reservationResource = $resource('http://localhost:18080/pitwin-web/rest/reservation');
      var reservation = new reservationResource;

      reservation.date_Reservation = new Date(); 
      reservation.prix_Reservation = prix;
      reservation.id_Itinerary =  itinerary_id;
      //reservation.customer.id_Person = client;

      reservation.$save();

};*/
  $scope.ajouter=function(prix,itinerary_id,client){
      var data = {
  "date_Reservation": new Date(),        
  "prix_Reservation": prix ,
"itinerary":{
    "id_Itinerary":1
        
    },
          "customer":{"id_Person":1}
   
}; 	
 
   
      $http.post("http://localhost:18080/pitwin-web/rest/reservation",data);

      $state.go('tab.ListReservations');
      
  };
    
    
})


.controller('ReservationCtrl', function($scope,$http) {
     $http.get("http://localhost:18080/pitwin-web/rest/transport/itineraire",{cache:true}).then(function(response){
         
         $scope.itineraires={};
         $scope.itineraires=response.data;
     });
    
})



.controller('serviceCtrl', function($scope,$http) {
    
$http.get("http://localhost:18080/pitwin-web/rest/reservation"
         ,{cache:true}).then(function(response){
    $scope.service={};
    
    $scope.service=response.data;
    $scope.min=0;
    $scope.max=0;
                $scope.supprimer = function(id_Reservation,index) {
   
        $http.delete("http://localhost:18080/pitwin-web/rest/reservation/"+id_Reservation);
       
          $scope.service.splice(index,1);                 };     
}

       
);    
})

.controller('CusCtrl', function($scope,$http) {
     $http.get("http://localhost:18080/pitwin-web/rest/transport/customer",{cache:true}).then(function(response){
         
         $scope.cuss={};
         $scope.cuss=response.data;
     });
    
})







.filter('currentdate',['$filter',  function($filter) {
    return function() {
        return $filter('date')(new Date(), 'EEEE  mm/d/yyyy ');
    };
}])



.controller("openPDF",function($scope){
$scope.open= function(){window.open("http://localhost:18080/pdf.pdf", '_system', 'location=no');
                       }
}



)






.controller('addSubscriptionCtrl', function ($scope, $resource, $timeout, $q, $ionicPopup) {

      $scope.submit = function () { 
      
$scope.validation="true";
      var subscriptionsResource = $resource('http://localhost:18080/pitwin-web/rest/subscrips/ajoutSub');
      var subscription = new subscriptionsResource;
      /******************/
      var today = new Date();
      /******************/

      /******************/
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for( var i=0; i < 10; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));


      /******************/

      subscription.date_Subscripton = today;
      subscription.numCarte_Subscripton = text;

      subscription.$save();
      /****** MAIL *******/
      var mailRessource = $resource('http://localhost:18080/pitwin-web/rest/subscriptions/mail/bmt.transportpublic@gmail.com/azerty100/subscription success/Your subscription has been confirmed./moatez.benabdallah@esprit.tn/null');
      mailRessource.query();

      /**** popup ****/

      $scope.showAlert = function () {
                $ionicPopup.alert({
                  title: 'Subscription success',
                  content: ''
                }).then(function(res) {
                  console.log('Test Alert Box');
                });
              }


  }

 } )

























