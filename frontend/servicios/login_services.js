
import { modalControllers } from "../modal.js";
import { baseURL } from "./product_services.js";

const signin = async (dataSignin) => {
  try {
      const response = await fetch(`${baseURL}/api/signin`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(dataSignin)
      });
      if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      const user = data.user.username;

      localStorage.setItem('user', JSON.stringify(user));
      modalControllers.modalSuccess(user);
  } catch (error) {
      modalControllers.modalError();
      console.error(error);
  }
};


const signup = async (dataSignup) => {
  try {
      const response = await fetch(`${baseURL}/api/signup`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(dataSignup)
      });

      if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      modalControllers.modalSuccessSignup();
  } catch (error) {
      modalControllers.modalErrorSignup();
      console.error(error);
  }
};

  
const logout = async () => {
  try {
      const response = await fetch(`${baseURL}/api/logout`, {
          method: "DELETE",
      });

      if (!response.ok) {
          throw new Error(`Error during logout: ${response.status} - ${response.statusText}`);
      }

      localStorage.removeItem('user');
      modalControllers.modalLogout();
  } catch (error) {
      console.error('Error during logout:', error);
  }
};


        
export const loginServices = {
    signin,
    signup,
    logout
  }
















/*import httpProxy from 'http-proxy';
import { modalControllers } from '../modal.js';




const baseURL =  'http://localhost:3000';

const proxy = httpProxy.createProxyServer({ target: baseURL });


const signin = async (dataSignin) => {
    return new Promise((resolve, reject) => {
      const requestData = {
        target: `${baseURL}/api/signin`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataSignin),
      };
  
      proxy.web(requestData, {}, (err, response) => {
        if (err) {
          reject(err);
        } else {
          response.json()
            .then(data => {
              try {
                const user = data.user.username;
                localStorage.setItem('user', JSON.stringify(user));
              } catch (err) {
                console.error(err);
              }
  
              if (data) {
                modalControllers.modalSuccess(data.user.username);
                resolve(data);
              }
            })
            .catch(error => {
              modalControllers.modalError();
              reject(error);
            });
        }
      });
    });
  };

const signup = async (dataSignup) => {
  return new Promise((resolve, reject) => {
    const requestData = {
      target: `${baseURL}/api/signup`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataSignup),
    };

    proxy.web(requestData, {}, (err, response) => {
      if (err) {
        reject(err);
      } else {
        response.json()
          .then(data => {
            if (data) {
              modalControllers.modalSuccessSignup();
              resolve(data);
            }
          })
          .catch(error => {
            modalControllers.modalErrorSignup();
            reject(error);
          });
      }
    });
  });
};

const logout = async () => {
    return new Promise((resolve, reject) => {
      const requestData = {
        target: `${baseURL}/api/logout`,
        method: "POST",
      };
  
      proxy.web(requestData, {}, (err, response) => {
        if (err) {
          reject(err);
        } else {
          localStorage.removeItem('user');
          modalControllers.modalLogout();
          resolve(response);
        }
      });
    });
  };

  export const loginServices = {
    signin,
    signup,
    logout
  }*/

