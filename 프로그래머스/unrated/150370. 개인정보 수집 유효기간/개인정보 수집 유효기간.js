function solution(today, terms, privacies) {
    var answer = [];
    const [todayYear, todayMonth, todayDate] = today.split('.').map(n => Number(n));
    console.log(todayYear, todayMonth, todayDate);
    
    privacies.forEach((privacy, idx) => {
        const [year, month, date] = privacy.split(' ')[0].split('.').map(n => Number(n));
        console.log(year, month, date);
        const privacyCode = privacy.split(' ')[1];
        
        const thisterm = terms.filter((t) => t.split(' ')[0] === privacyCode)[0];
        const term = Number(thisterm.split(' ')[1]);
        
        let gap = 0;
        if (todayYear > year) gap += 12 * (todayYear - year);
        if(todayMonth > month && todayDate >= date) gap += todayMonth - month
    else if(todayMonth > month && todayDate < date) gap += todayMonth - month - 1
    else if(todayMonth <= month && todayDate >= date) gap += todayMonth - month
    else if(todayMonth <= month && todayDate < date) gap += todayMonth - month - 1
        if (gap >= term) answer.push(idx + 1);
    })
    
    return answer;
}