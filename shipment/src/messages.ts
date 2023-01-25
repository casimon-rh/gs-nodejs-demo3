
export const curtime = () => `${new Date().getMinutes()}:${new Date().getSeconds()}`

export const message = (data: string) =>
  `\nThis is ${process.env.ID} @${curtime()} -> Next ${data}`
export const errmsg = () =>
  `\n${process.env.ID} @${curtime()} -> unavailable`