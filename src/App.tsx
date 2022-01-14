import React from "react"
import styles from "./App.module.css"

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import {
  HomePage,
  SignIn,
  Register,
  Detail,
  Search,
  ShoppingCart,
} from "./pages"
import { useSelector } from "./redux/hooks"

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
          <Route render={() => <h1>404 not found...</h1>} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
