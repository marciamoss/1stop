import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserVideos } from "../store";

function useFetchUserVideos({ bookmarked }) {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => {
    return {
      userId: state.user.userId,
    };
  });
  useEffect(() => {
    if (userId && bookmarked) {
      dispatch(fetchUserVideos(userId));
    }
  }, [dispatch, userId, bookmarked]);
}
export default useFetchUserVideos;
