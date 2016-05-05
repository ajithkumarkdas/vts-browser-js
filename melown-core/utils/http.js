Melown.Http = {};

Melown.Http.loadImageFormUrl = function(image_, url_, withCredentials_) {
    if (!image_ instanceof Image || typeof url_ !== 'string') {
        return;
    }

    /*
    var parser_ = Melown.Url.parse(url_);
    if (parser_ === null) {
        return;
    }

    if (parser_['hostname'] !== '') {
        image_.crossOrigin = Melown.Url.isSameOrigin(url_) ? 
                            "use-credentials" : "anonymous";
    }*/
    
    image_.crossOrigin = withCredentials_ ? "use-credentials" : "anonymous";

    image_.src = url_;
};

Melown.Http.imageFactory = function(url_, onload_, onerror_, withCredentials_) {
    var image_ = new Image();
    image_.onerror = onerror_;
    image_.onload = onload_;
    Melown.Http.loadImageFormUrl(image_, url_, withCredentials_);
    return image_;
};

Melown.Http.loadJSON = function(url_, onLoaded_, onError_) {
    Melown.loadBinary(url_, onLoaded_, onError_);
};

Melown.Http.loadBinary = function(url_, onLoaded_, onError_) {
    Melown.loadBinary(url_, onLoaded_, onError_);
};

Melown.Http.headRequest = function(url_, onLoaded_, onError_) { 
    var xhr_ = new XMLHttpRequest();

    xhr_.onreadystatechange = (function (){

            switch (xhr_.readyState) {
            case 0 : // UNINITIALIZED
            case 1 : // LOADING
            case 2 : // LOADED
            case 3 : // INTERACTIVE
                break;
            case 4 : // COMPLETED
                if (onLoaded_ != null) {
                    onLoaded_(xhr_.getAllResponseHeaders(), xhr_.status);
                    //onLoaded_(xhr_.getResponseHeader("X-VE-Tile-Info"), xhr_.status);
                }
                break;
    
            default:
    
                if (onError_ != null) {
                    onError_();
                }
    
                break;
            }

        }).bind(this);

    xhr_.onerror  = (function() {
        if (onError_ != null) {
            onError_();
        }
    }).bind(this);

    xhr_.open('HEAD', url_, true);
    xhr_.send("");
};

Melown["Http"] = Melown.Http;
Melown.Http["imageFactory"] = Melown.Http.imageFactory;
Melown.Http["loadJSON"] = Melown.Http.loadJSON;
Melown.Http["loadBinary"] = Melown.Http.loadBinary;
Melown.Http["headRequest"] = Melown.Http.headRequest;