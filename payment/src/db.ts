import { connect, model, Schema } from "mongoose"
export interface Payment {
  id: string
  amount: number
  shipment: any
}

export const db = {
  url: process.env.MONGO_URL,
  payment: model<Payment>('Payment', new Schema<Payment>({
    id: { type: String, required: true },
    amount: { type: Number, required: true },
    shipment: { type: {}, required: true }
  }))
}

export const createPayment = async (npayment: Payment) => {
  await connect(db.url || '')
  console.log(`🍀 saving ${process.env.ID}...`)
  const mypayment = new db.payment({ ...npayment })
  await mypayment.save()
  console.log(`👌 success ${process.env.ID}...`)
  return mypayment
}