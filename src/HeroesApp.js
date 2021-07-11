import React, { useEffect, useReducer } from 'react';
import { AuthContext } from './auth/AuthContext';
import { authReducer } from './auth/authReducer';

import { AppRouter } from './routers/AppRouter';

// Aca el init, retorna revisar el localstorage para ver si tenemos ese objeto
// y si no existe, retornaremos el objeto con logged en false
const init = () => {
    return JSON.parse(localStorage.getItem('user')) || { logged: false };
}

export const HeroesApp = () => {

    const [ user, dispatch ] = useReducer(authReducer, {}, init);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    return (

        <AuthContext.Provider value={{ user, dispatch }}>
            <AppRouter />
        </AuthContext.Provider>

        

    )
}
