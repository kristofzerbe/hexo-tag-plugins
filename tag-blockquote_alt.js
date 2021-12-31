/*
  Alternative Blockquote Tag

  Syntax
  {% blockquote_alt "cite" ["citeUrl"] %}
    quote
  {% endblockquote_alt %}

*/

hexo.extend.tag.register("blockquote_alt", function(args, content){

  var cite, citeUrl;

  cite = args[0];
  citeUrl = args[1];

  quote = hexo.render.renderSync({ text: content, engine: 'markdown' });

  let eCite;
  if (citeUrl) {
      eCite = `<cite><a href="${citeUrl}">--- ${cite}</a></cite>`;
  } else {
    eCite = `<cite>--- ${cite}</cite>`;
  }

  let element = `
    <div>
        <blockquote>${quote}</blockquote>
        ${eCite}
    </div>
  `;

  return element;

}, {ends: true});