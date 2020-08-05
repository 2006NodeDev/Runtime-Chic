export let rcBaseUrl:string;
//this is the only env we get in front end, and technically anyone that downloads the site can read it 
if(process.env['NODE_ENV'] === 'production'){
    //if we ran npm run build
    //use the deployed address
    // lbBaseUrl = 'https://node-service.js-army.com'
}else {
    //we are in test or dev, use the local address
    rcBaseUrl = 'http://localhost:3003'; // /user-service
}

export let mbBaseUrl:string;
if(process.env['NODE_ENV'] === 'production'){
    // lbBaseUrl = 'https://node-service.js-army.com'
}else {
    mbBaseUrl = process.env['MESSAGEBOARD_SERVICE_HOST'];
}