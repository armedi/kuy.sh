const faunadb = require('faunadb')

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNA_SECRET,
})

async function setup() {
  try {
    const collection = await client.query(
      q.CreateCollection({ name: 'redirects' }),
    )
    console.log(`created ${collection.name} collection`)

    const index = await client.query(
      q.CreateIndex({
        name: 'redirects_by_from',
        source: q.Collection('redirects'),
      }),
    )

    console.log(`created ${index.name} index`)
  } catch (error) {
    console.log(error)
  }
}

setup()
