function solution(s) {
    let str = s.split(' ').map(word => {
        return word.split('').map((w, idx) => {
            if (isNaN(w) && idx === 0) return w.toUpperCase();
            else if (isNaN(w)) return w.toLowerCase();
            else return w;
        }).join('');
    })
    return str.join(' ');
}