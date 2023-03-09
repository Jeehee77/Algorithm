function solution(s) {   
    let result = s.split(' ').map((word) => {
        // 각 단어의 첫 글자가 알파벳이면 대문자, 그 외의 알파벳은 소문자로 변경
        return word.split('').map((s, index) => {
            if (index === 0 && isNaN(s)) return s.toUpperCase();
            else if (isNaN(s)) return s.toLowerCase();
            else return s;
        }).join('');
    })
    return result.join(' ');
}