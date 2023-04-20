function solution(maps) {
    /*
        BFS
        - maps를 너비 우선 탐색하면서 해당 칸이 섬이라면 sum에 식량을 더한다.
        
        - queue를 shift한 값을 [i, j]에 저장한다.
        - maps[i][j]의 상하좌우 칸 중 'X'가 아닌 칸을 큐에 넣는다.
        - 더 이상 queue에 값이 없을때까지 반복한다.
    */
    maps = maps.map(str => str.split(''));
    const answer = [];
    const N = maps.length;
    const M = maps[0].length;
    const dr = [-1, 1, 0, 0];
    const dc = [0, 0, -1, 1];
    
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (maps[i][j] === 'X') continue;
            
            let sum = Number(maps[i][j]);
            maps[i][j] = 'X';
            
            let queue = [[i, j]];
            while (queue.length) {
                let [r, c] = queue.shift();
                
                // 상하좌우 칸이 섬이라면 sum에 더해주고 큐에 넣기
                for (let k = 0; k < 4; k++) {
                    let next_r = r + dr[k];
                    let next_c = c + dc[k];
                    if (next_r < 0 || next_r >= N || next_c < 0 || next_c >= M) 
                        continue;
                    
                    if (maps[next_r][next_c] === 'X') continue;
                    sum += Number(maps[next_r][next_c]);
                    maps[next_r][next_c] = 'X';
                    queue.push([next_r, next_c]);
                }
            }
            answer.push(sum);
        }
    }
    if (!answer.length) return [-1];
    return answer.sort((a, b) => a - b);
}