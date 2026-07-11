const BASE_URL = "https://localhost:44341/api/Contacts";
const getAllContacts = async () => {
  const url = new URL("https://localhost:44341/api/Contacts");

  const response = await axios.get(url);
  return response.data;
};
export default getAllContacts;