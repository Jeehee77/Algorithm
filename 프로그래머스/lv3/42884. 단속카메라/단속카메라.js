/*
    - 가장 먼저 진입한 순, 진입 시간이 같다면 가장 늦게 진출한 순으로 정렬한다.
    - i번째 진입, 진출이 a,b이고, i+1번째 진입, 진출이 c, d라고 할 때,
      a와 b, c와 d의 공통 부분 내에 카메라를 설치하면 두 차량 모두 카메라를 만날 수 있다.
      - 공통 부분이 없다면 더 먼저 진입, 진출한 a와 b 사이에 카메라를 설치해야한다.
    - 위와 같이 정렬된 데이터를 순서대로 비교하며 공통 부분을 갱신해간다.
*/
function solution(routes) {
    const sorted = routes.sort((a, b) => {
        if (a[0] < b[0]) {
            return -1;
        } else if (b[0] < a[0]) {
            return 1;
        } else {
            return b[1] - a[1];
        }
    })
    
    let answer = 0;
    let common_s = sorted[0][0];
    let common_e = sorted[0][1];
    for (let [start, end] of sorted) {
        // 공통 부분이 존재하지 않는 경우 카메라 설치
        if (common_e < start) {
            answer += 1;
            common_s = start;
            common_e = end;
        } else {
            // 공통 부분 있다면 갱신
            common_s = Math.max(common_s, start);
            common_e = Math.min(common_e, end);
        }
    }
    // 마지막 공통 부분에 카메라 설치
    answer += 1;
    return answer;
}