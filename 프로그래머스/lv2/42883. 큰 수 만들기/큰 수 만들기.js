function solution(number, k) {
    /*
        - 완성해야 하는 answer의 길이 answer_size는 number.length - k이다.
        - answer_size만큼 매번 정해진 범위 내에서 가장 큰 숫자를 골라 answer에 담는다.
        
        예시로 이해하기
        -  '1231234' 에서 3개를 제거하여 4 크기의 문자열을 만든다고 가정한다.
        
        1. 4 크기의 문자열을 만들어야 하기 때문에 number에서 고른 숫자 뒤에 최소 3개의 숫자가 존재해야 한다. 
        - 0번부터 3번 숫자 중 큰 수를 골라 answer에 담는다. answer = '3'.
        - 다음 숫자들은 선택된 숫자 뒤에 있는 숫자들이어야 하기 때문에 number를 변경한다. number = '1234'
        2. 3 크기의 문자열을 만들어야 하기 때문에 number에서 고른 숫자 뒤에 최소 2개의 숫자가 존재해야 한다. 
        - 0번부터 1번 숫자 중 큰 수를 골라 answer에 담는다. answer = '32'.
        - 다음 숫자들은 선택된 숫자 뒤에 있는 숫자들이어야 하기 때문에 number를 변경한다. number = '34'
        3. 2 크기의 문자열을 만들어야 하는데 현재 number의 크긱 2이다. 따라서 number 전체를 answer에 담는다.
        - answer = '3234'
    */
    var answer = '';
    const answer_size = number.length - k;
    
    while(answer.length < answer_size) {
        let target_size = answer_size - answer.length;
        let lastIdx = number.length - target_size;
        
        if (lastIdx !== 0) {
            const [max, idx] = getMaxNumAndIdx(number, 0, lastIdx);
            answer += max;
            number = number.substring(idx + 1);
        } else {
            answer += number;
        }
    }
    
    return answer;
}

// number배열의 start부터 end까지의 숫자 중 최대값과 그 인덱스 반환.
function getMaxNumAndIdx(number, start = 0, end = number.length) {
    let max = number[start];
    let idx = start;
    for (let i = start + 1; i <= end; i++) {
        if (number[i] > max) {
            max = number[i];
            idx = i;
        }
        
        if (max === '9') break;
    }
    return [max, idx];
}