import axios from "axios";
import {ContactDTO} from "./DTOs/ContactDTO";
import { ContactsApiResponse } from "./Models/ContactsApiResponse";
import { Contact } from "./Models/Contact";
const BASE_URL = "https://localhost:44341/api/Contacts";
const getAllContacts = async (): Promise<Contact[]> => {
  try {
    const response = await axios.get<ContactsApiResponse>(BASE_URL);
    //backend is contactId while frontend uses id
    // backend is fullName while frontend uses name
    return response.data.result.map((contact: ContactDTO): Contact => {
      return {
        id: contact.contactId,
        name: contact.fullName,
        phone: contact.phone,
        email: contact.email,
        isFavorite: contact.isFavorite,
      };
    });
  } catch (error) {
    console.log("Error", error);
    return [];
  }
};

export default getAllContacts;
