import { Redirect } from '../redirect'

export interface DB {
  save(data: Redirect): Promise<Redirect>
  get(from: string): Promise<Redirect>
  exists(from: string): Promise<boolean>
}
