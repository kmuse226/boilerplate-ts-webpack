import "./styles/index.css"
import _ from 'lodash'


console.log('123123123')

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