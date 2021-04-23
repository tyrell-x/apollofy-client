import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { authSelector } from "../../redux/auth/auth-selectors";
import * as ROUTES from "../../routes";

function ProtectedRoute({ component: Component, ...rest }) {
  const { isAuthenticated } = useSelector(authSelector);

  return (
    <Route
      {...rest}
      render={() => {
        if (isAuthenticated) {
          return <Component />;
        } else {
          return <Redirect to={ROUTES.LOGIN} />;
        }
      }}
    />
  );
}

export default ProtectedRoute;
