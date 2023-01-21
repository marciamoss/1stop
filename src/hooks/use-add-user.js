import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser } from '../store';

function useAddUser() {
    const dispatch = useDispatch();
    const {authUserId, newUser} = useSelector((state) => {
        return {
            authUserId: state.auth.authUserId,
            newUser: state.user.newUser
        };
    });
    useEffect(() => {
        if(newUser){
          dispatch(addUser(authUserId));
        }
    }, [ newUser, dispatch, authUserId]);
}
export default useAddUser;

