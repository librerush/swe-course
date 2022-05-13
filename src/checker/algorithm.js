import { full_dictionary } from './dic';

const SUGGESTION_LIMIT = 5;

function binarySearch(ar, el, compare_fn) {
    let m = 0;
    let n = ar.length - 1;
    while (m <= n) {
        let k = (n + m) >> 1;
        let cmp = compare_fn(el, ar[k]);
        if (cmp > 0) {
            m = k + 1;
        } else if (cmp < 0) {
            n = k - 1;
        } else {
            return k;
        }
    }
    return -m - 1;
}

const minimumEditDistance = (word1, word2) => {
    const n = word1.length
    const m = word2.length
    const dp = new Array(m + 1).fill(0).map(item => [])

    /*
      fill dp matrix with default values -
          - first row is filled considering no elements in word2.
          - first column filled considering no elements in word1.
      */

    for (let i = 0; i < n + 1; i++) {
        dp[0][i] = i
    }

    for (let i = 0; i < m + 1; i++) {
        dp[i][0] = i
    }

    /*
    indexing is 1 based for dp matrix as we defined some known values at first row and first column/
    */

    for (let i = 1; i < m + 1; i++) {
        for (let j = 1; j < n + 1; j++) {
            const letter1 = word1[j - 1]
            const letter2 = word2[i - 1]

            if (letter1 === letter2) {
                dp[i][j] = dp[i - 1][j - 1]
            } else {
                dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - 1], dp[i][j - 1]) + 1
            }
        }
    }

    return dp[m][n]
}

export function find(word) {
    console.log('find: ' + word)

    if (!isNaN(parseInt(word))) {
        return [];
    }

    let minDist = 1000000000;
    let minStr = '';
    let attempt = 0;

    let index = binarySearch(full_dictionary, word,
        (a, b) => a === b ? 0 : a > b ? 1 : -1);

    if (index < 0) {
        index = Math.abs(index) - 1;
    }

    let suggestions = [];

    for (let i = index - 1000 >= 0 ? index - 1000 : index; i < full_dictionary.length; i++) {
        let dist = minimumEditDistance(full_dictionary[i], word);

        if (dist < minDist) {
            minDist = dist;
            minStr = full_dictionary[i];

            suggestions = []
            suggestions.push(minStr);

        } else if (dist === minDist) {
            if (suggestions.length < SUGGESTION_LIMIT) {
                suggestions.push(full_dictionary[i]);
            }
        }

        if (attempt > 5000) {
            break;
        }

        attempt += 1;
    }

    return suggestions;
}