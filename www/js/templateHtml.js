import {html, render} from '../../node_modules/lit-html/lit-html.js';

const myTemplate = (params) => html`
<h1>survey</h1>

<h4>survey id = ${params.id}</h4>
`;


export {render};
