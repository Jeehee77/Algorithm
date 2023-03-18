function solution(s) {
    var answer = [];
    let deleted = 0; // 제거된 0의 개수
    let count = 0; // 이진 변환 횟수
    
    while (s !== '1') {
        // 0 제거
        let cur_s = s.split('').filter(n => n !== '0');
        deleted += s.length - cur_s.length;
        s = cur_s;
        
        // 2진법으로 표현
        s = s.length.toString(2);
        
        count++;
    }
    return [count, deleted];
}