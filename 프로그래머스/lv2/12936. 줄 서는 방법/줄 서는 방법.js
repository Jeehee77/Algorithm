function solution(n, k) {
    /*
        - n = 3, k = 5, unlined = [1, 2, 3], result = []
        - 어떤 숫자 a가 제일 처음에 줄 서는 방법은 (n - 1)!개이다.
        - 숫자 1, 2, 3이 처음에 줄 서는 방법은 각각 2개씩이다.
        - 따라서 k가 1, 2면 첫번째가 1, k가 3,4면 첫번째가 2, k가 5,6면 첫번째가 3이다.
        - k가 5이니 result = [3], unlined = [1, 2], k = 5 - (2 * 2!) = 1이 된다.
        - unlined에 숫자가 하나 남을때까지 위의 과정을 반복한다.
    */
    
    let result = [];
    const unlined = new Array(n).fill(1).map((a, idx) => a + idx);
    
    while (unlined.length > 1 && k !== 1) {
        let cnt = factorial(unlined.length - 1);
        let first_idx = Math.ceil(k / cnt) - 1;
        result.push(unlined[first_idx]);
        unlined.splice(first_idx, 1);
        k = k - (first_idx * cnt);
    }    
    return result.concat(unlined);
}

function factorial(n) {
    if (n === 0) return 1;
    if (n === 1) return 1;
    return n * factorial(n-1);
}