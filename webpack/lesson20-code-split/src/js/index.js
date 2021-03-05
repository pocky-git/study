document.querySelector('button').onclick = () => {
    import('./test').then(res => {
        console.log(res)
    })
}