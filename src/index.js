import helloWorld from './helloWorld'

const helloStr = helloWorld()

function component() {
    const ele = document.createElement('div')
    ele.innerHTML = helloStr;

    return ele;
}

document.body.appendChild(component())