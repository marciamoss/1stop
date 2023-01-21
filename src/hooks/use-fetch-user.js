import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../store';

function useFetchUser() {
    const dispatch = useDispatch();
    const {signedIn, authUserId} = useSelector((state) => {
        return {
            signedIn: state.auth.signedIn,
            authUserId: state.auth.authUserId,
        };
    });
    useEffect(() => {
        if(signedIn) {
          dispatch(fetchUser(authUserId));
        }
    }, [signedIn, dispatch, authUserId]);
}
export default useFetchUser;

