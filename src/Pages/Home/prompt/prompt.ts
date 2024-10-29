export const createPrompt = (data1: any, data2: any) => {
  const count = Number(sessionStorage.getItem("count"));
  const language = String(sessionStorage.getItem("InputLanguage") || "none");
  console.log(language)
  return `
  ***TASK OVERVIEW***
  You are tasked with generating a JSON array of automobile parts, matching each product type with its corresponding HTML description based on detailed instructions. Very importantly, create **${count} entries** with descriptions paired with their appropriate product type.
  **each description divided with (----------------description----------) for you to understand easily.

  ***GUIDELINES***

    - **Language**: ${
      language !== "none"
        ? `Translate the descriptions to ${language} while keeping HTML tags intact, modifying only the in-tag text.`
        : "Use the input language directly in the descriptions without translation."
    }

  - **Data Structure**: Match product types and descriptions from the lists provided below:
    - **Product Types**: ${data1} should be translated to ${language} language.
    - **Descriptions**: ${data2} should be translated to ${language} language.
  - **Matching Requirement**: Each product type should correspond to a suitable description based on the product's use case (not simply by name).

  ***EXPECTED OUTPUT FORMAT***
  - **Output Structure**: A JSON array named "automobile_parts" with **${count} entries** for each description-product type pair.
  - **Required Fields**:
    - "productType": Name from the product type list, exactly as provided.
    - "description": HTML description snippet for the product type, with only in-tag text translated (if a language is specified).
  - **Formatting**: 
    - Output only the JSON array, with each JSON entry on a single line (no line breaks or additional formatting).
    - Avoid any characters, spaces, or explanations outside the JSON structure.

  ***IMPORTANT RULES***
  1. Match each product type to its relevant description by use case (not solely by name).
  2. Avoid duplicate entries within the output.
  3. ${
    language !== "none"
      ? `Translate in-tag text to ${language}.`
      : "Retain the original language of the descriptions."
  }

  **Example JSON Output:**
  {
    "automobile_parts": [
      {
        "productType": "Battery",
        "description": "<p>Long-lasting performance battery suitable for all climates.</p>"
      },
      {
        "productType": "Tire",
        "description": "<p>High-grip, durable tire for various road conditions.</p>"
      }
    ]
  }
  `;
};
