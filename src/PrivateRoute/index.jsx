import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser, selectIsAuthenticated } from '../redux/reducers/authSlice';
import { ROUTES, ROLES } from '../config/routeConfig';
import PropTypes from 'prop-types';

export const PrivateRoute = ({ children, allowedRoles }) => {
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);

  // If user is already authenticated and tries to access auth pages
  if (isAuthenticated && location.pathname === ROUTES.PUBLIC.LOGIN) {
    // Return to the page they came from, or default to their role-based dashboard
    const from = location.state?.from?.pathname || 
      (user?.role === ROLES.CUSTOMER 
        ? ROUTES.CUSTOMER.DASHBOARD 
        : ROUTES.PROVIDER.DASHBOARD);
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
    const defaultRoute = user?.role === ROLES.CUSTOMER 
      ? ROUTES.CUSTOMER.SERVICES 
      : ROUTES.PROVIDER.SERVICES;
    return <Navigate to={defaultRoute} replace />;
  }

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.number).isRequired,
};