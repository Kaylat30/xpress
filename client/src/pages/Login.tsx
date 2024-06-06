// import { Form, Link } from "react-router-dom"
// import { useState, } from "react";
// // import { toast } from "react-toastify";

// export default function Login()
// { 
//     const [showPassword, setShowPassword] = useState(false);
//     //const navigation = useNavigation()
    
//       const handleShowPassword = () => {
//         setShowPassword(!showPassword); 
//       };
    
//       return (
//         <>
//           {/* form section */}
//           <div className='flex items-center flex-col my-10 space-y-3 lg:ml-28 lg:mr-28 xsm:ml-7 xsm:mr-7'>
//             <h1 className="font-bold text-xl">Login</h1>
//             <Form className='flex flex-col items-center space-y-7 shadow-md p-10' replace method="post">
//               <input type='text' placeholder='email' name="email"  className='border md:w-96 md:p-4 xsm:p-2 xsm:w-72 rounded-lg' />
//               <input type={showPassword ? "text" : "password"} name="password" placeholder='Password' className='border md:w-96 md:p-4 xsm:p-2 xsm:w-72 rounded-lg' />
//               <label className="cursor-pointer"><input type="checkbox" className="form-checkbox h-5 w-5" checked={showPassword} onChange={handleShowPassword} /> showPassword</label>
//               <button
//                 // disabled={navigation.state === "submitting"}
//                 type='submit'
//                 className="md:p-4 xsm:p-2 xsm:px-4 md:px-9 font-bold text-white bg-brightBlue rounded-md baseline hover:shadow-2xl"
//               >
//                 {/* {navigation.state === "submitting"
//                     ? "Signing in..."
//                     : "SIGN IN"
//                 } */}
//                 SIGN IN
//               </button>
//             </Form>
//             <div>Do not have an account? <Link className="text-brightGreen" to='/signup'>Sign up</Link></div>
//           </div>
//         </>
//       );
//     } 



import { Form, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAsync, selectStatus, selectError, selectUser } from '../slice/userSlice'; 
import { AppDispatch } from "../store";

export default function Login() { 
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword); 
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUserAsync({ email, password }));
  };

  useEffect(() => {
    if (user) {
      switch (user.role) {
        case 'driver':
          navigate('/driver');
          break;
        case 'cashier':
          navigate('/cashier');
          break;
        case 'admin':
          navigate('/admin');
          break;
        default:
          break;
      }
    }
  }, [user, navigate]);

  return (
    <>
      {/* form section */}
      <div className='flex items-center flex-col my-10 space-y-3 lg:ml-28 lg:mr-28 xsm:ml-7 xsm:mr-7'>
        <h1 className="font-bold text-xl">Login</h1>
        {error && <div className="text-red-500">{error}</div>}
        <Form onSubmit={handleSubmit} className='flex flex-col items-center space-y-7 shadow-md p-10' replace method="post">
          <input 
            type='text' 
            placeholder='Email' 
            name="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className='border md:w-96 md:p-4 xsm:p-2 xsm:w-72 rounded-lg' 
          />
          <input 
            type={showPassword ? "text" : "password"} 
            name="password" 
            placeholder='Password' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className='border md:w-96 md:p-4 xsm:p-2 xsm:w-72 rounded-lg' 
          />
          <label className="cursor-pointer">
            <input 
              type="checkbox" 
              className="form-checkbox h-5 w-5" 
              checked={showPassword} 
              onChange={handleShowPassword} 
            /> 
            Show Password
          </label>
          <button
            type='submit'
            className="md:p-4 xsm:p-2 xsm:px-4 md:px-9 font-bold text-white bg-brightBlue rounded-md baseline hover:shadow-2xl"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? "Signing in..." : "SIGN IN"}
          </button>
        </Form>
        
        <div>Do not have an account? <Link className="text-brightGreen" to='/signup'>Sign up</Link></div>
      </div>
    </>
  );
}
