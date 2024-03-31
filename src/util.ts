import { Request, Response } from "express";

export const responseData=(res:Response,statusCode:number,message:string,data:any,)=>{
        res.status(statusCode).json({
            message,
            data
        })
}