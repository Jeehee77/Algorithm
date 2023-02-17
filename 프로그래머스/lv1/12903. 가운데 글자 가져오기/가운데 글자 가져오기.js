function solution(s) {
    var answer = '';
    
    if (s.length % 2 == 0) {
        return s.substring(s.length / 2 - 1, s.length / 2 + 1);
    } else {
        return s[parseInt(s.length / 2)];
    }
    
    return answer;
}