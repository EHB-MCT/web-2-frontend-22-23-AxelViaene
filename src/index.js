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

fetch('http://localhost:3000/users').then(response=> response.json()).then(data => {
    console.log(data);
    console.log('test')
    // console.log(`UserId is: ` + data[1].UserId);
    // const UserId = data[1].UserId
    // console.log(`GreatswordId is: ` + data[1].GreatswordId);
    // const GreatswordId = data[1].GreatswordId
   
})
}


