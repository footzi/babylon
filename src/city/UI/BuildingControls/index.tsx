import React, {useCallback, useEffect, useRef} from 'react';
import styles from './index.css';
import {ui} from '../index';
import {ElementSize, EVENTS} from '../../interfaces';
import {
    setIsMovingModel,
    setIsStartBuilding,
    useAppSelector,
    useAppDispatch,
} from '../../Store';

export const BuildingControls = () => {
    const {isStartBuilding, isMovingModel} = useAppSelector((state) => state);
    const dispatch = useAppDispatch();

    const elementRef = useRef<HTMLDivElement>(null);

    const onOk = useCallback(() => {
        if (isStartBuilding) {
            ui.dispatchEvent(EVENTS.ADD_BUILDING);
            dispatch(setIsStartBuilding(false));
        }

        if (isMovingModel) {
            ui.dispatchEvent(EVENTS.END_MOVING_MODEL);
            dispatch(setIsMovingModel(false));
        }
    }, [isStartBuilding, isMovingModel]);

    const onNOT = useCallback(() => {
        if (isStartBuilding) {
            ui.dispatchEvent(EVENTS.CANCEL_BUILDING);
            dispatch(setIsStartBuilding(false));
        }

        if (isMovingModel) {
            ui.dispatchEvent(EVENTS.CANCEL_MOVING_MODEL);
            dispatch(setIsMovingModel(false));
        }
    }, [isStartBuilding, isMovingModel]);

    const changePosition = useCallback((coords: ElementSize) => {
        if (elementRef?.current) {
            elementRef.current.style.top = coords.top + 'px';
            elementRef.current.style.left = coords.left + 'px';
        }
    }, []);

    useEffect(() => {
        ui.addEventListener<ElementSize>(
            EVENTS.CHANGE_BUILDINGS_COORDS,
            changePosition,
        );

        return () => ui.removeEventListener(changePosition);
    }, []);

    if (!isStartBuilding && !isMovingModel) {
        return null;
    }

    return (
        <div className={styles.container} ref={elementRef}>
            <button onClick={onOk}>OK</button>
            <button onClick={onNOT}>NOT</button>
        </div>
    );
};
