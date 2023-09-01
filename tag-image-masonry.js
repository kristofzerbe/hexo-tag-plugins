/*
    Image Masonry Tag: https://github.com/bigbite/macy.js

    Syntax:
    {% image_masonry ..."assetImg|title" %}
    
*/

hexo.extend.tag.register("image_masonry", function(args){
  var assetPath = this.path;

  var list = "";
  args.forEach(function(e) {
    var item = e.split("|"); 
    var assetImg = item[0];
    var title = item[1];

    list += `<div><img src="/${assetPath + assetImg}" alt="${title}" /></div>`
  });

  var id = "image-masonry-" + Math.random().toString(36).substring(2,8);

  var elements = `
    <div class="image-masonry" id="${id}">
      ${list}
    </div>
    <script>
      let macy = new Macy({
        container: '#${id}',
        trueOrder: false,
        waitForImages: false,
        useOwnImageLoader: false,
        debug: true,
        mobileFirst: true,
        columns: 2,
        margin: {
          y: 6,
          x: 6
        },
        breakAt: {
          1024: {
            margin: {
              x: 8,
              y: 8
            },
            columns: 4
          },
          768: 3
        }
      });
    </script>
  `;

  return elements;
});