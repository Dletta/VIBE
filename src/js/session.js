import {gun} from './main.js';
import helpers from './helpers.js';
import {addVibe } from './vibes.js';

var key;
var username;
var latestChatLink;

//Create new account
function newAccount() {
    $('#username').focus();
    $('#account-create').submit(function(e) {
        e.preventDefault();
        var username = $('#username').val();
        if (username.length) {
            Gun.SEA.pair().then(async k => {
                await login(k);
                await gun.user().get('profile').get('username').put(username);
                await createVibeLink();
            });
        }
    });    
}

//Creating channel URL to be shared
async function createVibeLink() {
    latestChatLink = await iris.Channel.createChatLink(gun, key, 'http://localhost:8080');
}


//Login using a key
async function login(k) {
    key = k;
    localStorage.setItem('keyPair', JSON.stringify(k));
    iris.Channel.initUser(gun, key);
    gun.user().get('profile').get('username').on(async name => {        
        username = await name;
    });

    iris.Channel.getChannels(gun, key, addVibe);
}

//Helper functions
function getKey() { return key;}
function getUsername() {return username;}
function getVibeLink() {return latestChatLink || helpers.getUserVibeLink(key.pub);}


function init() {
    var localStorageKey = localStorage.getItem('keyPair');
    if (localStorageKey) {
        console.log("ALREADY LOGGED IN")
        login(JSON.parse(localStorageKey));

    } else {
        console.log("NO ACCOUNT ACTIVE\n CREATE ONE");
        newAccount();
    }

    
    $('#account-login input').on('input', (event) => {
        var val = $(event.target).val();
        if (!val.length) {return;}
        try {
            var k = JSON.parse(val);
            login(k);
            createVibeLink();
            console.log('Succussfuly logged in');
            $(event.target).val('');
        } catch (e) {
            console.error('Login with key', val, 'failed', e);
            console.log('Error Logging in');
        }
    });
    $('#account-logout').click(() => {
        console.log(getUsername(), ": LOGGED OUT!")
        localStorage.removeItem('keyPair');
        location.reload();
    });
    $('#debug-print').click(() => {
        console.log("Username: ", getUsername());
        console.log("Key: ", JSON.stringify(getKey()));
        console.log("Vibe Link: ", getVibeLink());
    });
}

export default {init, getKey, getUsername, getVibeLink};