class MinCoinChange {

    constructor(coins) {
        this.coins = coins
    }

    makeChange(amount) {
        const change = []
        let total = 0
        this.coins.sort((a, b) => a < b).forEach(coin => {
            while ((total + coin) <= amount) {
                change.push(coin)
                total += coin
            }
        })
        return change
    }
}

const rninCoinChange = new MinCoinChange ( [ 1, 5, 10, 2 5])
console. log (rninCoinChange. rnakeChange (36))