export enum EOderBy {
  DESC = "desc",
  ACSC = "asc",
}

export type GetListType = {
  orderBy?: EOderBy
  sortBy?: string
  page: number
  size: number
  name?: string
  status?: string
}

export type RequestDataType = {
  customPath?: string
  id?: string | number
  params?: object
  body?: object | FormData
}

export type ResponseDataType<T> = T
