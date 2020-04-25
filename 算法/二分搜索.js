Array.prototype.binarySearch = function(item) {
    this.quickSort()
    let low = 0
    let mid = null
    let element = null
    let high = this.length - 1
    while (low <= high){
        mid = Math.floor((low + high) / 2)
        element = this[mid]
        if (element < item) {
            low = mid + 1
        } else if (element > item) {
            high = mid - 1
        } else {
            return mid
        }
    }
    return -1
}