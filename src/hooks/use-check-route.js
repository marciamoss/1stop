import { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { authInfo } from '../store';

function useCheckRoute() {
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(authInfo({validRoute: (["/", "/music", "/news", "/movies", "/videos"].filter(r => r===location.pathname)).length>0})) 
    },[dispatch, location.pathname])
}
export default useCheckRoute;

