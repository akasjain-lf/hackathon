import { createOptimizedPicture } from '../../scripts/lib-franklin.js';


window.getTargetOffer = (block, ul) => {
    window.adobe.target.getOffer({
          mbox: 'franklin',
          success: function(offer) {
              console.log(offer)
              const content = offer[0].content[0]
              console.log(content);
              if(content.enabled && content.index === 0) { //Assuming "expA" is control
                  console.log("Render Experience A having index: ", content.index);
                  [...ul.children].forEach((row, i) => {
                      row.style.display = i == 0 ? 'block' : 'none';
                  });

              }
              else {
                  console.log("Render Experience B having index: ", content.index);
                  [...ul.children].forEach((row, i) => {
                      row.style.display = i == 1 ? 'block' : 'none';
                  });
              }
              block.append(ul);
              /*adobe.target.applyOffer({
                  mbox: 'franklin',
                  offer: offer
              });*/

              document.documentElement.style.opacity = "1";
          },
          error: function() {
              document.documentElement.style.opacity = "1";
          }
      });
};

export default function decorate(block) {

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
    //block.append(ul);

    if(typeof(window.adobe) === 'undefined' || typeof(adobe) === 'undefined' || typeof(adobe.target) === 'undefined') {
        console.log("undefined values");
    }

    if(typeof(window.adobe) !== 'undefined' && typeof(adobe) !== 'undefined' && typeof(adobe.target) !== 'undefined') {
        getTargetOffer(block, ul);
        console.log('Rendering block from Target decisioning');
    }
}
