import './styles/index.css';
import { DiaLogButtonMaker } from './components/DialogButton';
import { contentType } from './types/types';
import { DialogMaker, items } from './components/Dialog';

const mainArea = document.body.querySelector('.main');

const contents: contentType[] = ['IMAGE', 'VIDEO', 'NOTE', 'TASK'];
contents.forEach((content) => new DiaLogButtonMaker(content));

const localStorageItems = JSON.parse(localStorage.getItem('items') || '');

if (localStorageItems instanceof Array) {
  localStorageItems.forEach((item) => {
    DialogMaker.submitContent(
      item.contentType,
      item.title,
      item.source,
      item.taskDone,
    );
  });
}

const drop = (ev: Event) => {
  ev.preventDefault();
  if (!(ev.target instanceof HTMLElement) || !(ev instanceof DragEvent)) return;
  const currentTarget = ev.target;
  const data = ev instanceof DragEvent && ev.dataTransfer?.getData('itemId');
  const movingItemIndex = items.findIndex(
    (item) => item.container.dataset.id == data,
  );

  const targetItemIndex = items.findIndex(
    (item) =>
      item.container.dataset.id == currentTarget.dataset.id ||
      item.container.dataset.id == currentTarget.parentElement?.dataset.id,
  );

  if (
    movingItemIndex < 0 ||
    targetItemIndex < 0 ||
    targetItemIndex == movingItemIndex
  )
    return;

  const movingItem = items.splice(movingItemIndex, 1)[0];

  items.splice(targetItemIndex, 0, movingItem);

  const startIndex =
    targetItemIndex > movingItemIndex ? movingItemIndex : targetItemIndex;

  for (let i = startIndex; i < items.length; i++) {
    mainArea && mainArea.removeChild(items[i].container);
    items[i].addArticleToDocument();
  }
  localStorage.setItem('items', JSON.stringify(items));
};

mainArea && mainArea.addEventListener('drop', drop);
mainArea &&
  mainArea.addEventListener('dragenter', (event: Event) => {
    event.preventDefault();
  });
mainArea &&
  mainArea.addEventListener('dragover', (event: Event) => {
    event.preventDefault();
  });
