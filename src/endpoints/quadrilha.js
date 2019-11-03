import {
    confPOST,
    confGET,
    endpoint
  } from "./index.js";
  
  const AddQuadrilha = async (a ,b
  ) => {
    try {
      const conf = {
        ...confPOST,
        body: JSON.stringify({
            a,b
        })
      };
  
      let resp = await fetch(endpoint + "/quadrilhas", conf);
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
      return resp;
    } catch (error) {
      return error;
    }
  };
  export { AddQuadrilha, GetAllQuadrilhas};
  