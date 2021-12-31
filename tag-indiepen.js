/*
  Indiepen Tag

  Syntax:
  {% indiepen "subfolder" [height] [defaultTab:(result,html,css,js)] %}
*/

hexo.extend.tag.register("indiepen", function(args, content){

  const [
    subfolder,
    height = hexo.config.indiepen.height || 450,
    defaultTab = hexo.config.indiepen.default_tab || "result"
  ] = args;  

  const url = encodeURIComponent(this.permalink + subfolder);

  const element = `
    <iframe class="indiepen"
        src="https://indiepen.tech/embed/?url=${url}&tab=${defaultTab}"
        style="width: 100%; overflow: hidden; display: block; border: 0;"
        title="Indiepen Embed"
        loading="lazy" 
        width="100%" 
        height="${height}">
    </iframe>
  `;

  return element;

});