import { confPOST, confGET, endpoint } from "./index.js";

const AddQuadrilha = async (cpfDosIntegrantes, idDosCrimes, nome) => {
  try {
    const conf = {
      ...confPOST,
      body: JSON.stringify({
        cpfDosIntegrantes,
        idDosCrimes,
        nome
      })
    };

    let resp = await fetch(endpoint + "/quadrilhas", conf);
    resp = await resp.json();
    debugger
    return resp;
  } catch (error) {
    return error;
  }
};

const GetAllQuadrilhas = async () => {
  try {
    const conf = {
      ...confGET
    };
    let resp = await fetch(endpoint + "/quadrilhas", conf);
    resp = await resp.json();
    return resp ? resp : [];
  } catch (error) {
    return error;
  }
};
export { AddQuadrilha, GetAllQuadrilhas };
