(function () {
    var cssClassNames = {
        canvas: "ktCanvas",
        tile: "ktTile",
    };
    var knoTiler = {};
    
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

    // ##########################################
    // ##########################################
    var makeTiles = function (data) {
        var md2html = function (text_md) {
            // https://github.com/evilstreak/markdown-js/releases
            // markdown.min.js
            //return markdown.toHTML(text_md, 'Gruber');
            
            // https://github.com/markedjs/marked/releases
            return marked(text_md);
        }
        var tiles = [];

        if (typeof (data) == "string") {
            var div = document.createElement("DIV");
            div.innerHTML = data;
            var ds = div.getElementsByTagName("DIV");
            for (var i = 0; i < ds.length; i += 1) {
                var t = {};
                t.id = ds[i].attributes.name.value;
                var ih = ds[i].innerHTML;
                t.text_html = md2html(ih);
                tiles.push(t);
            }
        } else {
            for (var i = 0; i < data.length; i += 1) {
                var t = {};
                t.id = data[i].id;
                if (data[i].text_md) {
                    t.text_html = md2html(data[i].text_md);
                } else {
                    t.text_html = data[i].text_html;
                }
                tiles.push(t);
            }
        }

        return tiles;
    };
    // ##########################################


    // ##########################################
    // ##########################################
    var fl = false;
    var drawCanvas = function (tiles) {

        function getOffset(el) {
            el = el.getBoundingClientRect();
            return {
                x: el.left + window.scrollX,
                y: el.top + window.scrollY
            }
        }

        var createDivTile = function (text_html) {
            var divTile = document.createElement("DIV");
            divTile.className = "knotiler tile"
            var divBg = document.createElement("DIV");
            divBg.className = "bg bgColorRand";
            var divPointer = document.createElement("DIV");
            divPointer.className = "pointer";
            var divCon = document.createElement("DIV");
            divCon.className = "con";
            var divText = document.createElement("DIV");
            divText.className = "text";
            divText.innerHTML = text_html;

            divCon.appendChild(divText);
            divTile.appendChild(divBg);
            divTile.appendChild(divPointer);
            divTile.appendChild(divCon);
            divTile.style.display = "block";
            if (fl) {
                divBg.onclick = function () {
                    this.parentNode.parentNode.removeChild(this.parentNode);
                };
            } else {
                fl = true;
            }


            var as = divText.getElementsByTagName("A");
            var ids = {};
            for (var i = 0; i < tiles.length; i += 1) {
                ids["#" + tiles[i].id] = i;
            }
            for (var i = 0; i < as.length; i += 1) {
                (function (i) {
                    var a = as[i];
                    a.className = "colorRand";
                    a.target = "_blank";
                    if (ids[a.attributes.href.value] + 1) {
                        var t = tiles[ids[a.attributes.href.value]];
                        a.onclick = function () {
                            var paddingTop = getOffset(a).y
                            paddingTop += 36;
                            paddingTop = paddingTop + "px";
                            var xPointer = getOffset(a).x;
                            xPointer = xPointer + "px";
                            drawTile(t, paddingTop, xPointer);
                            return false;
                        };
                        a.className = "knotiler link bgColorRand";
                    }
                })(i);
            }

            divTile.setXPointer = function (xPointer) {
                divPointer.style.left = xPointer;
            };


            return divTile;
        }
        var drawTile = function (tile, paddingTop = "0", xPointer = "0") {
            var divTile = createDivTile(tile.text_html)
            divTile.style.paddingTop = paddingTop;
            divTile.setXPointer(xPointer);
            document.body.appendChild(divTile);
        };
        drawTile(tiles[0]);
    };
    // ##########################################

    knoTiler.go = function (data) {
        tiles = makeTiles(data);
        drawCanvas(tiles);
    };

    this.knoTiler = knoTiler;

}).apply(this);
