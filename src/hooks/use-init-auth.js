import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authInfo, authChange } from '../store';

function useInitAuth() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authChange(authInfo, true))
    },[dispatch])
}

export default useInitAuth;