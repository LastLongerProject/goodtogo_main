     var today = new Date();
     var todayDay = today.getDay();
     var tomorrowDay = todayDay + 1;

     if (tomorrowDay > 6) {
         tomorrowDay = 0;
     };

     function initMap() {

         var map = new google.maps.Map(document.getElementById('map'), {
             //zoom: 3,
             //center: {lat: -28.024, lng: 140.887},

             // How you would like to style the map. 
             // This is where you would paste any style found on Snazzy Maps.
             styles: [{
                 "featureType": "administrative",
                 "elementType": "labels.text.fill",
                 "stylers": [{
                     "color": "#444444"
                 }]
             }, {
                 "featureType": "landscape",
                 "elementType": "all",
                 "stylers": [{
                     "color": "#dfe5eb"
                 }]
             }, {
                 "featureType": "poi",
                 "elementType": "all",
                 "stylers": [{
                     "visibility": "off"
                 }]
             }, {
                 "featureType": "road",
                 "elementType": "all",
                 "stylers": [{
                     "saturation": -100
                 }, {
                     "lightness": 45
                 }]
             }, {
                 "featureType": "road.highway",
                 "elementType": "all",
                 "stylers": [{
                     "visibility": "simplified"
                 }]
             }, {
                 "featureType": "road.arterial",
                 "elementType": "labels.icon",
                 "stylers": [{
                     "visibility": "off"
                 }]
             }, {
                 "featureType": "transit",
                 "elementType": "all",
                 "stylers": [{
                     "visibility": "off"
                 }]
             }, {
                 "featureType": "water",
                 "elementType": "all",
                 "stylers": [{
                     "color": "#f5f5f5"
                 }, {
                     "visibility": "on"
                 }]
             }]
         });

         var infowindow = new google.maps.InfoWindow();
         //var places=[];
         var bounds = new google.maps.LatLngBounds();
         var panel = document.getElementById('map-panel');

         for (var j = 0; j < placeIDs.length; j++) {
             var _service = new google.maps.places.PlacesService(map);
             _service.getDetails({
                     placeId: placeIDs[j]
                 },
                 function(place, status) {
                     //places.push(place);
                     console.log(place.name, place.opening_hours);
                     if (status === google.maps.places.PlacesServiceStatus.OK) {

                         var marker = new google.maps.Marker({
                             map: map,
                             icon: {
                                 url: MarkerPath(1),
                                 //scaledSize: new google.maps.Size(64, 64)
                             },
                             position: place.geometry.location
                         });

                         if (place.opening_hours.open_now) {

                         } else {
                             marker.setIcon(MarkerPath(0));
                         }


                         google.maps.event.addListener(marker, 'click', function() {

                             /*
                                 panel.innerHTML='<div class="scrollFix"><span class="place-title">' + '<a href="' + place.url + '">' + place.name + '</a>' + '</span><br>' +
                                 isOpeningString(place) + 
                                 '</div>';
         
                                 */

                             infowindow.setContent('<div class="scrollFix"><span class="place-title">' + '<a href="' + place.url + '">' + place.name + '</a>' + '</span><br>' +
                                 isOpeningString(place) +
                                 '</div>');
                             infowindow.open(map, this);

                         });

                         bounds.extend(place.geometry.location);
                         /*console.log(bounds.toString());*/
                         map.fitBounds(bounds);


                     }
                 }
             );
         };

         // Create an array of alphabetical characters used to label the markers.
         //var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

         // Add some markers to the map.
         // Note: The code uses the JavaScript Array.prototype.map() method to
         // create an array of markers based on a given "locations" array.
         // The map() method here has nothing to do with the Google Maps API.

         /*
         var markers = locations.map(function(location, i) {
           return new google.maps.Marker({
             position: location,
             //label: labels[i % labels.length]
           });
           
         });
         */

         /*
         
             // Add a marker clusterer to manage the markers.
             var markerCluster = new MarkerClusterer(map, markers,
                 {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
         
             */
         /*
             for (var i = 0; i < locations.length; i++) {
              bounds.extend(locations[i]);
              console.log(locations[i]);
              //bounds.extend(locations[i].geometry.location);
             }
         */
         //console.log(bounds.toString());
         //map.fitBounds(bounds);


     };

     var placeIDs = [
         'ChIJ8c8g8WR2bjQRsgin1zcdMsk', //正興咖啡館
         'ChIJf8W9Aw52bjQRSFco26usHNI', //布萊恩紅茶
         'ChIJMSrK_mR2bjQR_2Zxa_Sjdcw', //N23度樂沏
         //'ChIJZwwrUJ52bjQRI6JtlpOqtkg', //午營咖啡
         //'ChIJjdOG92R2bjQRMfr4UpUQ3PQ', //泰成水果店
         //'ChIJE21O9GR2bjQRXP72KaEAtio', //阿婆魯麵
         //'ChIJseQKc2Z2bjQR26O10DtsIiU', //神榕147
         'ChIJfcgy-mR2bjQR27BbragwUV4', //彩虹來了
         //'ChIJDxWX_ZN2bjQRS4H3lUBCAII', //mos漢堡
         //'ChIJm8Bq9mR2bjQRfFum9sPochc' //Woogo加州果昔
        'ChIJi5oi-2R2bjQR23K2KGUP-cA', //My Way
        'ChIJseQKc2Z2bjQR26O10DtsIiU', //神榕147
        // 'ChIJF2tEkGZ2bjQRktR-V6R6kBI', //有方公寓
        'ChIJg5fxKGR2bjQRPBTkRd1qE6A', //初心地球社
        'ChIJ3f9K-2R2bjQR2lJKpu-EIm4' // 未艾公寓
     ];

     /*
       var locations = [
         {lat: 22.994220, lng: 120.197352}, //正興咖啡館
         {lat: 22.994260, lng: 120.197587}, //布萊恩
         {lat: 22.994516, lng: 120.196778}, //N23度樂沏
         {lat: 22.994529, lng: 120.197500}, //魷樂園
         {lat: 22.993732, lng: 120.222158}, //人嶼物
         {lat: 22.977713, lng: 120.224736}, //午營咖啡
         {lat: 22.998397, lng: 120.195087}, //神榕147
       ];
     */
     function isOpeningString(_place) {
         var _isOpening = '';
         var _willOpenAt = '';
         var _openedAt = '';
         var _willCloseAt = '';
         if (_place.opening_hours.open_now) {
             for (var p = 0; p < _place.opening_hours.periods.length; p++) {
                 if (_place.opening_hours.periods[p].open.day === todayDay) {
                     _openedAt = time0000ToTimeText(_place.opening_hours.periods[p].open.time);
                     _willCloseAt = time0000ToTimeText(_place.opening_hours.periods[p].close.time);
                     break;
                 };
             };
             _isOpening = '<span class="highlight-open">營業中</span><br>今日營業到 <span class="highlight-open">' + _willCloseAt + '</span>';
         } else {
             for (var p = 0; p < _place.opening_hours.periods.length; p++) {
                 if (_place.opening_hours.periods[p].open.day === tomorrowDay) {
                     _willOpenAt = '明日 ' + time0000ToTimeText(_place.opening_hours.periods[p].open.time);
                     break;
                 } else if (_place.opening_hours.periods[p].open.day === todayDay) {
                     _willOpenAt = '今日 ' + time0000ToTimeText(_place.opening_hours.periods[p].open.time);
                     break;
                 }
             }
             if (_willOpenAt === '') {
                 _isOpening = '<span class="highlight-close">休息中</span>';
             } else {
                 _isOpening = '<span class="highlight-close">休息中</span><br>將在 <span class="highlight-close">' + _willOpenAt + '</span> 開門';
             }
         }
         return _isOpening;
     };

     function time0000ToTimeText(time) {
         var hour = time.slice(0, 2);
         var min = time.slice(2, 4);
         var ampm = '';
         if (hour < 12) {
             ampm = 'AM';
         } else {
             ampm = 'PM';
         }
         return hour + ':' + min;
         /*return hour+':'+min+ampm;*/
     };

     function MarkerPath(marker){
         if (window.location.pathname == '/') {
            if (marker == 1){
                 return 'assets/img/map_marker_42x60.png';
            }
            else{
                return 'assets/img/map_marker_disable_42x60.png';
            }
         }
         else if(window.location.pathname == '/zx'){
            if (marker == 1){
                 return '../assets/img/map_marker_42x60.png';   
            }
            else{
                return '../assets/img/map_marker_disable_42x60.png';
                
            }
         }

     };


     $(document).ready(function() {



         if (window.location.pathname == '/zx') {
             $(window).scroll(function() {
                 var hT = $('#result-number').offset().top, //元素的最高點
                     hH = $('#result-number').outerHeight(), //元素高度
                     wH = $(window).height(), //視窗高度
                     wS = $(this).scrollTop(); //捲到哪裡

                 if (wS > (hT + hH - wH) && (hT > wS) && (wS + wH > hT + hH)) {
                     $('#result-number').each(function() {
                         var $el = $(this);
                         var max = parseInt($el.text().replace(/\s/g, ''));
                         $(this).text('0');
                         var duration = 1000;
                         var refresh = Math.floor((Math.random() * 10));;
                         var frames = duration / refresh;
                         var start = 0;
                         var step = Math.max(Math.round(max / frames), 1);
                         var interval = window.setInterval(function() {
                             if (start + step < max) {
                                 start += step;
                                  
                             } else {
                                 start = max;
                                 clearInterval(interval);
                             }
                             $(this).off();
                             $el.text(start);
                         }, refresh);
                     });
                 }
             });

}

         if (window.location.pathname == '/') {
             $('.intro-section').parallax({
                 imageSrc: 'assets/img/intro_bg.jpg'
             });
         }

     });