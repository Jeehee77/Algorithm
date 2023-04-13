function solution(elements) {
    let result = new Set();
    
    /* 
        길이가 i인 연속 부분 수열의 합을 구한다.
        - 기존 수열에서 i-1개만큼의 원소를 뒤에 덧붙여준다.
        - 0번 원소부터 i개 만큼의 부분 수열을 만들어 합을 구한다.
    */
    for (let i = 1; i <= elements.length; i++) {
        let target = elements.concat(elements.slice(0, i-1));
        for (let j = 0; j < elements.length; j++) {
            let sum = target.slice(j, j + i).reduce((acc, cur) => acc + cur);
            result.add(sum);
        }
    }
    
    return result.size;
}