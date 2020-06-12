---
title: '1분 코딩 레이아웃 강의'
date: 2020-6-11 16:21:13
category: '코딩'
draft: false
---

다음은 1분 코딩의 레이아웃 강의를 보고 요약한 글이다  
[1분코딩 레이아웃 강의](https://www.youtube.com/watch?v=Zny5Vxqk6Mk)

## <inline-block으로 2단 칼럼 만들기>

- 반응형으로 만들어야 하기 때문에 width 같은건 % 많이 씀.
  <br /><br />

- font-size: rem, padding은 em. --> 정답은 없음. font-size말고, padding, margin 같은 경우는 보통 font-size를 기준으로 보기 좋게 잡기 때문에...padding 등을 rem으로 하면 font-size 바꿔도 안 바뀜. em으로 하면 font-size를 기준으로 여백도 바뀌어서 여백도 같이 커짐.
  <br /><br />

- html font -size 따로 안 건들면 대부분의 브라우저가 font-size 16 px로 세팅돼 있어서 1rem 하면 16 px.
  rem = root em
  <br/><br/>

- block 은 box라서 height, width 등 크기 설정이 먹는데 inline은 박스가 아니라서 width, height 등 안 먹음.<br/><br/>

- div, section, article, footer, nav 이런 애들이 block element.
  레이아웃도 블록으로 짠다고 생각하면 됨.<br/><br/>

- span을 display: inline-block으로 하면 크기 조정이 가능해짐.<br/><br/>

- box-sizing: content-box가 가장 기본인데 padding안 쪽의 content 크기만 하는 것.
  border-box로 하면 border까지만 크기에 포함시키고, margin은 포함 안 시키는 것. 요즘 많이 쓰는데 IE8 이상부터 지원함.<br/><br/>

- 디자이너가 만들어준대로 만드려면 h1속성의 기본 굵기, 크기 등도 불필요하다.
  따라서 이런건 css reset 코드를 인터넷에서 찾아서 코드 제일 위에 붙여넣으면 됨.
  이전엔 아래처럼 써서 리셋 시키기도 했는데 \*를 쓰면 브라우저가 다 체크하느라고 성능에 악영향을 미친다는 말도 있어서 최근엔 안 쓰는 추세.

```css
* {
  margin: 0;
  padding: 0;
}
```

- padding: 5% 절대값 말고, 이렇게 쓸 수도 있음.<br/><br/>

- display block일때는 굳이 width: 100%를 써줄 필요가 없음. 오히려 padding: 5%라고 썼는데 여기에 width: 100%라고 써주면 box-sizing에 의해 110%가돼서 오히려 스크롤 생기게 됨.<br/><br/>

- display: inline 이런식으로 쓰면 크기 조정 안되고, display: inline-block 이렇게 해야 2가지 속성 동시에 가짐.<br/><br/>

- 높이를 맞추려면 vertical-align: top<br/><br/>

- 엔터도 공백문자로 인식함. 합해서 width: 100%로 만들어줘도 사이에 공백문자 enter 1개 들어가 있으면 나란히 한 줄에 안 뜨게 됨.
  근데 엔터를 없애버리면 보기가 안 좋기 때문에 위에 상위 div의 font-size: 0으로 하면 나란히 잘 올라오게 됨.
  단, css는 부모값에 적용한 값이 아래 애들에게도 상속되기 때문에 아래에 다시 font-size 적어줘야 하겠지.<br/><br/>

- max-width: 1000 px;<br/><br/>

- 가운데 정렬을 하려면
  margin-left: auto;
  margin-right: auto;
  = margin: 0 auto; (상하는 0, 좌우는 auto)
  하면 margin을 자동으로 나눠서 가짐.

---

## <float으로 2단 칼럼 만들기>

- float 이라고 하면 div로 막아도 아래쪽 가서 붙네. clear: both를 해줘야 함.<br/><br/>

- div로 감싸고 있어도 하위 자식들이 float가 적용돼 있으면 안 품고 있는 것처럼 작동을 한다.

```html
<div class="container">
  <div class="item"></div>
</div>
```

일때 item이 float이 돼 있으면 container를 개발자도구에서 찍어보면 height가 0이네. 안 품고 있는 것처럼 됨.

이럴때

```html
<div class="container">
  <div class="item">
    <div style="clear: both"></div>
  </div>
</div>
```

이런식으로쓰면 뒤쪽부터는 float이 해제 됨.  
근데 위처럼 하는건 옛날 방법이고

```css
.container: after {
  content: '';
  display: block;
  clear: both
  height: 0; --> 이건 안 써도 됨.
  visibility: hidden; --> 이건 안 써도 됨.
}
```

이렇게 해서 가상 엘리먼트를 만들어 줄수도.
이거 말고도 overflow: hidden이나 다른 방법들도 있음.

```css
@media screen and (min-width: 700px) {
}
```

- 대충 아이패드 크기가 700px<br/><br/>

- meta name viewport 추가해주기--> 이거 안 넣으면 폰으로 봤을때 폰으로 보는 것처럼 안 보이고, 컴으로 보는 것처럼 보임.<br/><br/>
