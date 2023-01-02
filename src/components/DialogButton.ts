import { contentType } from '../types/types';
import { DialogMaker } from './Dialog';

class DiaLogButtonMaker {
  private dialogButton: HTMLButtonElement | undefined;
  constructor(private contentType: contentType) {
    this.contentType = contentType;
    this.makeDialogButton(contentType);
    this.addOpenEventToDialogButton();
    this.addDialogButtonToDocument();
  }
  private makeDialogButton(contentType: contentType): void {
    const btn = document.createElement('button');
    btn.classList.add('dialog-button');
    btn.textContent = contentType;
    this.dialogButton = btn;
  }
  private addDialogButtonToDocument(): void {
    const buttonGroup = document.body.querySelector(
      '.dialog-button-group',
    ) as HTMLElement;
    this.dialogButton && buttonGroup.appendChild(this.dialogButton);
  }
  private addOpenEventToDialogButton(): void {
    this.dialogButton?.addEventListener('click', () => {
      const dialogBackground = document.querySelector(
        '.dialog-background',
      ) as HTMLDivElement;
      dialogBackground.style.display = 'flex';
      new DialogMaker(this.contentType);
    });
  }
}

export { DiaLogButtonMaker };
