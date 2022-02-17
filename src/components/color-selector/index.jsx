import React from 'react';
import classnames from 'classnames';
import styles from './index.module.less';
const ModeSelector = ({ value, onChange }) => {
    return (
        <ul className={styles.container}>
            <li
                className={classnames({
                    [styles.gray]: true,
                    [styles.selected]: value === 0,
                })}
                onClick={() => {
                    onChange(0);
                }}
            >

            </li>
            <li
                className={classnames({
                    [styles.green]: true,
                    [styles.selected]: value === 1,
                })}
                onClick={() => {
                    onChange(1);
                }}
            >

            </li>
            <li
                className={classnames({
                    [styles.yellow]: true,
                    [styles.selected]: value === 0.5,
                })}
                onClick={() => {
                    onChange(0.5);
                }}
            ></li>
        </ul>
    )
};

export default ModeSelector;