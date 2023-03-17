function solution(cacheSize, cities) {
    /*
       - 검색된 순서대로 cache에 city를 저장한다.
       - cache 크기가 cacheSize일 때
         - cache에 없는 새로운 도시면 제일 먼저 저장된 도시를 제거 후 새로운 도시를 저장한다.(+5)
         - cache에 있는 도시면 해당 도시를 cache에서 제거 후 다시 push해준다. (+1)
    */
    const cache = [];
    let count = 0;
    
    if (cacheSize === 0) return cities.length * 5;
    
    for (let i = 0; i < cities.length; i++) {
        if (!cache.includes(cities[i].toUpperCase())) {
            if (cache.length === cacheSize) {
                cache.splice(0, 1);
            }
            cache.push(cities[i].toUpperCase());
            count += 5;
        } else {
            let idx = cache.indexOf(cities[i].toUpperCase());
            cache.splice(idx, 1);
            cache.push(cities[i].toUpperCase());
            count += 1;
        }
    }
    return count;
}