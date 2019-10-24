var vendor = new Array();
var markers = new Array();

var today = new Date();
var todayDay = today.getDay();
var tomorrowDay = todayDay + 1;
if (tomorrowDay > 6) {
    tomorrowDay = 0;
};

var marker_open = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAA8CAMAAAAnktjvAAAAjVBMVEUAAACa1eOa1eOa1eOa1eOa1eOa1eOa1eOa1eOa1eOa1eOa1eNfeoJBTVGEs758qLJtkZo5QUUjHyBQY2mLvsua1eMqKiw/OzxaV1iDgYLk4+O6ubl2c3T////Ix8dMSUqRj5Ca1eOfnZ2tq6vW1dVoZWYxLS6a1eMyNjhIWF2a1eOTytfx8fFmhY51nKbdnYjSAAAAK3RSTlMAIGCvz/+/QN8QMO////////////9w//////////////+A//////9Q//+fxh1NpwAAAcdJREFUeAGN1dXCwjAMhuFOMkWDTGCK6/3f3e+Sb1L2HL9YmwyFDNOy6YttmYbqZzoEHFN1cz1q8dyO0Leok+U3y8CjHl7QKEPqFQZDS2z9Zjkajyey/f++cEbT2WjOzIulPLXfciXDdRQnnKYb5hn9W7U/frneZlnORczbctz+CpV8U47qNMs3u312mJNQqU/yN014yxzF8TY+MsMpfJYnks5FvSviQ1QcDheSTh/plYTbuWCOizj6eNfxjYTrRwo3Oi+KbZmU5TY6FtEC7lcpg4RZdM/y8lO9z/IzSYZySVgk2b+UIXWVScK4zASekGCqSpNO8WQxrYen+K5LTN2hqatNCVOlSeG6YK61qdMY7NGheQIw3H5/SoKvcLQeMaY4WDAwU77/l3uGYWluzLz4b5M17ssn3/4f7Xmx+47TrfhVtt/xcLkt1p+7FRc8n3Y9XnC/Js/RhyfslWCShqmAqS2RG1Kn0FUthk0dbKPZ4fnieSI8NDwkXYulpoVSawUTqueJh9QLJpy8XiievS9c5djrnWCatHyxdq848KemVcHlawWfaaAGCeGotCwia2C6gvvXcolcNRCRGspxBqdVNTh1XdXhHZiPQZhUio4OAAAAAElFTkSuQmCC";
var marker_close = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAA8CAMAAAAnktjvAAAAjVBMVEUAAAC6urq6urq6urq6urq6urq6urq6urq6urq6urq6urq6urqmpaWbmpqysrKwr6+rqqqZl5eRj4+gn5+1tbW6urqUkpKfnZ2tq6vBwMDx8fHd3Ny6ubn////k4+OmpKTIx8e6urrPzs7W1dXq6uqzsrKYlpa6urqWlJSenJy6urq3t7f4+Piop6etra3bnkrLAAAAK3RSTlMAIGCvz/+/QN8QMO////////////9w//////////////+A//////9Q//+fxh1NpwAAAcdJREFUeAGN1dXCwjAMhuFOMkWDTGCK6/3f3e+Sb1L2HL9YmwyFDNOy6YttmYbqZzoEHFN1cz1q8dyO0Leok+U3y8CjHl7QKEPqFQZDS2z9Zjkajyey/f++cEbT2WjOzIulPLXfciXDdRQnnKYb5hn9W7U/frneZlnORczbctz+CpV8U47qNMs3u312mJNQqU/yN014yxzF8TY+MsMpfJYnks5FvSviQ1QcDheSTh/plYTbuWCOizj6eNfxjYTrRwo3Oi+KbZmU5TY6FtEC7lcpg4RZdM/y8lO9z/IzSYZySVgk2b+UIXWVScK4zASekGCqSpNO8WQxrYen+K5LTN2hqatNCVOlSeG6YK61qdMY7NGheQIw3H5/SoKvcLQeMaY4WDAwU77/l3uGYWluzLz4b5M17ssn3/4f7Xmx+47TrfhVtt/xcLkt1p+7FRc8n3Y9XnC/Js/RhyfslWCShqmAqS2RG1Kn0FUthk0dbKPZ4fnieSI8NDwkXYulpoVSawUTqueJh9QLJpy8XiievS9c5djrnWCatHyxdq848KemVcHlawWfaaAGCeGotCwia2C6gvvXcolcNRCRGspxBqdVNTh1XdXhHZiPQZhUio4OAAAAAElFTkSuQmCC";

var infoWindows = [];
var bounds;
var json_length;
var placeid_json;
var apiErrCount = 0;
var API_ERR_TIMES_LIMIT = 5;
var globalUsedAmount = 0;

function initialize() {
    var radius = 8000,
        latitude = 22.9934504,
        longitude = 120.222221,
        center = new google.maps.LatLng(latitude, longitude)
    mapOptions = {
        center: center,
        zoom: 7,
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

    google.maps.event.addListenerOnce(map, 'tilesloaded', function () {
        $.ajax({
            url: "https://app.goodtogo.tw/test/stores/list/forOfficialPage",
            type: "GET",
            dataType: 'json',
            success: function (data) {
                bounds = new google.maps.LatLngBounds();
                placeid_json = data.storeList;
                setMarkers(map);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.error(xhr.status);
                console.error(thrownError);
            }
        });
    });
};

function bindMarker() {
    $('.marker-link').on('mouseenter', function ($e) {
        google.maps.event.trigger(markers[$(this).data('markerid')], 'click');
    });
}

function setMarkers(map) {
    var json = placeid_json;
    json_length = json.length;
    for (var i = 0; i < json_length; i++) {
        if (apiErrCount > API_ERR_TIMES_LIMIT) break;
        var data = json[i];
        createMarker(data, map);
    }
    bindMarker();
}

var markerCtr = 0;

function createMarker(data, map) {
    if (data.opening_hours && checkIsOpening(data.opening_hours)) {
        var icon_url = marker_open;
    } else {
        var icon_url = marker_close;
    };

    var marker = new google.maps.Marker({
        map: map,
        place: {
            placeId: data.placeid,
            location: data.geometry_location
        },
        icon: {
            url: icon_url,
        }
    });
    vendor.push(data);
    markers.push(marker);
    infoBox(map, marker, data);
    appendVendorIntoList(map, data, markerCtr);
    markerCtr++;
}

function infoBox(map, marker, data) {
    (function (marker) {
        var infoWindow = new google.maps.InfoWindow();
        var contentString = '<div class="scrollFix"><span class="place-title">' + '<a href="' + data.url + '">' + data.name + '</a>' + '</span>' +
            '</div>';
        infoWindow = new google.maps.InfoWindow({
            content: contentString
        });

        google.maps.event.addListener(marker, "click", function (e) {
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

function appendVendorIntoList(map, data, venderCtr) {
    var $listcontent = '';
    var photo;
    if (data.photo !== null) {
        photo = data.photo;
    } else {
        photo = "/assets/img/no-image.jpg";
    };
    var $listcontent = $listcontent + '<div class="vendorItem marker-link" data-markerid="' + venderCtr + '">' +
        '<div class="vendorPhoto"><img src="' + photo + '"></div>' + '<div class="vendorInfo">' + '<h3 class="vendorName">' +
        data.name +
        '</h3>' + '<p class="vendorAddress">' + data.address +
        '</p>' + '<p class="vendorType">' + data.type + '</p>' + isOpeningList(data) + '</div>' + '</div>';

    bounds.extend(data.geometry_location);
    map.fitBounds(bounds);
    $('.vendorList').append($listcontent);
}

function closeAllInfoWindows() {
    for (var i = 0; i < infoWindows.length; i++) {
        infoWindows[i].close();
    }
}

function toggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}

function scrollifySwitch() {
    if (isMobileMode()) {
        $.scrollify.disable();
    } else {
        $.scrollify.enable();
    }
}

function isMobileMode() {
    var $widthScreen = $(window).width();
    return $widthScreen <= "920";
}

function isOpeningList(_place) {
    var _isOpening = '';
    var _willOpenAt = '';
    var _openedAt = '';
    var _willCloseAt = '';
    if (_place.opening_hours) {
        if (_place.opening_hours.open_now) {
            for (var p = 0; p < _place.opening_hours.periods.length; p++) {
                if (_place.opening_hours.periods[p].open.day === todayDay) {
                    _openedAt = _place.opening_hours.periods[p].open.time;
                    _willCloseAt = _place.opening_hours.periods[p].close.time;
                    break;
                };
            };
            _isOpening = '<div class="vendorOpening"><div class="open-dot"></div>' + _openedAt + ' ~ ' + _willCloseAt + '</div>';
        } else {
            for (var p = 0; p < _place.opening_hours.periods.length; p++) {
                if (_place.opening_hours.periods[p].open.day === tomorrowDay) {
                    _willOpenAt = '明日 ' + _place.opening_hours.periods[p].open.time;
                    break;
                } else if (_place.opening_hours.periods[p].open.day === todayDay) {
                    _willOpenAt = '今日 ' + _place.opening_hours.periods[p].open.time;
                    break;
                }
            }
            if (_willOpenAt === '') {
                _isOpening = '<div class="vendorOpening"><div class="close-dot"></div>休息中 </div>';
            } else {
                _isOpening = '<div class="vendorOpening"><div class="close-dot"></div>休息中 ' + _willOpenAt + ' 營業</div>';
            }
        }
    }
    return _isOpening;
};

function time0000ToTimeText(time) {
    return time;
};

var now = new Date();
var now_day = now.getDay();
var now_hour = now.getHours();
var now_minute = now.getMinutes();

function checkIsOpening(opening_hours) {
    var periodsLength = opening_hours.periods.length;
    if (opening_hours.hasOwnProperty("open_now")) return opening_hours.open_now;
    for (var index = now_day % periodsLength, ctr = 0; ctr < periodsLength; ctr++) {
        var thePeriod = opening_hours.periods[index];
        var reg_open = /(\d*):(\d*)/.exec(thePeriod.open.time);
        var period_open_hour = parseInt(reg_open[1]);
        var period_open_minute = parseInt(reg_open[2]);
        var reg_close = /(\d*):(\d*)/.exec(thePeriod.close.time);
        var period_close_hour = parseInt(reg_close[1]);
        var period_close_minute = parseInt(reg_close[2]);
        if ((thePeriod.open.day < now_day || (thePeriod.open.day === now_day && period_open_hour < now_hour) || (thePeriod.open.day === now_day && period_open_hour === now_hour && period_open_minute <= now_minute)) &&
            (thePeriod.close.day > now_day || (thePeriod.close.day === now_day && period_close_hour > now_hour) || (thePeriod.close.day === now_day && period_close_hour === now_hour && period_close_minute >= now_minute))) {
            opening_hours.open_now = true;
            return true;
        }
        index = (index + 1) % periodsLength;
    }
    opening_hours.open_now = false;
    return false;
}

function debounce(func, delay) {
    var timer = null;
    if (typeof func !== "function") return;
    if (typeof delay !== "number") delay = 200;
    return function () {
        var context = this;
        var args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            func.apply(context, args)
        }, delay);
    }
}

$(document).ready(function () {
    $.scrollify({
        section: ".scrollify",
        interstitialSection: ".footer-section",
        standardScrollElements: ".non-scrollify",
        easing: "easeOutExpo",
        scrollSpeed: 1000
    });
    scrollifySwitch();
    $('.vendorList').on('afterChange', function (event, slick, currentSlide, nextSlide) {
        google.maps.event.trigger(markers[currentSlide], 'click');
    });

    function counter() {
        var hT = $('#result-number').offset().top, //元素的最高點
            hH = $('#result-number').outerHeight(), //元素高度
            wH = $(window).height(), //視窗高度
            wS = $(this).scrollTop(); //捲到哪裡

        if (wS > (hT + hH - wH) && (hT > wS) && (wS + wH > hT + hH)) {
            $('#result-number').each(function () {
                var $el = $(this);
                var max = parseInt(globalUsedAmount);
                $(this).text('0');
                var duration = 1000;
                var refresh = Math.floor((Math.random() * 10));;
                var frames = duration / refresh;
                var start = 0;
                var step = Math.max(Math.round(max / frames), 1);
                var interval = window.setInterval(function () {
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
        $.ajax({
            url: "https://app.goodtogo.tw/test/containers/globalUsedAmount",
            type: "GET",
            dataType: 'text',
            success: function (data) {
                globalUsedAmount = data.replace(/\"/g, '');
                // alert(msg);
                $(window).on("scroll", counter);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.error(xhr.status);
                console.error(thrownError);
            }
        });
    }

    if (window.location.pathname == '/') {
        $('.intro-section').parallax({
            imageSrc: 'assets/img/intro_bg.jpg',
            naturalHeight: '1440',
            naturalWidth: '1920'
        });
    }

    $(window).resize(debounce(function () {
        $.scrollify.current();
        scrollifySwitch();
    }, 200));
});