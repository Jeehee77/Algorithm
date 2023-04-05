function solution(numbers) {
    return numbers.map(number => {
        // 짝수인 경우 1의 자리가 항상 0이기 때문에 1만 더해주면 조건에 만족한다.
        if (number % 2 === 0) return number + 1;
        
        /* 홀수인 경우 
         - 1의 자리수부터 검사하여 처음으로 0이 등장한 자리를 구한다.
         - 그 자리를 1로 바꾸고 해당 자리수 직전의 수를 0으로 바꾼다.
        */
        let number_bit = '0' + number.toString(2);
        let index = 0;
        for (let i = number_bit.length - 1; i >= 0; i--) {
            if (number_bit[i] === '0') {
                index = i;
                break;
            }
        }
        
        let result = number_bit.slice(0, index) + '10' + number_bit.slice(index + 2);
        return parseInt(result, 2);
    })
}
