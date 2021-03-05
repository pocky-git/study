document.querySelector('button').onclick = () => {
    // 懒加载：通过import()，可以实现按钮点击后浏览器才会加载使用的js文件，但是如果js文件过大，按钮点击后会有延迟
    // 预加载：通过添加 webpackPrefetch: true 实现，浏览器会先去加载其他资源，空闲后才去加载，但是兼容性较差，慎用
    import(/* webpackChunkName: 'test2', webpackPrefetch: true */'./test').then(res => {
        console.log(res)
    })
}