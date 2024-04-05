import { modalControllers } from "./modal.js";
import { loginServices } from "./servicios/login_services.js";


const signin = async () => {
    modalControllers.baseModal();
    const modal = document.getElementById('modal');
    const loginInicio = modal.querySelector('[data-table]');
    loginInicio.innerHTML = `
        <div class="card text-center">
            <div class="card-header">
                <h3>SignIn</h3>
            </div>
            <div class="card-body">
                <form action="/api/signin" method="post" data-signin>
                    <div class="form-group mt-3">
                        <input type="text" id="username" name="username" placeholder="Username" class="form-control" required required autocomplete="current-password">
                    </div>
                    <div class="form-group mt-3">
                        <input type="password" id="password" name="password" placeholder="Password" class="form-control" required>
                    </div>
                    <div class="form-group mt-3">
                        <button class="btn btn-success btn-block">
                            SignIn
                        </button>
                        <p class="help">Don't have an account? <a href="" data-btn>Sign up</a></p>
                    </div>
                </form>
            </div>
        </div>
    `;

    loginInicio.classList.add("modalVisor");

    const formSignin = document.querySelector('[data-signin]');
    formSignin.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementsByName('username')[0].value;
        const password = document.getElementsByName('password')[0].value;

        const signinData = {
            username,
            password
        }
       
        try {
            const response = await loginServices.signin(signinData); 
            if(response) {
                window.location.href = '/index.html'
            }
        } catch (err) {

            console.error(err.message);
        }
    });
    const btn = document.querySelector('[data-btn]');
    btn.addEventListener('click', (e) => {
        e.preventDefault();
     signup()
    });
};

const signup = () => {
    modalControllers.baseModal()
    const modal = document.getElementById('modal');
    const loginInicio = modal.querySelector('[data-table]');
    loginInicio.innerHTML = `
            <div class="card text-center">
                <div class="card-header">
                    <h3>SignUp</h3>
                </div>
                <div class="card-body">
                    <form action="/api/signup" method="post" data-signup>
                    <div class="form-group mt-3">
                        <input type="text" name="username" placeholder="Username" class="form-control" required>
                    </div>
                    <div class="form-group mt-3">
                        <input type="password"  name="password" placeholder="Password" class="form-control" required>
                    </div>
                    <div class="form-group mt-3">
                        <button class="btn btn-success btn-block">
                            SignUp
                        </button>
                    </div>
                    </form>
                </div>
            </div>
    `
    loginInicio.classList.add("modalVisor");
    const formSignup = document.querySelector('[data-signup]');
    formSignup.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = document.getElementsByName('username')[0].value;
        const password = document.getElementsByName('password')[0].value;

        const signupData = {
            username,
            password
        }
      
        try {
           await loginServices.signup(signupData);
           
        } catch (err) {
            console.error(err.message);
        }
      
    });

}


export const loginControllers = {
    signin,
    signup,


}