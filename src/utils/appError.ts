export class AppError extends Error{
    //private code?: number 
    constructor(name: string,message: string){
       super(message)
       this.name = name
       //this.code = code

       Error.captureStackTrace(this,this.constructor);
    }
}