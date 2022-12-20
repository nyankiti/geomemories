export const makeDomEl = (
  tagName: string,
  classNames: Array<string> | string | null = null,
  attributes: { [key: string]: string } = {},
): HTMLElement => {
  const el = document.createElement(tagName);

  if (Array.isArray(classNames)) {
    el.classList.add(...classNames);
  } else if (classNames) {
    el.setAttribute('class', classNames);
  }

  for (const attrName in attributes) {
    // el[attrName] = attributes[attrName];
    el.setAttribute(attrName, attributes[attrName]);
  }

  return el;
};

export const makeSVGEl = (
  tagName: 'svg' | 'path',
  classNames: Array<string> | string | null = null,
  attributes: { [key: string]: string } = {},
): SVGElement => {
  const svgEl = document.createElementNS('http://www.w3.org/2000/svg', tagName);

  if (Array.isArray(classNames)) {
    svgEl.classList.add(...classNames);
  } else if (classNames) {
    svgEl.classList.add(classNames);
  }

  for (const attrName in attributes) {
    // el[attrName] = attributes[attrName];
    svgEl.setAttribute(attrName, attributes[attrName]);
  }

  return svgEl;
};
