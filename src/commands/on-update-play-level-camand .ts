import { store } from '../models/store';

export const onUpdatePlayLevelCommand = (padUUid: string): void => {
    console.log('onUpdatePlayLevelCommand');

    store.play.board.startImitation();
    store.play.board.checkPad(padUUid);
    store.play.board.showHintDuringGame();
};
