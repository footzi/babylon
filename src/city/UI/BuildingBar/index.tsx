import styles from './index.css';
import React from 'react';

export const BuildingBar: React.FC = () => {
    return (
        <div className={styles.container}>
            <ul className={styles.list}>
                <li draggable>Жилой дом</li>
                <li draggable>Электро-станция</li>
            </ul>
        </div>
    );
};
