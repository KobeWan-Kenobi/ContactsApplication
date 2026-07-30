import axios from "axios";
const getRandomContactFromApi = async () => {
  const url = new URL("https://randomuser.me/api/");

  const response = await axios.get(url);
  return response.data;
};

export default getRandomContactFromApi;
