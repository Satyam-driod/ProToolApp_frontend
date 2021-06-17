import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router'
import Cookies from 'js-cookie'

const PrivateRoute =( {component:Component, ...rest}) => {
    return (
        <Route
            {...rest}
            
            render={(props)=>(Cookies.get('auth_token')?<Component {...props}/>:<Redirect to="/login"/>)}
            />
    );
};

PrivateRoute.propTypes = {
    component:PropTypes.func,
    restricted:PropTypes.string,
};

export default PrivateRoute;
