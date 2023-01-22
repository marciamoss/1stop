import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

function useResetAlert(id, savedId, resetListItemSaveSuccess) {
    const dispatch = useDispatch();

    const resetAlert = useCallback(
        (id) => setTimeout(() => {
            dispatch(resetListItemSaveSuccess(id));
        }, 1000), [dispatch, resetListItemSaveSuccess]
    );
    
    useEffect(() => {
        if(savedId === id){
            resetAlert(savedId);
        }
    }, [savedId, id, dispatch, resetAlert]);

    return {
        resetAlert
    }
 
}

export default useResetAlert;
