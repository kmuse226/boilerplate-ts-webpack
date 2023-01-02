import './styles/index.css';
import { DiaLogButtonMaker } from './components/DialogButton';
import { contentType } from './types/types';
import { items } from './components/Dialog';

const mainArea = document.body.querySelector('.main') as HTMLElement;
const contents: contentType[] = ['IMAGE', 'VIDEO', 'NOTE', 'TASK'];
contents.forEach((content) => new DiaLogButtonMaker(content));

const drop = (ev: DragEvent) => {
  ev.preventDefault();
  const currentTarget = ev.target as HTMLElement;
  const data = ev.dataTransfer?.getData('itemId');
  const movingItemIndex = items.findIndex(
    (item) => item.container.dataset.id == data,
  );
  const targetItemIndex = items.findIndex(
    (item) => item.container.dataset.id == currentTarget.dataset.id,
  );
  if (movingItemIndex < 0 || targetItemIndex < 0) return;

  const movingItem = items.splice(movingItemIndex, 1)[0];
  items.splice(targetItemIndex, 0, movingItem);
  items.forEach((item) => {
    mainArea.removeChild(item.container);
    item.addArticleToDocument();
  });
};

mainArea.addEventListener('drop', drop);
mainArea.addEventListener('dragenter', (event: Event) => {
  event.preventDefault();
});
mainArea.addEventListener('dragover', (event: Event) => {
  event.preventDefault();
});
