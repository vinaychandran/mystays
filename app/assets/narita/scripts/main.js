'use strict';
const isDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isAndroid = /Android/i.test(navigator.userAgent),
    isIos = /iPhone|iPad|iPod/i.test(navigator.userAgent),
    mobileWidth = 767,
    deviceWidth = 1024,
    isIE11 = !!(navigator.userAgent.match(/Trident/) && navigator.userAgent.match(/rv[ :]11/)),
    iOS11 = /OS 11_0_1|OS 11_0_2|OS 11_0_3|OS 11_1|OS 11_1_1|OS 11_1_2|OS 11_2|OS 11_2_1|OS 11_2_2|OS 11_2_3|OS 11_2_4|OS 11_2_5/.test(navigator.userAgent);
const isMobile = $(window).width() <= mobileWidth;
const isIpad = $(window).width() <= deviceWidth;
var sticky, pageOffset;
const FE = {
    global: {
        lazyLoad: () => {
            const myLazyLoad = new LazyLoad({
                elements_selector: '.lazy',
                threshold: 0
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
        tabs: (element) => {
            var tabs = new Tabs({
                elem: element,
                open: 0
            });
            if (document.getElementById('tablink') && isMobile) {
                let tabLink = document.getElementById('tablink');
                tabLink.addEventListener('click', FE.global.openTab);
            }
        },
        openModalTab: (element) => {
            var tabs = new Tabs({
                elem: element,
                isModal: true,
                open: 0
            });
        },
        openTab: (e) => {
            if (document.getElementById('tabs-header') !== null)
                document.getElementById('tabs-header').style.display = 'block';
            if (document.getElementById('room-types') !== null)
                document.getElementById('room-types').style.display = 'block';
            if (document.getElementById('venue-types') !== null)
                document.getElementById('venue-types').style.display = 'block';
            e.preventDefault();
        },

        checkValidationRules: (x) => {
            let formId = x;
            let fieldId, fieldRegex;
            let errorField = [],
                noError = [];
            let formElem = document.querySelector(formId);
            var inputs = formElem.getElementsByTagName('input');
            for (var i = 0; i < inputs.length; i += 1) {
                if (inputs[i].hasAttribute('required') && !inputs[i].value.length) {
                    if (inputs[i].id) {
                        errorField.push(inputs[i].id);
                    }
                } else {
                    if (inputs[i].id) {
                        noError.push(inputs[i].id);
                    }
                }
            }
            if (noError.length) {
                for (let i = 0; i < noError.length; i++) {
                    let element = document.querySelector(formId + ' #' + noError[i]);
                    element.classList.remove('error-border');
                }
            }
            if (errorField.length) {
                for (let i = 0; i < errorField.length; i++) {
                    let element = document.querySelector(formId + ' #' + errorField[i]);
                    element.classList.add('error-border');
                }
                return false;
            } else {
                return true;
            }
        },

        submitForm: () => {
            let lightBoxId = '.basicLightbox--visible';
            if (document.querySelector(lightBoxId + ' .submitRfpForm')) {
                document.querySelector(lightBoxId + ' .submitRfpForm').addEventListener('click', function() {
                    FE.global.checkValidationRules(lightBoxId + ' form#rpfForm');
                });
            }
            if (document.querySelector(lightBoxId + ' .bookingForm')) {
                document.querySelector(lightBoxId + ' .bookingForm').addEventListener('click', function() {
                    FE.global.checkValidationRules(lightBoxId + ' form#bookingForm');
                });
            }
            if (document.querySelector(lightBoxId + ' .submitSignup')) {
                document.querySelector(lightBoxId + ' .submitSignup').addEventListener('click', function() {
                    FE.global.checkValidationRules(lightBoxId + ' form#signup');
                });
            }
            if (document.querySelector(lightBoxId + ' .submitLogin')) {
                document.querySelector(lightBoxId + ' .submitLogin').addEventListener('click', function() {
                    FE.global.checkValidationRules(lightBoxId + ' form#login');
                });
            }
            if (document.querySelector(lightBoxId + ' .reset-form')) {
                document.querySelector(lightBoxId + ' .reset-form').addEventListener('click', function() {
                    FE.global.checkValidationRules(lightBoxId + ' form#reset-form');
                });
            }
            if (document.querySelector(lightBoxId + ' .send-email')) {
                document.querySelector(lightBoxId + ' .send-email').addEventListener('click', function() {
                    FE.global.checkValidationRules(lightBoxId + ' form#reset-user-pwd');
                });
            }
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
                    lazyLoad: 'progressive'
                });
                imgIndex = $(this).find('.slider-content').index();
                console.log(sliderImageCount);
                $(this).on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
                    if (currentSlide !== undefined) {
                        $('.slider-count .number').text(currentSlide + 1);
                        $('.room-info-slider-thumb img').removeClass('active');
                        let thumbnailSlide = currentSlide + 1
                        $('.room-info-slider-thumb img:nth-child(' + thumbnailSlide + ')').addClass('active');
                    }
                });
            });
            $(document).on('click', '.room-info-slider-thumb img', function() {
                var indexThumbnail = $(this).index();
                $('.room-info-slider-thumb img').removeClass('active');
                $(this).addClass('active');
                $(slider).slick('slickGoTo', indexThumbnail);
            });
        },
        instaFeed: () => {
            if (document.getElementById('instafeed')) {
                let instabox = document.getElementById('instafeed');
                let limit = instabox.attributes.getNamedItem('data-limit').value;
                let moreText = instabox.attributes.getNamedItem('data-more').value;
                let moreTextSecond = instabox.attributes.getNamedItem('data-morespan').value;
                let feed = new Instafeed({
                    get: 'tagged',
                    tagName: 'hotelmystays',
                    clientId: '1459052068',
                    accessToken: '1459052068.3a81a9f.656faf6eb84044cea80572ed44299e2e',
                    limit: limit,
                    resolution: 'standard_resolution',
                    template: '<a href="{{link}}" target="_blank" class="insta-image lazy" data-src="{{image}}"><div class="insta-mask"><div class="insta-content"><span class="insta-likes">{{likes}}</span><span class="insta-comments">{{comments}}</span></div></div></a>',
                    after: function() {
                        let node = document.createElement('A');
                        let div = document.createElement('DIV');
                        let span = document.createElement('SPAN');
                        let arrow = document.createElement('I');
                        let textNode = document.createTextNode(moreText);
                        let textNodeSecond = document.createTextNode(moreTextSecond);
                        arrow.className = 'mys-arrow-left white';
                        span.appendChild(textNodeSecond);
                        div.appendChild(textNode);
                        div.appendChild(span);
                        div.appendChild(arrow);
                        node.appendChild(div);
                        node.id = 'more-link';
                        node.href = 'gallery.html';
                        let feed = document.getElementById('instafeed');
                        feed.appendChild(node);
                        FE.global.lazyLoad();
                    },
                });
                feed.run();
            }
        },
        showBookingTab: (evt, tabName) => {
            let i, tabcontent, tablinks;
            tabcontent = document.getElementsByClassName('tabcontent');
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = 'none';
            }
            tablinks = document.getElementsByClassName('tablinks');
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(' active', '');
            }
            document.getElementById(tabName).style.display = 'block';
            evt.currentTarget.className += ' active';
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
                    icon: '../assets/narita/images/marker-icon.png',
                    map: map
                });
            }
        },

        scroll: () => {
            const scroll = new SmoothScroll('.scroll', {
                speed: 2000,
                offset: 180,
                before: function(anchor, toggle) {
                    console.log(toggle.className.split(' ')[0]);
                    [].forEach.call(
                        anchor.querySelectorAll('.tabs-title'),
                        function(el) {
                            if (el.classList.contains('tabs-title-active')) {
                                el.classList.remove('tabs-title-active');
                            }
                        }
                    );
                    [].forEach.call(
                        anchor.querySelectorAll('.tabs-content'),
                        function(el) {
                            el.style.display = 'none';
                        }
                    );
                    if (toggle.className.split(' ')[0] == 'guestPhotos') {
                        anchor.querySelectorAll('.tabs-title')[1].classList.add('tabs-title-active');
                        anchor.querySelectorAll('.tabs-content')[1].style.display = 'block';
                    } else if (toggle.className.split(' ')[0] == 'hotelPhotos') {
                        anchor.querySelectorAll('.tabs-title')[0].classList.add('tabs-title-active');
                        anchor.querySelectorAll('.tabs-content')[0].style.display = 'block';
                    }
                }
            });
        },

        pageScroll: () => {
            if (!isMobile && document.getElementById('booking-widget')) {
                sticky = document.getElementById('booking-widget').offsetTop;
                window.onscroll = function() {
                    FE.global.sticky(document.getElementById('booking-widget'))
                };
            }
        },

        changeLanguage: () => {
            let lang = document.getElementsByClassName('selected-lang');

            function showDropDown(e) {
                this.classList.add('active');
            };
            for (var i = 0; i < lang.length; i++) {
                lang[i].addEventListener('click', showDropDown);
            }
        },
        sideNavigation: () => {
            let hamburger = document.getElementById('hamburger');
            let sideNav = document.getElementById('sideNav');
            hamburger.addEventListener('click', function() {
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
            $('html').on('click', 'body', function(e) {
                let container = $(box);
                if (!container.is(e.target) && container.has(e.target).length === 0) {
                    switch (method) {
                        case 'fade':
                            $(targetElement).stop().fadeOut(300);
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
        resetForm: () => {
            document.getElementById('resetUser').click();
        },
        closeForm: () => {
            //TODO close functionality
            //document.getElementById('resetUser').click();
        },
        lightBox: (datepicker) => {
            const getTargetHTML = function(elem) {
                const id = elem.getAttribute('data-show-id')
                const target = document.querySelector(`[data-id="${ id }"]`)
                return target.outerHTML
            }
            document.querySelectorAll('[data-show-id]').forEach(function(elem) {
                const html = getTargetHTML(elem);
                // elem.onclick = basicLightbox.create(html).show;
                elem.onclick = basicLightbox.create(html, {
                    afterShow: (instance) => {
                        FE.global.datePickerInit('.date-picker-venue-rpf', 'ja', false)
                        let SlideNumber = elem.getAttribute('data-slide')
                        FE.global.lazyLoad();
                        FE.global.sliderImage('.gallery-nav', 1, false, true);
                        $('.gallery-nav').slick('slickGoTo', SlideNumber, true);
                        FE.global.submitForm();
                        FE.global.openModalTab('loginForm');
                        FE.global.openModalTab('resturant-tabs');
                    },
                    afterClose: (instance) => {
                        $('.gallery-nav').slick('unslick');
                    }
                }).show
            })

        },
        resetUserDetails: () => {
            let url = new URL(window.location.href);
            let isReset = url.searchParams.get("reset");
            let isEmail = url.searchParams.get("email");
            if (isReset && !isEmail) {
                document.getElementById('reset').click();
            }
            if (isEmail) {
                document.getElementById('reset-mail').click();
            }
        },
        lightBoxRoom: () => {
            const getTargetHTML = function(elem) {
                const id = elem.getAttribute('data-show-rooms')
                const target = document.querySelector(`[data-id="${ id }"]`)
                return target.outerHTML
            }
            document.querySelectorAll('[data-show-rooms]').forEach(function(elem) {
                const html = getTargetHTML(elem);
                let checkSlider = false;
                // elem.onclick = basicLightbox.create(html).show;
                if (checkSlider) {
                    $('.roomPopup .room-info-slider').slick('unslick');
                }
                elem.onclick = basicLightbox.create(html, {
                    className: 'roomPopup',
                    closable: true,
                    beforeShow: (instance) => {
                        $('body').addClass('modal-open');
                    },
                    afterShow: (instance) => {
                        FE.global.sliderImage('.roomPopup .room-info-slider', 1, false, true);
                        //FE.global.tabs('layout-tabs');
                        FE.global.openModalTab('layout-tabs');
                        FE.global.openModalTab('resturant-tabs');
                        let checkSlider = true;
                    },
                    beforeClose: (instance) => {
                        $('.roomPopup .room-info-slider').slick('unslick');
                        $('body').removeClass('modal-open');
                    }
                }).show
            })
            $(document).on('click', '.room-detail .close-room', function() {
                $('.roomPopup').removeClass('basicLightbox--visible')
                setTimeout(() => {
                    $('.roomPopup').remove();
                    $('.roomPopup .room-info-slider').slick('unslick');
                    $('body').removeClass('modal-open');
                }, 410)
            });
        },
        autocomplatePopup: () => {
            $(document).on('click', '.input-showtext button', function() {
                if ($(this).parents('#header-search-popup').length == 1) {} else {
                    $(this).parents('.input-showtext').find('.popup-menu').fadeIn();
                }
            });
            $(document).on('focus', '.input-showtext button', function() {
                //$(this).blur();
                $(this).next().find('li span').on('click', function() {
                    $(this).parents('.input-showtext').find('button').text($(this).text());
                    $(this).parents('.input-showtext').find('button').focus();
                });
            });

            $(document).on('click', '.input-showtext .popup-content-input ul li span', function() {
                $(this).parents('.input-showtext').find(' .popup-content-input ul li span').removeClass('active');
                $(this).addClass('active');
                //$(this).parents('.input-showtext').find('input').attr('href', $(this).parent().attr('data-link')).focus();
                $(this).parents('.input-showtext').find('.popup-menu').fadeOut();
                $(this).parents('.input-showtext').removeClass('focus');
            });
            $(document).on('click', '.people-list-popup .btn-group .done', function(e) {
                var popup = $(this).parents('.popup-wrap');
                console.log(popup);
                let getText = '大人' + popup.find('.grown-up .input-showtext button').text() + ' 名, 子供' + popup.find('.children .input-showtext button').text() + ' 名 <span>' + popup.find('.room .input-showtext button').text() + ' 部屋 </span>';
                $('.people .people-list p').html(getText);
                popup.css('display', 'none');
                e.preventDefault();
            });
            $(document).on('click', '.people-list-popup .btn-group .clear', function(e) {
                e.preventDefault();
                var popup = $(this).parents('.people-list-popup')
                popup.find('.grown-up .input-showtext button').text('0人');
                popup.find('.children .input-showtext button').text('0人');
                popup.find('.room .input-showtext button').text('0人');
            });
        },
        itemShowHide: () => {

            $(document).on('click', '.people-list', function() {
                $(this).next().show();
            });

            $(document).on('click', '.calendar-link', function() {
                setTimeout(() => {
                    $('body').addClass('noScrollBody');
                    let $body = $(this).closest('body');
                    $body.find('.booking-widget').fadeIn();
                }, 100);
            });

            $(document).on('click', '.close-booking', function() {
                setTimeout(() => {
                    $('body').removeClass('noScrollBody');
                    let $body = $(this).closest('body');
                    $body.find('.booking-widget').fadeOut();
                }, 100);
            });

        },

        sticky: (element) => {
            if ($(window).width() > 768) {
                if (window.pageYOffset >= sticky) {
                    element.classList.add('sticky')
                } else {
                    element.classList.remove('sticky');
                }
            }
        },

        bookingWidgetClick: () => {
            if ($(window).width() > 768) {
                if (window.pageYOffset <= sticky) {
                    $('html, body').animate({ scrollTop: sticky }, 500);
                }
            }
        },

        datePickerInit: (container, locale, single) => {
            $.DateRangePicker({
                container: container,
                singleDatePicker: single,
                locale: locale
            });
        },

        getOffset: (el) => {
            var _x = 0;
            var _y = 0;
            while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
                _x += el.offsetLeft - el.scrollLeft;
                _y += el.offsetTop - el.scrollTop;
                el = el.offsetParent;
            }
            return { top: _y, left: _x };
        },

        closeHamburger: (box, targetElement, targetElement1) => {
            $('html').on('click', 'body', function(e) {
                let container = $(box);
                let container1 = $(targetElement);
                if (!container.is(e.target) && container.has(e.target).length === 0 && (!container1.is(e.target) && container1.has(e.target).length === 0)) {
                    $(targetElement).stop().removeClass('active');
                    $(targetElement1).removeClass('active');
                    //$('#hamburger').removeClass('active');
                    $('body').removeClass('noScrollBody');
                }
            });
        },

        filterRooms: (targetElement) => {
            if (isMobile && (document.getElementById('room-types') !== null)) {
                document.getElementById('room-types').style.display = 'none';
            }
            if (isMobile && (document.getElementById('venue-types') !== null)) {
                document.getElementById('venue-types').style.display = 'none';
            }

            function showFilterRoom(el) {
                const type = el.getAttribute('data-room-type');
                const className = 'show';
                const classNa = 'selected';
                document.getElementById('tablink').innerText = el.text;
                if (isMobile && (document.getElementById('room-types') !== null)) {
                    document.getElementById('room-types').style.display = 'none';
                }
                if (isMobile && (document.getElementById('venue-types') !== null)) {
                    document.getElementById('venue-types').style.display = 'none';
                }
                document.querySelectorAll('[data-rooms]').forEach(function(e) {
                    let string = e.getAttribute('data-rooms');
                    if (e.classList) {
                        e.classList.remove(className);
                    } else {
                        e.className = e.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
                    }
                    let clasString = string.includes(type)
                    console.log(type);
                    console.log(clasString);
                    if (string.includes(type)) {
                        if (e.classList) {
                            e.classList.add(className);
                        } else {
                            e.className += ' ' + className;
                        }
                    }
                });
                document.querySelectorAll('[data-room-type]').forEach(function(e) {
                    e.classList.remove(classNa);
                })
                el.classList.add(classNa);
            };
            document.querySelectorAll('[data-room-type]').forEach(function(elem) {
                elem.addEventListener('click', function() {
                    showFilterRoom(elem);
                }, false);
            })
        },
        filter: (targetElement) => {
            // get all of our list items
            let itemsToFilter = document.querySelectorAll('.itemsToFilter li');

            //setup click event handlers on our checkboxes
            let checkBoxes = document.querySelectorAll('.filterSection li input');

            for (let i = 0; i < checkBoxes.length; i++) {
                checkBoxes[i].addEventListener('click', filterItems, false);
                //checkBoxes[i].checked = true;
            }

            // the event handler!
            function filterItems(e) {
                var clickedItem = e.target;

                if (clickedItem.checked == true) {
                    hideOrShowItems(clickedItem.value, 'hideItem', 'showItem');
                } else if (clickedItem.checked == false) {
                    hideOrShowItems(clickedItem.value, 'showItem', 'hideItem');
                } else {
                    // deal with the indeterminate state if needed
                }
            }

            // add or remove classes to show or hide our content
            function hideOrShowItems(itemType, classToRemove, classToAdd) {
                for (var i = 0; i < itemsToFilter.length; i++) {
                    var currentItem = itemsToFilter[i];

                    if (currentItem.getAttribute('data-type') == itemType) {
                        removeClass(currentItem, classToRemove);
                        addClass(currentItem, classToAdd);
                    }
                }
            }

            //
            // Helper functions for adding and removing class values
            //
            function addClass(element, classToAdd) {
                var currentClassValue = element.className;

                if (currentClassValue.indexOf(classToAdd) == -1) {
                    if ((currentClassValue == null) || (currentClassValue === '')) {
                        element.className = classToAdd;
                    } else {
                        element.className += ' ' + classToAdd;
                    }
                }
            }

            function removeClass(element, classToRemove) {
                var currentClassValue = element.className;

                if (currentClassValue == classToRemove) {
                    element.className = '';
                    return;
                }

                var classValues = currentClassValue.split(' ');
                var filteredList = [];

                for (var i = 0; i < classValues.length; i++) {
                    if (classToRemove != classValues[i]) {
                        filteredList.push(classValues[i]);
                    }
                }

                element.className = filteredList.join(' ');
            }
        },

        showCheckBoxAction: () => {
            $(document).on('click', '.form-checkbox .checkbox-style input', function() {
                console.log($(this));

                if ($(this).is(':checked')) {
                    console.log('clciked');
                    //$('.food-beverage .sprite-checked_sp').show();
                } else {
                    console.log('un clciked');
                    // $('.food-beverage .sprite-checked_sp').hide();
                }

            });
        },

        init: () => {
            FE.global.lazyLoad();
        },

        loaded: function loaded() {
            //Functions inside loaded execute when window loaded
            if (isMobile) {
                FE.global.sliderImage('.home-slider-nav', 1, true, false);
            } else {
                FE.global.sliderImage('.home-slider-nav', 3, false, true);
            }
            FE.global.tabs('gallery-tabs');
            FE.global.tabs('booking-tabs');
            FE.global.tabs('layout-tabs');
            //FE.global.tabs('resturant-tabs');
            FE.global.instaFeed();
            FE.global.googleMap();
            FE.global.scroll();
            FE.global.changeLanguage();
            FE.global.sideNavigation();
            FE.global.clickOutside('active', '.selected-lang', '.selected-lang');
            FE.global.closeHamburger('.header-right', '.side-navigation', '.hamburger');
            FE.global.lazyLoad();
            FE.global.showCheckBoxAction();
            FE.global.lightBox(true);
            FE.global.lightBoxRoom();
            FE.global.resetUserDetails();
            FE.global.clickOutside('fade', '.input-showtext .form-control', '.input-showtext .popup-menu');
            FE.global.clickOutside('fade', '.people-list-popup', '.popup-wrap.popup-create');
            FE.global.autocomplatePopup();
            FE.global.itemShowHide();
            FE.global.filterRooms('room-types');
            FE.global.filter('venue-types');
            FE.global.datePickerInit('.date-picker-tab1', 'ja', false);
            FE.global.datePickerInit('.date-picker-tab2-single', 'ja', true);
            FE.global.datePickerInit('.date-picker-tab3', 'ja', false);
            FE.global.datePickerInit('.basicLightbox--visible .date-picker-venue-rpf', 'ja', false);
            FE.global.pageScroll();
            FE.global.sliderImage('.inner-page-slider', 1, false, true);
            FE.global.submitForm();
        },
        resize: function resize() {
            //Functions inside loaded execute when window resize
            FE.global.lazyLoad();
        }
    }
}


$(function() {
    FE.global.init();
});

$(window).load(function() {
    FE.global.loaded();
});

$(window).resize(function() {
    FE.global.resize();
});