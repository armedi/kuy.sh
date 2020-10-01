import faunadb, { errors } from 'faunadb'
import { Redirect } from '../redirect'
import { DB } from './types'

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNA_SECRET as string,
  fetch: fetch.bind(globalThis),
})

const save = (data: Redirect): Promise<Redirect> => {
  return client.query(
    q.Select('data', q.Create(q.Collection('redirects'), { data })),
  )
}

const get = (from: string): Promise<Redirect> => {
  return client.query(
    q.Select('data', q.Get(q.Match(q.Index('redirects_by_from'), from))),
  )
}

const exists = (from: string): Promise<boolean> => {
  return client.query(q.Exists(q.Match(q.Index('redirects_by_from'), from)))
}

export const db: DB = {
  save,
  get,
  exists,
}

export { errors }
