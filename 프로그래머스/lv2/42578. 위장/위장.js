function solution(clothes) {
    const hash = {};
    
    // 데이터 구조화하여 hash에 저장하기
    clothes.map(data => {
        let name = data[0];
        let category = data[1];
        
        if (!Object.keys(hash).includes(category)) {
            hash[category] = 1;
        }
        hash[category] += 1;
    })
    
    /* 
    의상 조합하기 (예시 들어 알고리즘 설명)
    - headgear에 yellow_hat, green_turban이 있는 경우 아무것도 착용 안 한 상태까지 포함하면 3가지이다.
    - eyewear에 blue_sunglasses이 있는 경우 아무것도 착용 안 한 상태까지 포함하면 2가지이다.
    - 의상 조합은 headgear 3가지 중 하나를 선택하고, eyewear 중 하나를 선택하는 것이기 때문에,
        3 * 2 개가 가능한데, 이 중 headgear, eyewear 모두 착용 안 한 상태는 제외하기 때문에 1을 빼준다.
    - 따라서 3 * 2 - 1인 5개가 된다.
    */
    
    return Object.values(hash).reduce((acc, count) => acc * count) - 1;
}