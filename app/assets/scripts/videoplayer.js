class videoPlayer {
    constructor() {}
    init() {

    }
    init() {}

    openVideo(src) {
        var lightBoxVideo = document.getElementById("video");
        document.getElementById('video-container').style.display = 'block';
        lightBoxVideo.src = src;
        lightBoxVideo.play();
    };

    closeVideo(src) {
        var lightBoxVideo = document.getElementById("video");
        document.getElementById('video-container').style.display = 'none';
        lightBoxVideo.pause();
    };
}