# Brochure-Generator

This project is a web application that generates marketing brochures for real estate properties. It comprises a React.js frontend and a Node.js backend with Express.js. The backend utilizes the Eden AI platform's OpenAI model to generate narrative content based on user inputs.

## Features

### Frontend (React.js)

The frontend provides the following input fields:

- **Tone**: Dropdown list with options (Casual, Formal, Grandiose)
- **Length of the Copy**: Dropdown list with options (Short, Medium, Long)
  - Short maps to ‘4-6 sentences’
  - Medium maps to ‘8-10 sentences’
  - Long maps to ‘15-20 sentences’
- **Features of the Building**: Text input box for 2-3 sentences
- **Brand Positioning**: Text input box for 2-3 sentences

### Backend (Node.js with Express.js)

The backend provides the following REST API endpoints:

1. **POST /generate**
    - Receives input data from the frontend
    - Calls the Eden AI platform’s OpenAI model with the input data
    - Returns the generated narrative flow to the frontend

2. **POST /insert**
    - Receives input data and generated copy from the frontend
    - Stores the data in a Supabase database table

3. **POST /regenerate**
    - Receives highlighted text, complete output text, and the chosen option (make it longer/shorter) from the frontend
    - Calls the language model API to regenerate the selected portion of the copy
    - Returns the modified copy to the frontend and updates the output text box

## Frontend UI

The frontend UI consists of the following components:

- Input fields for Tone, Length, Features, and Brand Positioning
- "Generate" button to generate the narrative
- "Insert in DB" button to store the generated data in the database
- Output text box to display the generated narrative
- Dropdown and button for regenerating selected portions of the narrative

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ram-Goyal-73/Brochure-Generator.git
   cd Brochure-Generator
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   cd my-app
   npm install
   cd ../backend
   npm install
   ```

3. Set up environment variables for the backend:
   ```bash
   // backend/.env
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   API_KEY=your_eden_ai_api_key
   ```

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   node index.js
   ```

2. Start the frontend development server:
   ```bash
   cd my-app
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Fill in the input fields with appropriate values.
2. Click the "Generate" button to create the narrative.
3. Review the generated narrative in the output text box.
4. Optionally, click "Insert in DB" to store the generated content.
5. Highlight a portion of the text in the output box, select an option from the dropdown ("Make it longer" or "Make it shorter"), and click "Regenerate" to modify the selected portion.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss your ideas.

---

Feel free to adjust the sections and links as per your requirements!# Brochure-Generator-LLM
