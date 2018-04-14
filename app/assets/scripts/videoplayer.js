<<<<<<< HEAD
=======


>>>>>>> be11df6815140eba9c11488ced621646047f8d09
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