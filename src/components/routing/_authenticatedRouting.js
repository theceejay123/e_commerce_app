import React from "react";
import { Route, Redirect } from "react-router-dom";

export default ({ component: C, props: cProps, ...rest }) => {
  /* if there is a user, it renders the authenticated component. if not then it redirects back to login page. */
  return (
    <Route
      {...rest}
      render={props =>
        cProps.customer ? (
          <C {...props} {...cProps} />
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location
                }
              }}
            />
          )
      }
    />
  );
};
