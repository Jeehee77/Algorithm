function solution(fees, records) {
    var answer = [];
    
    // 차량 번호 별로 입차,출차 기록 정리
    const table = {};
    records.forEach(record => {
        let [time, number, type] = record.split(' ');
        if (!table[number]) {
            table[number] = [];
        }
        table[number].push(time);
    })
    
    const [basicTime, basicFee, unitTime, unitFee] = fees;
    // 입차, 출차 기록으로 주차 요금 계산하기
    Object.keys(table).forEach(key => {
        // 마지막 출차 기록 없는 경우 23:59로 출차 기록 추가해주기
        if (table[key].length % 2 !== 0) {
            table[key].push('23:59');
        }
        
        // 총 주차 시간
        let total = 0;
        for (let i = 0; i < table[key].length - 1; i += 2) {
            total += getMinutes(table[key][i], table[key][i+1]);
        }
        
        // 기본 시간과 초과 시간을 이용해 요금 계산하기
        if (total <= basicTime) {
            table[key] = basicFee;
        } else {
            let overtime = total - basicTime;
            table[key] = basicFee + Math.ceil(overtime / unitTime) * unitFee;
        }
    })
    
    // 차량 번호를 기준으로 오름차순으로 정렬 후 주차 요금만 담은 배열 반환
    return Object.entries(table).sort((a, b) => a[0] - b[0]).map(([number, fee]) => fee);
}

function getMinutes(start, end) {
    const [shour, sminute] = start.split(':').map(Number);
    const [ehour, eminute] = end.split(':').map(Number);
    return ((ehour - shour) * 60 + eminute) - sminute;
}