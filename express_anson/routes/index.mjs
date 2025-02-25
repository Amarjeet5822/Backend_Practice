import { Router } from "express";
import { userRouter } from "./userRoute.mjs";
import { productRouter } from "./productRoute.mjs";

const routes = Router();

routes.use( userRouter)
routes.use( productRouter)


export { routes}
