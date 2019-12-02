import { confPOST, confGET, confDEL, endpoint } from "./index.js";

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

const DelCriminoso = async id => {  
  try {
    const conf = {
      ...confDEL,
      body: id
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
    resp = await resp.json();
    return resp ? resp : [];
  } catch (error) {
    return error;
  }
};
export { Addcriminoso, GetAllcriminosos };
