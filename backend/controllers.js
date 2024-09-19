if (!process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const axios = require("axios").default;
const supabase = require('@supabase/supabase-js')
const { regeneratePrompt, generatePrompt } = require('./prompts')

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const apiKey = `Bearer ${process.env.API_KEY}`;

const connection = supabase.createClient(supabaseUrl, supabaseKey);

const options = {
    method: "POST",
    url: "https://api.edenai.run/v2/text/generation",
    headers: { authorization: apiKey },
    data: {
        providers: "openai",
        temperature: 0.4,
        max_tokens: 550,
    },
};

module.exports.regenerate = async (params) => {
    let prompt = regeneratePrompt(params);
    options.data.text = prompt;

    try {
        const response = await axios.request(options);
        return response.data.openai.generated_text;
    } catch (error) {
        console.error(error);
        return "Error! Please try again.";
    }
}

module.exports.insertInDB = async (params) => {
    const { brandPositioning, features, tone, length, marketingCopy } = params;
    const data = {
        positioning: brandPositioning,
        features: features,
        tone: tone,
        length: length,
        output: marketingCopy,
    }

    try {
        const { error } = await connection
            .from('table')
            .insert(data)
        console.log(error)
        return 'Data inserted successfully!'
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports.generateResponse = async (params) => {
    let prompt = generatePrompt(params);
    options.data.text = prompt;

    try {
        const response = await axios.request(options);
        return response.data.openai.generated_text;
    } catch (error) {
        console.error(error);
        throw error;
    }
}