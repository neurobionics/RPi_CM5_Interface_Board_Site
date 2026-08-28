import { readFile, mkdir, rm, copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const latexDir = path.join(rootDir, "latex");
const latexBuildDir = path.join(latexDir, ".build");
const srcAssetsDir = path.join(rootDir, "src", "assets");
const dataPath = path.join(rootDir, "data", "datasheet.json");

const findCommand = (command) => {
  const candidates = [command, path.join("/Library/TeX/texbin", command)];
  for (const candidate of candidates) {
    if (candidate.includes("/")) return existsSync(candidate) ? candidate : undefined;
    const result = spawnSync("sh", ["-lc", `command -v ${command}`], { encoding: "utf8" });
    if (result.status === 0 && result.stdout.trim().length > 0) return result.stdout.trim();
  }
  return undefined;
};

const run = (command, args, options = {}) => {
  const result = spawnSync(command, args, { stdio: "inherit", ...options });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`${command} exited with status ${result.status}`);
  }
};

const runGenerator = (requireCurrentPdf = false) => {
  const args = [path.join(rootDir, "scripts", "generate-datasheet.mjs")];
  if (requireCurrentPdf) args.push("--require-current-pdf");
  run(process.execPath, args, { cwd: rootDir });
};

const main = async () => {
  const data = JSON.parse(await readFile(dataPath, "utf8"));
  const currentPdfName = `v${data.currentVersion}.pdf`;
  const pdflatex = findCommand("pdflatex");
  if (!pdflatex) {
    throw new Error(
      "pdflatex was not found. Install BasicTeX and ensure /Library/TeX/texbin is on PATH."
    );
  }

  await rm(latexBuildDir, { recursive: true, force: true });
  await mkdir(latexBuildDir, { recursive: true });

  const compileArgs = [
    "-interaction=nonstopmode",
    "-halt-on-error",
    "-file-line-error",
    `-output-directory=${latexBuildDir}`,
    "main.tex",
  ];

  run(pdflatex, compileArgs, { cwd: latexDir });
  run(pdflatex, compileArgs, { cwd: latexDir });

  const generatedPdfPath = path.join(latexBuildDir, "main.pdf");
  const destinationPdfPath = path.join(srcAssetsDir, currentPdfName);
  await copyFile(generatedPdfPath, destinationPdfPath);

  // The first generation may not have imported a new current PDF yet. After
  // copying it, regenerate strictly so the React asset map is complete.
  runGenerator(true);
  console.log(`Created ${path.relative(rootDir, destinationPdfPath)}`);
};

main().catch((error) => {
  console.error(`Datasheet build failed: ${error.message}`);
  process.exitCode = 1;
});
