module.exports.regeneratePrompt = (params) => {
    const { highlightedText, output, dropdownValue } = params;
    let prompt = `
You are a proficient text editor. Your task is to modify a specific selected portion of a previously generated response based on the given instruction (make it longer or shorter). The rest of the text must remain exactly as it was, with no changes.

<PREVIOUS RESPONSE>
${output}
</PREVIOUS RESPONSE>

<SELECTED PORTION>
${highlightedText}
</SELECTED PORTION>

The selected portion should be ${dropdownValue} as instructed.

Return the entire text with only the selected portion modified. Do not alter any other parts of the text, and ensure the modification blends seamlessly with the surrounding content.
`;

    return prompt;
}

module.exports.generatePrompt = (params) => {
    let { brandPositioning, features, tone, length } = params;
    if (length === 'Short') {
        length = '4-6';
    } else if (length === 'Medium') {
        length = '8-10';
    } else if (length === 'Long') {
        length = '12-15';
    }

    let prompt = `
You are a copywriter at a marketing agency working on a brochure for a real estate developer.
Generate a narrative flow for the real estate brochure keeping in mind the brand positioning and features of the property.

<BRAND POSITIONING>
${brandPositioning}
</BRAND POSITIONING> 

<FEATURES>
${features}
</FEATURES>

Keep the tone of the narrative ${tone}.
Ensure that the length of the copy is ${length} sentences.
`;

    return prompt;
}