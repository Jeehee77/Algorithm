function solution(skill, skill_trees) {
    let answer = 0;
    skill_trees.forEach((skilltree) => {
        // 스킬트리에 있는 스킬들만 남기기
        skilltree = skilltree.split('')
            .filter((s) => skill.split('').includes(s)).join('');
        
        /* skilltree가 skill에 부분 문자열인지 검사하기
           - 중간 스킬부터 배울 수 없기 때문에 
           skill에 부분 문자열로 존재하는 skilltree의 시작은 0번이어야한다.
        */
        if (skill.indexOf(skilltree) === 0) { 
            answer = answer + 1;
        }
    })
    
    return answer;
}