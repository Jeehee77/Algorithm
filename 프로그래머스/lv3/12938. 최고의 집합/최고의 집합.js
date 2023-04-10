function solution(n, s) {
    /*
        - S가 N으로 나누어 떨어진다면 (S/N)이 N개 있는 집합이 최고의 집합이다.
        - S가 N으로 나누어 떨어지지 않는다면 (S/N)이 N개 있는 집합을 만든 후,
        부족한 숫자만큼을 원소들에게 공평하게 더해준다.
        * (S/N)은 S / N보다 작거나 같은 정수를 말한다.
        
        ex) 
        S = 8, N = 2. (S/N)인 4가 2개 있는 집합 [4, 4]가 최고의 집합니다.
        S = 19, N = 5. (S/N)인 3 5개를 집합에 추가한다. [3, 3, 3, 3, 3]
        S / N의 나머지 4를 원소 4개에 공평하게 더해준다. [4, 4, 4, 4, 3]
    */
    
    if (n > s) return [-1];
    
    if (s % n === 0) {
        return new Array(n).fill(s / n);
    }
    
    if (s % n !== 0) {
        let result = new Array(n).fill(parseInt(s / n));
        
        for (let i = 0; i < s % n; i++) {
            result[i] += 1;
        }
        
        return result.sort((a,b) => a - b);
    }
}

