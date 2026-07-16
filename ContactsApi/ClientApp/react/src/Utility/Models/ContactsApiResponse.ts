import { ContactCreateDTO } from "../DTOs/ContactCreateDTO";
import { ContactDTO } from "../DTOs/ContactDTO";

export interface ContactsApiResponse {
   statusCode: number;
   result: any;
   errorMessages: string[];
   isSuccess: boolean;
}
