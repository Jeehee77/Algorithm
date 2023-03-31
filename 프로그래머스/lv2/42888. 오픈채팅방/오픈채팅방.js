function solution(record) {
    /*
        - uid를 이용하여 먼저 메시지를 작성해 저장해놓는다.
        - uid 별로 최종닉네임을 매핑한다.
        - uid로 작성된 메세지를 최종닉네임으로 변경하여 반환한다.
    */
    const nickname = {};
    const msg = [];
    
    record.forEach((str) => {
        let [keyword, uid, nick] = str.split(' ');
        if (nick) {
            nickname[uid] = nick;
        }
        
        if (keyword === 'Enter') {
            msg.push([uid, '님이 들어왔습니다.']);
        }
        if (keyword === 'Leave') {
            msg.push([uid, '님이 나갔습니다.']);
        }
    })
    
    
    // uid를 최종닉네임으로 변경
    return msg.map(m => nickname[m[0]] + m[1]);
}