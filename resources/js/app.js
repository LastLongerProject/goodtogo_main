var vendor = new Array();
var markers = new Array();
var infoWindows = new Array();

var today = new Date();
var todayDay = today.getDay();

var tomorrowDay = todayDay + 1;

if (tomorrowDay > 6) {
    tomorrowDay = 0;
};

var placeid_json = [{
    "placeid": 'ChIJ8c8g8WR2bjQRsgin1zcdMsk',
    "name": '正興咖啡館',
    "borrow": true,
    "return": true
}, {
    "placeid": 'ChIJf8W9Aw52bjQRSFco26usHNI',
    "name": '布萊恩紅茶',
    "borrow": true,
    "return": true
}, {
    "placeid": 'ChIJMSrK_mR2bjQR_2Zxa_Sjdcw',
    "name": 'N23度樂沏',
    "borrow": true,
    "return": true
}, {
    "placeid": 'ChIJfcgy-mR2bjQR27BbragwUV4',
    "name": '彩虹來了',
    "borrow": true,
    "return": true
}, {
    "placeid": 'ChIJi5oi-2R2bjQR23K2KGUP-cA',
    "name": 'My Way',
    "borrow": true,
    "return": true
}, {
    "placeid": 'ChIJseQKc2Z2bjQR26O10DtsIiU',
    "name": '神榕147',
    "borrow": true,
    "return": true
}, {
    "placeid": 'ChIJg5fxKGR2bjQRPBTkRd1qE6A',
    "name": '初心地球社',
    "borrow": false,
    "return": true
}, {
    "placeid": 'ChIJ3f9K-2R2bjQR2lJKpu-EIm4',
    "name": '未艾公寓',
    "borrow": false,
    "return": true
}];

function initialize() {
    var radius = 8000,
        latitude = 51.9315631,
        longitude = 19.473451,
        center = new google.maps.LatLng(latitude, longitude)
    mapOptions = {
        center: center,
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
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
    };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    setMarkers(map);
    google.maps.event.addListenerOnce(map, 'idle', function() {
        bounds = new google.maps.LatLngBounds();
        for (var Item = 0; Item < vendor.length; Item++) {
            $('.vendorList').append(
                '<a class="vendorItem marker-link" data-markerid="'+ Item +'"href="#">' +
                '<img src="../assets/img/map_marker_42x60.png" height="60" width="42">'+ '<h3>'+
                vendor[Item].name +
                '</h3></a>'
            );

       
            bounds.extend(vendor[Item].geometry.location);
        };
        $('.marker-link').on('click', function($e) {
            google.maps.event.trigger(markers[$(this).data('markerid')], 'click');
            $e.preventDefault();
        });
        map.fitBounds(bounds);
    });
}



function setMarkers(map) {
    var json = placeid_json;
    for (var i = 0, length = json.length; i < length; i++) {
        var data = json[i];
        createMarker(data, map);
    }
}

function createMarker(data, map) {
    var service = new google.maps.places.PlacesService(map);
    service.getDetails({
        placeId: data.placeid
    }, function(result, status) {
        vendor.push(result);
        if (status != google.maps.places.PlacesServiceStatus.OK) {
            console.log(status);
            return;
        }
        if (result.opening_hours.open_now) {
            var icon_url = '/assets/img/map_marker_42x60.png';
        } else {
            var icon_url = '/assets/img/map_marker_disable_42x60.png'
        };
        var marker = new google.maps.Marker({
            map: map,
            place: {
                placeId: data.placeid,
                location: result.geometry.location
            },
            icon: {
                url: icon_url,

            }
            // position: result.geometry.location



        });
        infoBox(map, marker, data, result);
    });

}

function infoBox(map, marker, data, result) {
    (function(marker) {
        var infoWindow = new google.maps.InfoWindow();
        var contentString = '<div class="scrollFix"><span class="place-title">' + '<a href="' + result.url + '">' + result.name + '</a>' + '</span><br>' +
            isOpeningString(result) +
            '</div>';
        infoWindow = new google.maps.InfoWindow({
            content: contentString
        });


        markers.push(marker);

        google.maps.event.addListener(marker, "click", function(e) {

            if (infoWindow) {
                closeAllInfoWindows();
            }

            infoWindow.open(map, marker);
            infoWindows.push(infoWindow);
        });
    })(marker);

}

function closeAllInfoWindows() {
    for (var i = 0; i < infoWindows.length; i++) {
        infoWindows[i].close();
    }
}

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

$(document).ready(function() {


    function counter() {
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
                    $('#result-number').unbind();
                    $el.text(start);
                }, refresh);
            });
            $(this).off('scroll', counter);
        }
    }

    if ($('#result-number').length > 0) {
        $(window).on("scroll", counter);
    }

    if (window.location.pathname == '/') {
        $('.intro-section').parallax({
            imageSrc: 'assets/img/intro_bg.jpg'
        });

        for (var place = 0; place < placeid_json.length; place++) {
         
        console.log(placeid_json[place].name + placeid_json[place].borrow + placeid_json[place].return);
        }
    }
});