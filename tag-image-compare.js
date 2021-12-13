/*
  Image Compare Viewer: https://image-compare-viewer.netlify.app/

  Syntax:
  {% image_compare "imgFileOriginal" "imgFileModified" "descriptionModified" [orientation=vertical] %}

*/
hexo.extend.tag.register('image_compare', function (args) {
  
  const [
    original, 
    modified,
    descriptionModified,
    orientation
  ] = args;

  var assetPath = this.path;

  var verticalMode = (orientation === "vertical").toString();

  var id = "image-compare-" + Math.random().toString(36).substring(2,8);

  var elements = `
    <div id="${id}">
      <img class="image-compare image-original" src="/${assetPath + original}" alt="" />
      <img class="image-compare image-modified" src="/${assetPath + modified}" alt="" />
    </div>
    <script>
      var themeColor = "#ffffff";
      if (localStorage.getItem("theme") === 'dark') {
        themeColor = "#222222"
      }
      new ImageCompare(document.getElementById("${id}"),
      {
        controlColor: themeColor,
        controlShadow: false,
        verticalMode: ${verticalMode},
        showLabels: true,
        labelOptions: {
          before: 'Original',
          after: '${descriptionModified}',
          onHover: true,
        }
      }).mount();
    </script>
  `;
  
  return elements;
});