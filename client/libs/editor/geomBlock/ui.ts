import { API } from '@editorjs/editorjs';
import { GeometoryObject } from 'entities/geometory';
/* utils */
import { makeDomEl, makeSVGEl } from 'libs/dom';

/*
以下のようなDomを返す想定。
<div>
    <p className="inline-flex items-center rounded bg-cyan-500 px-3 py-2">
        <svg
        width="34"
        height="28"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
        >
        <path
            fill="black"
            d="M37.86,86.16,160,121.05V506.76L26.14,468.51A21.33,21.33,0,0,1,10.67,448V106.67a21.34,21.34,0,0,1,27.2-20.51ZM352,270.32C313.11,234.95,245.33,162.73,245.33,112,245.33,51.29,294.18,0,352,0S458.67,51.29,458.67,112C458.67,162.64,390.88,234.91,352,270.32Zm0-121a42.67,42.67,0,1,0-42.67-42.67A42.67,42.67,0,0,0,352,149.33Zm146-11.08c-17.36,71.46-97.6,146.55-124.63,170.22V482.38l100.8,28.8a21.34,21.34,0,0,0,27.2-20.51V149.33A21.07,21.07,0,0,0,498,138.25ZM203.1,120.93l-.43.12V506.76l128-36.57V308.47C301.43,282.88,210,197.16,203.1,120.93Z"
        />
        </svg>
        <span className="mx-2 font-bold">地点名</span>
    </p>
    <p className="mx-2">住所: ---------</p>
</div>
*/
export default class Ui {
  api: API;
  nodes: { [key: string]: HTMLElement | SVGElement };

  constructor({ api }: { api: API }) {
    this.api = api;
    this.nodes = {
      wrapper: makeDomEl('div', 'p-2'),
      titleContainer: makeDomEl(
        'div',
        'inline-flex items-center rounded bg-cyan-500 px-3 py-2',
      ),
      nameTextEl: makeDomEl('span', 'geomName mx-2 font-bold'),
      mapLogo: makeSVGEl('svg', '', {
        width: '34',
        height: '28',
        viewBox: '0 0 512 512',
      }),
      mapLogoPath: makeSVGEl('path', '', {
        d: 'M37.86,86.16,160,121.05V506.76L26.14,468.51A21.33,21.33,0,0,1,10.67,448V106.67a21.34,21.34,0,0,1,27.2-20.51ZM352,270.32C313.11,234.95,245.33,162.73,245.33,112,245.33,51.29,294.18,0,352,0S458.67,51.29,458.67,112C458.67,162.64,390.88,234.91,352,270.32Zm0-121a42.67,42.67,0,1,0-42.67-42.67A42.67,42.67,0,0,0,352,149.33Zm146-11.08c-17.36,71.46-97.6,146.55-124.63,170.22V482.38l100.8,28.8a21.34,21.34,0,0,0,27.2-20.51V149.33A21.07,21.07,0,0,0,498,138.25ZM203.1,120.93l-.43.12V506.76l128-36.57V308.47C301.43,282.88,210,197.16,203.1,120.93Z',
        fill: 'black',
      }),
      addressTextEl: makeDomEl('p', 'address mx-2'),
    };

    // 色付きの地図ロゴと地名部分の構成
    this.nodes.mapLogo.appendChild(this.nodes.mapLogoPath);
    this.nodes.titleContainer.appendChild(this.nodes.mapLogo);
    this.nodes.titleContainer.appendChild(this.nodes.nameTextEl);
    // 全体の構成
    this.nodes.wrapper.appendChild(this.nodes.titleContainer);
    this.nodes.wrapper.appendChild(this.nodes.addressTextEl);
  }

  // データがある場合
  render(geomObject: GeometoryObject) {
    this.nodes.nameTextEl.textContent = geomObject.name;
    this.nodes.addressTextEl.textContent = geomObject.formatted_address;
    return this.nodes.wrapper;
  }

  //   hidden input にgeomObjectのデータ含めたい場合に利用するメソッド
  setHiddenEls(geomObject: GeometoryObject) {
    (Object.keys(geomObject) as (keyof GeometoryObject)[]).forEach((key) => {
      // latlngはstringじゃないので、別で処理する必要がある
      if (key == 'latlng') {
        const latHiddenEl = makeDomEl('input', '', {
          type: 'hidden',
          name: key,
          value: String(geomObject.latlng.lat),
        });
        const lngHiddenEl = makeDomEl('input', '', {
          type: 'hidden',
          name: key,
          value: String(geomObject.latlng.lng),
        });
        this.nodes.wrapper.appendChild(latHiddenEl);
        this.nodes.wrapper.appendChild(lngHiddenEl);
      } else {
        const hiddenEl = makeDomEl('input', '', {
          type: 'hidden',
          name: key,
          value: geomObject[key] ?? '',
        });
        this.nodes.wrapper.appendChild(hiddenEl);
      }
    });
  }
}
