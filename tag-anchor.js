/*
    Anchor Tag

    Syntax:
    {% anchor "anchorId" elementType=(A,HR) %}
*/

hexo.extend.tag.register("anchor", function(args){
    
    var anchorId = args[0];
    var elementType = args[1];

    var element;

    switch (elementType) {
        case "HR":
            element = `
                <hr id="${anchorId}" />
            `;
            break;
    
        default:
            element = `
                <a id="${anchorId}"></a>
            `;
            break;
    }

    return element;
});