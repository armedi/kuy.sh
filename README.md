# kuy.sh

## How to run

First you need to have cloudflare account and install wrangler-cli. Follow step 1 and 2 in this document [https://developers.cloudflare.com/workers/learning/getting-started](https://developers.cloudflare.com/workers/learning/getting-started).

Edit wrangler.toml file and change it with the following content

```toml
name = "shorten"
type = "webpack"
webpack_config = "webpack.config.js"
account_id = "<your cloudflare account_id>"
workers_dev = true
route = ""
kv_namespaces = [
  {binding = "REDIRECTS", id = "<insert workers kv namespace id>", preview_id = "<insert another workers kv namespace id>"},
]
```

If you don't have workers kv namespace available yet, create with the following command then copy the outputted id to kv_namespaces configuration in `wrangler.toml`

```bash
$ wrangler kv:namespace create "REDIRECTS"

🌀  Creating namespace with title "REDIRECTS"
✨  Success!
Add the following to your configuration file in your kv_namespaces array:
{ binding = "REDIRECTS", id = "da11bf9b9c6244d3baa88bceb0a6e1ff" }
```

Run in development mode

```bash
wrangler dev
```
