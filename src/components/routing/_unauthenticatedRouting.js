import React from "react";
import { Route, Redirect } from "react-router-dom";

/* Can be used for redirects. */
function querystring(name, url = window.location.href) {
  name = name.replace(/[[]]/g, "\\$&");

  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i");
  const results = regex.exec(url);

  if (!results) {
    return null;
  }
  if (!results[2]) {
    return "";
  }

  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export default function UnauthenticatedRouting({
  component: C,
  props: cProps,
  ...rest
}) {
  const redirect = querystring("redirect");
  /* if there is no user then it throws you into an unauthenticated route. Else, it throws you back to app/dashboard */
  return (
    <Route
      {...rest}
      render={props =>
        !cProps.customer ? (
          <C {...props} {...cProps} />
        ) : (
            <Redirect
              to={
                redirect === "" || redirect === null
                  ? { pathname: "/" }
                  : redirect
              }
            />
          )
      }
    />
  );
}
