import React, { Suspense, lazy } from 'react';

// Routing
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import AppliedRouting from './components/routing/_appliedRouting';


// Components to render
import Navbar from './components/routing/navbar/_navbar';

const AboutUs = lazy(() => import("./components/about_us/_about"));
const ContactUs = lazy(() => import("./components/contact_us/_contact"));
const Home = lazy(() => import("./components/home/_home"));
const Product = lazy(() => import("./components/home/product/_product"));
const Login = lazy(() => import("./components/routing/login/_login"));
const Register = lazy(() => import("./components/routing/register/_register"));


const App = () => {
  return (
    <Router>
      {/* This is the navbar of the whole application */}
      <Navbar />

      <Suspense fallback={<div></div>}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Redirect to='/home' />}
          />
          <AppliedRouting
            path="/home"
            component={Home}
          />
          <AppliedRouting
            path="/product/:id"
            component={Product}
          />
          <AppliedRouting
            exact
            path="/about"
            component={AboutUs}
          />
          <AppliedRouting
            exact
            path="/login"
            component={Login}
          />
          <AppliedRouting
            exact
            path="/register"
            component={Register}
          />
          <AppliedRouting
            exact
            path="/contact"
            component={ContactUs}
          />
        </Switch>
      </Suspense>
    </Router>
  )
}

export default App;