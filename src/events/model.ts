export enum PadModelEvent {
    stateUpdate = 'PadModelStateUpdate',
    activeColorUpdate = 'PadModelActiveColorUpdate',
    passiveColorUpdate = 'PadModelPassiveColorUpdate',
    nameUpdate = 'PadModelNameUpdate',
}

export enum BoardModelEvent {
    stateUpdate = 'BoardModelStateUpdate',
    imitaciaUpdate = 'BoardModelImitaciaUpdate',
    levelUpdate = 'BoardModelLevelUpdate',
    padsUpdate = 'BoardModelPadsUpdate',
    levelPatternUpdate = 'BoardModelLevelPatternUpdate',
}

export enum CtaModelEvent {
    revelationUpdate = 'CtaModelRevelationUpdate',
    revealedUpdate = 'CtaModelRevealedUpdate',
    revelationReasonUpdate = 'CtaModelRevelationReasonUpdate',
}

export enum HintModelEvent {
    visibleUpdate = 'HintModelVisibleUpdate',
}

export enum ObservableModelEvent {
    uuidUpdate = 'ObservableModelUuidUpdate',
}

export enum PlayModelEvent {
    boardUpdate = 'PlayModelBoardUpdate',
    progressBarUpdate = 'PlayModelProgressBarUpdate',
}

export enum PlayableModelEvent {
    stateUpdate = 'PlayableModelStateUpdate',
    hintUpdate = 'PlayableModelHintUpdate',
    tutorialUpdate = 'PlayableModelTutorialUpdate',
    persistentCtaUpdate = 'PlayableModelPersistentCtaUpdate',
    ctaUpdate = 'PlayableModelCtaUpdate',
    soundUpdate = 'PlayableModelSoundUpdate',
    retriesCountUpdate = 'PlayableModelRetriesCountUpdate',
}

export enum ProgressBarModelEvent {
    configUpdate = 'ProgressBarModelConfigUpdate',
    progressUpdate = 'ProgressBarModelProgressUpdate',
}

export enum SoundModelEvent {
    muteUpdate = 'SoundModelMuteUpdate',
    iconUpdate = 'SoundModelIconUpdate',
}

export enum StoreEvent {
    playableUpdate = 'StorePlayableUpdate',
    playerUpdate = 'StorePlayerUpdate',
    playUpdate = 'StorePlayUpdate',
}

export enum TutorialModelEvent {
    completeUpdate = 'TutorialModelCompleteUpdate',
}
