import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "state/hooks";

/**
 * Хук для подгрузки данных таблиц
 *
 * @param needUpdateData: boolean - нужно ли получать данные
 * @param action - action для увеличения количества выводимых данных
 */
export const useScrollUpdate = (needUpdateData: boolean, action: ActionCreatorWithoutPayload) => {
    const [isNeedUpdatePage, setIsNeedUpdatePage] = useState(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isNeedUpdatePage) {
            try {
                dispatch(action());
            } finally {
                setIsNeedUpdatePage(false);
            }
        }
    }, [isNeedUpdatePage, dispatch, action]);

    const scrollCallback = useCallback(
        (event: Event) => {
            const container = event.target as HTMLDivElement;

            const { scrollHeight, scrollTop, clientHeight } = container;

            const threshold = scrollHeight - (scrollTop + clientHeight);

            if (threshold < 10 && needUpdateData) {
                setIsNeedUpdatePage(true);
            }
        },
        [needUpdateData]
    );

    return scrollCallback;
};
