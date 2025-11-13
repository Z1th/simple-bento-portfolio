import inquirer from "inquirer";
import path from "path";

export async function askAction() {
  return await inquirer.prompt([
    {
      name: "action",
      message: "What would you like to do?",
      type: "list",
      choices: [
        { name: "Register new information", value: "register" },
        { name: "Modify existing information", value: "modify" }
      ]
    }
  ]);
}

export async function askModifyOptions() {
  return await inquirer.prompt([
    {
      name: "filePath",
      message: "Path to JSON file to modify:",
      type: "input",
      default: path.join(process.cwd(), "src", "content", "profileInformation", "profileInformation.json"),
      validate: v => v.trim() ? true : "Must specify a path"
    }
  ]);
}

export async function askProfileInfo(existingData = null) {
  const questions = [
    { name: "name", message: "Full name:", type: "input", default: existingData?.name || "Your Name", validate: v => v.trim() ? true : "Must enter a name" },
    { name: "role", message: "Role / title:", type: "input", default: existingData?.role || "Web Developer" },
    { name: "bio", message: "Brief bio:", type: "input", default: existingData?.bio || "I am a developer..." },
    { name: "email", message: "Email:", type: "input", default: existingData?.contact?.email || "", validate: v => !v || /\S+@\S+\.\S+/.test(v) ? true : "Invalid email" },
    { name: "phone", message: "Phone (optional):", type: "input", default: existingData?.contact?.phone || "" },
    { name: "website", message: "Website (optional):", type: "input", default: existingData?.contact?.website || "" },
    {
      name: "social",
      message: "Add social media links?",
      type: "confirm",
      default: true
    },
    {
      name: "socialLinks",
      message: "Provide social links in JSON format (e.g., [{\"name\":\"github\",\"url\":\"https://github.com/user\"}]):",
      type: "input",
      when: answers => answers.social,
      default: existingData?.social ? JSON.stringify(existingData.social) : "[]",
      validate: v => {
        try { const parsed = JSON.parse(v); return Array.isArray(parsed) ? true : "Must be a JSON array"; }
        catch(e){ return "Invalid JSON"; }
      },
      filter: v => JSON.parse(v)
    },
    ...(!existingData ? [
      {
        name: "generateFile",
        message: "Would you like to generate the JSON file or just save a copy?",
        type: "list",
        choices: [
          { name: "Generate JSON file", value: "generate" },
          { name: "Save copy only", value: "copy" }
        ]
      },
      {
        name: "filename",
        message: "JSON filename:",
        type: "input",
        default: "profileInformation.json",
        validate: v => v.trim() ? true : "Must provide a filename",
        when: answers => answers.generateFile === "generate"
      },
      {
        name: "outputDir",
        message: "Output path (folder) - leave empty for default path:",
        type: "input",
        default: "",
        when: answers => answers.generateFile === "generate"
      }
    ] : [])
  ];

  const answers = await inquirer.prompt(questions);

  // Normalizar socialLinks si viene como string
  if (!answers.socialLinks) answers.socialLinks = [];

  // Construir objeto final que se guardará en JSON (puedes extenderlo)
  const profile = {
    name: answers.name,
    role: answers.role,
    bio: answers.bio,
    contact: {
      email: answers.email || null,
      phone: answers.phone || null,
      website: answers.website || null
    },
    social: answers.socialLinks || []
  };

  // Retornamos la info junto con filename/outputDir para que index.js se encargue de guardar
  return {
    ...profile,
    filename: answers.filename,
    outputDir: answers.outputDir
  };
}
