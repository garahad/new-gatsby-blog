---
title: 'css grid에 대해'
date: 2020-6-11 16:21:13
category: 'coding'
subcategory: 'css'
draft: false
---

다음은 1분 코딩 강의를 듣고 정리한 내용이다.

[1분 코딩 flex, grid 강의](https://www.youtube.com/watch?v=eprXmC_j9A4)

```css
.container {
  display: grid;
  grid-template-columns: 4fr 6fr;
  /* 40% 60%보다 위의 것을 많이 씀. 왜냐하면 gap을 만들게 되면 100%를 넘어가서
   스크롤이 생기기 때문에.  */
  /* grid-template-columns: repeat(3, 1fr); 이렇게 쓸수도...
  이렇게 쓰면 1fr씩 3번 반복. 그냥 1fr 1fr 1fr 이렇게도 쓸 수 있음 */
  /* 한쪽은 고정하고, 한쪽만 늘어나게 하려면...
    grid-template-columns: 200px 1fr; */
  grid-gap: 1rem;
  /* grid-auto-rows: 300px; 이걸 안 쓰면 같은 행에서는 높이 맞춰도 다른 행에서
   컨텐트 높이 다르면 높이 다른데 이걸로 통일해주면 모든것의 높이가 똑같이 맞춰짐.  */
  grid-auto-rows: minmax(200px, auto);
  /* 그냥 200px만 쓰면 컨텐츠 높이가 200px 넘을때 컨텐츠 삐져나옴. 
  이걸 방지하려면 이런식으로 쓸 수 있음. */
  /* justify-items: center; 가로축에 대해서 어느쪽에 content 붙여놓을 것이냐  */
  /* align-items: start; */
}

.item {
}

.item:nth-child(1) {
  grid-column: 1/4;
  /* 가령 3x3안하고 1번이 윗줄 다 먹고 싶게 하고 싶다면 위처럼 1부터 4까지 차지하게
  해주세요 라고 씀. 4분의 1 아님. 3x3이면 그 사이사이 부분들을 다 일러서 1,2,3,4가 됨.*/
}

.item:nth-child(4) {
  grid-row: 2/4;
  /* 이렇게 하면 세로로 붙게 해준다. 이렇게 하면 왠일인지 칼럼 위치가 지 맘대로 이동되는데*/
  grid-column: 3;
  /* 으로 써서 시작점 맞춰주면 위치 이동하게 됨.*/
}

.item:nth-child(5) {
  /* justify-self: start;
  align-self: center; */
  /* 이렇게 하면 각각 정렬 */
}

.item:nth-child(9) {
  grid-row: 3/5;
  grid-column: 3;
  /* 이렇게 하면 영역 겹치게 할 수 있음.*/
}
```
