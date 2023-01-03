import { articleClass, contentType } from '../types/types';
import { v4 as uuidv4 } from 'uuid';

class Item {
  public container: HTMLElement = document.createElement('article');
  private articleClassName: articleClass | undefined;
  constructor(protected title: string, protected contentType: contentType) {
    this.container.dataset.id = uuidv4();
    this.selectArticleClassName(contentType);
    this.articleClassName &&
      this.container.classList.add(this.articleClassName);
    this.addDragEvent();
  }
  private selectArticleClassName(contentType: contentType) {
    switch (contentType) {
      case 'IMAGE':
        this.articleClassName = 'image';
        break;
      case 'VIDEO':
        this.articleClassName = 'video';
        break;
      case 'TASK':
        this.articleClassName = 'task';
        break;
      case 'NOTE':
        this.articleClassName = 'note';
        break;
      default:
        // eslint-disable-next-line no-case-declarations
        const _exhaustiveCheck: never = contentType;
        return _exhaustiveCheck;
    }
  }
  public addArticleToDocument() {
    const mainArea = document.body.querySelector('.main') as HTMLElement;
    mainArea.appendChild(this.container);
  }

  private addDragEvent() {
    this.container.draggable = true;
    this.container.addEventListener('dragstart', this.dragItem);
  }
  private dragItem(ev: DragEvent) {
    console.log('drag');
    const target = ev.target as HTMLDivElement;
    const targetId = target.dataset.id;
    targetId && ev.dataTransfer?.setData('itemId', targetId);
  }
}

class VideoItem extends Item {
  constructor(
    protected title: string,
    private source: string,
    protected contentType: contentType,
  ) {
    super(title, contentType);
    this.makeVideoArticleInnerLayout();
    this.addVideoContent();
    this.addTextContent();
    this.addArticleToDocument();
  }

  makeVideoArticleInnerLayout() {
    const videoContent = document.createElement('p');
    const videoText = document.createElement('p');

    videoContent.classList.add('video-content');
    videoText.classList.add('video-text');

    this.container.appendChild(videoContent);
    this.container.appendChild(videoText);
  }

  addVideoContent() {
    const frameBox = this.container.querySelector('.video-content');
    const iframe = document.createElement('iframe');
    iframe.width = '440';
    iframe.height = '220';
    iframe.src = 'http://www.youtube.com/embed/gdZLi9oWNZg';
    frameBox && frameBox.appendChild(iframe);
  }
  addTextContent() {
    const textBox = this.container.querySelector('.video-text');

    if (textBox) {
      textBox.textContent = `orem, ipsum dolor sit amet consectetur  Venia`;
    }
  }
}

class ImageItem extends Item {
  constructor(
    protected title: string,
    private source: string,
    protected contentType: contentType,
  ) {
    super(title, contentType);
    this.makeImageArticleInnerLayout();
    this.addArticleToDocument();
  }
  makeImageArticleInnerLayout() {
    const imageContent = document.createElement('p');
    const imageText = document.createElement('p');

    imageContent.classList.add('image-content');
    imageText.classList.add('image-text');

    this.container.appendChild(imageContent);
    this.container.appendChild(imageText);
  }
}

class TaskItem extends Item {
  constructor(
    protected title: string,
    private source: string,
    protected contentType: contentType,
  ) {
    super(title, contentType);
    this.makeTaskArticleInnerLayout();
    this.addArticleToDocument();
  }

  makeTaskArticleInnerLayout() {
    const taskContent = document.createElement('p');
    const taskText = document.createElement('p');

    taskContent.classList.add('task-content');
    taskText.classList.add('task-text');

    this.container.appendChild(taskContent);
    this.container.appendChild(taskText);
  }
}

class NoteItem extends Item {
  constructor(
    protected title: string,
    private source: string,
    protected contentType: contentType,
  ) {
    super(title, contentType);
    this.makeNoteArticleInnerLayout();
    this.addArticleToDocument();
  }

  makeNoteArticleInnerLayout() {
    const noteContent = document.createElement('p');
    const noteText = document.createElement('p');

    noteContent.classList.add('note-content');
    noteText.classList.add('note-text');

    this.container.appendChild(noteContent);
    this.container.appendChild(noteText);
  }
}

export { VideoItem, ImageItem, NoteItem, TaskItem, Item };
