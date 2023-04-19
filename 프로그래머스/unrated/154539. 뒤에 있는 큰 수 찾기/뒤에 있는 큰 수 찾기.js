function solution(numbers) {
    /*
        - stack의 뒤에서부터 검사하여 numbers[i]보다 큰 수가 나타나면 그 수가 numbers[i]의 뒷 큰수이다.
        - stack에 numbers[i]를 넣는다.
            - 제일 최근 입력된 숫자 lastNum과 numbers[i]를 비교한다.
            - numbers[i]가 lastNum보다 크다면 stack을 pop해준다.
            - numbers[i]가 lastNum과 다른 숫자라면 stack에 numbers[i]를 push해준다.
    */
    const stack = [numbers[numbers.length - 1]];
    const answer = new Array(numbers.length).fill(-1);
    for (let i = numbers.length - 2; i >= 0; i--) {
        for (let j = stack.length - 1; j >= 0; j--) {
            if (stack[j] > numbers[i]) {
                answer[i] = stack[j];
                break;
            }
            if (numbers[i] > stack[j]) {
                stack.pop();
            }
        }
        
        if (numbers[i] !== stack.at(-1)) {
            stack.push(numbers[i]);
        }
    }
    return answer;
}