import {gun} from './main.js';

export default {
    getUrlParameter: (sParam, sParams) => {
        var sPageURL = sParams || window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
        for (i=0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true: decodeURIComponent(sParameterName[1]);
            }
        }  
    },
    getUserVibeLink: (pub) => {
        return "http://localhost:8080?vibeWith="+ pub;
      },
}