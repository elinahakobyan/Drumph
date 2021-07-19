export enum MainViewEvent {
    click = 'MainViewClick',
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
    hideComplete = 'TutorialViewEventHideComplete',
}
