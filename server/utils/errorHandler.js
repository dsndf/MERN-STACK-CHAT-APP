export class ErrorHandler extends Error {
 constructor(message,status){
    super(message)
    this.statusCode = status;
 }
}
