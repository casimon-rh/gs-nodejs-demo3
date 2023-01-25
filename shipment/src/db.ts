import { connect, model, Schema } from "mongoose"
export interface Shipment {
  id: string
  directions: string
}

export const db = {
  url: process.env.MONGO_URL,
  shipment: model<Shipment>('Shipment', new Schema<Shipment>({
    id: { type: String, required: true },
    directions: { type: String, required: true }
  }))
}

export const createShipment = async (nshipment: Shipment) => {
  await connect(db.url || '')
  console.log(`🍀 saving ${process.env.ID}...`)
  const myshipment = new db.shipment({ ...nshipment })
  await myshipment.save()
  console.log(`👌 success ${process.env.ID}...`)
  return myshipment
}