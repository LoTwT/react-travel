import { Middleware } from "redux"

export const actionLog: Middleware = (store) => (next) => (action) => {
  console.log("current state : ", store.getState())
  console.log("fired action : ", action)
  next(action)
  console.log("updated state : ", store.getState())
}