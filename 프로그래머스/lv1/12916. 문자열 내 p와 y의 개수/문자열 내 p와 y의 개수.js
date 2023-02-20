function solution(s){
    let p_cnt = 0;
    let y_cnt = 0;
    
    s.split('').forEach(c => {
        if (c === 'p' || c === 'P') p_cnt++;
        if (c === 'y' || c === 'Y') y_cnt++; 
    })

    return (p_cnt === 0 && y_cnt === 0) || p_cnt === y_cnt ? true : false;
}