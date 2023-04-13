function solution(book_time) {
    // 체크인 시간을 기준으로 오름차순으로 정렬
    book_time = book_time.map(time => {
        const [checkin, checkout] = time;
        return [checkin.split(':').map(Number), checkout.split(':').map(Number)];
    }).sort((a, b) => {
        if (a[0][0] < b[0][0]) {
            return -1;
        } else if (a[0][0] > b[0][0]) {
            return 1;
        } else {
            return a[0][1] - b[0][1];
        }
    })
    
    let using = []; // 현재 이용중인 객실의 체크아웃 시간들을 저장하는 배열
    let room = 0; // 방의 개수
    for (let i = 0; i < book_time.length; i++) {
        const [checkin, checkout] = book_time[i];
    
        // checkin 시간보다 10분 이상 빨리 퇴실하는 방의 인덱스를 찾는다.
        let empty = using.findIndex((time) => {
            // checkin 시간보다 10분 이상 빠른 경우 true 반환
            let gap = (checkin[0] - time[0]) * 60 + (checkin[1] - time[1]);
            if (gap >= 10) {
                return true;
            } else {
                return false;
            }
        })
        if (empty === -1) { // 빈 방이 없는 경우 새로 방 추가
            room += 1;
            using.push(checkout);
        } else {
            using[empty] = checkout; // 빈 방 이용
        }
    }
    
    return room;
}