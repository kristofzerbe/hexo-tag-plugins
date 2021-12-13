/*
  Download Link

  Syntax
  {% download_link "assetFile" ["additionalCaption"] %}

*/
hexo.extend.tag.register('download_link', function (args) {
    
  const [
    assetFile, 
    additionalCaption
  ] = args;
  
  var caption = "Download ";
  if (additionalCaption) { 
    caption += additionalCaption + " "; 
  }

  var fileName = assetFile.substring(assetFile.lastIndexOf('/') + 1);

  var element = `
    <p class="download-link">
      <a class="button" href="${assetFile}" download>
        ${caption}<strong>${fileName}</strong>
      </a>
    </p>
    `;
    
  return element;
});