function solution(k, dungeons) {
    var answer = -1;

    const dfs = (k, dungeons, count, visited) => {
        for (let i = 0; i < dungeons.length; i++) {
            const [need, use] = dungeons[i];
            if (need <= k && !visited[i]) {
                visited[i] = true;
                dfs(k - use, dungeons, count + 1, visited);
                visited[i] = false;
            }
        }
        answer = Math.max(answer, count);
    }
    dfs(k, dungeons, 0, dungeons.map(n => false));
    return answer;
}