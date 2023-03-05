import Task2Orders from '../dump/task2order.json'
interface Transaction {
  id: number
  sourceAccount: string
  targetAccount: string
  amount: number
  category: string
  time: string
}
function findDuplicateTransactions(transactions: Array<Transaction> = []) {
  // split to groups based on similarities
  const segregatedTransactions = transactions.reduce(
    (accumulator, transaction) => {
      const { amount, category, targetAccount, sourceAccount } = transaction
      const key = `${amount}-${category}-${targetAccount}-${sourceAccount}`
      if (!accumulator[key]) {
        accumulator[key] = []
      }
      accumulator[key].push(transaction)
      return accumulator
    },
    {} as Record<string, Transaction[]>
  )

  //sort by time
  for (const groupKey of Object.keys(segregatedTransactions)) {
    segregatedTransactions[groupKey].sort((a, b) => {
      return new Date(a.time).getTime() - new Date(b.time).getTime()
    })
  }
  const duplicatesWithin1Minute: Array<Array<Transaction>> = []
  let count = 0
  for (const group of Object.values(segregatedTransactions)) {
    duplicatesWithin1Minute[count] = []
    for (let i = 1; i < group.length; i++) {
      const prevTransaction = group[i - 1]
      const currentTransaction = group[i]
      if (
        (new Date(currentTransaction.time).getTime() -
          new Date(prevTransaction.time).getTime()) /
          1000 <
        60
      ) {
        // means current and previous are duplicates under 1 minute
        if (
          duplicatesWithin1Minute[count][
            duplicatesWithin1Minute[count].length - 1
          ]?.id === prevTransaction.id
        ) {
          duplicatesWithin1Minute[count] = [
            ...duplicatesWithin1Minute[count],
            currentTransaction,
          ]
        } else {
          duplicatesWithin1Minute[count] = [
            ...duplicatesWithin1Minute[count],
            prevTransaction,
            currentTransaction,
          ]
        }
      }
    }
    count++
  }

  return duplicatesWithin1Minute
}

console.log(findDuplicateTransactions(Task2Orders))
