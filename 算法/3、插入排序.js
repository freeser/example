function insertionSort(array) {
    console.time('插入排序耗时');
    for (var i = 1; i < array.length; i++) {
        var key = array[i];
        var j = i;
        while (j > 0 && array[j - 1] > key) {
            array[j] = array[j - 1];
            j--;
        }
        array[j] = key;
    }
    console.timeEnd('插入排序耗时');
    return array;
}
var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(insertionSort(arr));