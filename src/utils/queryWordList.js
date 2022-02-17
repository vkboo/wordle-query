import { WORDS } from '../constants/wordlist';
// var conditions = {
//     exact: [
//         // { word: 't', position: [3] },
//     ],
//     nonPosition: [
//         { word: 't', position: [3] },
//         { word: 'h', position: [4] },
//         { word: 'i', position: [2, 3] },
//         { word: 'l', position: [3] },
//     ],
//     nonWord: ['e', 'a', 'r', 'q', 'u', 'c', 'k', 'p', 'w', 'o', 'd']
// }
const queryWordList = (conditions) => {
    // Exact
    let newList = WORDS.filter(w => {
        if (conditions.exact.length === 0) return true;
        return conditions.exact.every(({ word, position }) => {
            return w[position[0]] === word;
        });
    });


    // nonPosition
    newList = WORDS.filter(w => {
        return conditions.nonPosition.every(({ word, position }) => {
            const wordIndex = w.indexOf(word);
            return wordIndex > -1 && position.every(i => i !== wordIndex);
        })
    });

    // nonWord
    if (newList.length > 0) {
        newList = newList.filter(w => {
            return conditions.nonWord.every(_w => !w.includes(_w));
        });
    }
}

export default queryWordList;