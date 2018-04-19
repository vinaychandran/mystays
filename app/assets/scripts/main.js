'use strict';

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
      const myLazyLoad = new LazyLoad();
    },

    videoPlayer: (event) => {
      const video = new videoPlayer();
      if (event.target.attributes.getNamedItem('data-target')) {
        video.closeVideo();
      }

      if (event.target.attributes.getNamedItem('data-src')) {
        let src = event.target.attributes.getNamedItem('data-src').value;

        video.openVideo(src);
      }
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
        template: '<div class="insta-bg" style="background-image:url({{image}})"></div>',
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
        }
      });
      feed.run();
    },

    googleMap: () => {
      let selectorMapElement = document.getElementById('gmap_canvas');
      if (typeof(selectorMapElement) != 'undefined' && selectorMapElement != null){
        let latlng = new google.maps.LatLng(35.784248, 140.351513);
        
        let myOptions = {
          zoom: 16,
          center: latlng,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        let map = new google.maps.Map(selectorMapElement,myOptions); 
        let marker = new google.maps.Marker({
            position: latlng,
            title: "Title",
            map: map
        });
      }
    },

    init: () => {
      //initialling modal
      FE.global.loginModal('modal1', false, false);
      FE.global.lazyLoad();

    },
    loaded: function loaded() {
      //Functions inside loaded execute when window loaded
      FE.global.tabs.tabs();
      FE.global.instaFeed();
      FE.global.googleMap();
    },
    resize: function resize() {
      //Functions inside loaded execute when window resize

    }
  }
}


$(function() {
  FE.global.init();

});

window.onload = function() {
  FE.global.sliderImage('.home-slider-nav', 3, false, true);
   FE.global.sliderImage('.home-video-slider-nav', 4, false, true);
  FE.global.loaded();
};

$(window).load(function() {
  $.DateRangePicker({
    container: '#date_range_picker'
  });
});
