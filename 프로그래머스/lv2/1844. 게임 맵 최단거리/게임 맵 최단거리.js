function solution(maps) {
    const N = maps.length - 1;
    const M = maps[0].length - 1;
    const dx = [0, 0, -1, 1];
    const dy = [-1, 1, 0, 0]
    
    let dist = Array.from(Array(N+1), () => Array(M+1).fill(Number.MAX_SAFE_INTEGER));
    let queue = [];
    
    dist[0][0] = 1;
    queue.push([0, 0]);
    
    while (queue.length) {
        let cur = queue.shift();
        const [cur_i, cur_j] = cur;
        let cur_dist = dist[cur_i][cur_j];
        
        for (let k = 0; k < 4; k++) {
            let i = cur_i + dy[k];
            let j = cur_j + dx[k];
            if (0 <= i && i <= N && 0 <= j && j <= M && maps[i][j] && cur_dist + 1 < dist[i][j]) {
                dist[i][j] = cur_dist + 1;
                queue.push([i,j]);
            }
        }
    }
    
    if (dist[N][M] === Number.MAX_SAFE_INTEGER) dist[N][M] = -1;
    return dist[N][M];
}
