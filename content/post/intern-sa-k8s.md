---
title: "サイバーエージェントのインターンに行ってきました"
date: 2019-09-25T13:23:37+0900
tags: ["internship"]
---
アメブロなどで有名なサイバーエージェントの [Intel NUCで始めるおうちKubernetesクラスタで自宅サーバ入門](https://www.cyberagent.co.jp/careers/students/event/detail/id=23257) に参加してきました。
<!--more-->

もともと [Raspberry Pi のおうち Kubernetes](https://developers.cyberagent.co.jp/blog/archives/14721/) は知っていたため今回も Raspberry Pi を使用するのかな？と思ってたら Intel NUC を使用しとても楽しかったです。

**追記**: ブログの再構築時にデータが消えてしまっていたので書き直しました

## きっかけ
もともとサイバーエージェントのインターンに行こうと思い違うインターンに応募してましたがそれが落選してしまいましたがこのインターンに案内されました。

Kubernetes はもともと興味があり色々と勉強しているところだったためちょうどよかったと思います。

## やったこと
おうち Kubernetes ということだったため [Keycloak](https://www.keycloak.org/) を使用したグループウェアを構築しました。

普段使っている [Gitea](https://github.com/go-gitea/gitea), [GROWI](https://github.com/weseek/growi), [minio](https://github.com/minio/minio) などをグループウェアとして使用するときにそれぞれ認証するのが大変なため統一して使いやすいようにしようとしました。

https://github.com/ress997/nuc-k8s に2日間でやったことのファイルをおいています。

## 感想
他の人がいろいろとやっていたことに気になる技術があったため後日調べ便上になりました。

インターン期間中に Keycloak を使用し色々と使用していくとメモリが足りなくなりインターン1日目終了後に急いで秋葉原に行きメモリを買いに行くなどやり目立ちましたがそれでも2日間で多くのことを学べたと思います。

**追記**: 気になった技術を追加しました。

## 気になった技術
- kubevirt
- argocd
- Calico
- Kubernetes Cluster Federation

## 事前に勉強した資料
- [Kubernetes完全ガイド](https://www.amazon.co.jp/dp/B07HFS7TDT)
- [Learn Kubernetes using Interactive Browser-Based Scenarios](https://www.katacoda.com/courses/kubernetes)
- [KubernetesのDiscovery＆LBリソース（その1）](https://thinkit.co.jp/article/13738)
- [KubernetesのWorkloadsリソース（その2）](https://thinkit.co.jp/article/13611)
