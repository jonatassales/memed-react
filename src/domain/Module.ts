export interface Module {
  name: string
  show: (module: string) => void
  hide: (module: string) => void
}
