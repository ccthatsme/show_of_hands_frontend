import {html, render, nothing} from '../../node_modules/lit-html/lit-html.js';

const myTemplate = (params) => html`
<h1>survey</h1>

<h4>survey id = ${params.id}</h4>
<h4>survey question is ${params.question}</h4>
`;

const homeTemplate = html`<h1>im home</h1>`;

window.addEventListener('hashchange', function(){
    console.log(history.state);
    if(location.hash.includes('#survey/')){

    
    console.log(location.hash);
    let displaySurvey = getParams();
    displaySurvey.then(function(result){
        console.log(result);
        window.history.replaceState('pushstate from url typeing in change', null, `/#survey/${result.id}`)
    render(myTemplate(result), document.getElementById('example1'));
    render('', document.getElementById('totalSurvey'));
})}

else if(location.hash.includes('#home')){
    render(homeTemplate, document.getElementById('example1'));
}
    });

window.addEventListener('popstate', (e) => {
console.log(e.state);
if(e.state === 'home'){
    console.log('home popping from template module');
}
else if(e.state === 'pushstate from url typeing in change'){
    console.log('url typeing popping from template module');
}

else if(e.state === '/#home'){
    console.log('state test from initial survey creation popping from template module');
    render(homeTemplate, document.getElementById('example1'));
}
});


export {render};
