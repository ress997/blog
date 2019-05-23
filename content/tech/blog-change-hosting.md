---
title: "ブログを Netlify から Firebase に変えた"
date: 2018-09-10 15:00:00 +0900
tags: ["Hugo", "Netlify", "forestry"]
toc: true
---
[ブログのリニューアルした]({{< ref "/tech/blog-renewal.md" >}}) ことを書きましたが今回 Netlify から Firebase Hosting にお引越ししました

## TL;DR
- Netlify がたまに落ちている
- CDN を使用してるらいしけど遅い
- もっと柔軟に設定したい

## Netlify
Netlify は簡単にデプロイでき、小規模なページなどであれば問題がありません。

しかし、配信の最適化するために HTTP ヘッダなどをいじるとき少々手間がかかり大変でした。

そして、接続障害が発生したり、SSL エラーが発生したのでちょっとインフラに不安を感じ始めました。

## Firebase
そこで、Firebase Hosting を使い始めました。

Firebase は Fastly を採用してるので世界各地にある CDN から配信されレスポンスが高速になりました。

また、 Firebase を導入するにあたって CI も導入できました。いままで netlify とまた別の CI を採用してたので CI の一本化ができ、わかりやすくなりました。
