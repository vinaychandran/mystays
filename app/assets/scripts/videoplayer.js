

class videoPlayer {
    constructor() {
    }

    init() {

    }

    init() {}

    lightbox_open(src) {
        var lightBoxVideo = document.getElementById("VisaChipCardVideo");
        lightBoxVideo.src = src;
        window.scrollTo(0, 0);
        document.getElementById('light').style.display = 'block';
        document.getElementById('fade').style.display = 'block';
        lightBoxVideo.play();
    }

    lightbox_close() {
        var lightBoxVideo = document.getElementById("VisaChipCardVideo");
        document.getElementById('light').style.display = 'none';
        document.getElementById('fade').style.display = 'none';
        lightBoxVideo.pause();
    }

}
