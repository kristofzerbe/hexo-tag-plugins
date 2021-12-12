/*
    Anchorlist Tag

    Syntax
    {% anchorlist ..."title|anchorId" %}
*/

hexo.extend.tag.register("anchorlist", function(args){

    var listAnchors = "";
    args.forEach(function(e) {
        var item = e.split("|"); 
        var title = item[0];
        var anchorId = item[1];
        listAnchors += `<li data-anchor="#${anchorId}">${title}</li>`;
    });

    var elements = `
        <ul class="anchorlist">
            ${listAnchors}
        </ul>
    `;

    return elements;
});