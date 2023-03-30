function solution(dirs) {
    // 방문한 거리(특정 좌표와 방향)를 저장한다. [[0, 0], [0, 1]] : true
    const visited = {};
    let cur = [0, 0];
    
    dirs.split('').forEach(dir => {
        // 이동한 결과 표면 경계를 넘어간다면 무시한다.
        let [nextX, nextY] = move(cur, dir);
        if (nextX >= -5 && nextX <= 5 && nextY >= -5 && nextY <= 5) {
            // 방문한 거리를 visited에 기록.
            let next = [nextX, nextY];
            visited[[cur, next]] = true;
            visited[[next, cur]] = true;

            cur = [nextX, nextY];
        }
    })
    
    return Object.values(visited).length / 2;
}
                           
function move(loc, dir) {
    const [x, y] = loc;
    switch (dir) {
        case 'U':
            return [x, y+1];
            break;
        case 'D':
            return [x, y-1];
            break;
        case 'R':
            return [x+1, y];
            break;
        case 'L':
            return [x-1, y];
            break;
    }
}