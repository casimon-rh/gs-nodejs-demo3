import { connect, model, Schema } from "mongoose"
export interface Order {
  id: string
  date?: Date
  items: any[]
  payment: any
}

export const db = {
  url: process.env.MONGO_URL,
  order: model<Order>('Order', new Schema<Order>({
    id: { type: String, required: true },
    date: Date,
    items: { type: [], required: true },
    payment: { type: {}, required: true }
  }))
}

export const createOrder = async (norder: Order) => {
  await connect(db.url || '')
  console.log(`🍀 saving ${process.env.ID}...`)
  const myorder = new db.order({ ...norder })
  await myorder.save()
  console.log(`👌 success ${process.env.ID}...`)
  return myorder
}