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
        videoplayer: () => {

            const video = new videothiru();
           // video.lightbox_open();
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

            // loadVid: () {
    
            //     var videourl = 'https://www.w3schools.com/html/mov_bbb.mp4'; // set the url to your video file here
            //     var videocontainer = '#thiru'; // set the ID of the container that you want to insert the video in
            //     var parameter = new Date().getMilliseconds();  //  generate variable based on current date/time

            //     var video = '<video width="1102" height="720" id="intro-video" autoplay loop src="' + videourl + '?t=' + parameter + '"></video>'; // setup the video element

            //     $(videocontainer).append(video); // insert the video element into its container

            //     video = $(document).find('#intro-video')[0]; // find the newly inserterd video

            //     video.load(); // load the video (it will autoplay because we've set it as a parameter of the video)

            // }



        },
        init: () => {
            //initialling modal
            FE.global.loginModal('modal1', false, false);
            FE.global.lazyLoad();


        }
    }
}


$(function () {
    FE.global.init();
    FE.global.videoplayer();


});

window.onload = function () {
    //initialling carousel
    FE.global.slider('.slider', '.slider-nav-thumbnails');




};

console.log('successfully loaded');
