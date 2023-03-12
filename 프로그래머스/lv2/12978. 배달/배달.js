function solution(N, road, K) {
    /*  BFS
        - { n : {connect: [n과 연결된 지점], time: [n과 연결된 지점까지의 시간]}
        - total[n]은 1에서부터 n까지 걸리는 시간.
        
        - 시작점인 1을 시작으로 자신과 연결된 지점들을 순회한다.
        - n과 n이랑 연결된 지점 m이 있다고 할 때 
          total[m]과 total[n] + (n에서 m까지의 시간) 을 비교하여 둘 중 작은 값을 찾아 저장한다.
    */
    const timeList = {};
    const total = new Array(N+1).fill(500000);
    total[1] = 0;
    
    // 데이터 구조화
    for (let i = 0; i <= N; i++) {
        timeList[i] = {connect: [], time: []};
    }
    for (let i = 0; i < road.length; i++) {
        let [start, end, time] = road[i];
        timeList[start].connect.push(end);
        timeList[start].time.push(time);
        timeList[end].connect.push(start);
        timeList[end].time.push(time);
    }
    
    // BFS
    const stack = [1];
    while (stack.length > 0) {
        let start = stack.pop();
        
        let connectArr = timeList[start].connect;
        let timeArr = timeList[start].time;
        for (let i = 0; i < connectArr.length; i++) {
            let end = connectArr[i];
            // total[end]가 변경된 경우에만 end를 다시 검사하기 위해 stack에 추가
            if (total[end] > total[start] + timeArr[i]) {
                total[end] = total[start] + timeArr[i];
                stack.push(end);
            }
        }
    }
    
    return total.filter((t) => t <= K).length;
}