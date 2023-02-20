import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserNews } from "../store";

function useFetchUserNews({ bookmarked }) {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => {
    return {
      userId: state.user.userId,
    };
  });
  useEffect(() => {
    if (userId && bookmarked) {
      dispatch(fetchUserNews(userId));
    }
  }, [dispatch, userId, bookmarked]);
}
export default useFetchUserNews;
