import React from 'react';
import classnames from 'classnames';
import styles from './selected-dots.module.less';

const SelectedDots = ({ value, onChange, type }) => {
    const onClick = (index, checked) => {
        let values = [...value];
        if (checked) {
            values.push(index);
            onChange(values.sort());
        } else {
            const idx = values.indexOf(index);
            values.splice(idx, 1);
        }
        onChange(values);
    };
    return (
        <ul className={styles.container}>
            {[0, 1, 2, 3, 4].map(i => {
                const checked = value.includes(i);
                return (
                    <li
                        key={i}
                        className={classnames({
                            [styles.dot]: true,
                            [styles[type]]: true,
                            [styles.selected]: checked,
                        })}
                        onClick={() => onClick(i, !checked)}
                    >
                        {i}
                    </li>
                );
            })}
        </ul>
    );
};

export default SelectedDots;