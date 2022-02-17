import React from 'react';
import styles from './index.module.less';
const AnswerList = ({ data }) => {
    return (
        <ul className={styles.container}>
            {data.map(e => {
                return (
                    <li key={e}>{e}</li>
                )
            })}
        </ul>
    )
};

export default AnswerList;