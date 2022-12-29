import './styles/index.css';
import _ from 'lodash';
import addOne from './module/module';
console.log(addOne(2), '---------------');

console.log(_, 'lodash');
class Test {
  private name: string;
  constructor() {
    this.name = 'Ellie iiiiiiii';
  }

  logName() {
    console.log(this.name);
  }
}

interface testInterface {
  log(): void;
  someReturn(): string;
}

class interImple implements testInterface {
  log = () => {};
  someReturn = () => 'string';
}

const interimpl = new interImple();

console.log(interimpl);

const test = new Test();
test.logName();

const func = () => {
  console.log('arrow function');
};
// hi, there

func();
