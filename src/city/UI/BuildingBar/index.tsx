import styles from './index.css';
import React, {MouseEvent} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setIsStartBuilding, State} from '../../Store';
import {BUILDING_IN_PANEL} from '../../constants';
import {EVENTS, Model2} from '../../interfaces';
import {ui} from '../index';

export const BuildingBar: React.FC = () => {
    const {isStartBuilding} = useSelector((state: State) => state);
    const dispatch = useDispatch();

    const onClick = (event: MouseEvent<HTMLLIElement>, item: Model2) => {
        ui.dispatchEvent(EVENTS.START_BUILDING, item);
        dispatch(setIsStartBuilding(true));
    };

    // const onMouseMove = (event: MouseEvent<HTMLLIElement>, item: Model2) => {
    // };

    return (
        <div className={styles.container}>
            <ul className={styles.list}>
                {isStartBuilding ? (
                    <div>Строим</div>
                ) : (
                    <>
                        {BUILDING_IN_PANEL.map((item) => (
                            <li
                                key={item.type}
                                onClick={(event: MouseEvent<HTMLLIElement>) =>
                                    onClick(event, item)
                                }
                            >
                                {item.name}
                            </li>
                        ))}
                    </>
                )}
            </ul>
        </div>
    );
};
