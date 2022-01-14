import React, { useEffect } from "react"
import styles from "./App.module.css"

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import {
  HomePage,
  SignIn,
  Register,
  Detail,
  Search,
  ShoppingCart,
  PlaceOrder,
} from "./pages"
import { useSelector } from "./redux/hooks"
import { useDispatch } from "react-redux"
import { getShoppingCart } from "./redux/shoppingCart/slice"

const PrivateRoute = ({
  component,
  isAuthenticated,
  ...rest
}: {
  component: any
  isAuthenticated: boolean
  [key: string]: any
}) => {
  const routeComponent = (props: any) =>
    isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: "/signIn" }} />
    )

  return <Route render={routeComponent} {...rest} />
}

function App() {
  const { token: jwt } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if (jwt) {
      dispatch(getShoppingCart(jwt))
    }
  }, [jwt])

  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/signIn" component={SignIn} />
          <Route path="/register" component={Register} />
          <Route path="/detail/:touristRouteId" component={Detail} />
          <Route path="/search/:keywords?" component={Search} />
          <PrivateRoute
            isAuthenticated={jwt !== null}
            path="/shoppingCart"
            component={ShoppingCart}
          />
          <PrivateRoute
            isAuthenticated={jwt !== null}
            path="/placeOrder"
            component={PlaceOrder}
          />
          <Route render={() => <h1>404 not found...</h1>} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
