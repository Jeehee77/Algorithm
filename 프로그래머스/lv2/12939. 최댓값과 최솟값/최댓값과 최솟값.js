function solution(s) {
    var answer = '';
    
    const nums = s.split(' ');
    let min = nums[0];
    let max = nums[0];
    nums.forEach((n) => {
        n = Number(n);
        min = n < min ? n : min;
        max = n > max ? n : max;
    })
    
    answer = String(min) + ' ' + String(max);
    return answer;
}