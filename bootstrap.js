const generateFonts = require('./scripts/generate-fonts');
const generateAssets = require('./scripts/generate-assets');
const generateEventNames = require('./scripts/generate-event-names');
const generateSounds = require('./scripts/generate-sounds');
const generateAtlases = require('./scripts/generate-atlases');
const generatePhrases = require('./scripts/generate-phrases');

module.exports = async () => {
    console.log('Starting events names generation...');
    generateEventNames();
    console.log('Events names generation is done!\n');

    console.log('Starting audiosprite generation...');
    await generateSounds();
    console.log('Audiosprite generation is done!\n');

    console.log('Starting atlases generation...');
    await generateAtlases();
    console.log('Atlases generation is done!\n');

    console.log('Starting fonts generation...');
    generateFonts();
    console.log('Fonts generation is done!\n');

    console.log('Starting assets generation...');
    generateAssets();
    console.log('Assets generation is done!\n');

    console.log('Starting phrases generation...');
    generatePhrases();
    console.log('Phrases generation is done!\n');
};
