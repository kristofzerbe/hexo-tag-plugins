/*
  Codepen Tag - Customized from https://github.com/bibixx/hexo-tag-codepen

  Syntax:
  {% codepen "slugHash" "title" defaultTab:(html,js,css) [height] [width] %}
*/

hexo.extend.tag.register("codepen", function(args, content){

  const userId = hexo.config.codepen.user_id;

  const [
    slugHash,
    title,
    defaultTab = hexo.config.codepen.default_tab || "js",
    height = hexo.config.codepen.height || 300,
    width = hexo.config.codepen.width || "100%"
  ] = args;  

  const element = `
    <iframe height="${height}" 
        id="codepen-${slugHash}"
        class="codepen"
        src="https://codepen.io/${userId}/embed/${slugHash}?height=${height}&default-tab=${defaultTab},result&theme-id=dark"
        style="width: ${width};" 
        scrolling="no" 
        title="Codepen: ${title}" 
        frameborder="no" 
        loading="lazy" 
        allowtransparency="true" 
        allowfullscreen="true">
    </iframe>
  `;

  return element;

});