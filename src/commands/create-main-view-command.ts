import { getApplication } from '../utils';
import { MainView } from '../views/main-view';

export const createMainViewCommand = (): void => {
    getApplication().stage.addChild(new MainView());
};
