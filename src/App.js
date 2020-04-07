import React, { Suspense, lazy } from 'react';

// Routing
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import AppliedRouting from './components/routing/_appliedRouting';


// Components to render
import Navbar from './components/routing/navbar/_navbar';

const AboutUs = lazy(() => import("./components/about_us/_about"));
const ContactUs = lazy(() => import("./components/contact_us/_contact"));
const Home = lazy(() => import("./components/home/_home"));


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
            exact
            path="/about"
            component={AboutUs}
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