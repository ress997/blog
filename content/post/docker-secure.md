---
title: "Docker をセキュアに使うために"
date: 2019-08-06T11:07:12+09:00
author: ["Ress"]
image: "https://res.cloudinary.com/dagsofv2s/image/upload/q_auto:good/blog/post/docker-secure/thumbnail.png"
tags:
  - Docker
  - Securely
categories: ["tech"]
---
開発に Docker を使う機械が増えてきましたが使っててきになるのがセキュリティです。

そこで Docker をセキュアに使うためにも自分ようのメモも兼ねて書いておきます。

<!--more-->

まず root 権限で docker グループにパスワードを設定します。

```sh
sudo gpasswd docker
```

一時的に `docker` を使いたいユーザーを Docker グループに参加します

```sh
newgrp docker
```

これで `sudo` を使わず Docker を使えます!
