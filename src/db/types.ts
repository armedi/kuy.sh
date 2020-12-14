import { Redirect } from '../redirect'

export interface DB {
  save(data: Redirect): Promise<void>
  get(from: string): Promise<Redirect>
  exists(from: string): Promise<boolean>
}
