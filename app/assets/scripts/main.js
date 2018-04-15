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
            let src = event.target.attributes.getNamedItem('data-src').value;
            const video = new videoPlayer();
            video.openVideo(src);
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
        slider: () => {
            $('.slider-nav').slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                asNavFor: '.slider-for',
                dots: false,
                arrows: false,
                focusOnSelect: true
                    //autoplay: true
            });
            $('.slick-left').click(function() {
                $('.slider-nav').slick('slickPrev');
            })

            $('.slick-right').click(function() {
                $('.slider-nav').slick('slickNext');
            })
        },
        instaFeed: () => {
            var feed = new Instafeed({
                get: 'tagged',
                tagName: 'awesome',
                clientId: '1459052068',
                accessToken: '1459052068.3a81a9f.656faf6eb84044cea80572ed44299e2e',
                limit: 7,
                resolution: 'low_resolution',
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
        init: () => {
            //initialling modal
            //FE.global.loginModal('modal1', false, false);
            FE.global.lazyLoad();            
            $('#fromDate').datepicker();
            $('#toDate').datepicker();
        },
        loaded: function loaded() {
            //Functions inside loaded execute when window loaded
            FE.global.tabs.tabs();
            FE.global.instaFeed();
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
    FE.global.slider();
    FE.global.loaded();
};