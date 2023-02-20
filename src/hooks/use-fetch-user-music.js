import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserSongs } from "../store";

function useFetchUserMusic({ bookmarked }) {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => {
    return {
      userId: state.user.userId,
    };
  });
  useEffect(() => {
    if (userId && bookmarked) {
      dispatch(fetchUserSongs(userId));
    }
  }, [dispatch, userId, bookmarked]);
}
export default useFetchUserMusic;
