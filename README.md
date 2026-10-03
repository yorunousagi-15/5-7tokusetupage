# midorino5-7 class homepage

静的なHTML / CSS / JavaScriptで動く学級ホームページです。

## PDFニュースを追加する

1. PDFファイルをこのフォルダに追加します。
2. `news-data.js` を開きます。
3. 例をコピーして、日付・カテゴリ・タイトル・説明・PDFファイル名を変更します。
4. GitHubに保存するとNEWSページに表示されます。

例:

```js
{
  date: "2026-10-03",
  category: "行事 / お知らせ",
  title: "学習発表会のお知らせ",
  description: "日時や持ち物などをまとめています。",
  pdf: "gakusyu-happyo.pdf"
}
```

## 写真を追加する

1. JPG / PNG / WEBPなどの写真をこのフォルダに追加します。
2. `gallery-data.js` を開きます。
3. 例をコピーして、写真のファイル名・タイトル・説明を変更します。
4. GitHubに保存するとGALLERYページに表示されます。

例:

```js
{
  image: "ensoku.jpg",
  title: "遠足の日",
  description: "みんなで出かけた日の一枚。"
}
```

写真をクリックすると大きく表示できます。

## ファイルを直接GitHubへ追加する方法

GitHubリポジトリで「Add file」→「Upload files」を使って、PDFや写真をドラッグ＆ドロップできます。

このサイトはGitHub Pagesの静的サイトなので、サイト上のフォームからファイルをGitHubへ保存する機能はありません。ファイルをGitHubへ置いたあと、`news-data.js` または `gallery-data.js` を1件追加する方式です。
