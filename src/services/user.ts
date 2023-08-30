import { Lifetime } from "awilix"
import { UserService as MedusaUserService } from "@medusajs/medusa"
import { User } from "../models/user"
import { FilterableUserProps, CreateUserInput as MedusaCreateUserInput } from "@medusajs/medusa/dist/types/user"
import StoreRepository from "../repositories/store"

type CreateUserInput = {
  store_id?: string
} & MedusaCreateUserInput

type UserSelector = {
  store_id?: string
} & FilterableUserProps


class UserService extends MedusaUserService {
  static LIFE_TIME = Lifetime.SCOPED
  protected readonly loggedInUser_: User | null
  protected readonly storeRepository_: typeof StoreRepository;

  constructor(container, options) {
    // @ts-expect-error prefer-rest-params
    super(...arguments)
    this.storeRepository_ = container.storeRepository

    try {
      this.loggedInUser_ = container.loggedInUser
    } catch (e) {
    }
  }

  async create(user: CreateUserInput, password: string): Promise<User> {
    if (!user.store_id) {
      const storeRepo = this.manager_.withRepository(this.storeRepository_)
      let newStore = storeRepo.create()
      newStore = await storeRepo.save(newStore)
      user.store_id = newStore.id
    }

    return await super.create(user, password)
  }

  async list(selector: UserSelector, config?: {}): Promise<User[]> {
    selector.email="";
    return await super.list(selector, config)
  }
}

export default UserService