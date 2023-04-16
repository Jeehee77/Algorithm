function solution(data, col, row_begin, row_end) {
    /*
        1. data를 col번째 컬럼을 기준으로 오름차순 정렬한다.
            1-1. 같은 값이면 첫번째 컬럼을 기준으로 내림차순 정렬한다.
        2. row_begin번째부터 row_end번째까지만 남긴다.
        3. 각 컬럼의 값을 idx로 나눈 나머지들의 합을 저장한다. => S_i
        4. S_i들에 XOR 연산을 수행한 결과를 반환한다.
    */
    return data.sort((a, b) => {
        if (a[col-1] < b[col-1]) {
            return -1;
        }
        if (a[col-1] > b[col-1]) {
            return 1;
        }
        if (a[col-1] === b[col-1]) {
            return b[0] - a[0];
        }
    }).map((tuple, idx) => {
        if (idx + 1 >= row_begin && idx + 1 <= row_end) {
            return tuple.reduce((acc, cur) => acc + (cur % (idx+1)), 0);
        } 
        return 0;
    }).filter((_, idx) => idx + 1 >= row_begin && idx + 1 <= row_end)
    .reduce((acc, cur) => acc ^ cur);
}