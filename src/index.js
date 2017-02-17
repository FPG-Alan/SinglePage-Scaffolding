import 'pubsub-js';

import router from './router';
import utils from './utils';

import Example from './pages/example';

import imgLoader from './libs/imgLoader';

var env;
if(PRODUCTION){
    env = 'prod';
}else{
    env = 'dev';
}


console.log('scaffolding ready!');