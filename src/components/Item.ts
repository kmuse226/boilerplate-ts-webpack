import { articleClass, contentType } from '../types/types';

class Item {
  protected container: HTMLElement = document.createElement('article');
  private articleClassName: articleClass | undefined;
  constructor(protected title: string, protected contentType: contentType) {
    this.selectArticleClassName(contentType);
    this.articleClassName &&
      this.container.classList.add(this.articleClassName);
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
    }
  }
  protected addArticleToDocument() {
    const mainArea = document.body.querySelector('.main') as HTMLElement;
    mainArea.appendChild(this.container);
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
