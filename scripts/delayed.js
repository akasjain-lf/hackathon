// eslint-disable-next-line import/no-cycle
import { sampleRUM } from './lib-franklin.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

(function adobeotm() {
    const adobetargetscript = document.createElement('script');
    adobetargetscript.setAttribute('src', 'http://localhost:3000/scripts/at_v1.js');
    //document.head.append(adobetargetscript);
}());

// add more delayed functionality here
