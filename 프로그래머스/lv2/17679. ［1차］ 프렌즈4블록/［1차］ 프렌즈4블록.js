function solution(m, n, board) {
    let answer = 0;
    let toDelete = []; // 제거해야할 블록들의 좌표를 저장하는 배열
    board = board.map(str => str.split(''))
    
    do {
        // 블록 제거하기
        while (toDelete.length > 0) {
            const [i, j] = toDelete.pop();
            if (board[i][j] !== '') {
                board[i][j] = '';
                answer++;
            }
        }

        // 블록 정리하기
        arrangeBlock(m, n, board);
        
        // 같은 블록 4개가 붙어있는 부분 찾기
        for (let i = 1; i < m; i++) {
            for (let j = 1; j < n; j++) {
                let cur = board[i][j];
                if (cur !== '' && board[i-1][j] === cur 
                    && board[i][j-1] === cur && board[i-1][j-1] === cur) {
                    toDelete = [...toDelete, [i-1, j-1], [i-1, j], [i, j-1], [i, j]];
                }
            }
        }
    } while (toDelete.length > 0)
    
    return answer;
}

// 빈 공간을 채우는 함수
function arrangeBlock(m, n, board) {
    for (let i = 0; i < m - 1; i++) {
        for (let j = 0; j < n; j++) {
            // 아래 칸이 비어있다면 위의 칸들을 한 칸 씩 아래로 내려준다.
            if (board[i+1][j] === '') {
                for (let k = i; k >= 0; k--) {
                    board[k + 1][j] = board[k][j];
                    board[k][j] = '';
                }
            }
        }
    }
    return board;
}