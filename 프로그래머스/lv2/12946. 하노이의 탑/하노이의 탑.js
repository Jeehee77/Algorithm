function solution(n) {
    /*
        1번 ~ n번까지의 원판을 1번 기둥에서 3번 기둥으로 옮기는 방법
        - 1번부터 n-1번까지의 원판을 1번에서 2번 기둥으로 옮긴다.
        - n번 원판을 1번에서 3번 기둥으로 옮긴다.
        - 2번 기둥의 원판들을 3번 기둥으로 옮긴다.
    */
    var answer = [];
    
    // n개의 원판을 start에서 end로 옮긴다.
    const moveDisc = (n, start, end, other) => {
        if (n === 1) {
            answer.push([start, end]);
            return;
        }
        
        /*  1번 ~ n-1번 까지의 원판을 other에 옮겨뒀다가
            n번 원판을 start에서 end로 옮긴 후
            other에 있던 원판들을 end로 옮긴다.
        */
        moveDisc(n-1, start, other, end);
        moveDisc(1, start, end, other);
        moveDisc(n-1, other, end, start);
    }
    moveDisc(n, 1, 3, 2);
    return answer;
}