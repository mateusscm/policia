import {
    confPOST,
    confGET,
    endpoint
  } from "./index.js";
  
  const Addbairro = async (nome
  ) => {
    try {
      const conf = {
        ...confPOST,
        body: nome
      };
  
      let resp = await fetch(endpoint + "/bairros", conf);
      return resp;
    } catch (error) {
      return error;
    }
  };
  
  const GetAllbairros = async () => {
    try {
      const conf = {
        ...confGET
      };
      let resp = await fetch(endpoint + "/bairros", conf);
      resp = await resp.json();
      return resp ? resp : [];
    } catch (error) {
      return error;
    }
  };
  export { Addbairro, GetAllbairros};
  