function solution(word) {
    /*
        - i번째 자리의 문자보다 우선인 모음으로 시작하는 길이 (5 - i)이하의 단어의 개수를 세서 더해준다.
            - i는 0부터 word.length-1까지 될 수 있다.
        - word.length를 더해준다.
        
        ex) EIO
        E보다 앞에 있는 모음들로 시작하는 길이 5 이하의 단어 개수를 더한다. 781 * 1
        I보다 앞에 있는 모음들로 시작하는 길이 4 이하의 단어 개수를 더한다. 156 * 2 = 312
        O보다 앞에 있는 모음들로 시작하는 길이 3 이하의 단어 개수를 더한다. 31 * 3 = 93
        781 + 312 + 93 + 3 = 1189
    */
    var answer = 0;
    const alphabet = ['A', 'E', 'I', 'O', 'U'];
    /*
        특정 문자로 시작하는 각 길이의 단어의 개수
        길이 1 -> 1개
        길이 2 -> A_ -> 5개
        길이 3 -> A__ -> 5 * 5 = 25개
        길이 4 -> A___ -> 5 * 5 * 5 = 125개
        길이 5 -> A____ -> 5 * 5 * 5 * 5 = 625개
    */
    let count = [0]; // 특정 문자로 시작하는 길이가 i이하인 단어들의 개수를 저장한다.
    for (let i = 0; i < 5; i++) {
        count.push(5**i);
    }
    count = count.map((_, idx) => count.slice(0, idx+1).reduce((acc, cur) => acc + cur));
    
    for (let i = 0; i < word.length; i++) {
        let idx = alphabet.indexOf(word[i]);
        answer += idx * count[5-i];
    }
    answer += word.length;
    
    return answer;
}