---
title: "ブログのビルドをCircleCIからGitHub Actionsに変更した"
date: 2019-12-03T12:38:16+09:00
tags:
  - GitHub Actions
  - CircleCI
toc: true
categories:
  - tech
---
GitHub Actions が使用できるようになったためいままで使用していた CircleCI から変更してみました。

## 設定

とりあえず設定を晒しておきます

```
name: Build and Deploy
on: [push, pull_request, repository_dispatch]
jobs:
  main:
    name: Build and deploy
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
        with:
          fetch-depth: 1
      - name: Download theme
        run: git clone -b master --single-branch --depth=1 https://github.com/ress997/hugo-ran.git themes/ran
      - name: Download hugo
        run: |
          VERSION=$(curl --silent "https://api.github.com/repos/gohugoio/hugo/releases/latest" | grep '"tag_name":' | sed -E 's/.*"v([^"]+)".*/\1/')
          wget "https://github.com/gohugoio/hugo/releases/download/v${VERSION}/hugo_extended_${VERSION}_Linux-64bit.tar.gz" -O hugo.tar.gz
          tar xzf hugo.tar.gz hugo
          rm -rf hugo.tar.gz
      - name: Build
        run: ./hugo --minify
      - name: Cache node_modules
        uses: actions/cache@preview
        if: github.event_name == 'repository_dispatch' || (github.ref == 'refs/heads/master' && github.event_name != 'pull_request')
        with:
          path: ~/.cache/yarn
          key: ${{ runner.os }}-projectname-${{ github.sha }}
          restore-keys: ${{ runner.os }}-projectname-
      - name: Install firebase-tools
        if: github.event_name == 'repository_dispatch' || (github.ref == 'refs/heads/master' && github.event_name != 'pull_request')
        run: yarn add firebase-tools
      - name: Push file to Firebase Hosting
        if: github.event_name == 'repository_dispatch' || (github.ref == 'refs/heads/master' && github.event_name != 'pull_request')
        env:
          FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
        run: yarn run deploy
```

私の環境ではデプロイ先として Firebase Hosting を使用しているのでそれぞれ自分が使用しているデプロイ先へ変更してください

## 詳細

それぞれの設定項目日ついて説明していこうと思います

### `on`

CI を使用するものを制限しますが `push` と `pull_request` を指定しています。 

`repository_dispatch` では api を使用してCIを動かすことができるので追加しています。

### バージョン指定

`VERSION` の部分で GitHub API を使用して Hugo の最新バージョンを取得しています。

### cache

firebase を使用している関係で npm を取得するのを高速化するために Actions のキャッシュ機能を使用しています。

### `if`

`github.event_name` で使用するものを制限します。

`github.ref` では使用するブランチを制限しています。

今回 `if` で制限している内容としては `repository_dispatch` のときと `master` ブランチが更新されたときに動作するようにしています。

### `secrets`

設定画面に入力したものを使用する場合呼び出す必要があります。

CircleCI では環境変数を使用していたため、環境変数として展開しています。

## `repository_dispatch`

上記にも述べた通りこれを設定しておくことで GitHub API を使って webhook として使用できます。

```
curl -XPOST -u "ress997:${TOKEN}" -H "Accept: application/vnd.github.everest-preview+json" -H "Content-Type: application/json" https://api.github.com/repos/ress997/blog/dispatches --data '{"event_type": "html.preview"}'
```

上記のようなすることによってイベントを発火することができます。

## まとめ

CircleCI から GitHub Actions に変更してみましたが思っていたよりかんたんにできました。

ただこれを書いていて `if` がどんどん長くなっていくことが大変でまとめて設定できるようになったらもっと便利になると思います。

