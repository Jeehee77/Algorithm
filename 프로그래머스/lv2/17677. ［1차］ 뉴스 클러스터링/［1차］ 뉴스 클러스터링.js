function solution(str1, str2) {
    /*
        A와 B의 합집합 요소 개수는
        (A의 개수 - 교집합 개수) + (B의 개수 - 교집합 개수) + 교집합 개수
        
        <교집합 찾기>
        - A의 한 요소가 B에 존재하는지 검사한다.
        - A의 한 요소가 B에 존재한다면 교집합에 요소를 추가하고, B의 해당 요소를 ''으로 변경한다. 
        ( A에 'ab'가 2번 존재하고 B에 'ab'가 한 번 존재하는 경우 
          교집합에 'ab'가 두 번 추가되는 경우를 방지하기 위함이다.)
        - 교집합에 요소가 추가될때마다 미리 저장해놓은 A, B의 length값을 하나씩 줄이기
    */
    // 각 문자열로 다중집합 만들기
    const words1 = getElements(str1);
    const words2 = getElements(str2);
    
    const common = [];
    let length1 = words1.length;
    let length2 = words2.length;
    for (let i = 0; i < words1.length; i++) {
        let ele = words1[i];
        let idx = words2.indexOf(ele);
        if (idx !== -1) {
            common.push(ele);
            length1--;
            length2--;
            words2[idx] = '';
        }
    }
    
    const sum_length = length1 + length2 + common.length;
    let answer;
    if (common.length === 0 && sum_length === 0) {
        answer = 65536;
    } else if (common.length === 0 && sum_length > 0) {
        answer = 0;
    } else {
        answer = (common.length / sum_length) * 65536;
    }
    return parseInt(answer );
}

function getElements(arr) {
    const result = [];
    const reg = /[a-zA-Z]/;
    for (let i = 0; i < arr.length-1; i++) {
        if (reg.test(arr[i]) && reg.test(arr[i+1])) {
            let word = arr[i] + arr[i+1];
            result.push(word.toUpperCase());
        }
    }
    return result;
}