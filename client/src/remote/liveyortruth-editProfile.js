import { liveyourtruthClient } from ".";

export const liveyourtruthEditUser = async (user) => {
  try {
    let response = await liveyourtruthClient.patch("/dashboard/update", user);
    console.log(response);
    return response.data; //should be the user object
  } catch (e) {
    console.log(e);
    throw e
  }
};
