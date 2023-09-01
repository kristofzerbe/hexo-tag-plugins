[![issues](https://img.shields.io/github/issues/kristofzerbe/hexo-tag-plugins?label=github%20issues&style=flat-square)](https://github.com/kristofzerbe/hexo-tag-plugins/issues)

# Hexo Tag Plugins

**Hexo Tag Plugin Collection from kiko.io**

## Introduction

**[Hexo](https://hexo.io/)** is a [Markdown](https://en.wikipedia.org/wiki/Markdown) based SSG (Static Site Generator). Because the Mardown syntax is limited for good reason, Hexo has ***tag plugins*** you can use in your content to simplify and centralize complex structures, instead of writing pure HTML. For more information, see [hexo.io/docs/tag-plugins](https://hexo.io/docs/tag-plugins.html).

This project is a growing collection of tag plugins that I have developed and use for my blog [kiko.io](https://kiko.io). Some of them are quite simple, others are more complex, but overall maybe helpful for you.

## Installation / Using

There is no automatic installation of all tag plugins via NPM or other package managers, because every tag plugin stands for itself and you can pick the one you need simply by copying the appropriate JS file into your Hexo's script folder: ``THEMES`` / ``<YOUR-THEME>`` / ``SCRIPTS``.

For every tag plugin in the list below I provide a [Visual Studio Code Snippet](https://code.visualstudio.com/docs/editor/userdefinedsnippets) to quickly insert a plugin into the content via the hotkey ``Ctrl+Space``. To use the snippest create a new ``.code-snippets`` file in your projects ``.vscode`` folder and insert the snippets of all tag plugins you have downloaded into your project.

### Parameter Description Syntax

Every tag plugin includes a description in the header how to use it. The syntax is as follows:

| Syntax | Description |
| --- | --- |
| ``param1`` | mandatory parameter |
| ``[param2]`` | optional parameter |
| ``[param2=default]`` | optional parameter with default value|
| ``param:(option1,option2)`` | parameter option list to choose one option |
| ``..."value1\|value2"``| pipe delimitered array of values |

![-](assets/divider.png)

## Plugins

- [Anchor](#anchor)
- [Anchorlist](#anchorlist)
- [Alertbox](#alertbox)
- [Alternative Blockquote](#alternative-blockquote)
- [Blockquote Details](#blockquote-details)
- [Codepen](#codepen)
- [CodeSandbox](#codesandbox)
- [Download Link](#download-link)
- [Github Readme](#github-readme)
- [GitHub User & Repo Card](#github-user--repo-card)
- [Image Compare](#image-compare)
- [Image Link](#image-link)
- [Image Slide](#image-slide)
- [Indiepen](#indiepen)
- [More Info](#more-info)
- [Image Masonry](#image-masonry)

![-](assets/divider.png)

## Anchor

A simple anchor element as ``A``- or ``HR``-Tag as jump target for example from a ``Anchorlist``.

**Files:**

- [tag-anchor.js](https://github.com/kristofzerbe/hexo-tag-plugins/blob/main/tag-anchor.js)

**Syntax:**  

```txt
{% anchor "anchorId" elementType:(A,HR) %}``
```

**Parameters:**

| No | Parameter | optional/default | Description |
| --- | --- | --- | --- |
| 1 | ``anchorId`` | - | String to define the anchor id |
| 2|  ``elementType`` | - | Type of tag to render; select out of ``A`` or  ``HR`` |

**Usage Example:**

```js
{% anchor "my-anchor" HR  %}
```

**Output:**

```html
<hr id="my-anchor">
```

**VS Code Snippet:**

```json
"hexo.kiko-io.anchor": {
  "scope": "markdown",
  "prefix": "hexo.kiko-io.anchor",
  "body": [
    "{% anchor \"${1:anchorId}\" ${2|A,HR|}  %}"
  ],
  "description": "Insert kiko.io's anchor"
}
```

![-](assets/divider.png)

## Anchorlist

Creates an overview of all anchors in the content with jump links.

**Files:**

- [tag-anchorlist.js](https://github.com/kristofzerbe/hexo-tag-plugins/blob/main/tag-anchorlist.js)
  
**Syntax:**  

```txt
{% anchorlist ..."title|anchorId" %}
```

**Parameters:**

| No | Parameter | optional/default | Description |
| --- | --- | --- | --- |
| 1 | ``..."title\|anchorId"`` | - | List of pipe separated items with referencing title and anchor id |

**Usage Example:**

```js
{% anchorlist
  "My First Anchor|a1"
  "My Second Anchor|a2"
%}
```

**Output:**

```html
<ul class="anchorlist">
  <li data-anchor="#a1">
    <a href="#a1">My First Anchor</a>
  </li>
  <li data-anchor="#a2">
    <a href="#a2">My Second Anchor</a>
  </li>
</ul>
```

![Anchorlist Example](assets/tag-anchorlist-example.png)

**VS Code Snippet:**

```json
"hexo.kiko-io.anchorlist": {
  "scope": "markdown",
  "prefix": "hexo.kiko-io.anchorlist",
  "body": [
    "{% anchorlist ${1:...\"title|anchorId\"} %}"
  ],
  "description": "Insert kiko.io's anchorlist"
}
```

![-](assets/divider.png)

## Alertbox

Renders a iconized colored box with text for warnings or with some special information. 6 styles are provided: Exclamation, Question, Warning, Info, Success and Note.

**Files:**

- [tag-alertbox.js](https://github.com/kristofzerbe/hexo-tag-plugins/blob/main/tag-alertbox.js)
- [tag-alertbox.css](https://github.com/kristofzerbe/hexo-tag-plugins/blob/main/tag-alertbox.css)
  
**Prequisites:**

The icons are from the font **FontAwesome Free Solid**, you need to reference in your CSS either from your project or from a CDN. You will find such  references in the file ``tag-alertbox.css``, together with all other necessary styles.

**Syntax:**

```txt
{% alertbox alertType:(exclamation,question,warning,info,success,note) %}
content
{% endalertbox %}``
```

**Parameters:**

| No | Parameter | optional/default | Description |
| --- | --- | --- | --- |
| 1 | ``alertType`` | - | Type of the alert (icon and color); select out of ``exclamation``, ``question``, ``warning``, ``info``, ``success`` or ``note`` |

``content`` is not a parameter, but Markdown to render.

**Usage Example:**

```js
{% alertbox warning %}
Something has failed!
{% endalertbox %}
```

**Output:**

```html
<div class="alertbox alertbox-warning">
  <p>Something has failed!</p>
</div>
```

![Alertbox Example](assets/tag-alertbox-example.png)

See a live example at [https://kiko.io/post/Hexo-Tag-Plugin-Collection/#alertbox](https://kiko.io/post/Hexo-Tag-Plugin-Collection/#alertbox)

**VS Code Snippet:**

```json
"hexo.kiko-io.alertbox": {
  "scope": "markdown",
  "prefix": "hexo.kiko-io.alertbox",
  "body": [
    "{% alertbox ${1|exclamation,question,warning,info,success,note|} %}",
    "${2:content}",
    "{% endalertbox %}"
  ],
  "description": "Insert kiko.io's alertbox"
}
```

![-](assets/divider.png)

## Alternative Blockquote

An alternative blockquote tag plugin for quotes with citator and reference url.

**Files:**

- [tag-blockquote_alt.js](https://github.com/kristofzerbe/hexo-tag-plugins/blob/main/tag-blockquote_alt.js)
  
**Syntax:**  

```txt
{% blockquote_alt "cite" ["citeUrl"] %}
quote
{% endblockquote_alt %}
```

**Parameters:**

| No | Parameter | optional/default | Description |
| --- | --- | --- | --- |
| 1 | ``cite`` | | Author of the quote |
| 2 | ``citeUrl`` | yes | Url to the quote |

**Usage Example:**

```js
{% blockquote_alt "Anonymous" "https://en.wikipedia.org/wiki/Lorem_ipsum" %}
Lorem ipsum dolor sit amet...
{% endblockquote_alt %}
```

**Output:**

```html
<div>
  <blockquote>
    <p>Lorem ipsum dolor sit amet…</p>
  </blockquote>
  <cite>
    <a href="https://en.wikipedia.org/wiki/Lorem_ipsum">--- Anonymous</a>
  </cite>
</div>
```

![Alternative Blockquote Example](assets/tag-blockqoute_alt-example.png)

See a live example at [https://kiko.io/post/Hexo-Tag-Plugin-Collection/#blockquote_alt](https://kiko.io/post/Hexo-Tag-Plugin-Collection/#blockquote_alt)

**VS Code Snippet:**

```json
"hexo.kiko-io.blockquote": {
  "scope": "markdown",
  "prefix": "hexo.kiko-io.blockquote",
  "body": [
    "{% blockquote_alt \"${1:cite}\" [\"${2:citeUrl}\"] %}",
    "${3:content}",
    "{% endblockquote_alt %}"
  ],
  "description": "Insert kiko.io's blockquote"
}
```

![-](assets/divider.png)

## Blockquote Details

Blockquote including summary, citator and reference url, wrapped in a ``details`` tag.

**Files:**

- [tag-blockquote_details.js](https://github.com/kristofzerbe/hexo-tag-plugins/blob/main/tag-blockquote_details.js)
  
**Syntax:**  

```txt
{% blockquote_details "summary" "cite" ["citeUrl"] %}
quote
{% endblockquote_details %}

```

**Parameters:**

| No | Parameter | optional/default | Description |
| --- | --- | --- | --- |
| 1 | ``summary`` | - | Summary of the quote |
| 2 | ``cite`` | - | Author of the quote |
| 3 | ``citeUrl`` | yes | Url to the quote |

``quote`` is not a parameter, but Markdown to render.

**Usage Example:**

```js
{% blockquote_details "Lorem ipsum" "Anonymous" "https://en.wikipedia.org/wiki/Lorem_ipsum" %}
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
{% endblockquote_details %}
```

**Output:**

```html
<details>
  <summary>Lorem ipsum</summary>
  <blockquote>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
  </blockquote>
  <cite>
    <a href="https://en.wikipedia.org/wiki/Lorem_ipsum">--- Anonymous</a>
  </cite>
</details>
```

![Blockqoute Details Example](assets/tag-blockqoute_details-example.png)

See a live example at [https://kiko.io/post/Hexo-Tag-Plugin-Collection/#blockquote_details](https://kiko.io/post/Hexo-Tag-Plugin-Collection/#blockquote_details)

**VS Code Snippet:**

```json
"hexo.kiko-io.blockquote_details": {
  "scope": "markdown",
  "prefix": "hexo.kiko-io.blockquote_details",
  "body": [
    "{% blockquote_details \"${1:summary}\" \"${2:cite}\" [\"${3:citeUrl}\"] %}",
    "${4:quote}",
    "{% endblockquote_details %}"
  ],
  "description": "Insert kiko.io's blockquote_details"
}
```

![-](assets/divider.png)

## Codepen

Embedding a pen from [codepen.io](https://codepen.io).

**Files:**

- [tag-codepen.js](https://github.com/kristofzerbe/hexo-tag-plugins/blob/main/tag-codepen.js)
  
**Prequisites:**

You need following configuration section in your `_config.yml`:

```yml
# Codepen Defaults
codepen:
  user_id: "your-name"
  default_tab: "js"
  height: 400
  width: "100%"
```

**Syntax:**  

```txt
{% codepen "slugHash" "title" [defaultTab:(html,js,css)] [height] ["width"] %}
```

**Parameters:**

| No | Parameter | optional/default | Description |
| --- | --- | --- | --- |
| 1 | ``slugHash`` | - | Codepens SlugHash |
| 2 | ``title`` | - | Title |
| 3 | ``defaultTab`` | js | Default tab to show ; select out of ``html``, ``js`` or ``css`` |
| 4 | ``height`` | 300  | Height as number |
| 5 | ``width`` | "100%" | Width as CSS value |

**Usage Example:**

```js
{% codepen "abjJNYE" "Lorem Ipsum" html %}
```

**Output:**

```html
<iframe 
  height="400" 
  id="codepen-abjJNYE" 
  class="codepen" 
  src="https://codepen.io/kristofzerbe/embed/abjJNYE?height=400&amp;default-tab=html,result&amp;theme-id=light" 
  style="width: 100%;" 
  scrolling="no" 
  title="Codepen: Lorem Ipsum" 
  frameborder="no" 
  loading="lazy" 
  allowtransparency="true" 
  allowfullscreen="true">
</iframe>
```

![Codepen Example](assets/tag-codepen-example.png)

See a live example at [https://kiko.io/post/Hexo-Tag-Plugin-Collection/#codepen](https://kiko.io/post/Hexo-Tag-Plugin-Collection/#codepen)

**VS Code Snippet:**

```json
"hexo.kiko-io.codepen": {
  "scope": "markdown",
  "prefix": "hexo.kiko-io.codepen",
  "body": [
    "{% codepen \"${1:slugHash}\" \"${2:title}\" [${3|html,js,css|}] [${4:height}] [\"${5:width}\"] %}"
  ],
  "description": "Insert kiko.io's codepen"
}
```

![-](assets/divider.png)

## CodeSandbox

Embedding a sandbox from [CodeSandbox](https://codesandbox.io/).

**Files:**

- [tag-codesandbox.js](https://github.com/kristofzerbe/hexo-tag-plugins/blob/main/tag-codesandbox.js)

**Syntax:**  

```txt
{% codesandbox "slugHash" "title" [height] ["width"] %}
```

**Parameters:**

| No | Parameter | optional/default | Description |
| --- | --- | --- | --- |
| 1 | ``slugHash`` | - | Sandbox' SlugHash |
| 2 | ``title`` | - | Title |
| 3 | ``height`` | 500  | Height as number |
| 4 | ``width`` | "100%" | Width as CSS value |

**Usage Example:**

```js
{% codesandbox "cool-shamir-de613" "Lorem Ipsum" 300 %}
```

**Output:**

```html
<iframe 
  src="https://codesandbox.io/embed/cool-shamir-de613?fontsize=14&amp;theme=light" 
  style="width:100%; height:300px; border:0; overflow:hidden;" 
  title="Lorem Ipsum" 
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts">
</iframe>
```

![CodeSandbox Example](assets/tag-codesandbox-example.png)

See a live example at [https://kiko.io/post/Hexo-Tag-Plugin-Collection/#codesandbox](https://kiko.io/post/Hexo-Tag-Plugin-Collection/#codesandbox)

**VS Code Snippet:**

```json
"hexo.kiko-io.codesandbox": {
  "scope": "markdown",
  "prefix": "hexo.kiko-io.codesandbox",
  "body": [
    "{% codesandbox ${1:\"slugHash}\" \"${2:title}\" [${3:height}] [\"${4:width}\"] %}"
  ],
  "description": "Insert kiko.io's codesandbox"
}
```

![-](assets/divider.png)

## Download Link

Button link for downloading an asset file, with additional caption ("Download &lt;additionalCaption&gt; &lt;assetFile&gt;").

**Files:**

- [tag-download-link.js](https://github.com/kristofzerbe/hexo-tag-plugins/blob/main/tag-download-link.js)

**Syntax:**  

```txt
{% download_link "assetFile" ["additionalCaption"] %}
```

**Parameters:**

| No | Parameter | optional/default | Description |
| --- | --- | --- | --- |
| 1 | ``assetFile`` | | Asset file name to download |
| 2 | ``additionalCaption`` | yes | Additional caption between *"Download "* and file name |

**Usage Example:**

```js
{% download_link "example-image_ORIGINAL.jpg" "Photo" %}
```

**Output:**

```html
<p class="download-link">
  <a class="button" href="example-image_ORIGINAL.jpg" download="">
    Download Photo <strong>example-image_ORIGINAL.jpg</strong>
  </a>
</p>
```

![Download Link Example](assets/tag-download-link-example.png)

See a live example at [https://kiko.io/post/Hexo-Tag-Plugin-Collection/#download-link](https://kiko.io/post/Hexo-Tag-Plugin-Collection/#download-link)

**VS Code Snippet:**

```json
"hexo.kiko-io.download_link": {
  "scope": "markdown",
  "prefix": "hexo.kiko-io.download_link",
  "body": [
    "{% download_link \"${1:assetFile}\" \"${2:additionalCaption}\" %}"
  ],
  "description": "Insert kiko.io's download_link"
}
```

![-](assets/divider.png)

## Github Readme

Gets the README file of a Github repo and renders its Markdown as HTML in a ``detail`` tag.

**Files:**

- [tag-github-readme.js](https://github.com/kristofzerbe/hexo-tag-plugins/blob/main/tag-github-readme.js)
  
**Prequisites:**

You need to have installed the [**Axios** package](https://www.npmjs.com/package/axios) in your project.

The HTML output has no styles, therefore you need some in your CSS for ``.github-readme``.

**Syntax:**  

```txt
{% github_readme "user" "repo" ["summary"] %}
```

**Parameters:**

| No | Parameter | optional/default | Description |
| --- | --- | --- | --- |
| 1 | ``user`` | | Name of the GitHub user |
| 2 | ``repo`` | | Name of the GitHub repo |
| 3 | ``summary`` | "Project README on Github" | Caption of the DETAILS element |

**Usage Example:**

```js
{% github_readme "kristofzerbe" "hexo-tag-plugins" %}
```

**Output:**

```html
<details class="github-readme">
  <summary>Project README on Github</summary>
  <div>
    <!-- Content of the README file converted to HTML -->
  </div>
</details>
```

![Github Readme Example](assets/tag-github-readme-example.png)

**VS Code Snippet:**

```json
"hexo.kiko-io.github_readme": {
  "scope": "markdown",
  "prefix": "hexo.kiko-io.github_readme",
  "body": [
    "{% github_readme \"${1:user}\" \"${2:repo}\" \"${3:[summary]}\" %}"
  ],
  "description": "Insert kiko.io's github_readme"
}
```

See a live example at [https://kiko.io/post/GitHub-Tag-Plugins-for-Hexo/#readme](https://kiko.io/post/GitHub-Tag-Plugins-for-Hexo/#readme)

![-](assets/divider.png)

## GitHub User & Repo Card

Renders a card-like info panel, with full information about a GitHub repo and its creator, the GitHub user.

**Files:**

- [tag-github-user-and-repo-card.js](https://github.com/kristofzerbe/hexo-tag-plugins/blob/main/tag-github-user-and-repo-card.js)
- [tag-github-user-and-repo-card.css](https://github.com/kristofzerbe/hexo-tag-plugins/blob/main/tag-github-user-and-repo-card.css)
  
**Prequisites:**

You need to have installed the [**Axios** package](https://www.npmjs.com/package/axios) in your project.

**Syntax:**  

```txt
{% github_user_and_repo_card "user" "repo" ["cardWidth"] ["userheight"] ["avatarSize"] %}
```

**Parameters:**

| No | Parameter | optional/default | Description |
| --- | --- | --- | --- |
| 1 | ``user`` | | Name of the GitHub user |
| 2 | ``repo`` | | Name of the GitHub repo |
| 3 | ``cardWidth`` | "400px" | Maximum width of the card; Minimum is 300px |
| 4 | ``userheight`` | "120px" | Height of the upper user panel |
| 5 | ``avatarSize`` | "90px" | Size of the avatar image as CSS value |

**Usage Example:**

```js
{% github_user_and_repo_card "kristofzerbe" "hexo-tag-plugins" "500px" %}
```

**Output:**

```html
<!-- see tag-github-user-and-repo-card.html -->
```

![GitHub User & Repo Card Example](assets/tag-github-user-and-repo-card-example.png)

**VS Code Snippet:**

```json
"hexo.kiko-io.github_user_and_repo_card": {
  "scope": "markdown",
  "prefix": "hexo.kiko-io.github_user_and_repo_card",
  "body": [
    "{% github_user_and_repo_card \"${1:user}\" \"${2:repo}\" \"${3:[cardWidth]}\" \"${4:[userhight]}\" \"${5:[avatarSize]}\" %}"
  ],
  "description": "Insert kiko.io's github_user_and_repo_card"
}
```

See a live example at [https://kiko.io/post/GitHub-Tag-Plugins-for-Hexo/#user-and-repo-card](https://kiko.io/post/GitHub-Tag-Plugins-for-Hexo/#user-and-repo-card)

![-](assets/divider.png)

## Image Compare

Comparing two asset images side-by-side with the aid of the JS library [Image Compare Viewer](https://image-compare-viewer.netlify.app/).

**Files:**

- [tag-image-compare.js](https://github.com/kristofzerbe/hexo-tag-plugins/blob/main/tag-image-compare.js)
  
**Prequisites:**

As this tag plugin relies on an external JS library, the files ``image-compare-viewer.js`` and ``image-compare-viewer.css`` (or its minified versions) must be loaded in the header of the web page.

**Syntax:**  

```txt
{% image_compare 
  "imgFileOriginal" 
  "imgFileModified" 
  "descriptionModified" 
  [orientation=vertical] 
%}
```

**Parameters:**

| No | Parameter | optional/default | Description |
| --- | --- | --- | --- |
| 1 | ``imgFileOriginal`` | - | Original asset image file name |
| 2 | ``imgFileModified`` | - | Modified asset image file name |
| 3 | ``descriptionModified`` | - | Description |
| 4 | ``orientation`` | null | Vertical orientation Mode; set ``vertical`` to select |

**Usage Example:**

```js
{% image_compare 
  "example-image_ORIGINAL.jpg"
  "example-image_PRESET.jpg"
  "Lightroom Preset" 
%}
```

**Output:**

```html
<div id="image-compare-1yrasq">
  <img class="image-compare image-original" 
       src="/post/my-post/example-image_ORIGINAL.jpg" alt="" />
  <img class="image-compare image-modified" 
       src="/post/my-post/example-image_PRESET.jpg" alt="" />
</div>
<script>
  var themeColor = "#ffffff";
  if (localStorage.getItem("theme") === 'dark') {
    themeColor = "#222222"
  }
  new ImageCompare(document.getElementById("image-compare-1yrasq"),
  {
    controlColor: themeColor,
    controlShadow: false,
    verticalMode: false,
    showLabels: true,
    labelOptions: {
      before: 'Original',
      after: 'Lightroom Preset',
      onHover: true,
    }
  }).mount();
</script>
```

![Image Compare Example](assets/tag-image-compare-example.png)

See a live example at [https://kiko.io/post/Hexo-Tag-Plugin-Collection/#image-compare](https://kiko.io/post/Hexo-Tag-Plugin-Collection/#image-compare)

**VS Code Snippet:**

```json
"hexo.kiko-io.image_compare": {
  "scope": "markdown",
  "prefix": "hexo.kiko-io.image_compare",
  "body": [
    "{% image_compare \"${1:imgFileOriginal}\" \"${2:imgFileModified}\" \"${3:modDesc}\" [\"${4|vertical|}\"] %}"
  ],
  "description": "Insert kiko.io's image_compare"
}
```

![-](assets/divider.png)

## Image Link

Renders an image including ALT attribute within a link.

**Files:**

- [tag-image-link.js](https://github.com/kristofzerbe/hexo-tag-plugins/blob/main/tag-image-link.js)
  
**Syntax:**  

```txt
{% image_link "assetImg" "url" "alt" %}
```

**Parameters:**

| No | Parameter | optional/default | Description |
| --- | --- | --- | --- |
| 1 | ``assetImg`` | - | Asset image file name |
| 2 | ``url`` | - | Url to link to |
| 3 | ``alt`` | - | Alternate text |

**Usage Example:**

```js
{% image_link "kiko-io-screenshot.png" "http://kiko.io" "Blog kiko.io" %}
```

**Output:**

```html
<a href="http://kiko.io">
  <img src="kiko-io-screenshot.png" alt="Blog kiko.io">
</a>
```

**VS Code Snippet:**

```json
"hexo.kiko-io.image_link": {
  "scope": "markdown",
  "prefix": "hexo.kiko-io.image_link",
  "body": [
    "{% image_link \"${1:assetImg}\" \"${2:url}\" \"${3:alt}\" %}"
  ],
  "description": "Insert kiko.io's image_link"
}
```

![-](assets/divider.png)

## Image Slide

Shows multiple images within a slider with the aid of the JS library [Tiny Slider](https://github.com/ganlanyuan/tiny-slider).

**Files:**

- [tag-image-slide.js](https://github.com/kristofzerbe/hexo-tag-plugins/blob/main/tag-image-slide.js)
  
**Prequisites:**

As this tag plugin relies on an external JS library, the files ``tiny-slider.js`` and ``tiny-slider.css`` (or its minified versions) must be loaded in the header of the web page.

The CSS file doesn't include styles for the ``.tns-nav`` and its controls, but you can use the following to extend the original CSS:

```css
.tns-nav {
    text-align: center;
    margin: 10px 0;
}
.tns-nav > [aria-controls] {
    width: 12px;
    height: 12px;
    padding: 0;
    margin: 0 5px;
    border-radius: 50%;
    background: #ddd;
    border: 0;
}
.tns-nav > .tns-nav-active {
    background: #999;
}
```

**Syntax:**  

```txt
{% image_slide ..."assetImg|title" %}
```

**Parameters:**

| No | Parameter | optional/default | Description |
| --- | --- | --- | --- |
| 1 | ``..."assetImg\|title"`` | | List of pipe separated items with asset image file and title |

**Usage Example:**

```js
{% image_slide
  "example-image_ORIGINAL.jpg|Original"
  "example-image_PRESET.jpg|Lightroom Preset"
%}
```

**Output:**

```html
<div class="image-slider" id="image-slide-w7jgxk">
  <div>
    <img src="/post/my-post/example-image_ORIGINAL.jpg" alt="Original" />
  </div>
  <div>
    <img src="/post/my-post/example-image_PRESET.jpg" alt="Lightroom Preset" />
  </div>
</div>
<script>
  tns({
    container: "#image-slide-w7jgxk",
    items: 1,
    slideBy: "page",
    controls: false,
    nav: true
  });
</script>
```

![Image Slide Example](assets/tag-image-slide-example.png)

See a live example at [https://kiko.io/post/Hexo-Tag-Plugin-Collection/#image-slide](https://kiko.io/post/Hexo-Tag-Plugin-Collection/#image-slide)

**VS Code Snippet:**

```json
"hexo.kiko-io.image_slide": {
  "scope": "markdown",
  "prefix": "hexo.kiko-io.image_slide",
  "body": [
    "{% image_slide ${1:...\"assetImg|title\"} %}"
  ],
  "description": "Insert kiko.io's image_slide"
}
```

![-](assets/divider.png)

## Indiepen

Embedding a "local" pen (`index.html`, `main.js` and `styles.css` stored in an asset subfolder) via [Indiepen](https://indiepen.tech).

**Files:**

- [tag-indiepen.js](https://github.com/kristofzerbe/hexo-tag-plugins/blob/main/tag-indiepen.js)
  
**Prequisites:**

You need following configuration section in your `_config.yml`:

```yml
# Indiepen Defaults
indiepen:
  default_tab: "result"
  height: 450
```

**Syntax:**  

```txt
{% indiepen "subfolder" [height] [defaultTab:(result,html,css,js)] %}
```

**Parameters:**

| No | Parameter | optional/default | Description |
| --- | --- | --- | --- |
| 1 | ``subfolder`` | | Asset subfolder with indiepen files |
| 2 | ``defaultTab`` | result | Default tab to show ; select out of ``result``, ``html``, ``js`` or ``css`` |
| 3 | ``height`` | 450  | Height as number |

**Usage Example:**

```js
{% indiepen "my-pen" 300 html %}
```

**Output:**

```html
<iframe class="indiepen"
        src="https://indiepen.tech/embed/?url=https%3A%2F%2Fmy-blog.com%2Fpost%2Fmy-post%2Fmy-pen&tab=html"
        style="width: 100%; overflow: hidden; display: block; border: 0;"
        title="Indiepen Embed"
        loading="lazy" 
        width="100%" 
        height="300">
</iframe>
```

![Indiepen Example](assets/tag-indiepen-example.png)

See a live example at [https://kiko.io/post/Hexo-Tag-Plugin-Collection/#indiepen](https://kiko.io/post/Hexo-Tag-Plugin-Collection/#indiepen)

**VS Code Snippet:**

```json
"hexo.kiko-io.indiepen": {
  "scope": "markdown",
  "prefix": "hexo.kiko-io.indiepen",
  "body": [
    "{% indiepen \"${1:subfolder}\" ${2:height} ${3|result,html,css,js|} %}"
  ],
  "description": "Insert kiko.io's indiepen"
}
```

![-](assets/divider.png)

## More Info

Renders a list of related, informative links regarding a post.

**Files:**

- [tag-moreinfo.js](https://github.com/kristofzerbe/hexo-tag-plugins/blob/main/tag-moreinfo.js)

**Syntax:**  

```txt
{% moreinfo '{ "list": [
  [ "publisher", "title", "url" ]
]}' %}
```

**Usage Example:**

```js
{% moreinfo '{ "list": [
  [ "Wikipedia", "Markdown",
  "https://en.wikipedia.org/wiki/Markdown" ],
  [ "Markdown Guide", "Basic Syntax",
  "https://www.markdownguide.org/basic-syntax/" ],
  [ "Daring Fireball", "Markdown: Syntax",
  "https://daringfireball.net/projects/markdown/syntax" ]
]}' %}
```

**Output:**

```html
<ul class="moreinfo-list">
  <li>Wikipedia: <a href="https://en.wikipedia.org/wiki/Markdown">Markdown</a></li>
  <li>Markdown Guide: <a href="https://www.markdownguide.org/basic-syntax/">Basic Syntax</a></li>
  <li>Daring Fireball: <a href="https://daringfireball.net/projects/markdown/syntax">Markdown: Syntax</a></li>
</ul>
```

![More Info Example](assets/tag-more-info-example.png)

See a live example at [https://kiko.io/post/Hexo-Tag-Plugin-Collection/#more-info](https://kiko.io/post/Hexo-Tag-Plugin-Collection/#more-info)

**VS Code Snippet:**

```json
"hexo.kiko-io.moreinfo": {
  "scope": "markdown",
  "prefix": "hexo.kiko-io.moreinfo",
  "body": [
    "{% moreinfo '{ \"list\": [",
    "  [ ${1:\"publisher\"}, ${2:\"title\"},",
    "  ${3:\"url\"} ]$0",
    "]}' %}"
  ],
  "description": "Insert kiko.io's moreinfo"
}
```

To insert one more item to the list, use:

```json
"hexo.kiko-io.moreinfo.item": {
  "scope": "markdown",
  "prefix": "hexo.kiko-io.moreinfo.item",
  "body": [
    "[ ${1:\"publisher\"}, ${2:\"title\"},", 
    "${3:\"url\"} ]$0"
  ],
  "description": "Insert kiko.io's moreinfo item"
}
```

![-](assets/divider.png)

## Image Masonry

Shows multiple images in a masonry grid with the aid of the JS library [Macy.js](http://macyjs.com/).

**Files:**

- [tag-image-masonry.js](https://github.com/kristofzerbe/hexo-tag-plugins/blob/main/tag-image-masonry.js)
  
**Prequisites:**

As this tag plugin relies on an external JS library, the library file ``macy.js`` must be loaded in the header of the web page.

**Syntax:**  

```txt
{% image_masonry ..."assetImg|title" %}
```

**Parameters:**

| No | Parameter | optional/default | Description |
| --- | --- | --- | --- |
| 1 | ``..."assetImg\|title"`` | | List of pipe separated items with asset image file and title |

**Usage Example:**

```js
{% image_masonry
  "example-image-1.jpg|First Image"
  "example-image-2.jpg|Second Image"
  "example-image-3.jpg|Third Image"
  "example-image-4.jpg|Fourth Image"
  "example-image-5.jpg|Fifth Image"
  "example-image-6.jpg|Sixth Image"
  "example-image-7.jpg|Seventh Image"
  "example-image-8.jpg|Eighth Image"
%}
```

**Output:**

```html
<div id="#image-masonry-z8katm">
  <div><img src="example-image-1.jpg" alt="First Image"></div>
  <div><img src="example-image-2.jpg" alt="Second Image"></div>
  <div><img src="example-image-3.jpg" alt="Third Image"></div>
  <div><img src="example-image-4.jpg" alt="Fourth Image"></div>
  <div><img src="example-image-5.jpg" alt="Fifth Image"></div>
  <div><img src="example-image-6.jpg" alt="Sixth Image"></div>
  <div><img src="example-image-7.jpg" alt="Seventh Image"></div>
  <div><img src="example-image-8.jpg" alt="Eighth Image"></div>
</div>  
<script>
  let macy = new Macy({
    container: "#image-masonry-z8katm",
    trueOrder: false,
    waitForImages: false,
    useOwnImageLoader: false,
    debug: true,
    mobileFirst: true,
    columns: 2,
    margin: {
      y: 6,
      x: 6
    },
    breakAt: {
      1024: {
        margin: {
          x: 8,
          y: 8
        },
        columns: 4
      },
      768: 3
    }
  });
</script>
```

![Image Masonry Example](assets/tag-image-masonry-example.png)

See a live example at [https://kiko.io/post/Image-Masonry-Tag-Plugin-for-Hexo/](https://kiko.io/post/Image-Masonry-Tag-Plugin-for-Hexo/)

**VS Code Snippet:**

```json
"hexo.kiko-io.image_masonry": {
  "scope": "markdown",
  "prefix": "hexo.kiko-io.image_masonry",
  "body": [
    "{% image_masonry ${1:...\"assetImg|title\"} %}"
  ],
  "description": "Insert kiko.io's image_masonry"
}
```

![-](assets/divider.png)

## History

**2023-09-01**
- **Image Masonry** added

**2021-12-29**
- Description of parameters added
- **Github Readme** added
- **GitHub User & Repo Card** added

**2021-12-12** 
- Initial Commit

## License

**MIT** : http://opensource.org/licenses/MIT
