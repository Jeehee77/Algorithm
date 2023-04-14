function solution(people, limit) {
    /*
        탐욕법: 현재 상황에서 최선의 선택을 하는 것
        
        - 제일 무거운 사람과 가벼운 사람을 구명보트에 태운다.
        - 둘이 합쳐 제한 무게를 넘는다면 무거운 사람만 태워 보낸다.
        - 모든 사람을 다 태워 보낼때까지의 구명보트 개수를 센다.
    */
    
    let p = people.sort((a, b) => a - b);
    let sum = 0;
    let count = 0;
    
    while (p.length) {
        sum += p.pop();
        if (sum + p[0] <= limit) {
            sum += p.shift();
        }
        
        count++;
        sum = 0;
    }
    
    return count;
}