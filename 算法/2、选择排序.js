function selectionSort(arr) {
    let len = arr.length
    let minIndex
    console.time('选择排序耗时');
    for(let i = 0; i < len - 1; i++) {
        minIndex = i;
        for (let j = i + 1; j < len; j++ ) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j
            }
        }
        if (i != minIndex) [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }
    console.timeEnd('选择排序耗时');
    return arr;
}
var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(selectionSort(arr));