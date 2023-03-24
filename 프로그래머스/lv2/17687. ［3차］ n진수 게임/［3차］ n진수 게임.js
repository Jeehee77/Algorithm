function solution(n, t, m, p) {
    const answer = [];
    
    let cur_idx = 0; // 현재 대답의 번호
    let cur_num = 0; 
    while (answer.length < t) {
        // 10진수 숫자를 n진수로 변환하여 만든 문자열을 반복하며 튜브의 순서일때 그 답을 answer에 넣는다.
        cur_num.toString(n).split('').forEach(s => {
            // 현재 순서 cur_idx가 튜브 순서라면 answer 배열에 s 추가.
            if (cur_idx % m === p - 1) {
                answer.push(s.toUpperCase());
            }
            cur_idx++;
        })
        cur_num++;
    }
    
    return answer.slice(0, t).join('');
}