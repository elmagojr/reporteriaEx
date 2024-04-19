

function elementoADataURL(elemento) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const width = elemento.offsetWidth;
    const height = elemento.offsetHeight;    

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(elemento, 0, 0, width, height);   
    
    return canvas.toDataURL(); //base64 del elemenot mostrado
}