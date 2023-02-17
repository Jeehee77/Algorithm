function solution(a, b) {
    // 1 ~ 12월의 일 수
    let month = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
    let sum = 0;
    for (let i = 1; i < a; i++) {
        sum += month[i];
    }
    
    let day = parseInt((sum + b - 1) % 7);
    switch(day) {
        case 0:
            return "FRI";
            break;
        case 1:
            return "SAT";
            break;
        case 2:
            return "SUN";
            break;
        case 3:
            return "MON";
            break;
        case 4:
            return "TUE";
            break;
        case 5:
            return "WED";
            break;
        case 6:
            return "THU";
            break;
    }
}