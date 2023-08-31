import { Router } from "express"
import configLoader from "@medusajs/medusa/dist/loaders/config"
import { 
  registerLoggedInUser,
} from "./middlewares/logged-in-user"
import 
  authenticate 
from "@medusajs/medusa/dist/api/middlewares/authenticate" 
import cors from "cors"
import { ProductRepository } from "../repositories/product"
import { StoreRepository } from "../repositories/store"

export default function (rootDirectory: string) {
  const router = Router()
  const config = configLoader(rootDirectory)

  const adminCors = {
    origin: config.projectConfig.admin_cors.split(","),
    credentials: true,
  }

  router.use(
    /\/admin\/[^(auth)].*/,
    cors(adminCors),
    authenticate(),
    registerLoggedInUser
  )

  
  router.get("/stores/:store_id", async (req, res) => {
    const store_id = req.params.store_id;
    const productRepository: typeof ProductRepository = req.scope.resolve("productRepository")
    const storeRepository: typeof StoreRepository = req.scope.resolve("storeRepository")
    return res.json({
      store: await storeRepository.findOne({
        where: { id: store_id}
      }),
      products: await productRepository.find({
        where: { store: { id: store_id } },
      }),
    })
  })

  return router
}