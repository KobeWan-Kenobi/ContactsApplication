import type { ContactDTO } from "../DTOs/ContactDTO";

export type ContactsApiResponse = {
   statusCode: number;
   contactDto: ContactDTO | null;
   contactDtoList: ContactDTO[] | null;
   errorMessages: string[];
   isSuccess: boolean;
}
