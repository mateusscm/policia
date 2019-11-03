import {
    confPOST,
    confGET,
    endpoint
  } from "./index.js";
  
  const AddCrime = async (a ,b
  ) => {
    try {
      const conf = {
        ...confPOST,
        body: JSON.stringify({
            a,b
        })
      };
  
      let resp = await fetch(endpoint + "/crime", conf);
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
      let resp = await fetch(endpoint + "/crime", conf);
      return resp;
    } catch (error) {
      return error;
    }
  };
  export { AddCrime, GetAllCrimes};
  