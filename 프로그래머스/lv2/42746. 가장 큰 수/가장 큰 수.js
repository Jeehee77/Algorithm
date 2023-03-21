function solution(numbers) {
    /*
        각 숫자를 사전식으로 정렬한다.
        - 숫자 a, b를 문자로 바꾸어 ab와 ba를 비교한다.
    */
    numbers.sort((a, b) => {
        a = a.toString();
        b = b.toString();
        return (b+a) - (a+b);
    })
    if (numbers[0] === 0) numbers = [0];
    return numbers.join('');
}