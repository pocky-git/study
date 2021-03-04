import print from './print'

print()

if(module.hot){
    module.hot.accept('./print',()=>{
        print()
    })
}

