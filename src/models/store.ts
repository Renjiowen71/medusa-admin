import { Column, Entity, OneToMany } from "typeorm"
import {
  Store as MedusaStore,
} from "@medusajs/medusa"
import { User } from "./user";
import { Product } from "./product";

@Entity()
export class Store extends MedusaStore {
  // TODO add relations
  @OneToMany(() => User, (user) => user?.store)
  members?: User[];

  @OneToMany(() => Product, (product) => product?.store)
  products?: Product[];
  
  @Column({type: "decimal", precision: 9})
  longitudes: number

  @Column({type: "decimal", precision: 8})
  latitudes: number
}