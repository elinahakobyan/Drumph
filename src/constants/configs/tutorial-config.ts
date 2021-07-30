export function getTutorialConfig(): { text: string; duration: number; clickToComplete: boolean }[] {
    return [
        { text: 'Tap To Listen', duration: -1, clickToComplete: true },
        { text: 'TAP TO REPEAT THE RHYTHM', duration: -1, clickToComplete: false },
        { text: 'Tap To Listen', duration: -1, clickToComplete: true },
        { text: 'TAP TO REPEAT THE RHYTHM', duration: -1, clickToComplete: false },
    ];
}
