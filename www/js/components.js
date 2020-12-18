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

    {path: '/survey', component: surveyComponenet,},


];

const router = async () => {
    const path = await parseLocation();
    console.log(path)
    const component = 
   await findComponenetByPath(path, routes);
    console.log(component)
    // document.getElementById('app').innerHTML = await component;
}

const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';

findComponenetByPath = (path, routes) => {
    let found = null;
    routes.find(r => {
        console.log(r);
        let regex = /^\/(survey)$/g;
        // return r.path.match(new RegExp(`^\/(${path})$`, 'gm'))});
        found = r.path.match(regex);
        console.log(found);
    
}
   
)
    if(found !== null){
    return r.component;
}

return r.component;
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);