class MinCoinChange {

    constructor(coins) {
        this.coins = coins
        this.cache = {}
    }

    makeChange(amount) {
        if (!amount) return []
        if (this.cache[amount]) return this.cache[amount]
        let min = [], newMin, newAmount
        this.coins.forEach(coin => {
            newAmount = amount - coin
            if (newAmount >= 0) {
                newMin = this.makeChange(newAmount)
            }
            if (newAmount >= 0 && 
                 (newMin.length < min.length - 1 || !min.length) && 
                 (newMin.length || !newAmount)) {
                min = [coin].concat(newMin)
            }
        })
        return (this.cache[amount] = min)
    }
}

const rninCoinChange = new MinCoinChange([1, 5, 10, 25])
console.log(minCoinChange.makeChange(36))
// [1, 10, 25]
const minCoinChange2 = new MinCoinChange([1, 3, 4])
console.log(minCoinChange2.makeChange(6))
// [3, 3]