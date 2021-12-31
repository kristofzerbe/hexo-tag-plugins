/*
  Github User & Repo Card Tag

  Syntax:
  {% github_user_and_repo_card "user" "repo" ["cardWidth"] ["userheight"] ["avatarSize"] %}

*/
const axios = require("axios");

hexo.extend.tag.register("github_user_and_repo_card", async function(args){

  const [
    user,
    repo,
    cardWidth = "400px",
    userheight = "120px",
    avatarSize = "90px"
  ] = args;

  let urlUserApi = `https://api.github.com/users/${user}`;
  let resUserApi = await axios.get(urlUserApi);
  const dataUser = resUserApi.data;

  let urlRepoApi = `https://api.github.com/repos/${user}/${repo}`;
  let resRepoApi = await axios.get(urlRepoApi);
  const dataRepo = resRepoApi.data;

  let eBlog = "";
  if (dataUser.blog) {
    eBlog = `
    <a class="gh-link" href="${dataUser.blog}" title="Blog">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" fill="#fff"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 0 0 1.06 1.06l1.25-1.25a2 2 0 1 1 2.83 2.83l-2.5 2.5a2 2 0 0 1-2.83 0 .75.75 0 0 0-1.06 1.06 3.5 3.5 0 0 0 4.95 0l2.5-2.5a3.5 3.5 0 0 0-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 0 1 0-2.83l2.5-2.5a2 2 0 0 1 2.83 0 .75.75 0 0 0 1.06-1.06 3.5 3.5 0 0 0-4.95 0l-2.5 2.5a3.5 3.5 0 0 0 4.95 4.95l1.25-1.25a.75.75 0 0 0-1.06-1.06l-1.25 1.25a2 2 0 0 1-2.83 0z"/></svg>            
    </a>
  `;
  }

  let urlLangApi = `https://api.github.com/repos/${user}/${repo}/languages`;
  let resLangApi = await axios.get(urlLangApi);
  const dataLang = resLangApi.data;

  let total = 0;
  for (var lang in dataLang) {
    let count = dataLang[lang];
    total += count;
  }

  let eBarList = "";
  let eLanguageList = "";
  let otherPercent = 0;

  function addLanguageElements(lang, percent, color) {

    if (lang != "Other") {
      eBarList += `
      <span style="background-color: ${color}; width: ${percent.toFixed(1)}%;"></span>
    `;
    }

    eLanguageList += `
      <li>
        <svg xmlns="http://www.w3.org/2000/svg" style="color:${color} !important;" aria-hidden="true" viewBox="0 0 16 16" data-view-component="true"><path fill-rule="evenodd" d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/></svg>
        <strong>${lang}</strong><span>${percent.toFixed(1)}%</span>
      </li>
    `;
  }

  for (var lang in dataLang) {
    let count = dataLang[lang];
    let percent = ((count / total) * 100);
    if (percent < 1) { 
      otherPercent += percent
    } else {
      addLanguageElements(lang, percent, languageColors[lang] || "#858585");
    }
  }
  if (otherPercent > 0) {
    addLanguageElements("Other", otherPercent, "#ddd");
  }

  const elements = `
    <style>
      #gh-card-${repo} {
        --gh-card-width: ${cardWidth};
        --gh-user-height: ${userheight};
        --gh-avatar-size: ${avatarSize};    
      }
    </style>
    <div id="gh-card-${repo}" class="gh-card">
      <a class="gh-logo" href="https://github.com" title="github.com">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 16 16" data-view-component="true" fill="#fff"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
      </a>
      ${eBlog}
      <a href="https://github.com/${user}">
        <img class="gh-avatar" src="${dataUser.avatar_url}" />
      </a>
      <a href="https://github.com/${user}" class="gh-user">
        <div class="gh-account">
          <h1>${dataUser.name}</h1>
          <h2>${user}</h2>    
        </div>
        <div class="gh-info gh-repos">
          <strong>${dataUser.public_repos}</strong>
          <span>Repos</span>
        </div>
        <div></div>
        <div class="gh-info gh-followers">
          <strong>${dataUser.followers}</strong>
          <span>Followers</span>
        </div>
      </a>
      <div class="gh-repo">
        <a class="gh-meta gh-stars" href="https://github.com/${user}/${repo}/stargazers" title="Stargazers">
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 16 16" data-view-component="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694v.001z"/></svg>
          <span>${dataRepo.stargazers_count}</span>
        </a>
        <a class="gh-meta gh-watchers" href="github.com/${user}/${repo}/watchers" title="Subscribers">
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 16 16" data-view-component="true"><path fill-rule="evenodd" d="M1.679 7.932c.412-.621 1.242-1.75 2.366-2.717C5.175 4.242 6.527 3.5 8 3.5c1.473 0 2.824.742 3.955 1.715 1.124.967 1.954 2.096 2.366 2.717a.119.119 0 0 1 0 .136c-.412.621-1.242 1.75-2.366 2.717C10.825 11.758 9.473 12.5 8 12.5c-1.473 0-2.824-.742-3.955-1.715C2.92 9.818 2.09 8.69 1.679 8.068a.119.119 0 0 1 0-.136zM8 2c-1.981 0-3.67.992-4.933 2.078C1.797 5.169.88 6.423.43 7.1a1.619 1.619 0 0 0 0 1.798c.45.678 1.367 1.932 2.637 3.024C4.329 13.008 6.019 14 8 14c1.981 0 3.67-.992 4.933-2.078 1.27-1.091 2.187-2.345 2.637-3.023a1.619 1.619 0 0 0 0-1.798c-.45-.678-1.367-1.932-2.637-3.023C11.671 2.992 9.981 2 8 2zm0 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>
          <span>${dataRepo.subscribers_count}</span>
        </a>
        <div></div>
        <a class="gh-meta gh-forks" href="https://github.com/${user}/${repo}/network/members" title="Forks">
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 16 16" data-view-component="true"><path fill-rule="evenodd" d="M5 3.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm0 2.122a2.25 2.25 0 1 0-1.5 0v.878A2.25 2.25 0 0 0 5.75 8.5h1.5v2.128a2.251 2.251 0 1 0 1.5 0V8.5h1.5a2.25 2.25 0 0 0 2.25-2.25v-.878a2.25 2.25 0 1 0-1.5 0v.878a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 5 6.25v-.878zm3.75 7.378a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm3-8.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5z"/></svg>
          <span>${dataRepo.forks_count}</span>
        </a>
        <a class="gh-meta gh-issues" href="github.com/${user}/${repo}/issues" title="Issues">
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 16 16" data-view-component="true"><path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/><path fill-rule="evenodd" d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM1.5 8a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0z"/></svg>
          <span>${dataRepo.open_issues_count}</span>
        </a>
        <div class="gh-desc">
          <h2>
            <a href="https://github.com/${user}/${repo}">${repo}</a>
          </h2>
          <p>${dataRepo.description}</p>
          <div class="gh-language-bar">
            ${eBarList}
          </div>
          <ul class="gh-language-list">
            ${eLanguageList}
          </ul>
          <p class="gh-law">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 16 16" data-view-component="true"><path fill-rule="evenodd" d="M8.75.75a.75.75 0 0 0-1.5 0V2h-.984c-.305 0-.604.08-.869.23l-1.288.737A.25.25 0 0 1 3.984 3H1.75a.75.75 0 0 0 0 1.5h.428L.066 9.192a.75.75 0 0 0 .154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.514 3.514 0 0 0 .686.45A4.492 4.492 0 0 0 3 11c.88 0 1.556-.22 2.023-.454a3.515 3.515 0 0 0 .686-.45l.045-.04.016-.015.006-.006.002-.002.001-.002L5.25 9.5l.53.53a.75.75 0 0 0 .154-.838L3.822 4.5h.162c.305 0 .604-.08.869-.23l1.289-.737a.25.25 0 0 1 .124-.033h.984V13h-2.5a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-2.5V3.5h.984a.25.25 0 0 1 .124.033l1.29.736c.264.152.563.231.868.231h.162l-2.112 4.692a.75.75 0 0 0 .154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.517 3.517 0 0 0 .686.45A4.492 4.492 0 0 0 13 11c.88 0 1.556-.22 2.023-.454a3.512 3.512 0 0 0 .686-.45l.045-.04.01-.01.006-.005.006-.006.002-.002.001-.002-.529-.531.53.53a.75.75 0 0 0 .154-.838L13.823 4.5h.427a.75.75 0 0 0 0-1.5h-2.234a.25.25 0 0 1-.124-.033l-1.29-.736A1.75 1.75 0 0 0 9.735 2H8.75V.75zM1.695 9.227c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327l-1.305 2.9zm10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327l-1.305 2.9z"/></svg>
            <span>${dataRepo.license.name}</span>
          </p>
        </div>
      </div>
    </div>
  `;
  
  return elements;

}, { async: true });

const languageColors = { // taken from https://github.com/anuraghazra/github-readme-stats and complemented
  "1C Enterprise": "#814CCC",
  "4D": null,
  "ABAP": "#E8274B",
  "ActionScript": "#882B0F",
  "Ada": "#02f88c",
  "Agda": "#315665",
  "AGS Script": "#B9D9FF",
  "AL": "#3AA2B5",
  "Alloy": "#64C800",
  "Alpine Abuild": null,
  "AMPL": "#E6EFBB",
  "AngelScript": "#C7D7DC",
  "ANTLR": "#9DC3FF",
  "Apex": "#1797c0",
  "API Blueprint": "#2ACCA8",
  "APL": "#5A8164",
  "Apollo Guidance Computer": "#0B3D91",
  "AppleScript": "#101F1F",
  "Arc": "#aa2afe",
  "ASL": null,
  "ASP.NET": "#9400ff",
  "AspectJ": "#a957b0",
  "Assembly": "#6E4C13",
  "Asymptote": "#ff0000",
  "ATS": "#1ac620",
  "Augeas": null,
  "AutoHotkey": "#6594b9",
  "AutoIt": "#1C3552",
  "Awk": null,
  "Ballerina": "#FF5000",
  "Batchfile": "#C1F12E",
  "Befunge": null,
  "Bison": "#6A463F",
  "BitBake": null,
  "Blade": "#f7523f",
  "BlitzBasic": null,
  "BlitzMax": "#cd6400",
  "Bluespec": null,
  "Boo": "#d4bec1",
  "Brainfuck": "#2F2530",
  "Brightscript": null,
  "C": "#555555",
  "C#": "#178600",
  "C++": "#f34b7d",
  "C2hs Haskell": null,
  "Cap'n Proto": null,
  "CartoCSS": null,
  "Ceylon": "#dfa535",
  "Chapel": "#8dc63f",
  "Charity": null,
  "ChucK": null,
  "Cirru": "#ccccff",
  "Clarion": "#db901e",
  "Classic ASP": "#6a40fd",
  "Clean": "#3F85AF",
  "Click": "#E4E6F3",
  "CLIPS": null,
  "Clojure": "#db5855",
  "CMake": null,
  "COBOL": null,
  "CodeQL": null,
  "CoffeeScript": "#244776",
  "ColdFusion": "#ed2cd6",
  "ColdFusion CFC": "#ed2cd6",
  "Common Lisp": "#3fb68b",
  "Common Workflow Language": "#B5314C",
  "Component Pascal": "#B0CE4E",
  "Cool": null,
  "Coq": null,
  "Crystal": "#000100",
  "CSON": "#244776",
  "Csound": null,
  "Csound Document": null,
  "Csound Score": null,
  "CSS": "#563d7c",
  "Cuda": "#3A4E3A",
  "CWeb": null,
  "Cycript": null,
  "Cython": null,
  "D": "#ba595e",
  "Dafny": "#FFEC25",
  "Dart": "#00B4AB",
  "DataWeave": "#003a52",
  "Dhall": "#dfafff",
  "DIGITAL Command Language": null,
  "DM": "#447265",
  "Dockerfile": "#384d54",
  "Dogescript": "#cca760",
  "DTrace": null,
  "Dylan": "#6c616e",
  "E": "#ccce35",
  "eC": "#913960",
  "ECL": "#8a1267",
  "ECLiPSe": null,
  "Eiffel": "#4d6977",
  "EJS": "#a91e50",
  "Elixir": "#6e4a7e",
  "Elm": "#60B5CC",
  "Emacs Lisp": "#c065db",
  "EmberScript": "#FFF4F3",
  "EQ": "#a78649",
  "Erlang": "#B83998",
  "F#": "#b845fc",
  "F*": "#572e30",
  "Factor": "#636746",
  "Fancy": "#7b9db4",
  "Fantom": "#14253c",
  "Faust": "#c37240",
  "Filebench WML": null,
  "Filterscript": null,
  "fish": null,
  "FLUX": "#88ccff",
  "Forth": "#341708",
  "Fortran": "#4d41b1",
  "Fortran Free Form": null,
  "FreeMarker": "#0050b2",
  "Frege": "#00cafe",
  "Futhark": "#5f021f",
  "G-code": "#D08CF2",
  "Game Maker Language": "#71b417",
  "GAML": "#FFC766",
  "GAMS": null,
  "GAP": null,
  "GCC Machine Description": null,
  "GDB": null,
  "GDScript": "#355570",
  "Genie": "#fb855d",
  "Genshi": null,
  "Gentoo Ebuild": null,
  "Gentoo Eclass": null,
  "Gherkin": "#5B2063",
  "GLSL": null,
  "Glyph": "#c1ac7f",
  "Gnuplot": "#f0a9f0",
  "Go": "#00ADD8",
  "Golo": "#88562A",
  "Gosu": "#82937f",
  "Grace": null,
  "Grammatical Framework": "#ff0000",
  "GraphQL": "#e10098",
  "Groovy": "#e69f56",
  "Groovy Server Pages": null,
  "Hack": "#878787",
  "Haml": "#ece2a9",
  "Handlebars": "#f7931e",
  "Harbour": "#0e60e3",
  "Haskell": "#5e5086",
  "Haxe": "#df7900",
  "HCL": null,
  "HiveQL": "#dce200",
  "HLSL": null,
  "HolyC": "#ffefaf",
  "HTML": "#e34c26",
  "Hy": "#7790B2",
  "HyPhy": null,
  "IDL": "#a3522f",
  "Idris": "#b30000",
  "IGOR Pro": "#0000cc",
  "Inform 7": null,
  "Inno Setup": null,
  "Io": "#a9188d",
  "Ioke": "#078193",
  "Isabelle": "#FEFE00",
  "Isabelle ROOT": null,
  "J": "#9EEDFF",
  "Jasmin": null,
  "Java": "#b07219",
  "Java Server Pages": null,
  "JavaScript": "#f1e05a",
  "JavaScript+ERB": null,
  "JFlex": "#DBCA00",
  "Jison": null,
  "Jison Lex": null,
  "Jolie": "#843179",
  "JSONiq": "#40d47e",
  "Jsonnet": "#0064bd",
  "JSX": null,
  "Julia": "#a270ba",
  "Jupyter Notebook": "#DA5B0B",
  "Kaitai Struct": "#773b37",
  "Kotlin": "#A97BFF",
  "KRL": "#28430A",
  "LabVIEW": null,
  "Lasso": "#999999",
  "Latte": "#f2a542",
  "Lean": null,
  "Less": "#1d365d",
  "Lex": "#DBCA00",
  "LFE": "#4C3023",
  "LilyPond": null,
  "Limbo": null,
  "Literate Agda": null,
  "Literate CoffeeScript": null,
  "Literate Haskell": null,
  "LiveScript": "#499886",
  "LLVM": "#185619",
  "Logos": null,
  "Logtalk": null,
  "LOLCODE": "#cc9900",
  "LookML": "#652B81",
  "LoomScript": null,
  "LSL": "#3d9970",
  "Lua": "#000080",
  "M": null,
  "M4": null,
  "M4Sugar": null,
  "Macaulay2": "#d8ffff",
  "Makefile": "#427819",
  "Mako": null,
  "Markdown": "#083fa1",
  "Marko": "#42bff2",
  "Mask": "#f97732",
  "Mathematica": null,
  "MATLAB": "#e16737",
  "Max": "#c4a79c",
  "MAXScript": "#00a6a6",
  "mcfunction": "#E22837",
  "Mercury": "#ff2b2b",
  "Meson": "#007800",
  "Metal": "#8f14e9",
  "MiniD": null,
  "Mirah": "#c7a938",
  "mIRC Script": "#3d57c3",
  "MLIR": "#5EC8DB",
  "Modelica": null,
  "Modula-2": null,
  "Modula-3": "#223388",
  "Module Management System": null,
  "Monkey": null,
  "Moocode": null,
  "MoonScript": null,
  "Motorola 68K Assembly": null,
  "MQL4": "#62A8D6",
  "MQL5": "#4A76B8",
  "MTML": "#b7e1f4",
  "MUF": null,
  "mupad": null,
  "Myghty": null,
  "NASL": null,
  "NCL": "#28431f",
  "Nearley": "#990000",
  "Nemerle": "#3d3c6e",
  "nesC": "#94B0C7",
  "NetLinx": "#0aa0ff",
  "NetLinx+ERB": "#747faa",
  "NetLogo": "#ff6375",
  "NewLisp": "#87AED7",
  "Nextflow": "#3ac486",
  "Nim": "#ffc200",
  "Nit": "#009917",
  "Nix": "#7e7eff",
  "NSIS": null,
  "Nu": "#c9df40",
  "NumPy": "#9C8AF9",
  "Objective-C": "#438eff",
  "Objective-C++": "#6866fb",
  "Objective-J": "#ff0c5a",
  "ObjectScript": "#424893",
  "OCaml": "#3be133",
  "Odin": "#60AFFE",
  "Omgrofl": "#cabbff",
  "ooc": "#b0b77e",
  "Opa": null,
  "Opal": "#f7ede0",
  "Open Policy Agent": null,
  "OpenCL": null,
  "OpenEdge ABL": null,
  "OpenQASM": "#AA70FF",
  "OpenRC runscript": null,
  "OpenSCAD": null,
  "Ox": null,
  "Oxygene": "#cdd0e3",
  "Oz": "#fab738",
  "P4": "#7055b5",
  "Pan": "#cc0000",
  "Papyrus": "#6600cc",
  "Parrot": "#f3ca0a",
  "Parrot Assembly": null,
  "Parrot Internal Representation": null,
  "Pascal": "#E3F171",
  "Pawn": "#dbb284",
  "Pep8": "#C76F5B",
  "Perl": "#0298c3",
  "PHP": "#4F5D95",
  "PicoLisp": null,
  "PigLatin": "#fcd7de",
  "Pike": "#005390",
  "PLpgSQL": null,
  "PLSQL": "#dad8d8",
  "PogoScript": "#d80074",
  "Pony": null,
  "PostScript": "#da291c",
  "POV-Ray SDL": null,
  "PowerBuilder": "#8f0f8d",
  "PowerShell": "#012456",
  "Prisma": "#0c344b",
  "Processing": "#0096D8",
  "Prolog": "#74283c",
  "Propeller Spin": "#7fa2a7",
  "Pug": "#a86454",
  "Puppet": "#302B6D",
  "PureBasic": "#5a6986",
  "PureScript": "#1D222D",
  "Python": "#3572A5",
  "Python console": null,
  "q": "#0040cd",
  "Q#": "#fed659",
  "QMake": null,
  "QML": "#44a51c",
  "Qt Script": "#00b841",
  "Quake": "#882233",
  "R": "#198CE7",
  "Racket": "#3c5caa",
  "Ragel": "#9d5200",
  "Raku": "#0000fb",
  "RAML": "#77d9fb",
  "Rascal": "#fffaa0",
  "REALbasic": null,
  "Reason": "#ff5847",
  "Rebol": "#358a5b",
  "Red": "#f50000",
  "Redcode": null,
  "Ren'Py": "#ff7f7f",
  "RenderScript": null,
  "REXX": null,
  "Ring": "#2D54CB",
  "Riot": "#A71E49",
  "RobotFramework": null,
  "Roff": "#ecdebe",
  "Rouge": "#cc0088",
  "RPC": null,
  "Ruby": "#701516",
  "RUNOFF": "#665a4e",
  "Rust": "#dea584",
  "Sage": null,
  "SaltStack": "#646464",
  "SAS": "#B34936",
  "Sass": "#a53b70",
  "Scala": "#c22d40",
  "Scheme": "#1e4aec",
  "Scilab": null,
  "SCSS": "#c6538c",
  "sed": "#64b970",
  "Self": "#0579aa",
  "ShaderLab": null,
  "Shell": "#89e051",
  "ShellSession": null,
  "Shen": "#120F14",
  "Sieve": null,
  "Slash": "#007eff",
  "Slice": "#003fa2",
  "Slim": "#2b2b2b",
  "Smali": null,
  "Smalltalk": "#596706",
  "Smarty": null,
  "SmPL": "#c94949",
  "SMT": null,
  "Solidity": "#AA6746",
  "SourcePawn": "#f69e1d",
  "SQF": "#3F3F3F",
  "SQLPL": null,
  "Squirrel": "#800000",
  "SRecode Template": "#348a34",
  "Stan": "#b2011d",
  "Standard ML": "#dc566d",
  "Starlark": "#76d275",
  "Stata": null,
  "Stylus": "#ff6347",
  "SuperCollider": "#46390b",
  "Svelte": "#ff3e00",
  "SVG": "#ff9900",
  "Swift": "#ffac45",
  "SWIG": null,
  "SystemVerilog": "#DAE1C2",
  "Tcl": "#e4cc98",
  "Tcsh": null,
  "Terra": "#00004c",
  "TeX": "#3D6117",
  "Thrift": null,
  "TI Program": "#A0AA87",
  "TLA": null,
  "TSQL": null,
  "TSX": null,
  "Turing": "#cf142b",
  "Twig": "#c1d026",
  "TXL": null,
  "TypeScript": "#2b7489",
  "Unified Parallel C": "#4e3617",
  "Unix Assembly": null,
  "Uno": "#9933cc",
  "UnrealScript": "#a54c4d",
  "UrWeb": null,
  "V": "#4f87c4",
  "Vala": "#fbe5cd",
  "VBA": "#867db1",
  "VBScript": "#15dcdc",
  "VCL": "#148AA8",
  "Verilog": "#b2b7f8",
  "VHDL": "#adb2cb",
  "Vim script": "#199f4b",
  "Visual Basic": "#945db7",
  "Visual Basic .NET": "#945db7",
  "Volt": "#1F1F1F",
  "Vue": "#2c3e50",
  "wdl": "#42f1f4",
  "WebAssembly": "#04133b",
  "WebIDL": null,
  "wisp": "#7582D1",
  "Wollok": "#a23738",
  "X10": "#4B6BEF",
  "xBase": "#403a40",
  "XC": "#99DA07",
  "Xojo": null,
  "XProc": null,
  "XQuery": "#5232e7",
  "XS": null,
  "XSLT": "#EB8CEB",
  "Xtend": null,
  "Yacc": "#4B6C4B",
  "YAML": "#cb171e",
  "YARA": "#220000",
  "YASnippet": "#32AB90",
  "ZAP": "#0d665e",
  "Zeek": null,
  "ZenScript": "#00BCD1",
  "Zephir": "#118f9e",
  "Zig": "#ec915c",
  "ZIL": "#dc75e5",
  "Zimpl": null
}