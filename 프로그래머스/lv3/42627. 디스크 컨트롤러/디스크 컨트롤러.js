function solution(jobs) {
    /*
        현재 상황에서 작업이 끝나는 시간이 가장 짧은 것을 고른다.
        - 하드디스크가 비어있다면 제일 먼저 요청이 들어온 작업을 수행한다.
        - 작업이 끝나고 작업 중에 들어온 요청들 중 작업 종료 시간이 빠른 것을 선택하여 작업한다.
    */
    jobs = jobs.sort((a, b) => {
        if (a[0] < b[0]) return -1;
        if (a[0] > b[0]) return 1;
        if (a[0] === b[0]) return a[1] - b[1];
    });
    let requested = [];
    let result = 0;
    let count = 0;
    let length = jobs.length;

    while (jobs.length !== 0 || requested.length !== 0) {
        // 현재 시간보다 요청 시간이 빠르거나 같은 경우 requested로 옮긴다.
        let idx = jobs.findIndex((job) => job[0] <= count);
        while (idx !== -1) {
            requested.push(jobs[idx]);
            jobs = jobs.filter((_, i) => i !== idx);
            idx = jobs.findIndex((job) => job[0] <= count);
        }
        
        // 요청 들어온 작업들 requested 중 가장 빨리 끝나는 작업을 수행
        let [r, j] = [0, 0];
        if (requested.length > 0) {
            reqeusted = requested.sort((a, b) => a[1] - b[1]);
            [r, j] = requested.shift();
        } else {
            // 제일 먼저 요청이 들어온 작업을 수행
            [r, j] = jobs.shift();
        }
        count = Math.max(count, r) + j;
        result += count - r;

    }
    return parseInt(result / length);
}