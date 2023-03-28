function solution(brown, yellow) {
    /*
        카펫의 가로의 길이를 x, 세로의 길이를 y라고 했을 때
        brown = 2 * (x + y) - 4;
        yellow = (x * y) - brown;
        
        가로 길이는 세로 길이와 같거나 세로보다 길기 때문에
        가로 길이의 최소 값은 가로 길이와 세로 길이가 같은 경우이다.
        brown = 2 * (x + x) - 4 = 4x - 4.
        따라서 가로 길이의 최소 값은 (brown + 4 ) / 4.
    */
    var answer = [];
    
    const min_width = Math.ceil((brown + 4) / 4);
    for (let width = min_width; width < brown; width++) {
        // brown = 2 * (x + y) - 4 <- 식을 대입하여 length 찾기
        let length = (brown + 4) / 2 - width;

        // yellow = (x * y) - brown <- 이 식이 성립되는지 판별
        if (Number.isInteger(length) && length === (yellow + brown) / width) {
            answer = [width, length];
            break;
        }
    }
    
    return answer;
}