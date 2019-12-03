import { confPOST, confGET, confDEL, endpoint } from "./index.js";

const Addcriminoso = async (nome, cpf, dataDeNascimento) => {
  try {
    const conf = {
      ...confPOST,
      body: JSON.stringify({
        nome,
        cpf,
        dataDeNascimento: new Date(dataDeNascimento).getTime()
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
    resp = resp.map((r, i, res) => {
      let t = r;
      t.dataDeNascimento = new Date(t.dataDeNascimento)
        .toISOString()
        .split("T")[0];
      return t;
    });
    return resp ? resp : [];
  } catch (error) {
    return error;
  }
};
export { Addcriminoso, GetAllcriminosos, DelCriminoso };
