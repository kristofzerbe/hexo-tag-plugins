/*
    Image Slide Tag: https://github.com/ganlanyuan/tiny-slider

    Syntax:
    {% image_slide ..."assetImg|title" %}
    
*/

hexo.extend.tag.register("image_slide", function(args){
    var assetPath = this.path;

    var list = "";
    args.forEach(function(e) {
      var item = e.split("|"); 
      var assetImg = item[0];
      var title = item[1];

      list += `<div><img src="/${assetPath + assetImg}" alt="${title}" /></div>`
    });

    var id = "image-slide-" + Math.random().toString(36).substring(2,8);

    var elements = `
      <div class="image-slider" id="${id}">
        ${list}
      </div>
      <script>
        tns({
          container: "#${id}",
          items: 1,
          slideBy: "page",
          controls: false,
          nav: true
        });
      </script>
    `;

    return elements;
});