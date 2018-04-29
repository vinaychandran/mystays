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

    bookingModal: () => {
      FE.global.loginModal('modal1', false, false);
    },

    saveDetails: () => {
      var data = $('bookingDetails').serialize();
      alert(data);
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
        e.preventDefault();
        var popup = $(this).parents('.people-list-popup')
        let getText = '大人'+ popup.find('.grown-up .input-showtext input').val() + ' 名, 子供' + popup.find('.children .input-showtext input').val() + ' 名 <span>' + popup.find('.room .input-showtext input').val() + ' 部屋 </span>';
        $('.people .people-list p').html(getText);
        $(this).closest('body').children('.popup-wrap').css('display', 'none');
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
        setTimeout(() => {
          $('body').addClass('noScrollBody');
          let $body = $(this).closest('body');
          $body.children('.popup-wrap').fadeIn();
          $body.children('.popup-wrap').find('.people-list-popup').fadeIn();
        }, 100);
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




    init: () => {
      //initialling modal

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
      //FE.global.clickOutside('fade', '.people-list-popup', '.popup-wrap.popup-create');
      FE.global.sliderImage('.home-video-slider-nav', 4, false, true);
      FE.global.autocomplatePopup();
      FE.global.itemShowHide();

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
    container: '.date-picker'
  });
});
