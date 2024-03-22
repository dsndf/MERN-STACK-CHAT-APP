export class errorHandler extends Error {
 constructor(message,status){
    super(message)
    this.statusCode = status;
 }
}
