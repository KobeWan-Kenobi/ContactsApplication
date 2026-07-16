import axios from "axios";
import { ContactDTO } from "./DTOs/ContactDTO";
import { ContactsApiResponse } from "./Models/ContactsApiResponse";
import { Contact } from "./Models/Contact";
import { ContactCreateDTO } from "./DTOs/ContactCreateDTO";
const BASE_URL = "https://localhost:44341/api/Contacts";
export const getAllContacts = async (): Promise<Contact[]> => {
  try {
    const response = await axios.get<ContactsApiResponse>(BASE_URL);
    //backend is contactId while frontend uses id
    // backend is fullName while frontend uses name
    return response.data.result.map(
      (contactDTO: ContactDTO): Contact => {
        return {
          id: contactDTO.contactId,
          name: contactDTO.fullName,
          phone: contactDTO.phone,
          email: contactDTO.email,
          isFavorite: contactDTO.isFavorite,
        };
      },
    );
  } catch (error) {
    console.log("Error", error);
    return [];
  }
};
export const createContact = async (contactCreateDTO: ContactCreateDTO): Promise<number> => {
  try {

    const response = await axios.post<ContactsApiResponse>(
      BASE_URL,
      contactCreateDTO,
    );
    return response.data.result.contactId;

  } catch (error) {
    console.log("Error", error);
    return -1;
  }
};
export const updateContact = async(contactDTO: ContactDTO): Promise<ContactsApiResponse> => {
  try {

    const response = await axios.put<ContactsApiResponse>(
      BASE_URL,
      contactDTO,
    );
    return response.data;

  } catch (error) {
    console.log("Error", error);
    const badResponse: ContactsApiResponse = {
      statusCode: 400,
      result: null,
      errorMessages: [`An error was encountered before the server could be reached: ${error}`],
      isSuccess: false
    }
    return badResponse;
  }
}
export const deleteContact = async(contactId: number): Promise<boolean> =>{
  const response = await axios.delete<ContactsApiResponse>(
    `${BASE_URL}/${contactId}`
  );
  return response.data.isSuccess;

}