/*
работа с расширенным гипертекстом
*/
(function () {
    "use strict";
    this.aspect = {};
    
    var idPrefix = "aspect_";
    
    this.aspect.init = function(data) {
        var vs = {};
        for (var i in data) {
            var v = new Verge(data[i]);
            if (i == 0) {
                v.draw(true);
            } else {
                v.draw();
            }
            vs[v.id] = v;
        }
        for (var v in vs) {
            vs[v].bind(vs);
        }
    };
    
    var Verge = function(data) {
        var text_html = data.text_html;
        text_html = text_html || md2html(data.text_md);
        
        var id = data.id;
        
        this.draw = function(visability) {
            if (get()) {
                get().parentElement.removeChild(get());
            }
            visability = visability || false;
            var div = document.createElement('div');
            div.className = "aspect verge"
            div.innerHTML = text_html;
            div.id = idPrefix + id;
            if (visability) {
                div.style.display = "block";
            } else {
                div.style.display = "none";
            }
            document.body.appendChild(div);
        };
        
        var get = function() {
            return document.getElementById(idPrefix + id);
        };
        this.get = get;
        
        var show = function() { get().style.display = "block"; };
        var hide = function() { get().style.display = "none"; };
        var is_shown = function() { 
            if (get().style.display == "none") {
                return false;
            }
            return true;
        };
        this.tuggle = function() {
            if (is_shown()) {
                hide();
            } else {
                show();
            }
        }
        
        
        this.bind = function(vs) {
            var div = get();
            Array.prototype.forEach.call(div.getElementsByTagName("A"), function(a) {
                if (vs[a.attributes.href.value]) {
                    var v = vs[a.attributes.href.value];
                    a.onclick = function() { 
                        var d = v.get();
                        d.parentElement.removeChild(d);
                        a.parentElement.appendChild(d);
                        v.tuggle();
                        return false; 
                    };
                } else {
                    a.target = "_blank";
                }
            });
        };
        
        this.id = id;
        
    }
    var md2html = function (text_md) {
        // https://github.com/evilstreak/markdown-js/releases
        // markdown.min.js
        return markdown.toHTML(text_md, 'Maruku');
    }

}).apply(this);
