import React, {useCallback, useEffect, useRef} from 'react';
import styles from './index.css';
import {useDispatch, useSelector} from 'react-redux';
import {ui} from '../index';
import {ElementSize, EVENTS} from '../../interfaces';
import {setIsStartBuilding, State} from '../../Store';

export const BuildingControls = () => {
    const {isStartBuilding} = useSelector((state: State) => state);
    const dispatch = useDispatch();

    const elementRef = useRef<HTMLDivElement>(null);

    const onOk = useCallback(() => {
        ui.dispatchEvent(EVENTS.ADD_BUILDING);
        dispatch(setIsStartBuilding(false));
    }, []);

    const onNOT = useCallback(() => {
        ui.dispatchEvent(EVENTS.CANCEL_BUILDING);
        dispatch(setIsStartBuilding(false));
    }, []);

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

    if (!isStartBuilding) {
        return null;
    }

    return (
        <div className={styles.container} ref={elementRef}>
            <button onClick={onOk}>OK</button>
            <button onClick={onNOT}>NOT</button>
        </div>
    );
};
