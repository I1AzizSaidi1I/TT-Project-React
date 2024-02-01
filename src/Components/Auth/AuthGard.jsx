import PropTypes from 'prop-types';
import {Navigate} from 'react-router-dom';

function AuthGuard({children}) {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login"/>;
}

AuthGuard.propTypes = {
    children: PropTypes.node,
};

export default AuthGuard;
