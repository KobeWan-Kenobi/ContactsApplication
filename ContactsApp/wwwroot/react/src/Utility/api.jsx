import axios from "axios";
const getRandomUser = async () => {
  const url = new URL("https://randomuser.me/api/");

  const response = await axios.get(url);
  return response.data;
};

export default getRandomUser;
