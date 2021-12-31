/*
  Details Blockquote Tag

  Syntax
  {% blockquote_details "summary" "cite" ["citeUrl"] %}
    quote
  {% endblockquote_details %}

*/

hexo.extend.tag.register("blockquote_details", function(args, content){

  var summary, cite, citeUrl;

  summary = args[0];
  cite = args[1];
  citeUrl = args[2];

  quote = hexo.render.renderSync({ text: content, engine: 'markdown' });

  let eCite;
  if (citeUrl) {
      eCite = `<cite><a href="${citeUrl}">--- ${cite}</a></cite>`;
  } else {
    eCite = `<cite>--- ${cite}</cite>`;
  }

  let element = `
    <details>
        <summary>${summary}</summary>
        <blockquote>${quote}</blockquote>
        ${eCite}
    </details>
  `;

  return element;

}, {ends: true});