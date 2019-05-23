---
title: "Defx.nvim を使う!"
date: 2019-05-23T21:26:25+09:00
tags: ["vim", "neovim", "defx.nvim"]
toc: true
---
今まで vim でファイラーを使うとなったときに [NERDtree][1] しか使ってませんでしたが [@Shougo][2] さんがまた使いやすファイラーを作ったいたので紹介したいと思います。

<!--more-->

vim ではなく [neovim][3] を使っています。またプラグイン管理には [dein.vim][4] を使用してます。各自自分が使用してる環境に読み替えて使用してください。

## 設定
私は toml ファイルで管理しています。下記のように書くことでプラグインを追加できます

```
[[plugins]]
repo ='Shougo/defx.nvim'
on_cmd = 'Defx'
hook_add = '''
	nnoremap <silent> <Space>f :<C-u>Defx -listed -resume -buffer-name=tab`tabpagenr()`<CR>
'''
```

私は `<Space>f` で開けるようにしてるので人によっては書き換えてください。

### カスタマイズ
vscode みたいにファイルアイコンを表示したり [NERDtree][1] でもやってましたが Git の変更などを表示したかったためプラグインを追加して使ってます。

ファイルアイコン表示するために [defx-icons][5]

Git の変更を表示するために [defx-git][6]

を使ってます。標準でアイコンを表示したいので下記のように設定します。
(また隠しファイルも標準で表示してほしいのでその設定も追記してます)

```
call defx#custom#option('_', {
		\ 'columns': 'indent:git:icons:filename',
		\ 'show_ignored_files': 1,
		\ })
```

カスタマイズを更に行いうとこんな感じにできます！

{{< gyazo id="8eb09ad73d009343f1667f1cc5ebfcb6" >}}

### 設定例
私の設定は [GitHub にアップ][7] してるので最新はそちらを確認してください

```toml

[[plugins]]
repo ='kristijanhusak/defx-icons'

[[plugins]]
repo ='kristijanhusak/defx-git'
hook_add = '''
	let g:defx_git#indicators = {
		\ 'Modified'  : '+',
		\ 'Staged'    : '●',
		\ 'Untracked' : '?',
		\ 'Renamed'   : '➜',
		\ 'Unmerged'  : '═',
		\ 'Deleted'   : 'x',
		\ 'Unknown'   : '?'
		\ }
'''

[[plugins]]
repo ='Shougo/defx.nvim'
on_cmd = 'Defx'
depends = ['defx-icons', 'defx-git']
hook_add = '''
	nnoremap <silent> <Space>f :<C-u>Defx -listed -resume -buffer-name=tab`tabpagenr()`<CR>
'''
hook_source = '''
	function! Root(path) abort
		return fnamemodify(a:path, ':t')
	endfunction

	call defx#custom#source('file', {
			\ 'root': 'Root',
			\})

	call defx#custom#column('filename', {
			\ 'directory_icon': '',
			\ 'opened_icon': '',
			\ })

	call defx#custom#column('mark', {
			\ 'readonly_icon': '✗',
			\ 'selected_icon': '✓',
			\ })

	call defx#custom#option('_', {
			\ 'columns': 'indent:git:icons:filename',
			\ 'show_ignored_files': 1,
			\ })
'''
[plugins.ftplugin]
defx = '''
	nnoremap <silent><buffer><expr> ~ defx#async_action('cd')
	nnoremap <silent><buffer><expr> h defx#async_action('cd', ['..'])
	nnoremap <silent><buffer><expr> j line('.') == line('$') ? 'gg' : 'j'
	nnoremap <silent><buffer><expr> k line('.') == 1 ? 'G' : 'k'
	nnoremap <silent><buffer><expr> l defx#async_action('open')

	nnoremap <silent><buffer><expr> . defx#do_action('toggle_ignored_files')
	nnoremap <silent><buffer><expr> <Tab> winnr('$') != 1 ? ':<C-u>wincmd w<CR>' : ':<C-u>Defx -buffer-name=temp -split=vertical<CR>'
	nnoremap <silent><buffer><expr> <Space> defx#do_action('toggle_select') . 'j'
	nnoremap <silent><buffer><expr> <CR> defx#do_action('open')
	nnoremap <silent><buffer><expr> q defx#do_action('quit')

	nnoremap <silent><buffer><expr> o defx#async_action('open_or_close_tree')
	nnoremap <silent><buffer><expr> O defx#async_action('open_tree_recursive')

	nnoremap <silent><buffer><expr> ! defx#do_action('execute_command')
	nnoremap <silent><buffer><expr> * defx#do_action('toggle_select_all')
	nnoremap <silent><buffer><expr> <C-g> defx#do_action('print')
	nnoremap <silent><buffer><expr> <C-l> defx#do_action('redraw')
	nnoremap <silent><buffer><expr> E defx#do_action('open', 'vsplit')
	nnoremap <silent><buffer><expr> K defx#do_action('new_directory')
	nnoremap <silent><buffer><expr> M defx#do_action('new_multiple_files')
	nnoremap <silent><buffer><expr> N defx#do_action('new_file')
	nnoremap <silent><buffer><expr> P defx#do_action('open', 'pedit')
	nnoremap <silent><buffer><expr> S defx#do_action('toggle_sort', 'Time')
	nnoremap <silent><buffer><expr> c defx#do_action('copy')
	nnoremap <silent><buffer><expr> d defx#do_action('remove_trash')
	nnoremap <silent><buffer><expr> m defx#do_action('move')
	nnoremap <silent><buffer><expr> p defx#do_action('paste')
	nnoremap <silent><buffer><expr> r defx#do_action('rename')
	nnoremap <silent><buffer><expr> se defx#do_action('save_session')
	nnoremap <silent><buffer><expr> sl defx#do_action('load_session')
	nnoremap <silent><buffer><expr> x defx#do_action('execute_system')
	nnoremap <silent><buffer><expr> yy defx#do_action('yank_path')
'''
```

`dein.vim` の機能ですが `autocmd FileType defx call s:defx_my_settings()` みたいな記述は `[plugins.ftplugin]` を使うとわかりやすく書けるのでぜひ使ってください。

## あとがき
`defx.nvim` についてしらべると [@takkii][8] さんの記事しかありませんでした。

そこでカスタマイズ性の高い `defx.nvim` を使ってほしいです！

[1]:https://github.com/scrooloose/nerdtree
[2]:https://github.com/Shougo
[3]:https://neovim.io/
[4]:https://github.com/Shougo/dein.vim
[5]:https://github.com/kristijanhusak/defx-icons
[6]:https://github.com/kristijanhusak/defx-git
[7]:https://github.com/ress997/dotfiles-neovim
[8]:https://takkii.hatenablog.com/about
