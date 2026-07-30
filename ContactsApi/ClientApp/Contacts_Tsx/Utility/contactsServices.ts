import axios from "axios";
import type { ContactDTO } from "../DTOs/ContactDTO";
import type { ContactsApiResponse } from "../models/ContactsApiResponse";
import type { ContactModel } from "../models/ContactModel";
import type { ContactCreateDTO } from "../DTOs/ContactCreateDTO";
import { ApiError } from "../models/ApiError";
const BASE_URL = "https://localhost:44341/api/Contacts";
// void -> Contact[]

/*
Logic for requests: 
// response should be api response
const response: ApiResponse
if success: 
  unpack response and get contactList, contactDto etc...
if fail:
  throw new error with message from server
*/

export const getAllContacts = async (): Promise<ContactModel[]> => {
  try {
    const rawResponse =
      await axios.get<ContactsApiResponse>(BASE_URL);
    //backend is contactId while frontend uses id
    // backend is fullName while frontend uses name
    if (!rawResponse.data.isSuccess || !rawResponse.data.contactDtoList) {
      throw new ApiError(
        rawResponse.data.errorMessages,
        rawResponse.data.statusCode,
      );
    }
    return rawResponse.data.contactDtoList.map(
      (contactDTO: ContactDTO): ContactModel => {
        return {
          contactId: contactDTO.contactId,
          fullName: contactDTO.fullName,
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
// ContactCreateDTO -> contactId

/*
Logic for requests: 
// response should be api response
const response: ApiResponse
if success: 
  unpack response and get contactList, contactDto etc...
if fail:
  throw new error with message from server
*/
export const createContact = async (
  contactCreateDTO: ContactCreateDTO,
): Promise<number> => {
  try {
    const response = await axios.post<ContactsApiResponse>(BASE_URL, contactCreateDTO)
      .catch((error) => {
        console.log(error);
        throw new ApiError([`${error}`], 400);
      });
    const newContactId = response.data.contactDto?.contactId
    if (newContactId) {
      return newContactId;
    }
    return -1
  } catch (error) {
    console.log("Error", error);
    return -1;
  }
};
// ContactDTO -> isSuccess
export const updateContact = async (
  contactDTO: ContactDTO,
): Promise<boolean> => {
  console.log(contactDTO) // fullName null here!!!
  try {
    const response = await axios.put<ContactsApiResponse>(
      BASE_URL,
      contactDTO,
    );
    if (!response.data.isSuccess) {
      throw new ApiError(response.data.errorMessages, response.data.statusCode);
    }
    return response.data.isSuccess;
  } catch (error) {
    console.log("Error", error);

    return false;
  }
};
export const deleteContact = async (contactId: number): Promise<boolean> => {
  try {
    const response = await axios.delete<ContactsApiResponse>(
      `${BASE_URL}/${contactId}`,
    );
    if (!response.data.isSuccess) {
      throw new ApiError(response.data.errorMessages, response.data.statusCode);
    }
    return response.data.isSuccess;
  } catch (error) {
    console.log("Error", error);
    return false;
  }
};
