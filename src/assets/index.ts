/* eslint-disable @typescript-eslint/naming-convention */
import { Custom, Google } from 'webfontloader';

export const assets = {
    atlases: {
        bg: {
            json: require('../../assets/atlases/bg.json'),
            image: require('../../assets/atlases/bg.png'),
        },
        main: {
            json: require('../../assets/atlases/main.json'),
            image: require('../../assets/atlases/main.png'),
        },
    },
    particles: { confetti: require('../../assets/particles/confetti.json') },
    spines: { powerup: require('../../assets/spines/powerup.json') },
    ...((): { fonts: { config: WebFont.Config } } => {
        const css = require('../../assets/fonts/index.scss').default;
        const googleFonts = require('../../assets/fonts/google-fonts.json');
        const families = new Function(css.families === '""' ? `return []` : `return [${css.families}]`)() as string[];
        const config: { custom?: Custom; google?: Google } = {};
        if (families.length > 0) {
            config.custom = {
                families,
            };
        }
        if (googleFonts.length > 0) {
            const googleFontFamilies = googleFonts.map(
                (font: { family: string; variants: string[]; subsets: string[] }) =>
                    `${font.family}:${font.variants && font.variants.length > 0 ? font.variants.join(',') : '400'}:${
                        font.subsets && font.subsets.length > 0 ? font.subsets.join(',') : 'latin-ext'
                    }`,
            );

            if (__GOOGLE_FONTS__) {
                config.google = {
                    families: googleFontFamilies,
                };
            } else {
                if (Object.prototype.hasOwnProperty.call(config, 'custom')) {
                    config.custom.families.push(...googleFontFamilies);
                } else {
                    config.custom = {
                        families: googleFontFamilies,
                    };
                }
            }
        }

        return { fonts: { config: { ...config } } };
    })(),
    ...(() => {
        if (__SOUND__) {
            return {
                sound: {
                    PadModel06: require('../../assets/sounds/PadModel06.mp3'),
                    PadModel07: require('../../assets/sounds/PadModel07.mp3'),
                    PadModel08: require('../../assets/sounds/PadModel08.mp3'),
                    PadModel09: require('../../assets/sounds/PadModel09.mp3'),
                    PadModel10: require('../../assets/sounds/PadModel10.mp3'),
                    PadModel11: require('../../assets/sounds/PadModel11.mp3'),
                    PadModel13: require('../../assets/sounds/PadModel13.mp3'),
                    PadModel14: require('../../assets/sounds/PadModel14.mp3'),
                    PadModel15: require('../../assets/sounds/PadModel15.mp3'),
                    PadModel17: require('../../assets/sounds/PadModel17.mp3'),
                    PadModel18: require('../../assets/sounds/PadModel18.mp3'),
                    chime: require('../../assets/sounds/chime.mp3'),
                    ice_cream_a_arp_01: require('../../assets/sounds/ice_cream_a_arp_01.mp3'),
                    ice_cream_a_bell_01: require('../../assets/sounds/ice_cream_a_bell_01.mp3'),
                    ice_cream_a_bell_02: require('../../assets/sounds/ice_cream_a_bell_02.mp3'),
                    ice_cream_a_chords_01: require('../../assets/sounds/ice_cream_a_chords_01.mp3'),
                    ice_cream_a_chords_02: require('../../assets/sounds/ice_cream_a_chords_02.mp3'),
                    ice_cream_a_chords_03: require('../../assets/sounds/ice_cream_a_chords_03.mp3'),
                    ice_cream_a_chords_04: require('../../assets/sounds/ice_cream_a_chords_04.mp3'),
                    ice_cream_a_hat_01: require('../../assets/sounds/ice_cream_a_hat_01.mp3'),
                    ice_cream_a_kick_01: require('../../assets/sounds/ice_cream_a_kick_01.mp3'),
                    ice_cream_a_snare_01: require('../../assets/sounds/ice_cream_a_snare_01.mp3'),
                    ice_cream_a_vocals_01: require('../../assets/sounds/ice_cream_a_vocals_01.mp3'),
                    ice_cream_a_vocals_02: require('../../assets/sounds/ice_cream_a_vocals_02.mp3'),
                    theme: require('../../assets/sounds/theme.mp3'),
                },
            };
        }
        return {};
    })(),
};
