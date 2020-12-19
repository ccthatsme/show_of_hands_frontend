const app = document.getElementById('app');

const surveyComponenet = {
    render: () => {
        return `
        <h1>survey</h1>
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

    {routeName: '/survey', component: surveyComponenet,},


];

const router = async () => {
    const path = await parseLocation();
    console.log(path)
    const component = 
   await findComponenetByPath(path, routes);
    console.log(component.component)
     app.innerHTML = await component.component.render();
    
}

const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';

findComponenetByPath = (path, routes) => {
    
    let found = routes.find(({routeName}) =>
        // console.log(r.path);
        // console.log(path);
        //let regex = /^\/(survey)$/g;
        // return r.path.match(new RegExp(`^\/(${path})$`, 'gm'))});
       // r.path.match(regex)[0];
        // console.log(found); 
        // console.log(found[0]);
        // console.log(found[0]);
        // console.log(r.component);

        routeName === path
);
console.log(found)
return found;

};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);