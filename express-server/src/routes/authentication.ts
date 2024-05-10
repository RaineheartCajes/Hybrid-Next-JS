import express from 'express';

import {register, login } from '../controller/user-authentication';
export default (router: express.Router) => {
    
    
    router.post('/auth/register', register);
    router.post('/auth/login', login);
    
}