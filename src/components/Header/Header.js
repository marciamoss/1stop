import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { authInfo, authChange } from '../../store';

const Header = () => {
    const dispatch = useDispatch();
    const {signedIn, userName, showError, errorMessage} = useSelector((state) => {
        return {
            signedIn: state.auth.data.signedIn,
            userName: state.auth.data.userName, 
            loginError: state.auth.data.loginError,   
            showError: state.auth.data.showError,
            errorMessage: state.auth.data.errorMessage
        };
    });
    return (
        <nav className="py-6 px-10 w-full bg-black">
            <div className="flex justify-between items-center container mx-auto bg-black">
                <div><h1 className="text-xl text-zinc-50 font-bold">1Stop</h1></div>
                <>{showError ? <div><h1 className="text-xl text-red-600 font-bold ml-5 mr-5">Signin Failure: {errorMessage}<br></br>(clear cache & refresh page to try again)</h1></div> : ''}</>
                <>{signedIn ? <div><h1 className="text-xl text-zinc-50 font-bold">Hello {userName}</h1></div> : ''}</>
                <button onClick={()=>dispatch(authChange(authInfo))} className="text-xl text-zinc-50 font-bold">
                    <div className="flex items-center"><span className="mr-1">{!signedIn ? 'Sign In' : 'Sign Out'}</span><FcGoogle/></div>
                </button> 
            </div>
        </nav>
    );
}

export default Header;
 