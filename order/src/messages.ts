
export interface CustomResponse {
  location: string
  data?: any
  error?: string
}

export const curtime = () => `${new Date().getMinutes()}:${new Date().getSeconds()}`


export const message = (data: any): CustomResponse => ({
  location: `\nThis is ${process.env.ID} @${curtime()}`,
  data
})
export const errmsg = (err: any): CustomResponse => ({
  location: `\nThis is ${process.env.ID} @${curtime()}`,
  error: err || `\n${process.env.ID} @${curtime()} -> unavailable`
})