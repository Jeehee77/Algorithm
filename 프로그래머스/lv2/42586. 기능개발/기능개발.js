function solution(progresses, speeds) {
    var answer = [];
    let distribution = 0; // 현재 배포가 가능한 최대 작업기간 (ex. 5이면 작업기간이 5 이하일때 배포 가능)
    let count = 0; // 현재 배포에서 몇 개의 기능이 배포되는지
    progresses.map((task, idx) => {
        // 작업기간 구하기
        let day = 0;
        while (task < 100) {
            task += speeds[idx];
            day++;
        }

        if (day <= distribution) {
            count++;
        } else {
            answer.push(count);
            count = 1;
            distribution = day;
        }
    })
    
    answer.push(count);
    return answer.filter(n => n !== 0);
}