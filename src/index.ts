import './styles/index.css';
import { DiaLogButtonMaker } from './components/DialogButton';
import { contentType } from './types/types';

const contents: contentType[] = ['IMAGE', 'VIDEO', 'NOTE', 'TASK'];

contents.forEach((content) => new DiaLogButtonMaker(content));

const mainArea = document.body.querySelector('.main') as HTMLElement;

const drop = (ev: DragEvent) => {
  ev.preventDefault();
  const data = ev.dataTransfer?.getData('itemId');
  const itemById = document.body.querySelector(`[data-id="${data}" ]`);
  console.log(itemById);
};

const dragOver = (event: Event) => {
  event.preventDefault();
};

const dragEnter = (event: Event) => {
  event.preventDefault();
};

mainArea.addEventListener('drop', drop);
mainArea.addEventListener('dragenter', dragEnter);
mainArea.addEventListener('dragover', dragOver);
