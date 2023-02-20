import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserSongs } from "../store";

function useFetchUserMusic() {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => {
    return {
      userId: state.user.userId,
    };
  });
  useEffect(() => {
    if (userId) {
      dispatch(fetchUserSongs(userId));
    }
  }, [dispatch, userId]);
}
export default useFetchUserMusic;
