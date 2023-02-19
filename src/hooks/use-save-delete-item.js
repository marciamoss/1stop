import { useState } from "react";
import { useDispatch } from "react-redux";

function useSaveDeleteItem(
  savedList,
  listItem,
  idName,
  resetAlert,
  userId,
  saveFn,
  bookmarked
) {
  const dispatch = useDispatch();
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [previouslySaved, setPreviouslySaved] = useState(false);

  const handleClick = () => {
    if (!bookmarked) {
      if (
        !(savedList.filter((s) => s[idName] === listItem[idName]).length > 0)
      ) {
        dispatch(saveFn({ ...listItem, ...{ userId } }));
      } else {
        setPreviouslySaved(
          savedList.filter((s) => s[idName] === listItem[idName]).length > 0
        );
        resetAlert(listItem[idName]);
      }
    } else {
      setDeleteConfirm(true);
    }
  };

  return {
    deleteConfirm,
    setDeleteConfirm,
    previouslySaved,
    handleClick,
  };
}

export default useSaveDeleteItem;
