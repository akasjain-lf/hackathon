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


  if(getMetadata('usetarget') && getMetadata('mboxcards')) {
    if(typeof(window.adobe) !== 'undefined' && typeof(window.adobe) !== 'undefined' && typeof(window.adobe.target) !== 'undefined') {
      await getTargetOffer(block, ul, getMetadata('mboxcards'));
      console.log('Rendering block from Target decisioning');
    }
  } else {
    block.append(ul);
  }
}
