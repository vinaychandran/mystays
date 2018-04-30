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
var sticky = document.getElementById('booking-widget').offsetTop - 12;
const FE = {
    global: {
        lazyLoad: () => {
            const myLazyLoad = new LazyLoad({
                elements_selector: '.lazy',
                threshold: 50
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
                if (document.getElementById('tabs')) {
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

                        if (i == 0) {
                            FE.global.tabs.tabLinks[id].className = 'selected';
                            document.getElementById('tablink').innerText = FE.global.tabs.tabLinks[id].text;
                        }
                        i++;
                    }
                    let j = 0;

                    for (let id in FE.global.tabs.contentDivs) {
                        if (j != 0) FE.global.tabs.contentDivs[id].className = 'tabContent hide';
                        j++;
                    }

                    let tabLink = document.getElementById('tablink');
                    tabLink.addEventListener('click', FE.global.tabs.openTab);
                }

            },
            showTab: (e) => {
                const that = event.target.attributes.getNamedItem('data-href').value;
                let selectedId = FE.global.tabs.getHash(that);

                for (let id in FE.global.tabs.contentDivs) {
                    if (id == selectedId) {
                        FE.global.tabs.tabLinks[id].className = 'selected';
                        document.getElementById('tablink').innerText = FE.global.tabs.tabLinks[id].text;
                        FE.global.tabs.contentDivs[id].className = 'tabContent';
                    } else {
                        FE.global.tabs.tabLinks[id].className = '';
                        FE.global.tabs.contentDivs[id].className = 'tabContent hide';
                    }
                }

                if (window.innerWidth <= 768) {
                    document.getElementById('tabs').style.display = 'none';
                }

                e.preventDefault();
            },
            openTab: (e) => {
                document.getElementById('tabs').style.display = 'block';
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
                    lazyLoad: 'progressive'
                });
                imgIndex = $(this).find('.slider-content').index();
                $(this).on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
                    imgIndex = (currentSlide ? currentSlide : 0) + 1;
                });
            });
        },
        instaFeed: () => {
            if (document.getElementById('instafeed')) {
                let instabox = document.getElementById('instafeed');
                let limit =  instabox.attributes.getNamedItem('data-limit').value;
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
                    icon: '../assets/images/marker-icon.png',
                    map: map
                });
            }
        },

        scroll: () => {
          const scroll = new SmoothScroll('a[href*="#"]', { speed: 2000 });
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
        lightBox: () => {
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
                       let SlideNumber = elem.getAttribute('data-slide')
                       FE.global.lazyLoad();
                       FE.global.sliderImage('.gallery-nav', 1, false, true);
                       $('.gallery-nav').slick('slickGoTo', SlideNumber, true);
                    },
                    afterClose: (instance) => {
                       $('.gallery-nav').slick('unslick');
                    }
                }).show
            })

        },
        lightBoxGallery: () => {
            const getSrc = (elem) => elem.getAttribute('data-src')

            const getPrev = (elem) => document.getElementById(elem.getAttribute('data-prev'))
            const getNext = (elem) => document.getElementById(elem.getAttribute('data-next'))

            const open = function(elem) {

                const init = (instance) => {

                    // Remove current src first. It stays until the second image has loaded.
                    // You can also show a spinner in the meanwhile.
                    instance.element().querySelector('img').src = ''

                    instance.element().querySelector('img').src = getSrc(elem)

                    const prev = instance.element().querySelector('#prev')
                    const next = instance.element().querySelector('#next')

                    prev.onclick = (e) => {
                        elem = getPrev(elem)
                        init(instance)
                    }

                    next.onclick = (e) => {
                        elem = getNext(elem)
                        init(instance)
                    }

                }
                basicLightbox.create('<img>', {
                    beforePlaceholder: '<button id="prev">&#8592;</button>',
                    afterPlaceholder: '<button id="next">&#8594;</button>',
                    beforeShow: init
                }).show()

            }

            document.querySelectorAll('.thumbnail-gallery').forEach(function(elem) {
                elem.onclick = (e) => open(elem)
            })

        },

        autocomplatePopup: () => {
          $(document).on('click', '.input-showtext input', function() {
            if ($(this).parents('#header-search-popup').length == 1) {} else {
              $(this).parents('.input-showtext').find('.popup-menu').fadeIn();
            }
          });
          $(document).on('focus', '.input-showtext input', function() {
            //$(this).blur();
            $(this).next().find('li span').on('click', function() {
              $(this).parents('.input-showtext').find('input').val($(this).text());
              $(this).parents('.input-showtext').find('input').focus();
            });
          });

          $(document).on('click', '.input-showtext .popup-content-input ul li span', function() {
            $(this).parents('.input-showtext').find(' .popup-content-input ul li span').removeClass('active');
            $(this).addClass('active');
            $(this).parents('.input-showtext').find('input').attr('href', $(this).parent().attr('data-link')).focus();
            $(this).parents('.input-showtext').find('.popup-menu').fadeOut();
            $(this).parents('.input-showtext').removeClass('focus');
          });
          $(document).on('click', '.people-list-popup .btn-group .done', function(e) {
            var popup = $(this).parents('.popup-wrap');
            console.log(popup);
            let getText = '大人'+ popup.find('.grown-up .input-showtext input').val() + ' 名, 子供' + popup.find('.children .input-showtext input').val() + ' 名 <span>' + popup.find('.room .input-showtext input').val() + ' 部屋 </span>';
            $('.people .people-list p').html(getText);
            popup.css('display', 'none');
            e.preventDefault();
          });
          $(document).on('click', '.people-list-popup .btn-group .clear', function(e) {
            e.preventDefault();
            var popup = $(this).parents('.people-list-popup')
            popup.find('.grown-up .input-showtext input').val('');
            popup.find('.children .input-showtext input').val('');
            popup.find('.room .input-showtext input').val('');
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
              $body.children('.booking-widget').fadeIn();
            }, 100);
          });

          $(document).on('click', '.close-booking', function() {
            setTimeout(() => {
              $('body').removeClass('noScrollBody');
              let $body = $(this).closest('body');
              $body.children('.booking-widget').fadeOut();
            }, 100);
          });

        },
        sticky: (element) => {
          if (window.pageYOffset  >= sticky) {
            element.classList.add('sticky')
          } else {
            element.classList.remove('sticky');
          }
        },

        getOffset: (el) => {
          var _x = 0;
            var _y = 0;
            while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
                _x += el.offsetLeft - el.scrollLeft;
                _y += el.offsetTop - el.scrollTop;
                el = el.offsetParent;
            }
            return { top: _y, left: _x };
        },

        init: () => {
            //initialling modal
            //FE.global.loginModal('modal1', false, false);
            FE.global.lazyLoad();
        },
        loaded: function loaded() {
            //Functions inside loaded execute when window loaded
            if (isMobile) {
                FE.global.sliderImage('.home-slider-nav', 1, true, false);
            } else {
                FE.global.sliderImage('.home-slider-nav', 3, false, true);
            }
            FE.global.tabs.tabs();
            //FE.global.instaFeed();
            FE.global.googleMap();
            FE.global.scroll();
            FE.global.changeLanguage();
            FE.global.sideNavigation();
            FE.global.clickOutside('active', '.selected-lang', '.selected-lang');
            FE.global.lazyLoad();
            FE.global.lightBox();
            FE.global.lightBoxGallery();
            FE.global.clickOutside('fade', '.input-showtext .form-control', '.input-showtext .popup-menu');
            FE.global.clickOutside('fade', '.people-list-popup', '.popup-wrap.popup-create');
            FE.global.autocomplatePopup();
            FE.global.itemShowHide();
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

window.onscroll = function() {FE.global.sticky(document.getElementById('booking-widget'))};

$(window).load(function() {
    FE.global.loaded();
    // $('#checkin_date').datepicker({
    //     numberOfMonths: 2,
    //     minDate: new Date(),
    //     showButtonPanel: true,
    //     autoclose: false
    // });
    // $('#checkout_date').datepicker();
    // $.datepicker.setDefaults($.datepicker.regional["kr"]);

      $.DateRangePicker({
        container: '.date-picker-tab1'
      });
      $.DateRangePicker({
        container: '.date-picker-tab2-single',
        singleDatePicker: true
      });
      $.DateRangePicker({
        container: '.date-picker-tab3'
      });
});
