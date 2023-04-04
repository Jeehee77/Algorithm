function solution(orders, course) {
    let answer = [];
    
    // 각 주문들과 주문목록을 사전 순으로 정렬
    orders = orders.map((order) => {
        return order.split('').sort((a, b) => a > b ? 1 : -1).join('');
    }).sort((a, b) => a > b ? 1 : -1);
    
    course.forEach(n => {
        // 단품을 n개 이상 주문한 목록만 필터링 후 단품 개수를 오름차순으로 정렬
        let filtered = orders.filter(order => order.length >= n)
        .sort((a, b) => a.length - b.length);
        
        // 필터링된 주문들에 가장 많이 포함된 n개의 메뉴구성을 구한다.
        if (filtered.length) {
            let table = {};
            filtered.forEach(order => {
                pickMenu(n, order, table, '');
            })
            
            // 제일 많이 주문된 메뉴구성을 answer에 담는다.
            let sorted = Object.entries(table).sort((a, b) => b[1] - a[1]);
            let max = sorted[0][1];
            if (max >= 2) {
                let max_menus = sorted.filter(([menu, count]) => count === max)
                .map(([menu, count]) => menu);
                answer = answer.concat(max_menus);
            }
        }
    })
    
    return answer.sort((a, b) => a > b ? 1 : -1);
}

// order에서 n개 만큼 메뉴를 고른 후 해당 메뉴조합이 등장한 횟수를 저장한다.
function pickMenu(n, order, table, menus) {
    if (n === 0) {
        if (!table[menus]) {
            table[menus] = 0;
        }
        table[menus] += 1;
        return;
    }
    
    let lastIndex = 0;
    if (menus.length) {
        let lastMenu = menus[menus.length - 1];
        lastIndex = order.indexOf(lastMenu);
    }
    
    
    for (let i = lastIndex; i < order.length; i++) {
        if (!menus.includes(order[i])) {
            menus += order[i];
            pickMenu(n - 1, order, table, menus);
            menus = menus.slice(0, -1);
        }
    }
}