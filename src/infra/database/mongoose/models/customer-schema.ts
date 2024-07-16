import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

@Schema({
  collection: 'customers',
})
export class Customer {
  @Prop({ type: String, required: true })
  _id!: string

  @Prop({ required: true })
  name!: string

  @Prop({ required: true })
  birthDate!: Date

  @Prop({ required: true, unique: true })
  email!: string

  @Prop({ required: true })
  password!: string

  @Prop({
    name: 'created_at',
  })
  createdAt!: Date

  @Prop({
    name: 'updated_at',
    type: Date,
  })
  updatedAt!: Date | null | undefined
}

export type CustomerDocument = HydratedDocument<Customer>

export const CustomerSchema = SchemaFactory.createForClass(Customer)
