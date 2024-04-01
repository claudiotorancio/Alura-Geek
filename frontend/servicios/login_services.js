
import { modalControllers } from "../modal.js";
import { baseURL } from "./product_services.js";

const signin = async (dataUser) => {

  try {
    const response = await fetch(`${baseURL}/api/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataUser)
    });
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
    }
    //manejo de la respuesta
    const data = await response.json();
    const user = data.user.username;

    //Uso de localStorage para guardar usuario
    sessionStorage.setItem('user', JSON.stringify(user));
    modalControllers.modalSuccessSignIn(user);

  } catch (error) {
    modalControllers.modalErrorSignIn();
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
    //manejo de la respuesta

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();

    // muestra de exito en pantalla

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

    //manejo de la respuesta

    if (!response.ok) {
      throw new Error(`Error during logout: ${response.status} - ${response.statusText}`);
    }
    //remover usuario de localStorage

    const user = JSON.parse(sessionStorage.getItem('user'))
    modalControllers.modalLogout(user);
    sessionStorage.removeItem('user');

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

