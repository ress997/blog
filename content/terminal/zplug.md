---
title: "zplug のマイベストプラクティス"
date: 2018-03-20 12:00:00 +0900
tags:
  - zsh
  - zplug
toc: true
aliases:
  - /tech/zplug/
---
普段ターミナルで使っている zsh をもっと便利したいので私は高速な [zplugin](https://github.com/zdharma/zplugin) などがありますが [zplug](https://github.com/zplug/zplug) を使ってます。

**注意:** 私の使い方は zplug 開発側の想定外の使用方法です。あくまでも自己責任で使ってください!

## tl;dr

```zsh
export ZPLUG_REPOS="$HOME/.zplug/src"
export ZPLUG_HOME="$ZPLUG_REPOS/zplug/zplug"
export ZPLUG_BIN="$HOME/.zplug/bin"
export PATH=$ZPLUG_BIN:$PATH
export ZPLUG_CACHE_DIR="$HOME/.zplug/cache"
export ZPLUG_LOADFILE="~/.config/zsh/packages.zsh"

source $ZPLUG_HOME/init.zsh

if [[ $ZPLUG_LOADFILE -nt $ZPLUG_CACHE_DIR/interface || ! -f $ZPLUG_CACHE_DIR/interface ]]; then
	zplug check || zplug install
fi

if __zplug::core::cache::diff; then
	__zplug::core::load::from_cache
else
	zplug load
fi
```

以前記事にした [自動ダウンロードの高速化](https://qiita.com/Ress/items/775f755df655ca4511ee) やキャッシュの読み込みを速く行われるように [内部で使われている関数](https://github.com/zplug/zplug/blob/20ca2c82063f15a2c107069b9af5cd32256e6019/autoload/commands/__load__#L38-L42) を使用してます。

## プラグインをどんどん設定していこう!

`$ZPLUG_LOADFILE` で指定したファイルにどんどんプラグインを追加していくだけです!

```zsh:設定例
zplug "zplug/zplug"

zplug "zsh-users/zsh-completions"

zplug "zdharma/fast-syntax-highlighting"
```

## どうして開発側の想定外の使い方をしてるのか

読み飛ばしていただいてもOKです

zplug 開発側が想定してる使用方法の場合 zplug の自動更新を設定するために `zplug --self-manage` コマンドを実行すると思います。

ですがこの方法では `$ZPLUG_ROOT` と `$ZPLUG_HOME` という 2種類の zplug を `zplug --self-manage` コマンドでシンボリックリンクを作成するというものでした。

この構造ではわかりにくいと感じ issue を立てたり P-R を作成し次のようなディレクトリ構造が成り立つようにしました

```sh
~/.zplug
├── bin             $ZPLUG_BIN
├── cache           $ZPLUG_CACHE_DIR
└── src             $ZPLUG_REPOS
    └── zplug
        └── zplug   $ZPLUG_HOME
```

これにより zplug をインストールした際に管理がしやすくなりました!

## まとめ

あくまでも私が管理がやりやすいようにやってますので公式が行ってるようにやってもらったほうがいいと思います。

**宣伝**: [ress997/zplug](https://github.com/ress997/zplug) では高速化を行ったりPATHが追加されない問題を修正など自分なりに解決してるので是非試してみてください
