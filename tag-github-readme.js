/*
  Github Readme Details Tag

  Syntax:
  {% github_readme "user" "repo" ["summary"] %}

*/
const axios = require("axios");

hexo.extend.tag.register("github_readme", async function(args){

    const [
      user,
      repo,
      summary = "Project README on Github"
    ] = args;

    let apiUrl = `https://api.github.com/repos/${user}/${repo}`;

    let resApi = await axios.get(apiUrl);

    let rawUrl = `https://raw.githubusercontent.com/${user}/${repo}/${resApi.data.default_branch}`

    return axios.get(rawUrl + "/README.md").then(function(resReadme) {

      //Render Markdown to HTML
      let content = hexo.render.renderSync({ text: resReadme.data, engine: 'markdown' });

      //Replace relative asset paths
      content = content.replace(/src="\//g, 'src="' + rawUrl + '/')

      const element = `
        <details class="github-readme">
          <summary>${summary}</summary>
          <div>${content}</div>
        </details>
      `;

      return element;
    });
    
  }, { async: true });