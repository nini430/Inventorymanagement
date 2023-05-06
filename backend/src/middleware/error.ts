import { Request,Response,NextFunction } from "express";

const errorHandler=(err:any,req:Request,res:Response,next:NextFunction)=>{
    let error:any={...err};
    error.errors=err.message||{};
    error.statusCode=err.statusCode||500;
    if(err.name==='SequelizeValidationError'||err.name==='SequelizeUniqueConstraintError') {
        error.errors={};
        err.errors.forEach((item:any)=>{
            error.errors[item.path]=err.name==="SequelizeUniqueConstraintError"?`${item.path}_record_already_exists`:item.message;
        })
        err.statusCode=400;
    }else if(err.parent?.routine==='enum_in') {
        error.errors.location='only_specified_locations';
        error.statusCode=400;
    }else if(error.parent?.routine==='string_to_uuid')
        error.errors={error:'Invalid id'}
        error.statusCode=400;
    return res.status(error.statusCode).json({error:error.errors})

}

export default errorHandler;