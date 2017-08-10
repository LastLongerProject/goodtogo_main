var vendor = new Array();
var markers = new Array();

var today = new Date();
var todayDay = today.getDay();

var marker_open = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAA8CAMAAAAnktjvAAAAjVBMVEUAAACa1eOa1eOa1eOa1eOa1eOa1eOa1eOa1eOa1eOa1eOa1eNfeoJBTVGEs758qLJtkZo5QUUjHyBQY2mLvsua1eMqKiw/OzxaV1iDgYLk4+O6ubl2c3T////Ix8dMSUqRj5Ca1eOfnZ2tq6vW1dVoZWYxLS6a1eMyNjhIWF2a1eOTytfx8fFmhY51nKbdnYjSAAAAK3RSTlMAIGCvz/+/QN8QMO////////////9w//////////////+A//////9Q//+fxh1NpwAAAcdJREFUeAGN1dXCwjAMhuFOMkWDTGCK6/3f3e+Sb1L2HL9YmwyFDNOy6YttmYbqZzoEHFN1cz1q8dyO0Leok+U3y8CjHl7QKEPqFQZDS2z9Zjkajyey/f++cEbT2WjOzIulPLXfciXDdRQnnKYb5hn9W7U/frneZlnORczbctz+CpV8U47qNMs3u312mJNQqU/yN014yxzF8TY+MsMpfJYnks5FvSviQ1QcDheSTh/plYTbuWCOizj6eNfxjYTrRwo3Oi+KbZmU5TY6FtEC7lcpg4RZdM/y8lO9z/IzSYZySVgk2b+UIXWVScK4zASekGCqSpNO8WQxrYen+K5LTN2hqatNCVOlSeG6YK61qdMY7NGheQIw3H5/SoKvcLQeMaY4WDAwU77/l3uGYWluzLz4b5M17ssn3/4f7Xmx+47TrfhVtt/xcLkt1p+7FRc8n3Y9XnC/Js/RhyfslWCShqmAqS2RG1Kn0FUthk0dbKPZ4fnieSI8NDwkXYulpoVSawUTqueJh9QLJpy8XiievS9c5djrnWCatHyxdq848KemVcHlawWfaaAGCeGotCwia2C6gvvXcolcNRCRGspxBqdVNTh1XdXhHZiPQZhUio4OAAAAAElFTkSuQmCC";
var marker_close = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAA8CAMAAAAnktjvAAAAjVBMVEUAAAC6urq6urq6urq6urq6urq6urq6urq6urq6urq6urq6urqmpaWbmpqysrKwr6+rqqqZl5eRj4+gn5+1tbW6urqUkpKfnZ2tq6vBwMDx8fHd3Ny6ubn////k4+OmpKTIx8e6urrPzs7W1dXq6uqzsrKYlpa6urqWlJSenJy6urq3t7f4+Piop6etra3bnkrLAAAAK3RSTlMAIGCvz/+/QN8QMO////////////9w//////////////+A//////9Q//+fxh1NpwAAAcdJREFUeAGN1dXCwjAMhuFOMkWDTGCK6/3f3e+Sb1L2HL9YmwyFDNOy6YttmYbqZzoEHFN1cz1q8dyO0Leok+U3y8CjHl7QKEPqFQZDS2z9Zjkajyey/f++cEbT2WjOzIulPLXfciXDdRQnnKYb5hn9W7U/frneZlnORczbctz+CpV8U47qNMs3u312mJNQqU/yN014yxzF8TY+MsMpfJYnks5FvSviQ1QcDheSTh/plYTbuWCOizj6eNfxjYTrRwo3Oi+KbZmU5TY6FtEC7lcpg4RZdM/y8lO9z/IzSYZySVgk2b+UIXWVScK4zASekGCqSpNO8WQxrYen+K5LTN2hqatNCVOlSeG6YK61qdMY7NGheQIw3H5/SoKvcLQeMaY4WDAwU77/l3uGYWluzLz4b5M17ssn3/4f7Xmx+47TrfhVtt/xcLkt1p+7FRc8n3Y9XnC/Js/RhyfslWCShqmAqS2RG1Kn0FUthk0dbKPZ4fnieSI8NDwkXYulpoVSawUTqueJh9QLJpy8XiievS9c5djrnWCatHyxdq848KemVcHlawWfaaAGCeGotCwia2C6gvvXcolcNRCRGspxBqdVNTh1XdXhHZiPQZhUio4OAAAAAElFTkSuQmCC";



var tomorrowDay = todayDay + 1;

if (tomorrowDay > 6) {
    tomorrowDay = 0;
};

var infoWindows = [];

var placeid_json = [{
        "placeid": 'ChIJ8c8g8WR2bjQRsgin1zcdMsk',
        "name": '正興咖啡館',
        "borrow": true,
        "return": true,
        "type": '咖啡, 生活小物, 住宿'
    }, {
        "placeid": 'ChIJf8W9Aw52bjQRSFco26usHNI',
        "name": '布萊恩紅茶',
        "borrow": true,
        "return": true,
        "type": '茶飲'
    }, {
        "placeid": 'ChIJMSrK_mR2bjQR_2Zxa_Sjdcw',
        "name": 'N23度樂沏',
        "borrow": true,
        "return": true,
        "type": '茶飲'
    }, {
        "placeid": 'ChIJfcgy-mR2bjQR27BbragwUV4',
        "name": '彩虹來了',
        "borrow": true,
        "return": true,
        "type": '生活小物'
    }, {
        "placeid": 'ChIJi5oi-2R2bjQR23K2KGUP-cA',
        "name": 'My Way',
        "borrow": true,
        "return": true,
        "type": '展演空間, 住宿'
    }, {
        "placeid": 'ChIJseQKc2Z2bjQR26O10DtsIiU',
        "name": '神榕147',
        "borrow": true,
        "return": true,
        "type": '咖啡, 生活小物, 住宿'
    }, {
        "placeid": 'ChIJg5fxKGR2bjQRPBTkRd1qE6A',
        "name": '初心地球社',
        "borrow": true,
        "return": true,
        "type": '生活小物'
    }, {
        "placeid": 'ChIJ3f9K-2R2bjQR2lJKpu-EIm4',
        "name": '未艾公寓',
        "borrow": true,
        "return": true,
        "type": '展演空間, 住宿'
    }, {
        "placeid": 'ChIJ_bV5wol2bjQRRUmhHnWYg9o',
        "name": '慕紅豆',
        "borrow": true,
        "return": true,
        "type": '紅豆湯'
    }

    // , {
    //     "placeid": 'ChIJF2tEkGZ2bjQRktR-V6R6kBI',
    //     "name": '有方公寓',
    //     "borrow": true,
    //     "return": true,
    //     "type": ''

    // }

];


function initialize() {
    var radius = 8000,
        latitude = 51.9315631,
        longitude = 19.473451,
        center = new google.maps.LatLng(latitude, longitude)
    mapOptions = {
        center: center,
        zoom: 20,
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

    google.maps.event.addListenerOnce(map, 'tilesloaded', function() {
        bounds = new google.maps.LatLngBounds();

        var $listcontent = '';
        for (var Item = 0; Item < vendor.length; Item++) {
            if (vendor[Item].photos !== undefined) {
                var photos = vendor[Item].photos[0].getUrl({
                    maxWidth: 200,
                    maxHeight: 150
                });
            } else {
                var photos = "/assets/img/no-image.jpg";
            };

            var vendorType = '';

            for (var type = 0; type < vendor.length; type++) {
                if (window.vendor[Item].place_id !== window.placeid_json[type].placeid) {
                    continue;
                } else {
                    vendorType = window.placeid_json[type].type;
                    break;
                }
            }

            var $listcontent = $listcontent + '<div class="vendorItem marker-link" data-markerid="' + Item + '">' +
                '<div class="vendorPhoto"><img src="' + photos + '"></div>' + '<div class="vendorInfo">' + '<h3 class="vendorName">' +
                vendor[Item].name +
                '</h3>' + '<p class="vendorAddress">' + vendor[Item].formatted_address +
                '</p>' + '<p class="vendorType">' + vendorType + '</p>' + isOpeningList(vendor[Item]) + '</div>' + '</div>';

            bounds.extend(vendor[Item].geometry.location);
            map.fitBounds(bounds);
        };
            $('.vendorList').append($listcontent);
        $('.marker-link').on('mouseenter', function($e) {
            google.maps.event.trigger(markers[$(this).data('markerid')], 'click');
        });
        var $carousel = $('.vendorList');

        function showSliderScreen($widthScreen) {

            if ($widthScreen <= "920") {

                if (!$carousel.hasClass('slick-initialized')) {
                    $carousel.slick({
                        centerMode: true,
                        arrows: false,

                        responsive: [{
                                breakpoint: 1024,
                                settings: {
                                    arrows: false,
                                    centerMode: true,
                                    slidesToShow: 1
                                }
                            },
                            {
                                breakpoint: 480,
                                settings: {
                                    arrows: false,
                                    centerMode: true,
                                    centerPadding: '10px',
                                    slidesToShow: 1
                                }
                            }
                        ]
                    });

                }

            } else {
                $.scrollify.disable();
                if ($carousel.hasClass('slick-initialized')) {
                    $carousel.slick('unslick');
                }
            }
        }

        var widthScreen = $(window).width();
        $(window).ready(showSliderScreen(widthScreen)).resize(
            function() {
                var widthScreen = $(window).width();
                showSliderScreen(widthScreen);
            }
        );

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
            var icon_url = marker_open;
        } else {
            var icon_url = marker_close;
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
        // var contentString = '<div class="scrollFix"><span class="place-title">' + '<a href="' + result.url + '">' + result.name + '</a>' + '</span><br>' +
        //     isOpeningString(result) +
        //     '</div>';
        var contentString = '<div class="scrollFix"><span class="place-title">' + '<a href="' + result.url + '">' + result.name + '</a>' + '</span>' +
            '</div>';
        infoWindow = new google.maps.InfoWindow({
            content: contentString
        });


        markers.push(marker);

        google.maps.event.addListener(marker, "click", function(e) {
            if (infoWindow) closeAllInfoWindows();

            for (var i = window.markers.length - 1; i >= 0; i--) {
                window.markers[i].setAnimation();
                if (window.markers[i].id === this.id) {
                    marker.setAnimation(google.maps.Animation.oo);
                }
            };
            infoWindow.open(map, marker);
            infoWindows.push(infoWindow);

            position = new google.maps.LatLng(marker.place.location.lat(), marker.place.location.lng());
            map.panTo(position);

            // if (map.getZoom() != 18) map.setZoom(18);

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

function toggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}


function isOpeningList(_place) {
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
        _isOpening = '<div class="vendorOpening"><div class="open-dot"></div>' + _openedAt + ' ~ ' + _willCloseAt + '</div>';
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
            _isOpening = '<div class="vendorOpening"><div class="close-dot"></div>休息中 </div>';
        } else {
            _isOpening = '<div class="vendorOpening"><div class="close-dot"></div>休息中 ' + _willOpenAt + ' 營業</div>';
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
    $.scrollify({
        section: ".scrollify",
        interstitialSection: ".footer-section",
        easing: "easeOutExpo",
        scrollSpeed: 1000
    });
    $('.vendorList').on('afterChange', function(event, slick, currentSlide, nextSlide) {

        google.maps.event.trigger(markers[currentSlide], 'click');
    });

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
            imageSrc: 'assets/img/intro_bg.jpg',
            naturalHeight: '1440',
            naturalWidth: '1920'
        });
    }
});