export function getTutorialConfig(): { text: string; duration: number; clickToComplete: boolean }[] {
    return [
        { text: 'TAP TO LISTEN', duration: -1, clickToComplete: true },
        { text: 'TAP TO REPEAT THE RHYTHM', duration: -1, clickToComplete: false },
        { text: 'TAP TO LISTEN', duration: -1, clickToComplete: true },
        { text: 'TAP TO REPEAT THE RHYTHM', duration: -1, clickToComplete: false },
    ];
}
