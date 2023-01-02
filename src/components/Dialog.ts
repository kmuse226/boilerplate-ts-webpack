import { contentType } from '../types/types';
import { ImageItem, VideoItem, Item, TaskItem, NoteItem } from './Item';

const items: Item[] = [];

class DialogMaker {
  private dialogContainer: HTMLDivElement | undefined;
  private dialogTitleInput: HTMLInputElement | undefined;
  private dialogSourceInput: HTMLInputElement | HTMLTextAreaElement | undefined;
  constructor(private contentType: contentType) {
    this.contentType = contentType;
    this.makeDialogContainer();
    this.makeDialogCloseButton();
    this.makeDialogTitleArea();
    this.makeDialogInputArea();
    this.makeDialogAddButton();
    this.addDialogToDocument();
  }

  private makeDialogContainer() {
    const dialogContainer = document.createElement('div');
    dialogContainer.classList.add('dialog-container');
    this.dialogContainer = dialogContainer;
  }
  private makeDialogTitleArea() {
    const dialogTitleAreaContainer = document.createElement('div');
    dialogTitleAreaContainer.classList.add('title');
    const dialogTitleHeader = document.createElement('div');
    dialogTitleHeader.textContent = 'Title';
    dialogTitleHeader.classList.add('header');
    const dialogTitleInput = document.createElement('input');
    this.dialogTitleInput = dialogTitleInput;
    dialogTitleInput.type = 'text';

    dialogTitleAreaContainer.appendChild(dialogTitleHeader);
    dialogTitleAreaContainer.appendChild(dialogTitleInput);

    this.dialogContainer?.appendChild(dialogTitleAreaContainer);
  }
  private makeDialogInputArea() {
    let inputTitle = '';
    const isUrl = this.contentType == 'IMAGE' || this.contentType == 'VIDEO';

    const dialogInputAreaContainer = document.createElement('div');
    dialogInputAreaContainer.classList.add('source');
    const dialogInputHeader = document.createElement('div');

    inputTitle = isUrl ? 'Url' : 'Body';

    dialogInputHeader.textContent = inputTitle;
    dialogInputHeader.classList.add('header');
    const dialogSourceInput = isUrl
      ? document.createElement('input')
      : document.createElement('textarea');
    this.dialogSourceInput = dialogSourceInput;
    dialogInputAreaContainer.appendChild(dialogInputHeader);
    dialogInputAreaContainer.appendChild(dialogSourceInput);

    this.dialogContainer?.appendChild(dialogInputAreaContainer);
  }
  private makeDialogAddButton() {
    const addBtnContainer = document.createElement('div');
    addBtnContainer.classList.add('add');
    const addBtn = document.createElement('button');
    addBtn.textContent = 'Add';
    addBtnContainer.appendChild(addBtn);

    addBtn.addEventListener('click', this.handleAddButtonEvent.bind(this));
    this.dialogContainer?.appendChild(addBtnContainer);
  }
  private makeDialogCloseButton() {
    const closeBtnContainer = document.createElement('div');
    closeBtnContainer.classList.add('close');
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtnContainer.appendChild(closeBtn);

    closeBtn.addEventListener('click', () => {
      const dialogBackground = document.querySelector(
        '.dialog-background',
      ) as HTMLDivElement;
      this.dialogContainer &&
        dialogBackground.removeChild(this.dialogContainer);
      dialogBackground.style.display = 'none';
    });

    this.dialogContainer?.appendChild(closeBtnContainer);
  }
  private addDialogToDocument() {
    const dialogBackground = document.querySelector(
      '.dialog-background',
    ) as HTMLDivElement;
    this.dialogContainer && dialogBackground.appendChild(this.dialogContainer);
  }
  private removeDialog() {
    const dialogBackground = document.querySelector(
      '.dialog-background',
    ) as HTMLDivElement;
    this.dialogContainer && dialogBackground.removeChild(this.dialogContainer);
    dialogBackground.style.display = 'none';
  }
  private submitContent(contentType: contentType, title = '', source = '') {
    let item: Item;
    switch (contentType) {
      case 'IMAGE':
        item = new ImageItem(title, source, contentType);
        break;
      case 'VIDEO':
        item = new VideoItem(title, source, contentType);
        break;
      case 'TASK':
        item = new TaskItem(title, source, contentType);
        break;
      case 'NOTE':
        item = new NoteItem(title, source, contentType);
        break;
      default:
        throw new Error(`Content Type is not available ${contentType}`);
    }
    items.push(item);
    console.log(items);
  }
  private handleAddButtonEvent() {
    this.submitContent(
      this.contentType,
      this.dialogTitleInput?.value,
      this.dialogSourceInput?.value,
    );
    this.removeDialog();
  }
}

export { DialogMaker, items };
