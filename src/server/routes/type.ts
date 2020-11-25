export type DemoType = {
  name: string
  subscribedToChannel: string
  demoDate: Date
}

export type UserType = {
  username: string
  password: string
  createdDate: Date
}

export type PaginationType = {
  id: number
  name: string
}

export type ResultsType = {
  next: object
  previous: object
  results: any
}
