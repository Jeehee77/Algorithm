function solution(n) {
    /*
        - 퀸은 가로, 세로, 대각선으로 이동할 수 있다.
        - 따라서 한 행, 한 열에 퀸 하나만 배치 가능하다.
        - 퀸 2개 이상이 같은 대각선상에 놓이면 안 된다.
    */
    var answer = 0;
    const picked = []; // i번째 행에서 몇번째 칸에 퀸이 놓였는지 저장.

    const putQueen = (toPick) => {
        if (toPick === 0) {
            answer++;
            return;
        }
        
        for (let i = 0; i < n; i++) {
            if (!picked.includes(i)) {
                // 직전에 선택된 퀸이 있다면 대각선에 놓이게 되는지 검사
                if (!isDiagonally(picked, i)) {
                    picked.push(i);
                    putQueen(toPick - 1);
                    picked.pop();
                }
            }
        }
        return;
    }
    
    putQueen(n);
    return answer;
}

/* [picked.length, num] 좌표에 퀸을 놓는다고 할 때 
   기존에 선택된 다른 퀸들과 대각선상에 놓여져 있는지 검사하는 함수
*/ 
function isDiagonally(picked, num) {
    let newIdx = picked.length;
    for (let i = 0; i < picked.length; i++) {
        if (Math.abs(i - newIdx) === Math.abs(picked[i] - num)) {
            return true;
        }
    }
    return false;
}