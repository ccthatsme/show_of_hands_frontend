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
   await findComponenetByPath(path, routes) || {};
    console.log(component)
    document.getElementById('app').innerHTML = await component.component.render;
}

const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';

const findComponenetByPath = (path, routes) => {
    routes.find(r => {
        console.log(r);
        r.path.match(new RegExp(`^\\${path}$`, 'gm'))}) || undefined;
    
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);