function solution(s) {
    const max = Math.floor(s.length / 2);
    let answer = s.length;
    
    for (let i = max; i > 0; i--) {
        // 문자열을 i개 단위로 압축
        let str = s;
        let list = [];
        
        // 반복횟수와 문자열을 list에 저장한다. ex. [[2, 'a'], [1, 'b']]
        while (str.length > 0) {
            let cur = str.substring(0, i);
            str = str.substring(i);
                
            let last = list[list.length - 1];
            if (last && last[1] === cur) {
                list.pop();
                list.push([last[0] + 1, cur]);
            } else {
                list.push([1, cur]);
            }
        }
            
        // 만들어진 압축 문자열의 길이 구하기
        let result = list.map(([n, s]) => {
            if (n === 1) {
                return s;
            } else {
                return String(n) + s;
            }
        }).join('').length;
        
        if (result < answer) answer = result;
    }
    return answer;
}