import React, { useEffect, useReducer, useState } from 'react';
import classnames from 'classnames';
import KEY_WORDS from '../../constants/words';
import styles from './index.module.less';

const row = Array.from({ length: 6 }).map((_, i) => i);
const col = Array.from({ length: 5 }).map((_, i) => i);

const INIT_STATE = {
    inputIndex: [0, 0],
    wordList: row.map(_ => col.map(_ => '')),
};
const reducer = (state, action) => {
    const getNewInputIndexByAdd = oldIndex => {
        const [oldRowIndex, oldColIndex] = oldIndex;
        let newRowIndex = oldRowIndex;
        let newColIndex = oldColIndex;
        if (oldColIndex < 4) {
            newColIndex = oldColIndex + 1;
        } else {
            newRowIndex = oldRowIndex + 1;
            newColIndex = 0;
        }
        return [newRowIndex, newColIndex];
    };
    const getNewInputIndexByReduce = oldIndex => {
        const [oldRowIndex, oldColIndex] = oldIndex;
        let newRowIndex = oldRowIndex;
        let newColIndex = oldColIndex;
        if (oldColIndex > 0) {
            newColIndex = oldColIndex - 1;
        } else if (oldRowIndex > 0) {
            newRowIndex = oldRowIndex - 1;
            newColIndex = 4;
        }
        return [newRowIndex, newColIndex];
    };

    const getnewWordListByAdd = ({
        inputIndex,
        oldWordList,
        inputKey,
    }) => {
        const [rowIndex, colIndex] = inputIndex;
        let newList = oldWordList.map(e => [...e]);
        newList[rowIndex][colIndex] = inputKey;
        return newList;
    };

    const getnewWordListByReduce = ({
        inputIndex,
        oldWordList,
    }) => {
        const [rowIndex, colIndex] = inputIndex;
        let newList = oldWordList.map(e => [...e]);
        newList[rowIndex][colIndex] = '';
        return newList;
    };

    switch (action.type) {
        case 'input':
            const [rowIndex, colIndex] = state.inputIndex;
            if (rowIndex === 6) return state;
            return {
                ...state,
                inputIndex: getNewInputIndexByAdd(state.inputIndex),
                wordList: getnewWordListByAdd({
                    inputIndex: state.inputIndex,
                    oldWordList: state.wordList,
                    inputKey: action.inputKey,
                })
            };
        case 'backspace':
            const newInputIndex = getNewInputIndexByReduce(state.inputIndex);
            return {
                ...state,
                inputIndex: newInputIndex,
                wordList: getnewWordListByReduce({
                    inputIndex: newInputIndex,
                    oldWordList: state.wordList
                })
            }
    }
}

const Grid = ({ type }) => {

    const [state, dispatch] = useReducer(reducer, INIT_STATE);
    const [selectStates, setSelectStates] = useState(row.map(_ => col.map(_ => -1)))

    const onKeyEnter = () => {

    };

    const onKeyup = e => {
        if (KEY_WORDS.includes(e.key)) {
            dispatch({
                type: 'input',
                inputKey: e.key,
            })
        } else if (e.key === 'Enter') {
            onKeyEnter();
        } else if (e.key === 'Backspace') {
            dispatch({
                type: 'backspace',
            })
        }
    }

    useEffect(() => {
        window.addEventListener('keyup', onKeyup);
        return () => {
            window.removeEventListener('keyup', onKeyup);
        };
    }, []);

    const onClickItem = ({
        word,
        rowIndex,
        colIndex,
        type,
    }) => {
        let newStates = selectStates.map(e => [...e]);
        const oldValue = newStates[rowIndex][colIndex];
        newStates[rowIndex][colIndex] = oldValue === -1 ? type : -1;
        setSelectStates(newStates);
    };

    return (
        <div className={styles.container}>
            {row.map(rowIndex => (
                <ul
                    key={rowIndex}
                    className={styles.row}
                >
                    {col.map(colIndex => {
                        const word = state.wordList[rowIndex][colIndex];
                        const graySelected = selectStates[rowIndex][colIndex] === 0;
                        const yellowSelected = selectStates[rowIndex][colIndex] === 0.5;
                        const greenSelected = selectStates[rowIndex][colIndex] === 1;
                        return (
                            <li
                                className={classnames({
                                    [styles.col]: true,
                                    [styles.filled]: !!word,
                                    [styles.gray]: graySelected,
                                    [styles.yellow]: yellowSelected,
                                    [styles.green]: greenSelected,
                                })}
                                key={colIndex}
                                onClick={() => {
                                    onClickItem({
                                        word,
                                        rowIndex,
                                        colIndex,
                                        type,
                                    })
                                }}
                            >
                                {word.toUpperCase()}
                            </li>
                        );
                    })}
                </ul>
            ))}
        </div>
    )
};

export default Grid;