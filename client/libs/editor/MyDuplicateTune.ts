/* eslint-disable @typescript-eslint/no-var-requires */
import { API, ToolConfig, BlockTune } from '@editorjs/editorjs';
import { TunesMenuConfig } from '@editorjs/editorjs/types/tools';
const { IconCopy } = require('@codexteam/icons');

export class MyDuplicateTune implements BlockTune {
  public static readonly isTune = true;
  private readonly api: API;
  constructor({
    api,
  }: {
    api: API;
    config?: ToolConfig;
    // data: BlockTuneData,
  }) {
    this.api = api;
  }

  public render(): TunesMenuConfig {
    return {
      icon: IconCopy,
      label: this.api.i18n.t('Duplicate'),
      onActivate: (item, event): void => this.handleClick(event),
      name: 'duplicate',
    };
  }

  public handleClick(event: PointerEvent | undefined): void {
    // console.log(event);
    const currentBlockIndex = this.api.blocks.getCurrentBlockIndex();
    const currentBlock = this.api.blocks.getBlockByIndex(currentBlockIndex);
    // currentBlock?.call('copy');
    console.log(currentBlock?.holder);
    console.log(currentBlock);
    // console.log(this.api.events);
    this.api.blocks.insert(currentBlock?.name);

    /* ここで、コピーペーストを呼び出したい
     コピーするには、(e: ClipboardEvent) => this.Editor.BlockEvents.handleCommandC(e) を呼び出したい。
     しかし、BlockEventsにアクセスする方法がわからない、、

     => 既にevent登録されているので、シンプルに通常通りのコピーペーストを呼び出すだけで良さそう??
    */
    // const copyEvent = new ClipboardEvent('copy', {
    //   clipboardData: new DataTransfer(),
    // });
    // currentBlock?.holder.dispatchEvent(copyEvent);

    // navigator.clipboard.writeText(currentBlock?.holder);

    // this.api.events.emit('copy', currentBlock);
    // this.api.events.emit('paste', currentBlock);

    // this.api.blocks.insert(currentBlock?.holder);
  }

  wrap(blockContent: HTMLElement): HTMLElement {
    const myWrapper = document.createElement('div');

    myWrapper.append(blockContent);

    myWrapper.style.fontSize = '0.9em';

    return myWrapper;
  }
}
