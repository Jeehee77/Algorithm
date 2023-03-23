function solution(files) {
    return files.map(file => file.match(/(\D+)(\d+)/))
        .sort((a, b) => {
            // head 부분 비교하여 사전순 정렬
            if (a[1].toUpperCase() > b[1].toUpperCase()) {
                return 1;
            } else if (a[1].toUpperCase() < b[1].toUpperCase()) {
                return -1;
            } else {
                // number 부분 비교하여 오름차순 정렬
                return Number(a[2]) - Number(b[2]);
            }
        }).map(file => file.input)
}