const add = (a, b) => {
  return a + b;
}

console.log(add(1, 2));

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve()
  }, 1000)
})

console.log(promise)