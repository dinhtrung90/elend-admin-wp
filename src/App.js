import React, { Component } from 'react'
import { HashRouter } from 'react-router-dom'

import './scss/style.scss'
import AppWithRouterAccess from './AppWithRouterAccess'

// Containers
// const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// // Pages
// const Login = React.lazy(() => import('./views/pages/login/Login'));
// const Register = React.lazy(() => import('./views/pages/register/Register'));
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

class App extends Component {
  render() {
    return (
      <HashRouter>
        <AppWithRouterAccess />
      </HashRouter>
    )
  }
}

export default App
