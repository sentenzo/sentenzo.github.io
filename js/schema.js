(function() {
    var schema = {};
    
    var nodeList = {};
    
    schema.Node = function() {
        var id = "id_" + Math.random().toString(36).substring(2);
        nodeList[id] = this;
        var title; // короткое название узла
        var text_md; // текст узла
        var x, y; // центр
        
        this.draw = function(c, x, y) {
            var html = `
<div>
    <div class="title">` + title + `
    </div>
</div>
`;
            var d = $('<div></div>').appendTo(c);
            d = d[0];
            d.style.backgroundColor = "gray";
            d.style.position = "absolute";
            d.style.left = "" + x + "px";
            d.style.top = "" + y + "px";
            d.style.width = d.style.height = "32px";
        }
    }
    
    
    
    this.schema = schema;
}).apply(this);

$(document).ready(function() {
        $("#canves").click(function(e) {
            var offset = $(this).offset();
            var n = new schema.Node();
            n.draw(this, e.pageX - offset.left, e.pageY - offset.top);
            
            //alert(e.pageX - offset.left);
        });
});