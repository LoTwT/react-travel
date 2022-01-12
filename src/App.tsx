import styles from "./App.module.css"

import { BrowserRouter, Route, Switch } from "react-router-dom"
import { HomePage, SignIn, Register, Detail } from "./pages"

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/signIn" component={SignIn} />
          <Route path="/register" component={Register} />
          <Route path="/detail/:touristRouteId" component={Detail} />
          <Route render={() => <h1>404 not found...</h1>} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
