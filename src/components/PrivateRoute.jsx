import { Navigate, redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/auth/selectors';

export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
    // const isLoggedIn = useSelector(selectIsLoggedIn);
    const isLoggedIn = true;
    return isLoggedIn ? Component : <Navigate to={redirectTo} />;
};
