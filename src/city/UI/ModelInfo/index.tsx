import React, {useCallback, useEffect, useState} from 'react';
import {ui} from '../index';
import {ElementSize, EVENTS, Model2} from '../../interfaces';
import {ClickModelPayload} from '../../interfaces/payloads';
import styles from './index.css';
import {setIsMovingModel, useAppDispatch} from '../../Store';

export const ModelInfo = () => {
    const [data, setData] = useState<{
        model: Model2;
        coords: ElementSize;
    } | null>(null);

    const dispatch = useAppDispatch();

    const show = useCallback((payload: ClickModelPayload) => {
        setData(payload);
    }, []);

    const changeCoords = useCallback(
        (coords: ElementSize) => {
            if (data) {
                console.log(data, 'data');
                setData({
                    model: data.model,
                    coords,
                });
            }
        },
        [data],
    );

    const onClose = () => {
        setData(null);
    };

    const onMove = () => {
        if (data) {
            ui.dispatchEvent(EVENTS.START_MOVING_MODEL, {...data.model});
        }
        dispatch(setIsMovingModel(true));
        setData(null);
    };

    const onRemove = () => {
        if (data) {
            ui.dispatchEvent(EVENTS.REMOVE_MODEL, {...data.model});
        }
        setData(null);
    };

    useEffect(() => {
        ui.addEventListener(EVENTS.CLICK_MODEL, show);
        ui.addEventListener(EVENTS.CHANGE_BUILDINGS_COORDS, changeCoords);

        return () => {
            ui.removeEventListener(show);
            ui.removeEventListener(changeCoords);
        };
    }, [show, changeCoords]);

    if (!data) {
        return null;
    }

    return (
        <div
            className={styles.container}
            style={{top: data.coords.top + 'px', left: data.coords.left + 'px'}}
        >
            <div>id - {data.model.id}</div>
            <div>название - {data.model.name}</div>

            <button onClick={onClose}>Закрыть</button>
            <button onClick={onMove}>Переместить</button>
            <button onClick={onRemove}>Удалить</button>
        </div>
    );
};
