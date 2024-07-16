export interface Driver {
  id?: string
  name?: string
  cpf: string
  vehicle?: {
    name?: string
    key?: string
  }
}
