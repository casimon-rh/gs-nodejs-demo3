import { Request, Response, Express } from 'express'
import { createShipment } from './db'
import { errmsg, message } from './messages'

const jumps = process.env.JUMPS || 6
const throwError = () => Math.random() > .6 && process.env.INJECT_ERR === '1'

export const routes = (app: Express) => {
  app.post('/create', async (req: Request, res: Response) => {
    const count = (parseInt(`${req.query['count']}`) || 0) + 1
    const myshipment = await createShipment(req.body)
    if (throwError())
      return res.status(502).send(errmsg(''))
    if (count >= jumps)
      return res.status(200).send(message('\nLast'))
    res.status(200).send({ msg: '\nEnded Transaction', myshipment })
  })
}