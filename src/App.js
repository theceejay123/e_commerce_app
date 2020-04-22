import React, { Suspense, lazy, useEffect, useState } from 'react';
import axios from "axios";
import { loadStripe } from '@stripe/stripe-js';

// Routing
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import AppliedRouting from './components/routing/_appliedRouting';
// import AuthenticatedRouting from './components/routing/_authenticatedRouting';
import UnauthenticatedRouting from './components/routing/_unauthenticatedRouting';


// Components to render
import Navbar from './components/routing/navbar/_navbar';

const AboutUs = lazy(() => import("./components/about_us/_about"));
const ContactUs = lazy(() => import("./components/contact_us/_contact"));
const Home = lazy(() => import("./components/home/_home"));
const Product = lazy(() => import("./components/home/product/_product"));
const Login = lazy(() => import("./components/routing/login/_login"));
const Register = lazy(() => import("./components/routing/register/_register"));
const Search = lazy(() => import("./components/routing/search/_search"));
const Cart = lazy(() => import('./components/routing/cart/_cart'));

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

const App = (props) => {

  const [customer, setCustomer] = useState(null);
  // const [cart, setCart] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.get("http://localhost:3000/auto_login", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        if (res.status === 200) {
          setCustomer(res.data);
        }
      })
    }
  }, []);

  // Always update when there is a new cart
  // useEffect(() => {
  //   console.log("did this update in app?");
  // }, [cart])

  const handleLogin = (customer) => {
    setCustomer(customer);
  }

  const handleLogout = () => {
    setCustomer(null);
    localStorage.removeItem("token");
    console.log("fired");
  }

  // const addOrRemoveToCart = (cartArray) => {
  //   if (cartArray.length !== cart.length) {
  //     setCart(cartArray);
  //   }
  // }

  const childProps = {
    handleLogin: handleLogin,
    customer: customer,
    handleLogout: handleLogout,
    // addOrRemoveToCart: addOrRemoveToCart,
    // cart: cart
    stripePromise: stripePromise
  }

  return (
    <Router>
      {/* This is the navbar of the whole application */}
      <Navbar cProps={childProps} props={props} />
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
            props={childProps}
          />
          <AppliedRouting
            exact
            path="/search/:search"
            component={Search}
            props={childProps}
          />
          <AppliedRouting
            exact
            path="/product/:id"
            component={Product}
            props={childProps}
          />
          <AppliedRouting
            exact
            path="/cart"
            component={Cart}
            props={childProps}
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

          <UnauthenticatedRouting
            exact
            path="/register"
            component={Register}
            props={childProps}
          />

          <UnauthenticatedRouting
            exact
            path="/login"
            component={Login}
            props={childProps}
          />
        </Switch>
      </Suspense>
    </Router>
  )
}

export default App;