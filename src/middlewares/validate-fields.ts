import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { createJsonBody } from '../helpers/response.helpers';


export const validateFields = (req: Request, res: Response, next: NextFunction) => {

    const errors = validationResult(req);
    
    console.log('Errors!!!!!')
    console.log(errors)

    if( !errors.isEmpty() ) {
        return res.status(400).json(
            createJsonBody(errors)
        );
    }

    next();
}
