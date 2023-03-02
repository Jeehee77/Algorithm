function solution(board)
{
    /* DP
    - board가 N * M 크기라고 한다.
    - (N + 1) * (M + 1) 크기의 newBoard를 만든다.
    - 가장 오른쪽 아래의 칸이 board[i][j]인 n*n 정사각형의 크기 n을 newBoard[i+1][j+1]에 저장한다.
    - newBoard에 저장된 숫자 중 최대값을 m이라고 하면 m*m가 가장 큰 정사각형의 넓이다.
    
    ex)
     board             newBoard
    0 1 1 1            0 0 0 0 0
    1 1 1 1            0 0 1 1 1
    1 1 1 1            0 1 1 2 2 
    0 0 1 0            0 1 2 2 3
                       0 0 0 1 0
    
    */
    
    const N = board.length;
    const M = board[0].length;
    const newBoard = Array.from(Array(N+1), () => Array(M+1).fill(0));
    let size = 0;
    
    for (let i = 0; i <= N - 1; i++) {
        for (let j = 0; j <= M - 1; j++) {
            if (board[i][j] === 1) {
                let min = getMinOfThree(newBoard[i][j], newBoard[i+1][j], newBoard[i][j+1]);
                newBoard[i+1][j+1] = min + 1;
                size = min + 1 > size ? min + 1 : size;
            }
        }
    }

    return size*size;
}

function getMinOfThree(a, b, c) {
    if (a <= b && a <= c) return a;
    else if (b <= a && b <= c) return b;
    else if (c <= a && c <= b) return c;
}