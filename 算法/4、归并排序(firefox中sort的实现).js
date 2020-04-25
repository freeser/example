function mergeSort(arr) {
    const merge = (left, right) => {
        const result = []
        let il = 0
        let ir = 0
        while(il < left.length && ir < right.length) {
            if(left[il] < right[ir]) {
                result.push(left[il++])
            } else {
                result.push(right[ir++])
            }
        }
        while (il < left.length) {
            result.push(left[il++])
        }
        while (ir < right.length) {
            result.push(right[ir++])
        }
        return result
    }
    const mergeSortRec = array => {
        if (array.length === 1) {
            return array
        }
        const mid = Math.floor(array.length / 2)
        const left = array.slice(0, mid)
        const right = array.slice(mid, array.length)
        return merge(mergeSortRec(left), mergeSortRec(right))
    }
    return mergeSortRec(arr)
}

var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(mergeSort(arr));