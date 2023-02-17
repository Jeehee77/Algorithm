function solution(nums) {
    var answer = 0;
    let hash_table = {};
    
    nums.forEach((n) => {
        if (hash_table[n]) hash_table[n]++;
        else hash_table[n] = 1;
    })
    
    let size = Object.keys(hash_table).length;
    
    return size <= nums.length / 2 ? size : nums.length / 2;
}