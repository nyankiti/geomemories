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

export class GeomBlock {
  data: GeometoryObject;
  api: API;
  config?: ToolConfig;
  // block?: BlockAPI;

  constructor({ data, config, api, block }: BlockToolConstructorOptions) {
    this.api = api;
    this.config = config;
    this.data = data;
    // this.block = block;
  }

  //メニューバーにアイコンを表示
  static get toolbox() {
    return {
      title: '地点',
      // ここは静的なDOMとして読み込まれるので、javascriptを使えない
      icon: '<svg width="17" height="15" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title>map-glyph</title><path d="M37.86,86.16,160,121.05V506.76L26.14,468.51A21.33,21.33,0,0,1,10.67,448V106.67a21.34,21.34,0,0,1,27.2-20.51ZM352,270.32C313.11,234.95,245.33,162.73,245.33,112,245.33,51.29,294.18,0,352,0S458.67,51.29,458.67,112C458.67,162.64,390.88,234.91,352,270.32Zm0-121a42.67,42.67,0,1,0-42.67-42.67A42.67,42.67,0,0,0,352,149.33Zm146-11.08c-17.36,71.46-97.6,146.55-124.63,170.22V482.38l100.8,28.8a21.34,21.34,0,0,0,27.2-20.51V149.33A21.07,21.07,0,0,0,498,138.25ZM203.1,120.93l-.43.12V506.76l128-36.57V308.47C301.43,282.88,210,197.16,203.1,120.93Z"/></svg>',
    };
  }

  /*
  プラグインのUIを作成。以下のようなDOMを返す
  <div className="p-2">
    <p>名前: {geometoryObj.name}</p>
    <p>住所: {geometoryObj.formatted_address}</p>
  </div>
  */
  render() {
    // 仮想DOMとして扱われているので、javascriptのdomオブジェクトとして返す必要がある
    // ここで、自動的に地点検索フォームの方にフォーカスが行くようにしたい。
    console.log('geom block render here');
    console.log(this.data);
    const container = document.createElement('div');
    container.setAttribute('class', 'p-2');

    const dataExistHidden = this.createHiddenElement('dataExist');

    if (!Object.keys(this.data).length) {
      // geomデータがない場合(地図から地点登録を促すUIを返す)
      dataExistHidden.setAttribute('value', 'false');
      const textEl = document.createElement('p');
      textEl.innerText = '上の地図から地点を登録しよう！';
      container.appendChild(textEl);

      // 地図検索formを空にしてフォーカスを当てる
      setTimeout(() => {
        const mapSearchBar = document.getElementById(MAP_SEARCHBAR_ID);
        const mapSearccForm = document.getElementById(
          MAP_SEARCH_FORM_ID,
        ) as HTMLFormElement;
        const balloon = document.getElementById(NOTES_BALLOON_ID);
        balloon?.classList.remove('opacity-0');
        mapSearccForm?.reset();
        mapSearchBar?.focus();
      }, 500);
      setTimeout(() => {
        const balloon = document.getElementById(NOTES_BALLOON_ID);
        balloon?.classList.add('opacity-0');
      }, 3500);
    } else {
      // geomデータがある場合
      dataExistHidden.setAttribute('value', 'true');
      const nameEl = document.createElement('p');
      nameEl.setAttribute('class', 'geomName');
      nameEl.textContent = this.data.name;
      const addressEl = document.createElement('p');
      addressEl.setAttribute('class', 'address');
      addressEl.textContent = this.data.formatted_address;
      container.appendChild(nameEl);
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
    container.appendChild(dataExistHidden);
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
    console.log(blockContent);
    if (!Object.keys(this.data).length) {
      return {};
    } else {
      return this.data;
    }
  }
}
