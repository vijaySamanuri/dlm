Prefab.showloaderror = false;
Prefab.errormessage = '';

function updateYoutubeURL(newVal, iframeEle) {
    if (!newVal) {
        iframeEle.attr('src', '');
        return;
    }
    newVal = newVal.replace("/watch?v=", "/embed/");
    newVal += (newVal.indexOf("?") === -1 ? "?" : "&") + "wmode=transparent";
    if (Utils.isInsecureContentRequest(newVal)) {
        iframeEle.attr('src', '');
        Prefab.showloaderror = true;
        Prefab.errormessage = 'Can not load insecure content for url: ' + newVal;
    } else {
        iframeEle.attr('src', newVal);
        Prefab.showloaderror = false;
    }
}
/* Define the property change handler. This function will be triggered when there is a change in the prefab property */

Prefab.onPropertyChange = function (key, newVal, oldVal) {
    var iframeEle = Prefab.Widgets.youtube_container.$element.find('iframe');
    if (!iframeEle.length) {
        return;
    }
    switch (key) {
    case "youtubeurl":
        updateYoutubeURL(newVal, iframeEle);
        break;
    case "allowfullscreen":
        newVal ? iframeEle.attr(key, key) : iframeEle.removeAttr(key);
        break;
    }
};

/* this will be triggered after the prefab is initialized */

Prefab.onReady = function () {
    var iframeEle = Prefab.Widgets.youtube_container.$element.find('iframe');
    Prefab.allowfullscreen ? iframeEle.attr('allowfullscreen', 'allowfullscreen') : iframeEle.removeAttr('allowfullscreen');
    updateYoutubeURL(Prefab.youtubeurl, iframeEle);
};

