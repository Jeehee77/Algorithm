function solution(n, words) {
    let answer = [];
    const prev_word = [words[0]];
    
    for (let i = 1; i < words.length; i++) {
        let last = prev_word[prev_word.length-1];
        if (last[last.length-1] === words[i][0] && !prev_word.includes(words[i])) {
            prev_word.push(words[i]);
        } else { // 탈락자 발생
            let cnt = prev_word.length; 
            let number = (cnt % n) + 1; // 탈락한 사람의 번호
            
            answer.push(number);
            answer.push(Math.floor(cnt / n) + 1);
            break;
        }
    }

    if (answer.length === 0) answer = [0, 0];
    return answer;
}