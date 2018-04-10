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
        init: () => {
            //initialling modal
            FE.global.loginModal('modal1', false, false);
            FE.global.lazyLoad();
        }
    }
}


$(function() {
    FE.global.init();
});

window.onload = function() {
    //initialling carousel
    FE.global.slider('.slider', '.slider-nav-thumbnails');
};

console.log('successfully loaded');
