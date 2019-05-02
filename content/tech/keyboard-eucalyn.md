---
title: "キーボード配列を Eucalyn 配列に変更してみた"
date: 2018-05-17 13:40:00 +0900
tags: ["eucalyn", "keyboard", "Karabiner", "macOS"]
toc: true
---
最近キーボードを新しく買いたいなぁと思い始めていろいろと下調べをしていくうちに [自作キーボード Advent Calendar](https://adventar.org/calendars/2114) という存在を知りました。

[ぼくのかんがえるさいきょうのインターフェイス - ゆかりメモ](http://eucalyn.hatenadiary.jp/entry/saikyo-interface)

上記の記事を読み Eucalyn配列(仮) をmacOSで試してみようと思いました。

**追記**: 新たに [Eucalyn配列について](https://eucalyn.hatenadiary.jp/entry/about-eucalyn-layout) という記事が投稿されました!!

配列を一部変更されているので気をつけてください。

## Eucalyn 配列 (仮)
この配列のいいところは左右交互に打てますが普段Vimを使ってる私からすると右手のホームポジションが少しずれてしまいます…
ですが慣れてくると結構入力していても疲れなくなってきました!

なれるまでゆかりメモにアップされていた写真をトリミングして表示してました。

### 設定方法
macOS 10.13.4 で [Karabiner-Elements](https://pqrs.org/osx/karabiner/) を使いました。

下記のコードを `~/.config/karabiner/assets/complex_modifications/eucalyn.json` などに保存するといいと思います！

{{< gist 39e "8bf122fb4b8bf2f03bbabaa054db05e8 eucalyn-kari.json" >}}

注意点としては Karabiner-Elements はログイン後に起動するのでログインパスワード入力時は元の配置となります。
(画面ロックは起動後なのでEucalyn配列となります。)
