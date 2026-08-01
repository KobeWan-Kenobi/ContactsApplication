import axios from "axios";
export type RandomContactFromApi = {
  results: [
    {
      name: { title: string; first: string; last: string };
      email: string;
      phone: string;
    },
  ];
};
export const getRandomContactFromApi = async () => {
  const url = "https://randomuser.me/api/?nat=us"; // 'MURICA

  const response = await axios.get(url);
  return response.data;
};


