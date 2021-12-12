/*
  CodeSandbox Tag

  Syntax:
  {% codesandbox "slugHash" "title" [height] [width] %}
*/

hexo.extend.tag.register("codesandbox", function(args, content){

  const [
    slugHash,
    title,
    height = "500",
    width = "100%"
  ] = args;  

  const element = `
    <iframe 
        src="https://codesandbox.io/embed/${slugHash}?fontsize=14&theme=light"
        style="width:${width}; height:${height}px; border:0; overflow:hidden;"
        title="${title}"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts">
    </iframe>
  `
  return element;
  
});