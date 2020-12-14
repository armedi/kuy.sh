import { kv } from '../db'
import { createHandler } from './handler'

export const handleRequest = createHandler(kv)
