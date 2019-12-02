import { confPOST, confGET, endpoint, confDEL } from "./index.js";

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
    return resp;
  } catch (error) {
    return error;
  }
};

const DelQuadrilha = async id => {
  try {
    const conf = {
      ...confDEL,
      body: id
    };

    let resp = await fetch(endpoint + "/quadrilhas", conf);
    resp = await resp.json();
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
export { AddQuadrilha, GetAllQuadrilhas, DelQuadrilha };
