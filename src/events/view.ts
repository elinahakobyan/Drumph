export enum MainViewEvent {
    click = 'MainViewClick',
}

export enum PadViewEvent {
    click = 'PadComponentEventClick',
}

export enum BoardViewEvent {
    addPads = 'BoardViewEventAddPads',
}

export enum SoundToggleComponentEvent {
    click = 'SoundToggleComponentEventClick',
}

export enum PersistentCTAComponentEvent {
    click = 'PersistentCTAComponentEventClick',
}

export enum CTAViewEvent {
    screenClick = 'CTAViewEventScreenClick',
    primaryButtonClick = 'CTAViewEventPrimaryButtonClickClick',
    secondaryButtonClick = 'CTAViewEventSecondaryButtonClickClick',
}

export enum TutorialViewEvent {
    click = 'TutorialViewEventClick',
    sequenceHideComplete = 'TutorialViewEventSequenceHideComplete',
    hideComplete = 'TutorialViewEventHideComplete',
}

export enum ProgressUpdateViewEvent {
    update = 'ProgressUpdateViewEventUpdate',
    start = 'ProgressUpdateViewEventStart',
    finish = 'ProgressUpdateViewEventFinish',
}

export enum PlayViewEvent {
    onScoreBtnClick = 'PlayViewEventOnScoreBtnClick',
}
