---
title: 'holy grail layout 만들기'
date: 2020-6-11 16:21:13
category: 'coding'
subcategory: 'css'
draft: false
---

## flex로 만들기

- 현재 각 안의 글씨를 가운데로 보내는것은 align-items 등으로 시도해봤으나 계속 실패한 상태.
  <br><br>

`html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="1.css" />
    <title>Document</title>
  </head>
  <body>
    <div class="container">
      <div class="header">header</div>
      <article>
        <div class="navbar">navbar</div>
        <div class="content">content</div>
        <div class="ad">ad</div>
      </article>
      <div class="footer">footer</div>
    </div>
  </body>
</html>
```

`css`

```css
body,
html {
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}

/* div 사이사이의 엔터같은 것에 영향을 받진 않았고, 100vh 로 해도
 scrollbar가 생겨서 검색해보니 기본적으로 body, html이 갖고 있는
  padding, margin이 있어서 위처럼 그걸 없애줘야 했다.  */

.container {
  display: flex;
  /* justify-content: center; */
  justify-items: center;
  /* align-items: center; */
  flex-direction: column;
  border: 1px solid gray;
  height: 100vh;
}

.header {
  border: 1px solid gray;
  flex: 1;
}

article {
  display: flex;
  flex: 10;
}

.navbar {
  border: 1px solid gray;
  flex: 1;
}
.content {
  border: 1px solid gray;
  flex: 3;
}
.ad {
  border: 1px solid gray;
  flex: 1;
}
.footer {
  flex: 1;
}

@media screen and (min-width: 700px) {
  .header {
    background-color: aquamarine;
  }
}
```

## grid로 만들기

```css
body,
html {
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}

.container {
  border: 1px solid gray;
  height: 100vh;
  display: grid;
  grid-template-rows: 1fr 5fr 1fr;
}

.header {
  border: 1px solid gray;
}

article {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
}

.navbar {
  border: 1px solid gray;
}
.content {
  border: 1px solid gray;
}
.ad {
  border: 1px solid gray;
}

.footer {
  border: 1px solid gray;
}
```
