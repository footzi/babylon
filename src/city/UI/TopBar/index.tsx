import styles from './index.css';
import React from 'react';

export const TopBar: React.FC = () => {
    return (
        <div className={styles.container}>
            <ul className={styles.list}>
                <li>Население: 1</li>
                <li>$: 100</li>
                <li>Эл-во: 5000</li>
                <li>Вода: 5000</li>
                <li>Древесина: 0</li>
                <li>Сталь: 0</li>
            </ul>
        </div>
    );
};
