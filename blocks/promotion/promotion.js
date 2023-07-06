import { createOptimizedPicture, getMetadata, getTargetOffer } from '../../scripts/lib-franklin.js';

export default async function decorate(block) {

    /* change to ul, li */
    const ul = document.createElement('ul');
    [...block.children].forEach((row) => {
        const li = document.createElement('li');
        li.innerHTML = row.innerHTML;
        [...li.children].forEach((div) => {
            if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
            else div.className = 'cards-card-body';
        });
        ul.append(li);
    });
    ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
    block.textContent = '';

    //var cls = block.getAttribute('data-block-name') + '-container';
    var shouldUseTarget;
    var mboxName;
    var parent = block.parentElement.parentElement;
    if(parent) {
        shouldUseTarget = parent.getAttribute('data-usetarget');
        mboxName = parent.getAttribute('data-mbox');
    }

    if(shouldUseTarget && mboxName) {
        if(typeof(window.adobe) !== 'undefined' && typeof(adobe) !== 'undefined' && typeof(adobe.target) !== 'undefined') {
            await getTargetOffer(block, ul, mboxName);
            console.log('Rendering block from Target decisioning');
        }
    } else {
        block.append(ul);
    }

    if(typeof(window.adobe) === 'undefined' || typeof(adobe) === 'undefined' || typeof(adobe.target) === 'undefined') {
        console.log("undefined values");
    }
}
