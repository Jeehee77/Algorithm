function solution(n, k, enemy) {
    /*
        heap 이용하기
        - 적의 수를 기준으로 지나온 라운드들의 최대힙을 만든다.
        - 순서대로 라운드를 진행하다가 더 이상 남은 병사로 공격을 막을 수 없을 때
          지나온 라운드 중 제일 많은 수의 적을 만난 라운드에 무적권을 적용한다.
        - 더 이상 공격을 막을 수 없고, 무적권도 없다면 종료한다.
    */
    let heap = [];
    let i;
    for (i = 0; i < enemy.length; i++) {
        n -= enemy[i];
        insert(heap, enemy[i]);
        
        if (n < 0) {
            if (k) {
                let max = extractMax(heap);
                n += max;
                k--;
            } else break;
        }
    }
    return i;
}

function insert(heap, newValue) {
    heap.push(newValue);
    let idx = heap.length - 1;
    const element = heap[idx];
    while (idx > 0) {
        let parentIdx = Math.floor((idx - 1) / 2);
        let parent = heap[parentIdx];
        if (element <= parent) break;

        // 현재값이 부모값보다 크다면 swap
        heap[parentIdx] = element;
        heap[idx] = parent;
        idx = parentIdx;
    }
}

function extractMax(heap) {
    const max = heap[0];
    const end = heap.pop();

    if (heap.length > 0) {
        heap[0] = end;
        let idx = 0;
        const element = heap[0];
        while (true) {
            let leftIdx = 2 * idx + 1;
            let rightIdx = 2 * idx + 2;
            let left;
            let right;
            let swapIdx = null;
                
            if (leftIdx < heap.length) {
                left = heap[leftIdx];
                if (left > element) {
                    swapIdx = leftIdx;
                }
            }
            if (rightIdx < heap.length) {
                right = heap[rightIdx];
                if ((swapIdx === null && right > element) ||
                    (swapIdx !== null && right > left)) {
                        swapIdx = rightIdx;
                }
            }

            if (swapIdx === null) break;
            heap[idx] = heap[swapIdx];
            heap[swapIdx] = element;
            idx = swapIdx;
        }
    }
    return max;
}