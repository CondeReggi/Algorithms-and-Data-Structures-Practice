function checkJump(heights) {
    if (heights.length < 3) return false;

    const checkOrderByAsc = (arr) => {
        for (let i = 1; i < arr.length; i++) {
            if (arr[i - 1] > arr[i]) return false;
        }
        return true;
    }

    if (checkOrderByAsc(heights)) return false;

    const checkDecrement = (arr, index, izquierda) => {
        if (izquierda) {
            for (let i = index + 1; i < arr.length; i++) {
                console.log(arr[i], arr[i - 1], arr[i] >= arr[i - 1])
                if (arr[i] > arr[i - 1]) return false;
            }
        } else {
            for (let i = 0; i < index; i++) {
                if (arr[i] > arr[i + 1]) return false;
            }
        }
        return true;
    }

    if (heights.every(x => x == heights[0])) return false;

    let max = Math.max(...heights);
    let mid = heights.indexOf(max);

    return (checkDecrement(heights, mid, false) && checkDecrement(heights, mid, true))
}