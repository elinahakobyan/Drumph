/* eslint-disable @typescript-eslint/ban-ts-comment */
import { lego } from '@armathai/lego';
import { PlayableEvent } from '../events/playable';
import { getApplication, getPlayable, lp } from '../utils';

const BORDER_SIZE = 4;

function getSafeAreaLeftRightMargin(): number {
    return 15;
}

function getSafeAreaTopBottomMargin(): number {
    return lp(15, 20);
}

function getLeftTopAreaWidth(): number {
    return lp(275, 275);
}

function getLeftTopAreaHeight(): number {
    return lp(72, 75);
}

function getRightTopAreaWidth(): number {
    return lp(144, 140);
}

function getRightTopAreaHeight(): number {
    return lp(124, 122);
}

function getRightBottomAreaWidth(): number {
    return lp(123, 106);
}

function getRightBottomAreaHeight(): number {
    return lp(67, 70);
}

function setAreaSize(element: HTMLElement, width: number, height: number): void {
    element.style.width = `${width}px`;
    element.style.height = `${height}px`;
}

function setSafeAreaBounds(element: HTMLElement, x: number, y: number, width: number, height: number): void {
    element.style.left = `${x - BORDER_SIZE / 2}px`;
    element.style.top = `${y - BORDER_SIZE / 2}px`;
    element.style.width = `${width - 2 * x - BORDER_SIZE}px`;
    element.style.height = `${height - 2 * y - BORDER_SIZE}px`;
}

function createArea(
    width: number,
    height: number,
    position: { left?: number; top?: number; right?: number; bottom?: number },
): HTMLElement {
    const element = document.createElement('div');
    element.style.position = 'absolute';
    // @ts-ignore
    Object.keys(position).forEach((key) => (element.style[key] = position[key]));
    element.style.background = '#9B16C8';
    element.style.opacity = '0.8';
    setAreaSize(element, width, height);

    return element;
}

function createSafeArea(x: number, y: number, width: number, height: number): HTMLElement {
    const element = document.createElement('div');
    element.style.position = 'absolute';
    element.style.pointerEvents = 'none';
    element.style.borderColor = '#FFF200';
    element.style.borderStyle = 'dashed';
    element.style.borderWidth = `${BORDER_SIZE}px`;
    element.style.opacity = '0.8';
    setSafeAreaBounds(element, x, y, width, height);
    return element;
}

export const addOverlayCommand = (): void => {
    const creative = document.getElementById('canvas');
    const leftTopArea = createArea(10, 10, { left: 0, top: 0 });
    const rightTopArea = createArea(10, 10, { right: 0, top: 0 });
    const rightBottomArea = createArea(10, 10, { right: 0, bottom: 0 });
    const safeArea = createSafeArea(0, 0, 100, 100);
    creative.appendChild(leftTopArea);
    creative.appendChild(rightTopArea);
    creative.appendChild(rightBottomArea);
    creative.appendChild(safeArea);

    const onResize = (): void => {
        const { width, height } = getApplication().renderer.screen;
        const { width: baseWidth, height: baseHeight } = getPlayable().size[lp('landscape', 'portrait')];

        const scaleX = width / baseWidth;
        const scaleY = height / baseHeight;

        setAreaSize(leftTopArea, scaleX * getLeftTopAreaWidth(), scaleY * getLeftTopAreaHeight());
        setAreaSize(rightTopArea, scaleX * getRightTopAreaWidth(), scaleY * getRightTopAreaHeight());
        setAreaSize(rightBottomArea, scaleX * getRightBottomAreaWidth(), scaleY * getRightBottomAreaHeight());
        setSafeAreaBounds(safeArea, getSafeAreaLeftRightMargin(), getSafeAreaTopBottomMargin(), width, height);
    };

    lego.event.on(PlayableEvent.resize, onResize);
    onResize();
};
