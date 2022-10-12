import "./styles/index.css"
import _ from 'lodash'

function component() {
    const element = document.createElement('div')
    element.innerHTML = _.join(['Hell2o', 'webpack'], ' ');
    return element;
}

document.body.appendChild(component());