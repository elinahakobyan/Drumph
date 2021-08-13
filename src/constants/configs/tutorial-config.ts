export function getTutorialConfig(): TutorialConfig {
    return [...getLevel1TutorialConfig(), ...getLevel2TutorialConfig()];
}

export function getLevel1TutorialConfig(): TutorialConfig {
    return [
        { text: 'TAP TO LISTEN', duration: -1, clickToComplete: true },
        { text: 'TAP TO REPEAT THE RHYTHM!', duration: -1, clickToComplete: false },
    ];
}

export function getLevel2TutorialConfig(): TutorialConfig {
    return [
        { text: 'TAP TO LISTEN', duration: -1, clickToComplete: true },
        { text: 'TAP TO REPEAT THE RHYTHM!', duration: -1, clickToComplete: false },
        { text: 'Now make your own beat!', duration: -1, clickToComplete: true },
    ];
}
