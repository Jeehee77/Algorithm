function solution(m, musicinfos) {
    /*
        - 재생시간과 악보를 이용하여 실제로 재생된 코드들의 배열 played를 만든다.
        - played에 m이 포함되어 있는지 검사한다.
    */
    let answer = {name: '(None)', time: 0};
    const target = parseMelody(m);
    
    musicinfos.forEach((music) => {
        let [start, end, name, melody] = music.split(',');
        let code = parseMelody(melody);
        let time = calculateTime(start, end);
        let played = time < code.length ? code.substring(0, time) : code;
        
        let cur = 0;
        while (played.length < time) {
            played += code[cur];
            cur = cur + 1 < code.length ? cur + 1 : 0;
        }
            
        if (played.includes(target) && answer.time < time) {
            answer = {time, name};
        }
    })
    
    return answer.name;
}

function parseMelody(m) {
    return m.replaceAll('A#', 'a').replaceAll('B#', 'b').replaceAll('C#', 'c')
        .replaceAll('D#', 'd').replaceAll('E#', 'e').replaceAll('F#', 'f')
        .replaceAll('G#', 'g');
}

// 재생 시간(분)을 계산하는 함수    ex. start: '14:59' end: '15:32' -> 33
function calculateTime(start, end) {
    let [s_hour, s_min] = start.split(':').map(Number);
    let [e_hour, e_min] = end.split(':').map(Number);
    
    return (e_hour - s_hour) * 60 + e_min - s_min;
}