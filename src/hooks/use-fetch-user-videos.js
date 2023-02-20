import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserVideos } from "../store";

function useFetchUserVideos() {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => {
    return {
      userId: state.user.userId,
    };
  });
  useEffect(() => {
    if (userId) {
      dispatch(fetchUserVideos(userId));
    }
  }, [dispatch, userId]);
}
export default useFetchUserVideos;
