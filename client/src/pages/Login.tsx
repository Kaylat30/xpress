import { Form, Link } from "react-router-dom"
import { useState, } from "react";
// import { toast } from "react-toastify";

export default function Login()
{ 
    const [showPassword, setShowPassword] = useState(false);
    //const navigation = useNavigation()
    
      const handleShowPassword = () => {
        setShowPassword(!showPassword); 
      };
    
      return (
        <>
          {/* form section */}
          <div className='flex items-center flex-col my-10 space-y-3 lg:ml-28 lg:mr-28 xsm:ml-7 xsm:mr-7'>
            <h1 className="font-bold text-xl">Login</h1>
            <Form className='flex flex-col items-center space-y-7 shadow-md p-10' replace method="post">
              <input type='text' placeholder='email' name="email"  className='border md:w-96 md:p-4 xsm:p-2 xsm:w-72 rounded-lg' />
              <input type={showPassword ? "text" : "password"} name="password" placeholder='Password' className='border md:w-96 md:p-4 xsm:p-2 xsm:w-72 rounded-lg' />
              <label className="cursor-pointer"><input type="checkbox" className="form-checkbox h-5 w-5" checked={showPassword} onChange={handleShowPassword} /> showPassword</label>
              <button
                // disabled={navigation.state === "submitting"}
                type='submit'
                className="md:p-4 xsm:p-2 xsm:px-4 md:px-9 font-bold text-white bg-brightBlue rounded-md baseline hover:shadow-2xl"
              >
                {/* {navigation.state === "submitting"
                    ? "Signing in..."
                    : "SIGN IN"
                } */}
                SIGN IN
              </button>
            </Form>
            <div>Do not have an account? <Link className="text-brightGreen" to='/signup'>Sign up</Link></div>
          </div>
        </>
      );
    } 

