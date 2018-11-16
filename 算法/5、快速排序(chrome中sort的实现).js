function quickSort(arr) {
    const partition = (array, left, right) => {
        var pivot = array[Math.floor((right + left) / 2)]
        let i = left
        let j = right
        while (i <= j) {
            while (array[i] < pivot) {
                i++
            }
            while (array[j] > pivot) {
                j--
            }
            if (i <= j) {
                let aux = array[i]
                array[i] = array[j]
                array[j] = aux
                i++
                j--
            }
        }
        return i
    }
    const quick = (array, left, right) => {
        let index
        if (array.length > 1) {
            index = partition(array, left, right)
            if (left < index - 1) {
                quick(array, left, index - 1)
            }
            if (index < right) {
                quick(array, index, right)
            }
        }
    }
    quick(arr, 0, arr.length - 1)
    return arr
}

var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(quickSort(arr));