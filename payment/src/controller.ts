import axios, { AxiosResponse } from 'axios'
import CircuitBreaker from 'opossum'
import { Request, Response, Express } from 'express'
import { createPayment, Payment } from './db'
import { errmsg, message, CustomResponse } from './messages'

const jumps = process.env.JUMPS || 6
const throwError = () => Math.random() > .6 && process.env.INJECT_ERR === '1'


const chain = (endpoint: string, payment: Payment): Promise<CustomResponse> =>
  new Promise((resolve, reject) =>
    axios.post(endpoint, payment.shipment)
      .then((response: AxiosResponse) =>
        resolve(message({ response: response.data, ...payment }))
      ).catch((err: any) =>
        reject(errmsg(err.response.data))
      )
  )

const breaker = new CircuitBreaker(chain, {
  timeout: 300, // If name service takes longer than .3 seconds, trigger a failure
  errorThresholdPercentage: 50, // When 20% of requests fail, trip the breaker
  resetTimeout: 10000 // After 10 seconds, try again.
})


export const routes = (app: Express) => {
  app.get('/', (req: Request, res: Response) => res.send(`hello from ${process.env.ID}\n`))

  app.post('/create', async (req: Request, res: Response) => {
    const count = (parseInt(`${req.query['count']}`) || 0) + 1
    const endpoint = `${process.env.CHAIN_SVC}?count=${count}`
    const myPayment = await createPayment(req.body)
    if (throwError())
      return res.status(502).send(errmsg(''))

    if (count >= jumps)
      return res.status(200).send(message('\nLast'))
    try {
      const response = await breaker.fire(endpoint, myPayment)
      res.status(200).send(response)
    } catch (error) {
      res.status(200).send(error)
    }
  })
}

breaker.on("fallback", () => console.log('🔌 status:: fallback'))
breaker.on("success", () => console.log("🔌 status:: success"))
breaker.on("failure", () => console.log("🔌 status:: failed"))
breaker.on("timeout", () => console.log("🔌 status:: timed out"))
breaker.on("reject", () => console.log("🔌 status:: rejected"))
breaker.on("open", () => console.log("🔌 status:: opened"))
breaker.on("halfOpen", () => console.log("🔌 status:: halfOpened"))
breaker.on("close", () => console.log("🔌 status:: closed"))