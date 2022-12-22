import "./styles/index.css"
import _ from 'lodash'
import addOne from "./module"
console.log(addOne(2),'---------------')
class Test {
    name
    constructor() {
        this.name = 'john'
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