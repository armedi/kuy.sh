# kuy.sh

## How to run

First you need to have cloudflare account and install wrangler-cli. Follow step 1 and 2 in this document [https://developers.cloudflare.com/workers/learning/getting-started](https://developers.cloudflare.com/workers/learning/getting-started).

To have this code running in dev mode, you should have configured [faunadb](https://fauna.com) and have created a db collection. Make `FAUNA_SECRET` variable available in your environment with the value of your [fauna secret key](https://docs.fauna.com/fauna/current/security/keys).

Edit wrangler.toml file and change it with the following content

```toml
name = "shorten"
type = "webpack"
webpack_config = "webpack.config.js"
account_id = "<your cloudflare account_id>"
workers_dev = true
route = ""
```

Create faunaDB collection and index

```bash
node scripts/setupDb.js
```

Run in development mode

```bash
wrangler dev
```
