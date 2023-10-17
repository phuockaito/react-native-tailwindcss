import * as React from 'react';

import { useAppSelector, useAppDispatch } from './use-react-redux'
import { onIncrement, searchStore } from '../features'

export const useCounter = () => {
    const result = useAppSelector(searchStore);
    const dispatch = useAppDispatch();
    const handleIncrement = React.useCallback((value: number) => dispatch(onIncrement(value)), [dispatch])
    return {
        result,
        handleIncrement
    }
}
