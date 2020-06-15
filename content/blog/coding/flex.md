---
title: 'css flex에 대해'
date: 2020-6-11 16:21:13
category: 'coding'
draft: false
---

다음은 1분 코딩 강의를 듣고 정리한 내용이다.

[1분 코딩 flex, grid 강의](https://www.youtube.com/watch?v=eprXmC_j9A4)

```css
.container {
  display: flex;
  flex-direction: row-reverse; /*row가 기본값*/
  flex-wrap: nowrap; /* nowrap이 기본값. 이렇게 하면 inline-block 같은 애들이랑
   다르게 창크기 width 줄여도 아래로 안 떨어짐. 그냥 화면에서 짤림. wrap으로 하면 떨어짐. */
  justify-content: flex-start;
  /* 이게 가장 기본. justify는 현재 축 방향에서 어느 방향으로 정렬할것이냐 하는 것. space-between, space-around 이런것도 있음.  */
  align-items: stretch;
  /* 기본값. 이건 축에 수직인 방향 item 형태 어떻게 할것이냐  */
  align-content: stretch;
  /* justify-content의 align 방향 버젼; flex-wrap이 wrap인 상황에서만 테스트 가능. 2줄 이상으로 늘어날때 */
}

.item {
  flex-basis: 0;
  /* 제일 처음 얘 안 써주면 실제 크기가 아니라 남은 여백만 1:2:1로 나눠갖게 됨.  */
  /* flex-grow는 남은 여백을 1:2:1 로 나눠 갖는 것. 본문 크기들 제외하고... 진짜로 아예
비율이 1:2:1이려면 부모에다가 flex-basis를 줘야 함. flex-basis는 default가 auto.
auto일땐 남은 공간을 1:2:1로 나눠갖고, 0으로하면 전체 차지하는 비가 1:2:1이 됨. 
0 으로하면 기본적으로 점유하는 공간을 0으로 만들어준거고, 결국 전체 다 나머지 넓이가 돼서
그걸 1:2:1로 나눠갖게 됨. 따라서 flex-basis: 0으로 하는 경우가 더 많다.  */
}
.item:nth-child(1) {
  flex-grow: 1;
  flex-shrink: 1;
  align-self: flex-start;
  /* 위 2개를 합해서 축약형으로 쓸거면 flex: 1 이렇게만 쓰는데 이렇게 쓰면 grow, shrink
   나눠 쓸 때와 다르게 굳이 위에 flex-basis: 0 안써도 알아서 기본값으로 0이 세팅됨.  */
  order: 2;
}
.item:nth-child(2) {
  flex-grow: 2;
  flex-shrink: 2;
  align-self: center;
  order: 3;
}
.item:nth-child(3) {
  flex-grow: 1;
  flex-shrink: 1;
  align-self: flex-end;
  order: 1;
  /* align-items 가 한번에 정렬기준 부모에서 정해주는거면 각각 항목들이 수직에서 어디
   위치에 있을지 정하는게 align-self */
}

/* align-items: center; 
justify-content: center; 하면 가운데에 오게 되네  */
```
