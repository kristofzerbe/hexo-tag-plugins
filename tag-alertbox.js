/*
  Alertbox Tag

  Syntax:
  {% alertbox alertType:(exclamation,question,warning,info,success,note) %}
    content
  {% endalertbox %}

*/

hexo.extend.tag.register("alertbox", function(args, content){

  var alertType;
  alertType = args[0].toLowerCase();

  content = hexo.render.renderSync({ text: content, engine: 'markdown' });

  var element = `
    <div class="alertbox alertbox-${alertType}">
      ${content}
    </div>
  `;

  return element;

}, {ends: true});