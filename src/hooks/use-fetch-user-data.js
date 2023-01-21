import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserSongs, fetchUserNews, fetchUserMovies } from '../store';

function useFetchUserData() {
    const dispatch = useDispatch();
    const {userId} = useSelector((state) => {
        return {
            userId: state.user.userId,
        };
    });
    useEffect(() => {
        if(userId){
          dispatch(fetchUserSongs(userId));
          dispatch(fetchUserNews(userId));
          dispatch(fetchUserMovies(userId));
        }
    }, [dispatch, userId]);
}
export default useFetchUserData;

