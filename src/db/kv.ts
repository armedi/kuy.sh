import { Redirect } from '../redirect'
import { DB } from './types'

declare const REDIRECTS: KVNamespace

const save = async (data: Redirect): Promise<void> => {
  return REDIRECTS.put(data.from, JSON.stringify(data))
}

const get = async (from: string): Promise<Redirect> => {
  const response: Redirect | null = await REDIRECTS.get(from, 'json')
  if (response === null) {
    throw new Error('not found')
  }
  return response
}

const exists = async (from: string): Promise<boolean> => {
  const response = await REDIRECTS.get(from)
  return !!response
}

export const kv: DB = {
  save,
  get,
  exists,
}
