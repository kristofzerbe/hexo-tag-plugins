/*
    MoreInfo Tag

    Syntax
    {% moreinfo '{ "list": [
        [ "publisher", "title", "url" ]
    ]}' %}
*/

hexo.extend.tag.register("moreinfo", function(args){

    var argList = JSON.parse(args[0]).list;

    var list = "";
    argList.forEach(function(item) {
        var publisher = item[0],
            title = item[1],
            url = item[2]
        list += `<li>${publisher}: <a href="${url}">${title}</a></li>`;
    });

    var elements = `
        <ul class="moreinfo-list">
            ${list}
        </ul>
    `;

    return elements;
});