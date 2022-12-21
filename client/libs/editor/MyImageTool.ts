/* eslint-disable @typescript-eslint/no-var-requires */
const ImageTool = require('@editorjs/image');
/* 
  getter, setterを使った実装をすると、それ以外でのアクセスができなくなる。??

 => recoilを利用していると、this._dataのプロパティに2回目以降アクセスしている部分でバグってしまうので、該当箇所を全てオーバーライドし、最低限のみ残した。

 時間があれば、自分で全て実装しなおしたい。
*/

export default class MyImageTool extends ImageTool {
  // tune settingも、バグるので、表示しない
  static get tunes() {
    return [];
  }
  renderSettings() {
    return [];
  }

  set data(data: any) {
    // ここで image setter が呼ばれる
    this.image = data.file;

    ImageTool.tunes.forEach(({ name: tune }: any) => {
      const value =
        typeof data[tune] !== 'undefined'
          ? data[tune] === true || data[tune] === 'true'
          : false;

      this.setTune(tune, value);
    });
  }

  get data() {
    return this._data;
  }

  set image(file: any) {
    // const { file: temp, ...other } = this._data;
    // 一度初期化しないとエラーする
    // this._data = {};
    this._data.file = file;

    if (file && file.url) {
      // ここでimageの描画が走る
      this.ui.fillImage(file.url);
    }
  }

  save() {
    return this.data;
  }

  render() {
    return super.render();
  }
}
