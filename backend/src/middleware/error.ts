import { Request,Response,NextFunction } from "express";

const errorHandler=(err:any,req:Request,res:Response,next:NextFunction)=>{
    let error:any={};
    if(err.name==='SequelizeValidationError'||err.name==='SequelizeUniqueConstraintError') {
        err.errors.forEach((item:any)=>{
            error[item.path]=err.name==="SequelizeUniqueConstraintError"?`${item.path}_record_already_exists`:item.message;
        })
    }
    if(err.parent?.routine==='enum_in') {
        error.location='only_specified_locations'
    }
    return res.status(500).json({error})

}

export default errorHandler;