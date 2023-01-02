import './styles/index.css';
import { DiaLogButtonMaker } from './components/DialogButton';
import { contentType } from './types/types';

const contents: contentType[] = ['IMAGE', 'VIDEO', 'NOTE', 'TASK'];

contents.forEach((content) => new DiaLogButtonMaker(content));
