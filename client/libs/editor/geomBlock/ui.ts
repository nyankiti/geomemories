import { API } from '@editorjs/editorjs';
import { GeometoryObject } from 'entities/geometory';
/* utils */
import { makeDomEl, makeSVGEl } from 'libs/dom';

export default class Ui {
  api: API;
  onSelectFile: () => void;
  onClickClose: () => void;
  nodes: { [key: string]: HTMLElement | SVGElement };

  constructor({
    api,
    onSelectFile,
    onClickClose,
    initialImageUrl,
  }: {
    api: API;
    onSelectFile: () => void;
    onClickClose: () => void;
    initialImageUrl: string | undefined;
  }) {
    this.api = api;
    this.onSelectFile = onSelectFile;
    this.onClickClose = onClickClose;
    this.nodes = {
      wrapper: makeDomEl('div', 'flex p-2 items-center justify-between'),
      geomInfoContainer: makeDomEl('div'), // 地名、住所を入れるコンテナ
      imageContainer: makeDomEl('div', 'relative max-w-[50%]'), // 画像を入れるコンテナ
      titleContainer: makeDomEl(
        'div',
        'inline-flex items-center rounded bg-cyan-500 px-3 py-2',
      ), // 地名とsvg icon を入れるコンテナ(geomInfoContainerのchildとなるコンテナ)
      nameTextEl: makeDomEl('span', 'geomName mx-2 font-bold'),
      mapLogo: this.createMapLogo(),
      closeLogo: this.createCloseLogo(),
      addressTextEl: makeDomEl('p', 'address mx-2'),
      fileButton: this.createFileButton(),
      imageLoader: makeDomEl('p', 'text-center text-gray-500 hidden'),
    };

    // 色付きの地図ロゴと地名部分の構成
    this.nodes.titleContainer.appendChild(this.nodes.mapLogo);
    this.nodes.titleContainer.appendChild(this.nodes.nameTextEl);
    // geomInfoContainerの構成
    this.nodes.geomInfoContainer.appendChild(this.nodes.titleContainer);
    this.nodes.geomInfoContainer.appendChild(this.nodes.addressTextEl);
    // imageContainerの構成
    if (initialImageUrl) {
      this.fillImage(initialImageUrl);
      this.nodes.closeLogo.classList.remove('hidden');
      this.nodes.closeLogo.classList.add('block');
    }
    this.nodes.imageLoader.innerHTML = 'now loading ...';
    this.nodes.imageContainer.appendChild(this.nodes.imageLoader);
    this.nodes.imageContainer.appendChild(this.nodes.fileButton);
    this.nodes.imageContainer.appendChild(this.nodes.closeLogo);
    // 全体の構成
    this.nodes.wrapper.appendChild(this.nodes.geomInfoContainer);
    this.nodes.wrapper.appendChild(this.nodes.imageContainer);
  }

  // データがある場合
  render(geomObject: GeometoryObject) {
    this.nodes.nameTextEl.textContent = geomObject.name;
    this.nodes.addressTextEl.textContent = geomObject.formatted_address;
    return this.nodes.wrapper;
  }

  createFileButton() {
    const button = makeDomEl(
      'div',
      'block mt-2 rounded-sm px-3 py-1 bg-gray-200 cursor-pointer hover:bg-gray-300 focus:shadow-outline focus:outline-none',
    );
    // button.innerHTML = `${IconPicture} ${this.api.i18n.t('Select an Image')}`;
    button.innerHTML = '画像を選択する';

    // clickイベントを仕掛ける
    button.addEventListener('click', () => {
      this.onSelectFile();
    });

    return button;
  }

  createMapLogo() {
    const svgContainer = makeSVGEl('svg', '', {
      width: '34',
      height: '28',
      viewBox: '0 0 512 512',
    });
    const path = makeSVGEl('path', '', {
      d: 'M37.86,86.16,160,121.05V506.76L26.14,468.51A21.33,21.33,0,0,1,10.67,448V106.67a21.34,21.34,0,0,1,27.2-20.51ZM352,270.32C313.11,234.95,245.33,162.73,245.33,112,245.33,51.29,294.18,0,352,0S458.67,51.29,458.67,112C458.67,162.64,390.88,234.91,352,270.32Zm0-121a42.67,42.67,0,1,0-42.67-42.67A42.67,42.67,0,0,0,352,149.33Zm146-11.08c-17.36,71.46-97.6,146.55-124.63,170.22V482.38l100.8,28.8a21.34,21.34,0,0,0,27.2-20.51V149.33A21.07,21.07,0,0,0,498,138.25ZM203.1,120.93l-.43.12V506.76l128-36.57V308.47C301.43,282.88,210,197.16,203.1,120.93Z',
      fill: 'black',
    });
    svgContainer.appendChild(path);
    return svgContainer;
  }

  createCloseLogo() {
    const svgContainer = makeSVGEl(
      'svg',
      'absolute top-0 right-0 hidden cursor-pointer hover:opacity-60',
      {
        width: '24',
        height: '24',
        fill: 'none',
        viewBox: '0 0 24 24',
      },
    );
    const path = makeSVGEl('path', '', {
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'stroke-width': '2',
      d: 'M6 18L18 6M6 6l12 12',
    });
    svgContainer.appendChild(path);

    // clickイベントを仕掛ける
    svgContainer.addEventListener('click', () => {
      this.onClickClose();
    });

    return svgContainer;
  }

  showLoader() {
    // loadingを出す
    this.nodes.imageLoader.classList.remove('hidden');
    this.nodes.imageLoader.classList.add('block');
    // fileボタンを消す
    this.nodes.fileButton.classList.remove('block');
    this.nodes.fileButton.classList.add('hidden');
  }

  // ファイルの読み込み時にエラーし、fileButtonを再度出現させる
  hideErrorShowFileButton() {
    // loadingを消す
    this.nodes.imageLoader.classList.remove('block');
    this.nodes.imageLoader.classList.add('hidden');
    // fileボタンを消す
    this.nodes.fileButton.classList.remove('hidden');
    this.nodes.fileButton.classList.add('block');
  }

  fillImage(url: string) {
    this.nodes.imageEl = makeDomEl('img', '', { src: url });
    // load event listener を利用して、preloaderの画像を消す
    this.nodes.imageEl.addEventListener('load', () => {
      // loadingを消す
      this.nodes.imageLoader.classList.remove('block');
      this.nodes.imageLoader.classList.add('hidden');
      // fileボタンを消す
      this.nodes.fileButton.classList.remove('block');
      this.nodes.fileButton.classList.add('hidden');
      // closeボタンを出す
      this.nodes.closeLogo.classList.add('block');
      this.nodes.closeLogo.classList.remove('hidden');
    });
    this.nodes.imageContainer.appendChild(this.nodes.imageEl);
  }

  eraseCloseShowFileButton() {
    // closeボタンを消す
    this.nodes.closeLogo.classList.remove('block');
    this.nodes.closeLogo.classList.add('hidden');
    // 画像をエレメントを消す
    this.nodes.imageEl.remove();
    // file buttonを出す
    this.nodes.fileButton.classList.remove('hidden');
    this.nodes.fileButton.classList.add('block');
  }
  //   hidden input にgeomObjectのデータ含めたい場合に利用するメソッド
  // setHiddenEls(geomObject: GeometoryObject) {
  //   (Object.keys(geomObject) as (keyof GeometoryObject)[]).forEach((key) => {
  //     // latlngはstringじゃないので、別で処理する必要がある
  //     if (key == 'latlng') {
  //       const latHiddenEl = makeDomEl('input', '', {
  //         type: 'hidden',
  //         name: key,
  //         value: String(geomObject.latlng.lat),
  //       });
  //       const lngHiddenEl = makeDomEl('input', '', {
  //         type: 'hidden',
  //         name: key,
  //         value: String(geomObject.latlng.lng),
  //       });
  //       this.nodes.wrapper.appendChild(latHiddenEl);
  //       this.nodes.wrapper.appendChild(lngHiddenEl);
  //     } else {
  //       const hiddenEl = makeDomEl('input', '', {
  //         type: 'hidden',
  //         name: key,
  //         value: geomObject[key] ?? '',
  //       });
  //       this.nodes.wrapper.appendChild(hiddenEl);
  //     }
  //   });
  // }
}
