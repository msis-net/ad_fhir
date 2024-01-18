# Annyys FHIR
### Astro x Vue3 Starter Kit: Basics


```sh
$ git clone https://github.com/msis-net/ad_fhir.git

#dockerコンテナ作成
$ cd ad_fhir/
$ docker compose up --build -d

#コンテナの起動確認
$ docker-compose.yml
#もし起動していない場合は[docker-compose.yml]を確認
#npm 系の実行をコメントアウトする

#コンテナに入る
$ docker exec -it [Tabキーでコンテナ名が補完] bash
#以下コンテナ内
/app# npm ci
#テスト稼働>起動確認
/app# npm run dev

#Astro Toolbarを隠す
## app/に移動して以下のコマンドを実行
>npx astro preferences disable devToolbar
◯ devToolbar is now  disabled

#コンテナから出る
/app# exit

#[docker-compose.yml]のnpm run devを有効
===
#起動コマンド
command: /bin/sh -c 'npm run dev'
#Dockerの起動に合わせて自動起動設定
restart: always

#コンテナ再起動
$ docker compose stop
$ docker compose up -d
```
### 最初から登録する場合

```sh
npm create astro@latest（Astroプロジェクトからの場合）
Vueを使う
npm i @vueuse/core
npx astro add vue

atatables.net-vue3
npm install --save datatables.net-vue3
npm run build　で　dist に作成
```
