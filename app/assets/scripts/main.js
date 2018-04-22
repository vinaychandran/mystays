'use strict';
var triggerVideo;
const FE = {
    global: {
        loginModal: (id, transition, backdropclose) => {
            const loginModal = new popup(id, {
                transition: transition,
                backdropclose: backdropclose
            });
            loginModal.init();
        },
        lazyLoad: () => {
          const myLazyLoad = new LazyLoad({
            elements_selector: '.lazy',
            threshold: -100
          });
          myLazyLoad.update();
        },

        playVideo: (evt) => {
            const video = new videoPlayer();
            if (evt.target.attributes.getNamedItem('data-target')) {
                video.closeVideo();
            }
            if (evt.target.attributes.getNamedItem('data-src')) {
                let src = evt.target.attributes.getNamedItem('data-src').value;

                video.openVideo(src);
            }
        },

        clearTimer: () => {
            clearTimeout(triggerVideo);
        },

        videoPlayer: (event) => {
            let evt = event;
            triggerVideo = setTimeout(function() {
                FE.global.playVideo(evt);
            }, 3000);
        },

        navigatePage: (page) => {
            location.href = page;
        },

        tabs: {
            tabLinks: new Array(),
            contentDivs: new Array(),
            tabs: () => {
                let tabListItems = document.getElementById('tabs').childNodes;
                for (let i = 0; i < tabListItems.length; i++) {
                    if (tabListItems[i].nodeName == 'LI') {
                        let tabLink = FE.global.tabs.getFirstChildWithTagName(tabListItems[i], 'A');
                        let id = FE.global.tabs.getHash(tabLink.attributes.getNamedItem('data-href').value);
                        FE.global.tabs.tabLinks[id] = tabLink;
                        FE.global.tabs.contentDivs[id] = document.getElementById(id);
                    }
                }

                let i = 0;

                for (let id in FE.global.tabs.tabLinks) {

                    FE.global.tabs.tabLinks[id].addEventListener('click', FE.global.tabs.showTab);

                    if (i == 0) FE.global.tabs.tabLinks[id].className = 'selected';
                    i++;
                }
                let j = 0;

                for (let id in FE.global.tabs.contentDivs) {
                    if (j != 0) FE.global.tabs.contentDivs[id].className = 'tabContent hide';
                    j++;
                }
            },
            showTab: (e) => {
                const that = event.target.attributes.getNamedItem('data-href').value;
                let selectedId = FE.global.tabs.getHash(that);

                for (let id in FE.global.tabs.contentDivs) {
                    if (id == selectedId) {
                        FE.global.tabs.tabLinks[id].className = 'selected';
                        FE.global.tabs.contentDivs[id].className = 'tabContent';
                    } else {
                        FE.global.tabs.tabLinks[id].className = '';
                        FE.global.tabs.contentDivs[id].className = 'tabContent hide';
                    }
                }
                e.preventDefault();
            },
            getFirstChildWithTagName: (element, tagName) => {
                for (let i = 0; i < element.childNodes.length; i++) {
                    if (element.childNodes[i].nodeName == tagName) return element.childNodes[i];
                }
            },
            getHash: (url) => {
                var hashPos = url.lastIndexOf('#');
                return url.substring(hashPos + 1);
            },
        },
        sliderImage: (slider, slideToShow, dots, arrows) => {
            $(slider).each(function() {
                let imgIndex, sliderImageCount;
                sliderImageCount = $(this).children().length;
                $(this).slick({
                    slidesToShow: slideToShow,
                    slidesToScroll: 1,
                    dots: dots,
                    arrows: arrows,
                    responsive: [{
                            breakpoint: 2000,
                            settings: {
                                infinite: true,
                            },
                        },
                        {
                            breakpoint: 1080,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 1,
                                infinite: true,
                                arrows: false,
                            },
                        },
                        {
                            breakpoint: 767,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 1,
                                infinite: true,
                                arrows: false,
                            },
                        },
                        {
                            breakpoint: 481,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                infinite: true,
                                arrows: true,
                            },
                        },
                    ],
                });
                imgIndex = $(this).find('.slider-content').index();
                $(this).on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
                    imgIndex = (currentSlide ? currentSlide : 0) + 1;
                });
            });
            $(window).resize(function() {
                $(slider).slick('resize');
                $(slider).slick('refresh');
            });
        },
        instaFeed: () => {
          var feed = new Instafeed({
            get: 'tagged',
            tagName: 'hotelmystays',
            clientId: '1459052068',
            accessToken: '1459052068.3a81a9f.656faf6eb84044cea80572ed44299e2e',
            limit: 7,
            resolution: 'low_resolution',
            template: '<a href="{{link}}" target="_blank"><div class="lazy insta-bg" data-src="{{image}}"><div class="insta-mask"><div class="insta-content"><span class="insta-date">10 april 2018</span><span class="insta-likes">{{likes}}</span><span class="insta-comments">{{comments}}</span></div></div></div></a>',
            after: function() {
              var node = document.createElement('A');
              var span = document.createElement('SPAN');
              var textnode = document.createTextNode('67 Hotel Photos VIEW GALLERY');
              span.appendChild(textnode);
              node.appendChild(span);
              node.id = 'more-link';
              node.href = '#';
              var feed = document.getElementById('instafeed');
              feed.appendChild(node);
              FE.global.lazyLoad();
            }
          });
          feed.run();
        },
        showBookingTab: (evt, tabName) => {
            var i, tabcontent, tablinks;
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }
            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
            }
            document.getElementById(tabName).style.display = "block";
            evt.currentTarget.className += " active";
        },

        googleMap: () => {
            let selectorMapElement = document.getElementById('gmap_canvas');
            if (typeof(selectorMapElement) != 'undefined' && selectorMapElement != null) {
                let latlng = new google.maps.LatLng(35.784248, 140.351513);

                let myOptions = {
                    zoom: 16,
                    center: latlng,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                let map = new google.maps.Map(selectorMapElement, myOptions);
                let marker = new google.maps.Marker({
                    position: latlng,
                    title: 'Hotel Mystays',
                    labelAnchor: new google.maps.Point(500, 500),
                    label: {
                        text: 'Hotel Mystays testing',
                        color: "#a69224",
                        fontSize: "16px",
                        fontWeight: "bold",
                    },
                    icon: '../assets/images/marker-icon.png',
                    map: map
                });
            }
        },
        changeLanguage: () => {
            let lang = document.getElementsByClassName('selected-lang');
            function showDropDown(e){
                this.classList.add('active');
            };
            for (var i = 0; i < lang.length; i++) {
               lang[i].addEventListener('click', showDropDown);
            }
        },
        sideNavigation: () => {
            let hamburger = document.getElementById('hamburger');
            let sideNav = document.getElementById('sideNav');
            hamburger.addEventListener('click', function () {
                if (this.classList.contains('active')) {
                    this.classList.remove('active');
                    sideNav.classList.remove('active');
                } else {
                    this.classList.add('active');
                    sideNav.classList.add('active');
                }
            });
        },
        clickOutside: (method, box, targetElement) => {
            $('html').on('click', 'body', function (e) {
                var container = $(box);
                if (!container.is(e.target) && container.has(e.target).length === 0) {
                    switch (method) {
                        case 'fade':
                            $(targetElement).stop().fadeOut(500);
                            break;
                        case 'slide':
                            $(targetElement).stop().slideUp();
                            break;
                        case 'active':
                            $(targetElement).stop().removeClass('active');
                            break;
                    }
                    $('body').removeClass('noScrollBody');
                }
            });
        },
        autocomplatePopup: () => {
            $(document).on('click', '.input-showtext input', function () {
                if($(this).parents('#header-search-popup').length == 1){
                    $(this).parents('.input-showtext').find('.popup-menu-header').fadeIn('500');
                    $('.header-search-destinations').hide();
                    $('.header-show-destinations').show();
                }
                else{
                    $(this).parents('.input-showtext').find('.popup-menu').fadeIn();
                }
            });
            $(document).on('focus', '.input-showtext input', function () {
                $(this).select();
                $(this).next().find('li span').on('click', function () {
                    $(this).parents('.input-showtext').find('input').val($(this).text());
                   // $(this).parents('.input-showtext').find('input').focus();
                });
                $(this).next().find('li span').each(function () {
                    if ($(this).text().toLowerCase() === $(this).parents('.input-showtext').find('input').val().toLowerCase()) {
                        $(this).addClass('active');
                    }
                });
                let hotelChild = $(this).next().find('ul').children().length,
                    _self = $(this),
                    itemI = $(this).next().find('ul li span');
                if ($(this).next().find('ul li span.active').length) {
                    return;
                } else {
                    for (let i = 0; i < hotelChild; i++) {
                        if (itemI.eq(i).is(':visible')) {
                            itemI.eq(i).addClass('active');
                            _self.attr('href', itemI.eq(i).parent().attr('data-link'));
                            break;
                        }
                    }
                }
            });
            $(document).on('keyup', '.input-showtext input', function (e) {
                if($(this).parents('#header-search-popup').length == 1){
                    $(this).parents('.input-showtext').find('.popup-menu-header').fadeIn('500');
                    $('.header-search-destinations').hide();
                    $('.header-show-destinations').show();
                }
                setTimeout(() => {
                    let keyTxt = $(this).val().toLowerCase();
                    $(this).next().find('ul li span').each(function () {
                        let string = $(this).text().toLowerCase();
                        let names = $(this).attr('names').toLowerCase();
                        let hotel;
                         $(this).parent('li').removeClass('hide-hotel');
                        if (typeof ($(this).attr('city')) !== 'undefined') {
                            hotel = $(this).attr('city').toLowerCase();
                            if ((string.search(keyTxt) >= 0) || (hotel.search(keyTxt) >= 0) || (names.search(keyTxt) >= 0)) {
                                $(this).parent('li').addClass('show-hotel');
                                $(this).parent('li').removeClass('hide-hotel');
                            } else {
                                $(this).parent('li').removeClass('show-hotel');
                                $(this).parent('li').removeClass('hide-hotel');
                            }
                        } else {
                            if (string.search(keyTxt) >= 0) {
                                $(this).parent('li').addClass('show-hotel');
                                $(this).parent('li').removeClass('hide-hotel');
                            } else {
                                $(this).parent('li').removeClass('show-hotel');
                                $(this).parent('li').removeClass('hide-hotel');
                            }
                        }
                        $(this).removeClass('active');
                        $(this).parent('li').removeClass('top0').removeClass('top1').removeClass('top2');
                    });

                    if (keyTxt.length <= 0) {
                        $(this).next().find('ul li').show();
                    }
                    let hotelChild = $(this).next().find('ul').children().length,
                        _self = $(this),
                        itemI = $(this).next().find('ul li span');
                    for (let i = 0; i < hotelChild; i++) {
                        if (itemI.eq(i).is(':visible')) {
                            itemI.eq(i).addClass('active');
                            _self.attr('href', itemI.eq(i).parent().attr('data-link'));
                            break;
                        }
                    }
                    if (e.which == 13) {
                        if (typeof ($(this).attr('href')) !== 'undefined') {
                            document.location = $(this).attr('href');
                        } else {
                            $(this).val($(this).next().find('ul li span.active').text());
                        }
                    }

                    FE.global.resultSortOrder();

                }, 300);


            });
            $(document).on('keydown', '.input-showtext input', function (e) {
                if(e.which == 9 || e.which == 40){ // tab
                    e.preventDefault();
                    $(this).next().find('ul li span').first().addClass('active');
                    $(this).next().find('ul li span').first().focus();
                    $(this).blur();
                }
            });



            $(document).on('keydown', '.popup-menu ul li span', function (e) {
                $(this).parents('.input-showtext').addClass('focus');
                var linkH = $(this).parent().attr('data-link');
                if(e.which == 9 || e.which == 40){ // tab
                    $('.popup-menu ul li span').removeClass('active');
                    $(this).parent('li').next().find('span').focus().addClass('active');
                }
                if (e.which == 13) {
                    var win = window.open(linkH,'_self');
                }
                if(e.which == 38){ // tab
                    $('.popup-menu ul li span').removeClass('active');
                    $(this).parent('li').prev().find('span').focus().addClass('active');
                }
            });

            $(document).on('keydown', '.popup-menu-header ul li span', function (e) {
                    let keyTxt = $('.input-showtext input').val().toLowerCase();
                    console.log(keyTxt);
                    $(this).parents('.input-showtext').addClass('focus');
                    console.log($(this).parent('li'));
                    var linkH = $(this).parent().attr('data-link');
                    if(e.which == 40){
                            $('.popup-menu-header ul li span').removeClass('active');
                            $(this).parent('li').next('li').find('span').focus().addClass('active');
                    }
                    if (e.which == 13) {
                        var win = window.open(linkH,'_self');
                    }
                    if(e.which == 38){ // tab
                        $('.popup-menu-header ul li span').removeClass('active');
                        $(this).parent('li').prev().find('span').focus().addClass('active');
                    }
            });


            $(document).on('click', '.input-showtext .popup-content-input ul li span', function () {
                $(this).parents('.input-showtext').find(' .popup-content-input ul li span').removeClass('active');
                $(this).addClass('active');
                $(this).parents('.input-showtext').find('input').attr('href', $(this).parent().attr('data-link')).focus();
                $(this).parents('.input-showtext').find('.popup-menu').fadeOut();
                $(this).parents('.input-showtext').removeClass('focus');
            });
            $(document).on('click', '.input-showtext .popup-content-input ul.cities li span', function () {
                let cities = $(this).attr('target');
                $(this).parents('.input-showtext').find(' .popup-content-input ul.hotels li span').each(function () {
                    let hotelCity = $(this).attr('city');
                    if (cities === hotelCity) {
                        $(this).parent('li').show();
                    } else {
                        $(this).parent('li').hide();
                    }
                });
            });
            $(document).on('click', '.input-showtext .popup-content-input ul.hotels li span', function () {
                let cities = $(this).attr('city'),
                    linkH = $(this).parent().attr('data-link');
                $(this).parents('.input-showtext').find(' .popup-content-input ul.cities li span').each(function () {
                    let hotelCity = $(this).attr('target');
                    if (cities === hotelCity) {
                        $(this).parent('li').show();
                    } else {
                        $(this).parent('li').hide();
                    }
                });
                if ($(this).parents('.search-box').length) {
                    $(this).parents('.input-showtext').attr('href', linkH);
                    var win = window.open(linkH,'_self');
                  //  win.focus();
                }
            });

            $(document).on('click', '.input-showtext-header input', function () {
                $('#header-search-popup').slideDown();
                $('body').addClass('overlay-wrapper');
                $('.nav-sidebar').removeClass('show-sidebar');
                $('.backdrop').removeClass('in');
                $('#header-search-popup .search-hotel').focus();
            });

            $(document).on('click','.header-search-close',function(){
                $('#header-search-popup').stop().slideUp();
                $('body').removeClass('overlay-wrapper');
            });

            $(document).on('click','.header-show-destinations',function(){
                $('.popup-menu-header').slideUp();
                $('.header-search-destinations').show(200);
                $(this).hide();
            });

            $(document).on('click', '.cancel-form .input-showtext input', function () {
                $('html, body').animate({
                    scrollTop: $(this).offset().top - 30
                }, 500);
            });

        },

        init: () => {
            //initialling modal
            //FE.global.loginModal('modal1', false, false);
            FE.global.lazyLoad();
        },
        loaded: function loaded() {
            //Functions inside loaded execute when window loaded
            FE.global.sliderImage('.home-slider-nav', 3, false, true);
            FE.global.tabs.tabs();
            FE.global.instaFeed();
            FE.global.googleMap();
            FE.global.changeLanguage();
            FE.global.sideNavigation();
            FE.global.clickOutside('active', '.selected-lang', '.selected-lang');
            FE.global.clickOutside('fade', '.input-showtext .form-control', '.input-showtext .popup-menu');
            FE.global.sliderImage('.home-video-slider-nav', 4, false, true);
            FE.global.autocomplatePopup();
        },
        resize: function resize() {
            //Functions inside loaded execute when window resize

        }
    }
}


$(function() {
    FE.global.init();
});

$(window).load(function() {
    FE.global.loaded();
    $.DateRangePicker({
        container: '#date_range_picker'
    });
});
