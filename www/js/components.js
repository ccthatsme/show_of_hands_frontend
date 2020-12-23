const app = document.getElementById('app');

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
    console.log(path)
    const component = 
   await findComponenetByPath(path.trim(), routes);
    console.log(component.component)
     app.innerHTML = await component.component.render();
    //finally this prints survey in the app section
}

const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';

// function checkPath(routeName){
//     console.log(routeName.routeName);
//     return routeName.routeName === "/survey/:surveyId"
// }

findComponenetByPath = (path, routes) => {
    console.log(routes);
    console.log(path);
    let found = routes.find(({routeName}) =>{
        console.log(routeName)
        routeName === path
    
    });
//let found = routes.find(checkPath);
console.log(found)
return found;

};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);