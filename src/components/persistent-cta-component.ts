import { lego } from '@armathai/lego';
import { getPersistentCtaButtonConfig } from '../constants/configs/button-configs';
import { PersistentCTAComponentEvent } from '../events/view';
import { Button } from '../utils/button';

export class PersistentCTAComponent extends Button {
    public constructor() {
        super(getPersistentCtaButtonConfig());
        this.name = 'PersistentCTA';
        this.on('click', this._onClick, this);
    }

    private _onClick(): void {
        lego.event.emit(PersistentCTAComponentEvent.click);
    }
}
