import { articleClass, contentType } from '../types/types';
import { v4 as uuidv4 } from 'uuid';
import { isLabeledStatement } from 'typescript';

class Item {
  public container: HTMLElement = document.createElement('article');
  public id: string;
  private articleClassName: articleClass | undefined;
  constructor(protected title: string, protected contentType: contentType) {
    this.container.dataset.id = uuidv4();
    this.id = this.container.dataset.id;
    this.selectArticleClassName(contentType);
    this.articleClassName &&
      this.container.classList.add(this.articleClassName);
    this.addDragEvent();
    this.addRemoveButton();
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
    if (ev.dataTransfer) {
      ev.dataTransfer.effectAllowed = 'move';
    }
    const target = ev.target as HTMLDivElement;
    const targetId = target.dataset.id;
    targetId && ev.dataTransfer?.setData('itemId', targetId);
  }
  private addRemoveButton() {
    const removeButton = document.createElement('button');
    removeButton.classList.add('remove');
    removeButton.textContent = 'X';
    removeButton.style.position = 'absolute';
    removeButton.style.top = '5px';
    removeButton.style.right = '5px';
    removeButton.style.background = 'none';
    removeButton.style.border = 'none';
    removeButton.style.fontSize = '20px';

    removeButton.addEventListener('click', () => {
      const localStorageDataOfItems = localStorage.getItem('items');
      const items =
        (localStorageDataOfItems && JSON.parse(localStorageDataOfItems)) || [];
      if (items instanceof Array) {
        const filteredItems = items.filter((item) => {
          return item.id !== this.container.dataset.id;
        });
        localStorage.setItem('items', JSON.stringify(filteredItems));
      }
      this.container.remove();
    });

    this.container.appendChild(removeButton);
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

    const checkRegex = /(v=\w+)/;

    const result = this.source.match(checkRegex);
    const urlData = result && result[0];
    const excludeQueryKeyAndEqualSignNumber = 2;
    const uRlId =
      urlData && urlData.substring(excludeQueryKeyAndEqualSignNumber);
    iframe.width = '440';
    iframe.height = '220';
    iframe.src = `http://www.youtube.com/embed/${uRlId}`;
    iframe.frameBorder = '0';
    frameBox && frameBox.appendChild(iframe);
  }
  addTextContent() {
    const textBox = this.container.querySelector('.video-text');

    if (textBox) {
      textBox.textContent = this.title;
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
    this.addImageContent();
    this.addTextContent();
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
  addImageContent() {
    const imgBox = this.container.querySelector('.image-content');
    const img = document.createElement('img');
    img.width = 440;
    img.height = 220;
    img.src = this.source;
    imgBox && imgBox.appendChild(img);
  }
  addTextContent() {
    const textBox = this.container.querySelector('.image-text');

    if (textBox) {
      textBox.textContent = this.title;
    }
  }
}

class TaskItem extends Item {
  constructor(
    protected title: string,
    private source: string,
    protected contentType: contentType,
    public taskDone: boolean = false,
  ) {
    super(title, contentType);
    this.makeTaskArticleInnerLayout();
    this.addTaskContent();
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
  addTaskContent() {
    const taskBox = this.container.querySelector('.task p');
    const taskTitle = document.createElement('h3');
    const taskBody = document.createElement('p');
    const taskCheckBox = document.createElement('input');
    const taskTodo = document.createElement('label');
    taskTodo.htmlFor = 'tasktodo';
    taskTodo.innerText = this.source;
    taskCheckBox.checked = this.taskDone;
    taskCheckBox.name = 'tasktodo';
    taskCheckBox.type = 'checkbox';
    taskCheckBox.style.width = '25px';

    taskTitle.innerText = this.title;

    taskCheckBox.addEventListener('input', (e) => {
      this.taskDone = taskCheckBox.checked;
      const localStorageDataOfItems = localStorage.getItem('items');
      const items =
        (localStorageDataOfItems && JSON.parse(localStorageDataOfItems)) || [];
      if (items instanceof Array) {
        const todoItem = items.findIndex(
          (item) => item.id == this.container.dataset.id,
        );
        items[todoItem].taskDone = this.taskDone;

        localStorage.setItem('items', JSON.stringify(items));
      }
    });

    taskBody.appendChild(taskCheckBox);
    taskBody.appendChild(taskTodo);
    if (taskBox) {
      taskBox.appendChild(taskTitle);
      taskBox.appendChild(taskBody);
    }
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
    this.addNoteContent();
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

  addNoteContent() {
    const noteBox = this.container.querySelector('.note p');
    const noteTitle = document.createElement('h3');
    const noteBody = document.createElement('p');
    noteTitle.innerText = this.title;
    noteBody.innerText = this.source;
    if (noteBox) {
      noteBox.appendChild(noteTitle);
      noteBox.appendChild(noteBody);
    }
  }
}

export { VideoItem, ImageItem, NoteItem, TaskItem, Item };
