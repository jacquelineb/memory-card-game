const context = require.context('../images/cards', false, /\.(jpg)$/);
function importCardImages(r) {
  const imageImports = r.keys().map((item) => {
    const cardObj = {
      name: item.replace('./', '').slice(0, -4),
      imgSrc: r(item).default,
    };
    return cardObj;
  });

  return imageImports;
}

export const cardImageImports = importCardImages(context);
