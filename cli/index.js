#!/usr/bin/env node
import path from "path";
import { fileURLToPath } from "url";
import boxen from "boxen";
import figlet from "figlet";
import chalk from "chalk";
import ora from "ora";
import { askProfileInfo, askAction, askModifyOptions } from "./lib/prompts.js";
import { writeProfileJSON, ensureDirAndBackup, loadExistingProfile } from "./lib/file.js";
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULT_OUTPUT_DIR = path.join(process.cwd(), "src", "content", "profileInformation");
const DEFAULT_FILENAME = "profileInformation.json";

async function makePresentation() {
  const text = await figlet.text('Hands CLI');
  console.log(chalk.red(text + ' v.0.0.1'));
  console.log(chalk.gray(" Profile Information Generator for Bento Portfolio. \n"));
}

function verifyFileExists(filePath) {
  return existsSync(filePath);
}

async function registerNewProfile() {
  const answers = await askProfileInfo();

  if (answers.generateFile === "copy") {
    const outDir = process.cwd();
    const outFile = path.join(outDir, "profile-copy.json");

    const spinner = ora("Saving copy...").start();
    try {
      const savedFile = await writeProfileJSON(outFile, answers);
      spinner.succeed("Copy saved successfully: " + savedFile);
      console.log(chalk.blue("Copy saved only. Project JSON file was not generated."));
    } catch (err) {
      spinner.fail("Error saving copy: " + err.message);
      process.exit(1);
    }
  } else {
    const outDir = answers.outputDir?.trim() || DEFAULT_OUTPUT_DIR;
    const outFile = path.join(outDir, answers.filename || DEFAULT_FILENAME);

    await ensureDirAndBackup(outDir, outFile);

    const spinner = ora("Generating JSON...").start();
    try {
      await writeProfileJSON(outFile, answers);
      spinner.succeed("JSON generated successfully: " + outFile);
      console.log(chalk.green("Complete. You may edit the file if adjustments are needed."));
    } catch (err) {
      spinner.fail("Error generating JSON: " + err.message);
      process.exit(1);
    }
  }
}

async function modifyExistingProfile() {
  const { filePath } = await askModifyOptions();

  const spinner = ora("Loading existing profile...").start();
  let existingData;
  try {
    existingData = await loadExistingProfile(filePath);
    spinner.succeed("Profile loaded successfully");
  } catch (err) {
    spinner.fail("Error loading profile: " + err.message);
    process.exit(1);
  }

  console.log(chalk.blue("\nModifying existing information..."));
  const answers = await askProfileInfo(existingData);

  await ensureDirAndBackup(path.dirname(filePath), filePath);

  const writeSpinner = ora("Updating JSON...").start();
  try {
    await writeProfileJSON(filePath, answers);
    writeSpinner.succeed("JSON updated successfully: " + filePath);
    console.log(chalk.green("Profile modified successfully."));
  } catch (err) {
    writeSpinner.fail("Error updating JSON: " + err.message);
    process.exit(1);
  }
}

async function main() {
  await makePresentation();

  const defaultProfilePath = path.join(DEFAULT_OUTPUT_DIR, DEFAULT_FILENAME);
  const profileExists = verifyFileExists(defaultProfilePath);

  if (profileExists) {
    const { action } = await askAction();

    switch (action) {
      case 'register':
        await registerNewProfile();
        break;
      case 'modify':
        await modifyExistingProfile();
        break;
      default:
        console.log(chalk.red("Invalid action"));
        process.exit(1);
    }
  } else {
    await registerNewProfile();
  }

}

main().catch(err => {
  // console.error("Unexpected error:", err);
  console.log('\n 👋 until next time!');
  process.exit(1);
});
