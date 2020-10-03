---
title: "zplug の自動インストールを高速化してみた"
date: 2018-03-01 12:00:00 +0900
tags:
  - zsh
  - zplug
toc: true
categories:
  - tech
---
いつも使ってる [zplug](https://github.com/zplug/zplug) が遅いと感じ始めたのでちょっと工夫してみました!

**`$ZPLUG_LOADFILE` を設定して、キャッシュを使用してることが前提条件です.**

## tl;dr

```diff:.zshrc
 source $ZPLUG_HOME/init.zsh

+if [[ $ZPLUG_LOADFILE -nt $ZPLUG_CACHE_DIR/interface || ! -f $ZPLUG_CACHE_DIR/interface ]]; then
 	zplug check || zplug install
+fi

 zplug load
```

条件を追加するだけです!

## 詳しく

`[[ $ZPLUG_LOADFILE -nt $ZPLUG_CACHE_DIR/interface ]]` は キャッシュ(`$ZPLUG_CACHE_DIR/interface`) と 設定ファイル(`$ZPLUG_LOADFILE`) の更新日時を比較します.

また, `[[ -f $ZPLUG_CACHE_DIR/interface ]]` はキャッシュが生成されてない場合は新しく zplug 自体をイントールなどを行ってる可能性があるので確認してます.

zplug はインストール済みで更新があったときのみ確認したいので `[[ $ZPLUG_LOADFILE -nt $ZPLUG_CACHE_DIR/interface ]]` を先に書いてます

補足: `$ZPLUG_CACHE_DIR` は zplug を読み込むと設定されるので設定しなくても使えます.

## ちなみに

{{< gyazo id="6fc8e3fdbd49d32c4c79d3c0867338dc" >}}

`zplug check` を計測してみましたが結構時間がかかってる処理だったので起動が早くなると思います!
