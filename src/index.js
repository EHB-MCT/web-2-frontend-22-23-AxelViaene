import _ from 'lodash';
window.onload =() => {

function component() {
    const element = document.createElement('div');
    console.log("Hello")
    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    return element;
}
component();

fetch('http://localhost:3000/users/').then(response=> response.json()).then(data => {
    console.log(data);
})
}


