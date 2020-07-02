
import session from './session.js';
import vibes from './vibes.js';

//Gun instance created here
var gun = Gun(['https://mvp-gun.herokuapp.com/gun', 'https://e2eec.herokuapp.com/gun', 'http://localhost:8765/gun']);
session.init();
vibes.init();



export {gun};