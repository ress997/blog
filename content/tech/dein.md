---
title: "NeoVim と dein.vim を使ってみる!"
date: 2016-03-06 12:00:00 +0900
tags:
  - neovim
  - dein.vim
toc: true
---
最近 neobundle から dein.vim へとプラグインマネージャーを変更してる人が増え始めたので便乗して私も変更してみたいと思います.
ついでに Vim も NeoVim へシフトしてみたいと思います.

## NeoVim

[こちら](https://qiita.com/lighttiger2505/items/440c32e40082dc310c1e) の記事に日本語で詳しくまとめてあるので参考にしてください
~~(まだまだ使いこなせてませんorz)~~

### 事前準備

NeoVim を使用する場合 `.bash_profile` や `.zshenv` に次の一文を入れないと動かない場合があります.

```zsh
export XDG_CONFIG_HOME="$HOME/.config"
```

### インストール

macOS では Homebrew を使用するとても簡単です!

```zsh
$ brew install neovim
```

[他の環境の方は neovim の wiki に書いてあります](https://github.com/neovim/neovim/wiki/Installing-Neovim)

### 設定

NeoVim の設定ファイルである `$XDG_CONFIG_HOME/nvim/init.vim` に書きます.
標準では `$XDG_CONFIG_HOME` は `$HOME/.config` となってます.

```vim:~/.config/nvim/init.vim
" reset augroup
augroup MyAutoCmd
	autocmd!
augroup END

" ENV
let $CACHE = empty($XDG_CACHE_HOME) ? expand('$HOME/.cache') : $XDG_CACHE_HOME
let $CONFIG = empty($XDG_CONFIG_HOME) ? expand('$HOME/.config') : $XDG_CONFIG_HOME
let $DATA = empty($XDG_DATA_HOME) ? expand('$HOME/.local/share') : $XDG_DATA_HOME

" Load rc file
function! s:load(file) abort
	let s:path = expand('$CONFIG/nvim/rc/' . a:file . '.vim')

	if filereadable(s:path)
		execute 'source' fnameescape(s:path)
	endif
endfunction

call s:load('plugins')
```

## dein.vim

NeoBundle はオワコンだから dein 使おうと作者の Shougo 氏自身が reddit で発言したそうです.[^1]
使ってみた感想としては速度も早くTOMLファイルで管理ができてとても使いやすかったです！

### 事前準備

python3 を使用してるプラグインを動かすため Homebrew を使用して事前にインストールします.

```zsh
$ brew install python3
$ pip3 install -U neovim
```

### 設定

プラグインに関する設定は `~/.config/nvim/rc/plugins.vim` に分割してるので自分の環境に合わせて見てください.

```vim:~/.config/nvim/rc/plugins.vim
let s:dein_dir = expand('$DATA/dein')

if &runtimepath !~# '/dein.vim'
	let s:dein_repo_dir = s:dein_dir . '/repos/github.com/Shougo/dein.vim'

	" Auto Download
	if !isdirectory(s:dein_repo_dir)
		execute '!git clone https://github.com/Shougo/dein.vim ' . s:dein_repo_dir
	endif

	execute 'set runtimepath^=' . s:dein_repo_dir
endif

let g:dein#install_max_processes = 16
let g:dein#install_message_type = 'none'

if !dein#load_state(s:dein_dir)
	finish
endif

call dein#begin(s:dein_dir, expand('<sfile>'))

let s:toml_dir = expand('$CONFIG/nvim/dein')

call dein#load_toml(s:toml_dir . '/plugins.toml', {'lazy': 0})
call dein#load_toml(s:toml_dir . '/lazy.toml', {'lazy': 1})
if has('python3')
	call dein#load_toml(s:toml_dir . '/python.toml', {'lazy': 1})
endif

call dein#end()
call dein#save_state()

if has('vim_starting') && dein#check_install()
	call dein#install()
endif
" }}}
```

`dein#begin` 部分は `rc` ディレクトリも含めるためこのように書いてます

`dein#load_state` の箇所で `finish` してる部分は そのまま `init.vim` or `vimrc` に書くと動作がおかしくなる可能性があるため適切に `if` などを使用してください

#### プラグイン

インストールするプラグインをTOML形式で書きます

```toml:~/.config/nvim/dein/plugins.toml
[[plugins]]
repo = 'Shougo/dein.vim'

repo = 'itchyny/lightline.vim'
hook_add = '''
	let g:lightline = {'colorscheme': 'wombat'}
'''

# Toml
[[plugins]]
repo  = 'cespare/vim-toml'

# Golang
[[plugins]]
repo = 'fatih/vim-go'
```

基本はこんな感じで遅延読み込みする方は次のように書きます

```toml:~/.config/nvim/dein/lazy.toml
# dein.vim command
[[plugins]]
repo = 'haya14busa/dein-command.vim'
on_cmd = 'Dein'
```

python 関係の設定

```toml:~/.config/nvim/dein/python.toml
# 補完
[[plugins]]
repo = 'Shougo/deoplete.nvim'
depends = 'context_filetype.vim'
on_i = 1
hook_source = '''
	let g:deoplete#enable_at_startup = 1
	let g:deoplete#enable_ignore_case = 1
	let g:deoplete#enable_smart_case = 1

	" <TAB>: completion.
	imap <silent><expr> <TAB> pumvisible() ? "\<C-n>" : <SID>check_back_space() ? "\<TAB>" : deoplete#mappings#manual_complete()
	function! s:check_back_space() abort
		let col = col('.') - 1
		return !col || getline('.')[col - 1]  =~ '\s'
	endfunction

	" <S-TAB>: completion back.
	inoremap <expr><S-TAB>  pumvisible() ? "\<C-p>" : "\<C-h>"
'''
```

Tomlファイルの位置や内容は自分の環境に合わせて使ってください！

### ちなみに

dein.vim は neobundle みたいに各コマンドが用意してありませんが [haya14busa/dein-command.vim](https://github.com/haya14busa/dein-command.vim) を使うとコマンドを実行できるようになります!

## 最後に

いろいろ書かせてもらいましたがまだまだ vim も neovim も使い始めたばかりなので間違ってたところなどありましたらコメント等で教えて下さい

### 参考人させていただいた記事

- [dein.vimを使ってみる](http://qiita.com/yoza/items/2f8bd33a18225754f346)
- [NeoVim、そしてdein.vimへ](http://qiita.com/okamos/items/2259d5c770d51b88d75b)
- [NeoBundle から dein.vim に乗り換えたら爆速だった話](http://qiita.com/delphinus35/items/00ff2c0ba972c6e41542)
- [[dein.vim] hook の便利な使い方](http://qiita.com/delphinus35/items/cd221a450fd23506e81a)
- [dein.vimによるプラグイン管理のマイベストプラクティス](http://qiita.com/kawaz/items/ee725f6214f91337b42b)

[^1]: [冒頭部分](http://qiita.com/delphinus35/items/00ff2c0ba972c6e41542)
