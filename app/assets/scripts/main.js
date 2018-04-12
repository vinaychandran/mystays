'use strict';

//import popup from './modal';

const FE = {
    global: {
        loginModal: (id, transition, backdropclose) => {
            const loginModal = new popup(id, {
                transition: transition,
                backdropclose: backdropclose
            });
            loginModal.init();
        },
        slider: (imageContainer, thumbnailContainer) => {
            var $element = $(imageContainer),
                $thumbsElement = $(thumbnailContainer);

            $element.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                autoplay: true,
                fade: false,
                //asNavFor: '.slider-nav-thumbnails',
            });

            $thumbsElement.slick({
                slidesToShow: 5,
                slidesToScroll: 1,
                asNavFor: '.slider',
                dots: false,
                focusOnSelect: true
            });

            // Remove active class from all thumbnail slides
            $('.slider-nav-thumbnails .slick-slide').removeClass('slick-active');

            // Set active class to first thumbnail slides
            $('.slider-nav-thumbnails .slick-slide').eq(0).addClass('slick-active');

            // On before slide change match active thumbnail to current slide
            $('.slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                var mySlideNumber = nextSlide;
                $('.slider-nav-thumbnails .slick-slide').removeClass('slick-active');
                $('.slider-nav-thumbnails .slick-slide').eq(mySlideNumber).addClass('slick-active');
            });

        },
        lazyLoad: () => {
            const myLazyLoad = new LazyLoad();
        },
        videoPlayer: (src) => {
            console.log(src);
            const video = new videothiru();
            video.lightbox_open(src);
            // //video.lightbox_close();
            let btns = document.getElementsByClassName('thiru');
            let btnsClose = document.getElementById('fade');
            let btnsCloseBtn = document.getElementById('boxclose');

            for (let btn of btns) {
                btn.onclick = function () {
                    video.lightbox_open();

                }
            }

            btnsClose.onclick = function () {
                video.lightbox_close();
            }
            btnsCloseBtn.onclick = function () {
                video.lightbox_close();

            }
        },
        tabs: {
            tabLinks : new Array(),
            contentDivs : new Array(),
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

                    FE.global.tabs.tabLinks[id].addEventListener('click',FE.global.tabs.showTab);
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
        init: () => {
            //initialling modal
            FE.global.loginModal('modal1', false, false);
            FE.global.lazyLoad();
            FE.global.tabs.tabs();

        }
    }
}


$(function () {
    FE.global.init();
});

window.onload = function () {
    //initialling carousel
    FE.global.slider('.slider', '.slider-nav-thumbnails');




};

console.log('successfully loaded');
