import { TextStyle } from '@pixi/text';
import { fonts } from '../../assets/fonts';
import { localization } from '../../localization';
import { phrases } from '../../localization/phrases';
import { getParams } from '../../utils';

export const getPersistentCtaButtonUpTextConfig = (): TextConfig => {
    return {
        text: localization.t(phrases.cta_btn_persistent_text),
        style: new TextStyle({
            fontFamily: fonts.KGPrimaryPenmanship,
            fontSize: 44,
            fill: '#ffffff',
            dropShadow: true,
            dropShadowAngle: 90,
            dropShadowDistance: 2,
            dropShadowBlur: 5,
            dropShadowColor: '#d68800',
        }),
    };
};

export const getTutorialTextConfig = (text: string): TextConfig => {
    return {
        text: localization.t(phrases[`${text}` as keyof typeof phrases]),
        style: new TextStyle({
            fontFamily: fonts['solomon-sans-black'],
            fontSize: 77,
            fill: '#ffffff',
            align: 'center',
            strokeThickness: 12,
            stroke: '#3eb4ff',
            dropShadow: true,
            dropShadowAngle: Math.PI,
            dropShadowDistance: 3.14,
            dropShadowBlur: 45,
            dropShadowColor: '#3eb4ff',
            // dropShadowColor: '#078dff',
            // dropShadowDistance: 16,
            wordWrap: true,
            wordWrapWidth: 600,
        }),
    };
};

export const getTutorialTextWithBgConfig = (text: string): TextConfig => {
    return {
        text: localization.t(phrases[`${text}` as keyof typeof phrases]),
        style: new TextStyle({
            fontFamily: ['solomon-sans-black'],
            fontSize: 70,
            wordWrap: true,
            wordWrapWidth: 600,
            fill: '#000000',
            align: 'center',
            // strokeThickness: 2,
        }),
    };
};

export const getTraditionalCtaPrimaryButtonUpTextConfig = (): TextConfig => {
    return {
        text: localization.t(phrases[getParams().ctaPrimaryBtnText.value as keyof typeof phrases]),
        style: new TextStyle({
            fontFamily: ['solomon-sans-black'],
            fontSize: 100,
            fill: '#000000',
            strokeThickness: 5,
        }),
    };
};

export const getPromptTextConfig = (text: string): TextConfig => {
    return {
        text: localization.t(phrases[`${text}` as keyof typeof phrases]),
        // y: -3,
        style: new TextStyle({
            fontFamily: fonts['solomon-sans-black'],
            fontSize: 60,
            fill: '#ffffff',
            strokeThickness: 10,
        }),
    };
};

export const getCtaLabelTextConfig = (): TextConfig => {
    return {
        text: localization.t(phrases['Make your own beat']),
        // y: -3,
        style: new TextStyle({
            fontFamily: fonts['solomon-sans-black'],
            fontSize: 70,
            fill: '#ffffff',
            // strokeThickness: 10,
        }),
    };
};

export const getScorePopUpTextConfig = (): TextConfig => {
    return {
        text: localization.t(phrases['your score' as keyof typeof phrases]),
        style: new TextStyle({
            fontFamily: ['solomon-sans-black'],
            fontSize: 52,
            fill: '#000000',
            align: 'center',
        }),
    };
};

export const getScoreNumberConfig = (score: number): TextConfig => {
    return {
        text: `${score} %`,
        style: new TextStyle({
            fontFamily: ['solomon-sans-black'],
            fontSize: 74,
            fill: '#000000',
            align: 'center',
        }),
    };
};

export const getScoreButtonConfigUpTextConfig = (text: string): TextConfig => {
    return {
        text: localization.t(phrases[`${text}` as keyof typeof phrases]),
        // y: -3,
        style: new TextStyle({
            fontFamily: fonts['solomon-sans-black'],
            fontSize: 60,
            fill: '#000000',
            align: 'center',
        }),
    };
};

export const getTraditionalCtaPopupTitleTextConfig = (): TextConfig => {
    return {
        text: localization.t(phrases['GREAT JOB!']),
        style: new TextStyle({
            fontFamily: fonts.KGPrimaryPenmanship,
            fontSize: 60,
            fill: '#4599fb',
            align: 'center',
        }),
    };
};

export const getTraditionalCtaPopupSubtitleTextConfig = (): TextConfig => {
    return {
        text: localization.t(phrases['Lorem Ipsum1']),
        style: new TextStyle({
            fontFamily: fonts['Gloria Hallelujah'],
            fontSize: 30,
            fill: '#000000',
            align: 'center',
        }),
    };
};

export const getStarRatingCtaPrimaryButtonUpTextConfig = (): TextConfig => {
    return {
        text: localization.t(phrases[getParams().ctaPrimaryBtnText.value as keyof typeof phrases]),
        y: -3,
        style: new TextStyle({
            fontFamily: fonts.KGPrimaryPenmanship,
            fontSize: 55,
            fill: '#ffffff',
            dropShadow: true,
            dropShadowAngle: 90,
            dropShadowDistance: 2,
            dropShadowBlur: 5,
            dropShadowColor: '#159b1c',
            stroke: '#159b1c',
            strokeThickness: 4,
        }),
    };
};

export const getStarRatingCtaSecondaryButtonUpTextConfig = (): TextConfig => {
    return {
        text: localization.t(phrases['Retry']),
        y: -3,
        style: new TextStyle({
            fontFamily: fonts.KGPrimaryPenmanship,
            fontSize: 55,
            fill: '#ffffff',
            dropShadow: true,
            dropShadowAngle: 90,
            dropShadowDistance: 2,
            dropShadowBlur: 5,
            dropShadowColor: '#454545',
            stroke: '#454545',
            strokeThickness: 4,
        }),
    };
};

export const getStarRatingCtaPopupTitleTextConfig = (): TextConfig => {
    return {
        text: localization.t(phrases['Pixi Playable Template']),
        style: new TextStyle({
            fontFamily: fonts.KGPrimaryPenmanship,
            fontSize: 42,
            fill: '#4599fb',
            align: 'center',
        }),
    };
};

export const getStarRatingCtaPopupSubtitleTextConfig = (): TextConfig => {
    return {
        text: localization.t(phrases['4.5 out of 5 stars']),
        style: new TextStyle({
            fontFamily: fonts.KGPrimaryPenmanship,
            fontSize: 22,
            fill: '#000000',
            align: 'center',
        }),
    };
};
