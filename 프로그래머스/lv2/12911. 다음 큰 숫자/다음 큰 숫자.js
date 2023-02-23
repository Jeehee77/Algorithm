function solution(n) {
    var answer = 0;
    let n_cnt = n.toString(2).split('1').length - 1;
    let next = n + 1;
    let next_cnt = 0;
    
    while (n_cnt !== next_cnt) {
        if (next.toString(2).split('1').length - 1 === n_cnt) {
            answer = next;
            next_cnt = n_cnt;
        } else {
            next++;
        }
    }
    
    return answer;
}