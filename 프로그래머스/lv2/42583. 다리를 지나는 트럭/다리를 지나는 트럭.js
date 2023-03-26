function solution(bridge_length, weight, truck_weights) {
    const bridge = [];
    let total = 0;
    let answer = 0;
    while (truck_weights.length > 0 || bridge.length > 0) {
        
        if (bridge.length > 0) {
            // 완전히 지나간 트럭
            const [t, cnt] = bridge[0];
            if (answer - cnt === bridge_length) {
                bridge.splice(0, 1);
                total -= t;
            }
        }
        
        
        let cur = truck_weights[0];
        if (total + cur <= weight && bridge.length + 1 <= bridge_length) {
            // 새로운 트럭이 다리에 올라간다.
            bridge.push([cur, answer]);
            total += cur; 
            truck_weights.splice(0, 1);
        }
        
        answer++;
    }
    return answer;
}