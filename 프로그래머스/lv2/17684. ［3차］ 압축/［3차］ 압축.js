function solution(msg) {
    const dict = {};
    const answer = [];
    
    // 사전 초기화하기 (영문 대문자만 입력된다)
    for (let i = 0; i < 26; i++) {
        let alphabet = String.fromCharCode(65 + i);
        dict[alphabet] = i+1;
    }
    
    while (msg.length > 0) {
        // msg의 첫글자부터 하나씩 추가하면서 사전에 등록된 부분문자열 찾기
        let matched = ''; // 사전에 등록된 문자열
        let register = ''; // 사전에 등록해야할 문자열
        for (let i = 0; i < msg.length; i++) {
            matched += msg[i];
            if (!Object.keys(dict).includes(matched)) {
                register = matched;
                matched = matched.slice(0, matched.length-1);
                break;
            }
        }
        // register을 사전에 등록
        dict[register] = Object.keys(dict).length + 1;
        
        // matched의 색인 번호 answer에 추가 후 msg에서 제거
        answer.push(dict[matched]);
        msg = msg.slice(matched.length);
    }
    
    return answer;
}