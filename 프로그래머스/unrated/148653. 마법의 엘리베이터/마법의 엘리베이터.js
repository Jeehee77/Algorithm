function solution(storey) {
    /*
        1의 자리 수 부터 현재 자리 수를 만드는 데에 마법의 돌이 적게 드는 방법을 선택한다.
        - 현재 자리의 수 |a|가 0 ~ 5라면 마법의 돌이 a개 필요하다.
        - 현재 자리의 수 |a|가 6 ~ 9라면 
            -1 버튼을 a번 누르는 것 보다 
            +1 버튼을 (10 - a)번 누르고 -10버튼을 1번 누르는게 마법의 돌이 적게 든다.
            
        ex)
        -678 만들기
        1의자리: -8 -> +1 버튼을 2번 누르고 -670에 -10을 더한다.
        10의자리: -80 -> +10 버튼을 2번 누르고 -600에 -100을 더한다.
        100의자리: -700 -> +100 버튼을 3번 누르고 0에 -1000을 더한다.
        1000의자리: -1000 -> -1000 버튼을 1번 누른다.
        => 2 + 2 + 3 + 1
        
    */
    let answer = 0;
    let nums = String(storey).split('').map(Number).reverse();
    
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 10) {
            nums[i] = 0;
            if (nums[i+1]) {
                nums[i+1]++;
            } else {
                nums.push(1);
            }
        }
        
        if (nums[i] < 5) {
            answer += nums[i];
        } 
        if (nums[i] === 5) {
            answer += nums[i];
            if (nums[i+1] >= 5) {
                nums[i+1]++;
            }
        }
        if (nums[i] > 5) {
            answer += 10 - nums[i];
            if (nums[i+1]) {
                nums[i+1]++;
            } else {
                nums.push(1);
            }
        }
    }
    return answer;
}