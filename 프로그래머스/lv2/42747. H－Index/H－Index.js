function solution(citations) {
    /*
        - a보다 크거나 같은 원소가 a개 이상 있다면 a는 h-index가 된다.
        
        - citation를 내림차순으로 정렬한다.
        - citation[i] > h_index라면 h-index에 1을 더한다.
        - 내림차순으로 정렬하여 큰 수부터 검사하므로 처음 h-index가 발견되면 그 수가 최대값이다.
    */
    let h_index = 0;
    citations.sort((a, b) => b - a);
    for (let i = 0; i < citations.length; i++) {
        if (citations[i] > h_index) {
            h_index++;
        }
    }
    return h_index;
}