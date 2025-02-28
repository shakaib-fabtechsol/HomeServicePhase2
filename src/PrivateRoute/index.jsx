import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser, selectIsAuthenticated } from '../redux/reducers/authSlice';
import { ROUTES, ROLES } from '../config/routeConfig';
import PropTypes from 'prop-types';

export const PrivateRoute = ({ children, allowedRoles }) => {
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);

  // Helper function to get default route based on user role
  const getDefaultRoute = (role) => {
    switch (role) {
      case ROLES.SUPER_ADMIN:
        return ROUTES.SUPER_ADMIN.DASHBOARD;
      case ROLES.PROVIDER:
        return ROUTES.PROVIDER.DASHBOARD;
      case ROLES.CUSTOMER:
        return ROUTES.CUSTOMER.DASHBOARD;
      case ROLES.SALES:
        return ROUTES.SALES.DASHBOARD;
      default:
        return ROUTES.PUBLIC.LOGIN;
    }
  };

  // If user is already authenticated and tries to access auth pages
  if (isAuthenticated && location.pathname === ROUTES.PUBLIC.LOGIN) {
    const from = location.state?.from?.pathname || getDefaultRoute(user?.role);
    return <Navigate to={from} replace />;
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    return <Navigate 
      to={ROUTES.PUBLIC.LOGIN} 
      state={{ from: location }} 
      replace 
    />;
  }

  // Check role authorization
  const hasRequiredRole = allowedRoles.includes(user?.role);
  if (!hasRequiredRole) {
    return <Navigate to={getDefaultRoute(user?.role)} replace />;
  }

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.number).isRequired,
};