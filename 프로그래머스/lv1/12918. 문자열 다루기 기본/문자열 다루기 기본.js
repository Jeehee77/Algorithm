function solution(s) {
    // 48 ~ 57
    if (s.length !== 4 && s.length !== 6) return false;

    let nums = s.split('').filter(n => n.charCodeAt(0) <= 57 && n.charCodeAt(0) >= 48);
    return nums.length === s.length;
}