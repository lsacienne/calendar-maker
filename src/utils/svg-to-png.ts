export function SVGtoPNG(svg: SVGSVGElement, width: number, height: number): Promise<Blob> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const svgString = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    canvas.width = width;
    canvas.height = height;

    img.onload = () => {
      if (ctx) {
          ctx.scale(width / svg.width.baseVal.value, height / svg.height.baseVal.value);
          ctx.drawImage(img, 0, 0, svg.width.baseVal.value, svg.height.baseVal.value);
        download(canvas.toDataURL("image/png"), 'example.png');
      } else {
        throw new Error('Canvas context is null');
      }
    };

    img.src = url;
  });
}

function download(href: string, name: string)
{
    var a = document.createElement('a');

    a.download = name;
    a.href = href;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}