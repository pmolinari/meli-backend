import { Router, Request, Response, NextFunction } from 'express';
import { searchItemsByQueryController, getItemByIdParamController } from '../../controllers/items.controller';


const router = Router();


// Endpoint => "/api/items?q=​​​:query"
router.get('/items', [
], searchItemsByQueryController);


// Endpoint =>  "/api/items/​​​:id"
router.get('/items/:id', [], getItemByIdParamController);




export default router;