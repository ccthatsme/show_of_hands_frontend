const app = document.getElementById('app');
const href = document.querySelector("a[href='#/survey/:surveyId']");

const homeComponent = {
    render: () => {
        return `
        <h1></h1>
        `;
    }
};

const surveyComponenet = {
    render: () => {
        return `
        <h1>survey</h1>
        `;
    }
};

const surveyComponenetParam = {
    render: (id) => {
        return `
        <h1>survey</h1>
        <h4>second survey</h4> 
        <h4>${id}</h4>
        `;
    }
};

const ErrorComponent = {
    render: () => {
        return `
        <h1>error</h1>
        `;
    }
};

const routes = [
    {routeName: '/survey/:surveyId', component: surveyComponenetParam,},
    {routeName: '/survey', component: surveyComponenet,},
    {routeName: '/', component: homeComponent,},

    
];

const router = async () => {
    const path = await parseLocation();
    const component = 
   await findComponenetByPath(path.trim(), routes);

     app.innerHTML = await component.component.render();
   
}

const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';


findComponenetByPath = (path, routes) => {
    let found = routes.find(({routeName}) =>{

        routeName === path
    
    });
return found;

};

window.addEventListener('load', router);