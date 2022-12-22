import "./styles/index.css"
import _ from 'lodash'
import addOne from "./module/module"
console.log(addOne(2),'---------------')

console.log(_,'lodash')
class Test {
    private name: string
    constructor() {
        this.name = 'string'
    }

    logName() {
        console.log(this.name)
    }
}

const test = new Test()
test.logName()

const func = () => {
    console.log('arrow function')
}
// hi, there