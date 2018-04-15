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
        if(event.target.attributes.getNamedItem('data-target')){
          video.closeVideo();
        }

      if(event.target.attributes.getNamedItem('data-src')){
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
            let id = FE.global.tabs.getHash(tabLink.getAttribute('href'));
            FE.global.tabs.tabLinks[id] = tabLink;
            FE.global.tabs.contentDivs[id] = document.getElementById(id);
          }
        }

        let i = 0;

        for (let id in FE.global.tabs.tabLinks) {

          FE.global.tabs.tabLinks[id].addEventListener('click', FE.global.tabs.showTab);

          FE.global.tabs.tabLinks[id].onfocus = function() {

            this.blur()
          };
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
        const that = e.target;
        let selectedId = FE.global.tabs.getHash(that.getAttribute('href'));

        for (let id in FE.global.tabs.contentDivs) {
          if (id == selectedId) {
            FE.global.tabs.tabLinks[id].className = 'selected';
            FE.global.tabs.contentDivs[id].className = 'tabContent';
          } else {
            FE.global.tabs.tabLinks[id].className = '';
            FE.global.tabs.contentDivs[id].className = 'tabContent hide';
          }

        }
        return false;
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
          infinite: true,
          slidesToShow: slideToShow,
          slidesToScroll: 1,
          arrows: arrows,
          speed: 400,
          dots: dots,
          lazyLoad: 'progressive'
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

      $('.slick-left').click(function() {
        $('.slider-nav').slick('slickPrev');
      })

      $('.slick-right').click(function() {
        $('.slider-nav').slick('slickNext');
      })
    },
    init: () => {
      //initialling modal
      // FE.global.loginModal('modal1', false, false);
      // FE.global.lazyLoad();
      FE.global.lazyLoad();
    },
    loaded: function loaded() {
      //Functions inside loaded execute when window loaded
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
  FE.global.sliderImage('.slider-nav', 3, false, false);
  $.DateRangePicker({
    container: '#date_range_picker'
  });
};
