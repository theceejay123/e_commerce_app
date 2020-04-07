import React from "react";
import { Route } from "react-router-dom";

export default ({ component: C, props: cProps, ...rest }) => {
  /* Returns the route and renders the component with passed child props */
  return <Route {...rest} render={props => <C {...props} {...cProps} />} />;
};
