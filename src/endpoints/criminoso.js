import { confPOST, confGET, endpoint } from "./index.js";

const Addcriminoso = async (nome, cpf, dataDeNascimento) => {
  try {
    const conf = {
      ...confPOST,
    body: JSON.stringify({
        nome,
        cpf,
        dataDeNascimento
      })
    };

    let resp = await fetch(endpoint + "/criminosos", conf);
    return resp;
  } catch (error) {
    return error;
  }
};

const GetAllcriminosos = async () => {
  try {
    const conf = {
      ...confGET
    };
    let resp = await fetch(endpoint + "/criminosos", conf);
    return await resp.json();
  } catch (error) {
    return error;
  }
};
export { Addcriminoso, GetAllcriminosos };
