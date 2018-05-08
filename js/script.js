(function () {
    "use strict";
    this.getTxtFile = function (url) {
        var txt, reqListener, oReq;
        txt = "";
        reqListener = function () {
            //console.log(this.responseText);
            txt = this.responseText;
        };
        oReq = new XMLHttpRequest();
        //oReq.responseType = "text";
        oReq.addEventListener("load", reqListener);
        oReq.open("GET", url, false);
        oReq.send();
        return txt;
    };
}).apply(this);
