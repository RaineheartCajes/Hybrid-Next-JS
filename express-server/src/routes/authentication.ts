import express from 'express';

import {register, login } from '../controller/user-authentication';
import { getCustomerList } from '../controller/customer-table';
import { addProduct, getProductsList } from '../controller/product-table';
import { deleteInventory, updateInventory } from '../controller/inventory-table';
import { upload } from '../middleware/multer'; 
import { getAllOrders, createNewOrder, updateOrderStatus } from '../controller/order-table';

export default (router: express.Router) => {
    router.post('/auth/register', register);
    router.post('/auth/login', login);

    router.get('/table/customer', getCustomerList);

    router.post('/table/addProducts', upload.single('media'), addProduct);
    router.get('/table/getProducts', getProductsList);
    router.put('/table/editInventory', updateInventory);
    router.delete('/table/deleteProduct', deleteInventory);

    router.get('/table/getOrders', getAllOrders)
    router.post('/table/newOrder', createNewOrder)
    router.put('/table/updateOrderStatus/:id', updateOrderStatus)
}