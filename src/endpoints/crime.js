import { confPOST, confGET, confDEL, endpoint } from "./index.js";

const AddCrime = async (
  data,
  descricao,
  idBairro,
  idCriminosos,
  idQuadrilhas
) => {
  try {
    const conf = {
      ...confPOST,
      body: JSON.stringify({
        data: new Date(data).getTime(),
        descricao,
        idBairro,
        idCriminosos,
        idQuadrilhas
      })
    };

    let resp = await fetch(endpoint + "/crimes", conf);
    return resp;
  } catch (error) {
    return error;
  }
};

const DelCrime = async id => {
  try {
    const conf = {
      ...confDEL,
      body: id
    };

    let resp = await fetch(endpoint + "/crimes", conf);
    return resp;
  } catch (error) {
    return error;
  }
};

const GetAllCrimes = async () => {
  try {
    const conf = {
      ...confGET
    };
    let resp = await fetch(endpoint + "/crimes", conf);
    resp = await resp.json();
    resp = resp.map((r, i, res) => {
      let t = r;
      t.data = new Date(t.data).toISOString().split("T")[0];
      return t;
    });
    return resp ? resp : [];
  } catch (error) {
    return error;
  }
};
export { AddCrime, GetAllCrimes, DelCrime };
