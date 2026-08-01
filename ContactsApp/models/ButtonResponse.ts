export class ButtonResponse {
   isSuccess: boolean;
   msg: string;

   constructor(isSuccess:boolean, msg: string){
     this.isSuccess = isSuccess;
     this.msg = msg;

   }
}