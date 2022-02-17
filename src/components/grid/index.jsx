import React, { useEffect, useReducer, useState, useMemo } from 'react';
import classnames from 'classnames';
import queryWordList from '../../utils/queryWordList';
import KEY_WORDS from '../../constants/words';
import styles from './index.module.less';

const row = Array.from({ length: 6 }).map((_, i) => i);
const col = Array.from({ length: 5 }).map((_, i) => i);

const INIT_STATE = {
    inputIndex: [0, 0],
    wordList: row.map(_ => col.map(_ => '')),
    selectStates: row.map(_ => col.map(_ => 0)),
    conditions: {
        exact: [],
        nonPosition: [],
        nonWord: [],
    },
};




const Grid = ({ type, onCallback }) => {

    const onQuery = (queryConditions) => {
        const results = queryWordList(queryConditions);
        onCallback(results);
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
            case 'updateState':
                const { _rowIndex, _colIndex, type } = action.payload;
                let newStates = state.selectStates.map(e => [...e]);
                const oldValue = newStates[_rowIndex][_colIndex];
                newStates[_rowIndex][_colIndex] = oldValue === 0 ? type : 0;
                return {
                    ...state,
                    selectStates: newStates,
                };
            case 'search':
                const unique = arr => Array.from(new Set(arr))
                const conditions = {};
                let allWordList = [];
                state.wordList.forEach((item, rowIndex) => {
                    item.forEach((e, colIndex) => {
                        const selectedValue = state.selectStates[rowIndex][colIndex];
                        e && allWordList.push({
                            word: e,
                            type: selectedValue === 0
                                ? 'nonWord'
                                : (selectedValue === 0.5 ? 'nonPosition' : 'exact'),
                            colIndex: colIndex,
                        });
                    });
                });
                conditions['exact'] = allWordList
                    .filter(e => e.type === 'exact')
                    .map(e => ({
                        word: e.word,
                        position: [e.colIndex],
                    }))
                const exactWordList = conditions['exact'].map(e => e.word);
                // 删掉确定是exact的字母
                allWordList = allWordList.filter(e => !exactWordList.includes(e.word));

                conditions['nonPosition'] = allWordList
                    .filter(e => e.type === 'nonPosition')
                    .map(e => ({
                        word: e.word,
                        position: [e.colIndex],
                    }))
                    .reduce((total, current) => {
                        const index = total.map(e => e.word).indexOf(current.word);
                        if (index === -1) {
                            total.push(current);
                        } else {
                            !total[index].position.includes(current.position[0]) && total[index].position.push(...current.position)
                        }
                        return total;
                    }, []);
                const nonPositionWordList = conditions['nonPosition'].map(e => e.word);

                // 删掉确定是nonPosition的字母
                allWordList = allWordList.filter(e => !nonPositionWordList.includes(e.word))

                conditions['nonWord'] = unique(allWordList.map(e => e.word));
                onQuery(conditions);
                return {
                    ...state,
                    conditions,
                };
        }
    }

    const [state, dispatch] = useReducer(reducer, INIT_STATE);


    const onKeyup = e => {
        if (KEY_WORDS.includes(e.key)) {
            dispatch({
                type: 'input',
                inputKey: e.key,
            })
        } else if (e.key === 'Enter') {
            dispatch({
                type: 'search',
            })
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
        dispatch({
            type: 'updateState',
            payload: {
                _rowIndex: rowIndex,
                _colIndex: colIndex,
                type,
            },
        });
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
                        const yellowSelected = state.selectStates[rowIndex][colIndex] === 0.5;
                        const greenSelected = state.selectStates[rowIndex][colIndex] === 1;
                        return (
                            <li
                                className={classnames({
                                    [styles.col]: true,
                                    [styles.filled]: !!word,
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