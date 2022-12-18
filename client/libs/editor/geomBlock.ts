import { GeometoryObject, InitialGeometoryObj } from 'entities/geometory';
import {
  API,
  ToolConfig,
  ToolConstructable,
  BlockToolConstructorOptions,
  BlockAPI,
} from '@editorjs/editorjs';
/* const */
import {
  MAP_SEARCHBAR_ID,
  MAP_SEARCH_FORM_ID,
  NOTES_BALLOON_ID,
} from 'libs/globalConst';

const GuideText = '';

export class GeomBlock {
  data: GeometoryObject;
  api: API;
  config?: ToolConfig;
  // block?: BlockAPI;

  constructor({ data, config, api }: BlockToolConstructorOptions) {
    this.api = api;
    this.config = config;
    this.data = data;
  }

  //メニューバーにアイコンを表示
  static get toolbox() {
    return {
      title: '地点',
      // ここは静的なDOMとして読み込まれるので、javascriptを使えない
      icon: '<svg width="17" height="15" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title>map-glyph</title><path d="M37.86,86.16,160,121.05V506.76L26.14,468.51A21.33,21.33,0,0,1,10.67,448V106.67a21.34,21.34,0,0,1,27.2-20.51ZM352,270.32C313.11,234.95,245.33,162.73,245.33,112,245.33,51.29,294.18,0,352,0S458.67,51.29,458.67,112C458.67,162.64,390.88,234.91,352,270.32Zm0-121a42.67,42.67,0,1,0-42.67-42.67A42.67,42.67,0,0,0,352,149.33Zm146-11.08c-17.36,71.46-97.6,146.55-124.63,170.22V482.38l100.8,28.8a21.34,21.34,0,0,0,27.2-20.51V149.33A21.07,21.07,0,0,0,498,138.25ZM203.1,120.93l-.43.12V506.76l128-36.57V308.47C301.43,282.88,210,197.16,203.1,120.93Z"/></svg>',
    };
  }

  render() {
    // 仮想DOMとして扱われているので、javascriptのdomオブジェクトとして返す必要がある
    const container = document.createElement('div');
    container.setAttribute('class', 'p-2');

    if (!Object.keys(this.data).length) {
      // geomデータがない場合(地図から地点登録を促すUIを返す)
      const textEl = document.createElement('p');
      textEl.innerText = GuideText;
      container.appendChild(textEl);
      setTimeout(() => {
        // GuideTextが入ったブロックは3.5秒後に自動的に消去する
        const delete_idxes = [];
        const blockCounts = this.api.blocks.getBlocksCount();
        for (let i = 0; i < blockCounts; i++) {
          const temp = this.api.blocks.getBlockByIndex(i);
          if (temp && temp.holder.innerText == GuideText) {
            delete_idxes.push(i);
          }
        }
        delete_idxes.forEach((i) => {
          this.api.blocks.delete(i);
        });
      }, 300);
      // 地図検索formを空にしてフォーカスを当てる
      const mapSearchBar = document.getElementById(MAP_SEARCHBAR_ID);
      setTimeout(() => {
        const mapSearccForm = document.getElementById(
          MAP_SEARCH_FORM_ID,
        ) as HTMLFormElement;
        const balloon = document.getElementById(NOTES_BALLOON_ID);
        balloon?.classList.remove('opacity-0');

        mapSearccForm?.reset();
        mapSearchBar?.focus();
      }, 600);
      setTimeout(() => {
        const balloon = document.getElementById(NOTES_BALLOON_ID);
        balloon?.classList.add('opacity-0');
      }, 3500);
    } else {
      // geomデータがある場合
      //   <div>
      //   <p className="inline-flex items-center rounded bg-cyan-500 px-3 py-2">
      //     <svg
      //       width="34"
      //       height="28"
      //       viewBox="0 0 512 512"
      //       xmlns="http://www.w3.org/2000/svg"
      //     >
      //       <path
      //         fill="black"
      //         d="M37.86,86.16,160,121.05V506.76L26.14,468.51A21.33,21.33,0,0,1,10.67,448V106.67a21.34,21.34,0,0,1,27.2-20.51ZM352,270.32C313.11,234.95,245.33,162.73,245.33,112,245.33,51.29,294.18,0,352,0S458.67,51.29,458.67,112C458.67,162.64,390.88,234.91,352,270.32Zm0-121a42.67,42.67,0,1,0-42.67-42.67A42.67,42.67,0,0,0,352,149.33Zm146-11.08c-17.36,71.46-97.6,146.55-124.63,170.22V482.38l100.8,28.8a21.34,21.34,0,0,0,27.2-20.51V149.33A21.07,21.07,0,0,0,498,138.25ZM203.1,120.93l-.43.12V506.76l128-36.57V308.47C301.43,282.88,210,197.16,203.1,120.93Z"
      //       />
      //     </svg>
      //     <span className="mx-2 font-bold">地点名</span>
      //   </p>
      //   <p className="mx-2">住所: ---------</p>
      // </div>
      const nameContainer = document.createElement('p');
      nameContainer.setAttribute(
        'class',
        'inline-flex items-center rounded bg-cyan-500 px-3 py-2',
      );
      const mapSvg = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg',
      );
      mapSvg.setAttribute('width', '34');
      mapSvg.setAttribute('height', '28');
      mapSvg.setAttribute('viewBox', '0 0 512 512');
      const mapPath = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path',
      );
      mapPath.setAttribute(
        'd',
        'M37.86,86.16,160,121.05V506.76L26.14,468.51A21.33,21.33,0,0,1,10.67,448V106.67a21.34,21.34,0,0,1,27.2-20.51ZM352,270.32C313.11,234.95,245.33,162.73,245.33,112,245.33,51.29,294.18,0,352,0S458.67,51.29,458.67,112C458.67,162.64,390.88,234.91,352,270.32Zm0-121a42.67,42.67,0,1,0-42.67-42.67A42.67,42.67,0,0,0,352,149.33Zm146-11.08c-17.36,71.46-97.6,146.55-124.63,170.22V482.38l100.8,28.8a21.34,21.34,0,0,0,27.2-20.51V149.33A21.07,21.07,0,0,0,498,138.25ZM203.1,120.93l-.43.12V506.76l128-36.57V308.47C301.43,282.88,210,197.16,203.1,120.93Z',
      );
      mapPath.setAttribute('fill', 'black');
      mapSvg.appendChild(mapPath);

      const nameTextEl = document.createElement('span');
      nameTextEl.setAttribute('class', 'geomName mx-2 font-bold');
      nameTextEl.textContent = this.data.name;

      nameContainer.appendChild(mapSvg);
      nameContainer.appendChild(nameTextEl);

      const addressEl = document.createElement('p');
      addressEl.setAttribute('class', 'address mx-2');
      addressEl.textContent = this.data.formatted_address;
      container.appendChild(nameContainer);
      container.appendChild(addressEl);

      // GeometoryObject情報はhidden経由で伝える
      (Object.keys(this.data) as (keyof GeometoryObject)[]).forEach((key) => {
        // latlngはstringじゃないので、別で処理する必要がある
        if (key == 'latlng') {
          const latHidden = this.createHiddenElement('lat');
          const lngHidden = this.createHiddenElement('lng');
          latHidden.setAttribute('value', String(this.data.latlng.lat));
          lngHidden.setAttribute('value', String(this.data.latlng.lng));
          container.appendChild(latHidden);
          container.appendChild(lngHidden);
        } else {
          const hiddenEl = this.createHiddenElement(key);
          hiddenEl.setAttribute('value', this.data[key] ?? '');
          container.appendChild(hiddenEl);
        }
      });
    }
    return container;
  }

  // 値を送るための hidden input タグの作成(valueは各自setする必要がある)
  createHiddenElement(name: string) {
    const el = document.createElement('input');
    el.setAttribute('type', 'hidden');
    el.setAttribute('name', name);
    return el;
  }

  //保存時のデータを抽出(doc経由でした値を取れない、緯度軽度の値は、hidden項目などを利用して取得するようにしよう)
  save(blockContent: Document) {
    // console.log(blockContent);
    if (!Object.keys(this.data).length) {
      return {};
    } else {
      return this.data;
    }
  }
}
