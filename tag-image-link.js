/*
  Image Link

  Syntax
  {% image_link "assetImg" "url" "alt" %}

*/
hexo.extend.tag.register('image_link', function (args) {
    
  const [
    assetImg,
    url,
    alt 
  ] = args;
  
  var element = `
    <a href="${url}">
        <img src="${assetImg}" alt="${alt}" />
    </a>
    `;
    
  return element;
});