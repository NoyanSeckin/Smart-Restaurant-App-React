import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

function ProtectedRoute({authentication, component: Component, ...restOfProps }) {
  const isAuthenticated = authentication
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

const mapStateToProps = (state) => {
  return {
    authentication: state.authentication,
  };
};
export default connect(mapStateToProps, {})(ProtectedRoute);

