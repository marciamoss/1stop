import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserMovies } from "../store";

function useFetchUserMovies() {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => {
    return {
      userId: state.user.userId,
    };
  });
  useEffect(() => {
    if (userId) {
      dispatch(fetchUserMovies(userId));
    }
  }, [dispatch, userId]);
}
export default useFetchUserMovies;
