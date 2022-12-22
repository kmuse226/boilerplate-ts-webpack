import "./styles/index.css"
import _ from 'lodash'

function component() {
    const element = document.createElement('div')
    element.innerHTML = _.join(['Hello1111111122222222222221ooooooo', 'webpack'], ' ');
    return element;
}

document.body.appendChild(component());