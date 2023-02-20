import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserMovies } from "../store";

function useFetchUserMovies({ bookmarked }) {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => {
    return {
      userId: state.user.userId,
    };
  });
  useEffect(() => {
    if (userId && bookmarked) {
      dispatch(fetchUserMovies(userId));
    }
  }, [dispatch, userId, bookmarked]);
}
export default useFetchUserMovies;
