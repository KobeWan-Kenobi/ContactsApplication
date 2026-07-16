import axios from "axios";
const BASE_URL = "https://localhost:44341/api/Contacts";
export const getAllContacts = async () => {
    try {
        const response = await axios.get(BASE_URL);
        //backend is contactId while frontend uses id
        // backend is fullName while frontend uses name
        return response.data.result.map((contactDTO) => {
            return {
                id: contactDTO.contactId,
                name: contactDTO.fullName,
                phone: contactDTO.phone,
                email: contactDTO.email,
                isFavorite: contactDTO.isFavorite,
            };
        });
    }
    catch (error) {
        console.log("Error", error);
        return [];
    }
};
export const createContact = async (contactCreateDTO) => {
    try {
        const response = await axios.post(BASE_URL, contactCreateDTO);
        return response.data.result.contactId;
    }
    catch (error) {
        console.log("Error", error);
        return -1;
    }
};
export const updateContact = async (contactDTO) => {
    try {
        const response = await axios.put(BASE_URL, contactDTO);
        return response.data;
    }
    catch (error) {
        console.log("Error", error);
        const badResponse = {
            statusCode: 400,
            result: null,
            errorMessages: [`An error was encountered before the server could be reached: ${error}`],
            isSuccess: false
        };
        return badResponse;
    }
};
export const deleteContact = async (contactId) => {
    const response = await axios.delete(`${BASE_URL}/${contactId}`);
    return response.data.isSuccess;
};
