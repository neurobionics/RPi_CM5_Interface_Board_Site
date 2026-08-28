# RPi CM5 Interface Board Site

## 🌐 About the Site

This website is an interactive datasheet for the RPi CM5 Interface Board developed by the Neurobionics lab.

> [!NOTE]
> When updating the site, always preserve previous PDF datasheets to maintain a historical archive of board iterations.

---

## 🚀 How to Update the Website

### Interactive PCB

1. **Generate renders:** Export the 3D model from KiCad's renderer with Orthographic View enabled. Export both front and back views of the board and label them: `pcb-front.png` and `pcb-back.png`.
2. **Upload assets:** Place the new `pcb-front.png` and `pcb-back.png` into `src/assets/`, replacing the old files. Keep the filenames exactly the same.
3. **Adjust markers:** Open `src/InteractivePCB.js`. Each component entry has two position fields:
   - `position`: the `top` and `left` percentages for the dot marker
   - `boxArea`: the `top`, `left`, `width`, and `height` percentages for the highlight box

   Both are relative to the PCB image dimensions. Tweak these values until the markers realign with the new images.

4. **New components:** Add a new entry to the `frontComponents` or `backComponents` object in `src/InteractivePCB.js`, copying the format of an existing marker. If the new component has a pinout image, also add an `import` line for it at the top of `src/InteractivePCB.js`.

#### I/O Pin Diagrams

The I/O pin diagrams are modeled in Onshape and labeled in a graphic design platform (e.g. Figma).

**Modeling in Onshape:**
1. Export your connector or header as a `.step` file and import it into Onshape.
2. In Part Studio, orient the part to Top View, then open the Appearances Panel and assign a color to each pin surface, switching colors per pin.

   **Pin Color Palette:**

   ![#7E8496](https://placehold.co/15x15/7E8496/7E8496.png) `#7E8496` &nbsp; ![#8594E8](https://placehold.co/15x15/8594E8/8594E8.png) `#8594E8` &nbsp; ![#9AD5D9](https://placehold.co/15x15/9AD5D9/9AD5D9.png) `#9AD5D9` &nbsp; ![#C2B7E3](https://placehold.co/15x15/C2B7E3/C2B7E3.png) `#C2B7E3` &nbsp; ![#E7F15A](https://placehold.co/15x15/E7F15A/E7F15A.png) `#E7F15A` &nbsp; ![#FFD166](https://placehold.co/15x15/FFD166/FFD166.png) `#FFD166` &nbsp; ![#F4978E](https://placehold.co/15x15/F4978E/F4978E.png) `#F4978E` &nbsp; ![#BCE784](https://placehold.co/15x15/BCE784/BCE784.png) `#BCE784`

   ![Pin coloring in Onshape](src/assets/io_pin_diagrams_adding_color.png)

3. Once all pins are colored, export the image as a `.png`.

4. Import the `.png` into your design tool and add labels using the label color palette below.

   **Label Color Palette:**

   ![#646876](https://placehold.co/15x15/646876/646876.png) `#646876` &nbsp; ![#6A76B6](https://placehold.co/15x15/6A76B6/6A76B6.png) `#6A76B6` &nbsp; ![#7FA8AC](https://placehold.co/15x15/7FA8AC/7FA8AC.png) `#7FA8AC` &nbsp; ![#A099B9](https://placehold.co/15x15/A099B9/A099B9.png) `#A099B9` &nbsp; ![#ABB151](https://placehold.co/15x15/ABB151/ABB151.png) `#ABB151` &nbsp; ![#C9A85B](https://placehold.co/15x15/C9A85B/C9A85B.png) `#C9A85B` &nbsp; ![#C38079](https://placehold.co/15x15/C38079/C38079.png) `#C38079` &nbsp; ![#9BB972](https://placehold.co/15x15/9BB972/9BB972.png) `#9BB972`

5. Export the final diagram as a `.png` and place it in `src/assets/`, replacing the existing file. Keep the filename the same. If the filename changes, update the matching `import` at the top of `src/InteractivePCB.js`.

---

### Mechanical Specifications

1. Export the full KiCad assembly as a `.step` file and import it into Onshape.
2. Create a drawing with Top, Bottom, and Front views. ([3-minute tutorial](https://www.youtube.com/watch?v=b_E4fBLOqFw))
3. Add dimensions for:
   - Length and width
   - Hole sizes
   - IMU dimensions relative to the board

   All labeling can be done directly in Onshape.
4. Export the drawing as `mechanical_specs.png` and replace the existing file in `src/assets/`.

---

### PDF Datasheet

Board parameters, features, version history, and changelog entries are maintained in [`data/datasheet.json`](data/datasheet.json). Do not edit generated data files, `src/App.js`, or `latex/generated/datasheet.tex` to update these values.

#### Automated local LaTeX workflow

The automated datasheet build requires a local LaTeX installation. Use one of these distributions for your operating system:

- macOS: BasicTeX, MacTeX, or TeX Live. BasicTeX is sufficient; ensure `/Library/TeX/texbin` is on `PATH`.
- Windows: TeX Live is recommended for the automated workflow because it provides `tlmgr`; MiKTeX can be used for manual compilation. Add the LaTeX installation directory to `PATH`.
- Linux: TeX Live. For Debian or Ubuntu, install the required tools with `sudo apt install texlive-latex-base texlive-latex-extra texlive-fonts-recommended texlive-fonts-extra`; add `texlive-lang-english` if needed.

The build verifies that `pdflatex`, `tlmgr`, and `kpsewhich` are available and installs missing LaTeX packages through `tlmgr`. From the repository root, run:

```bash
npm run datasheet:build
npm run build
```

`datasheet:build` validates the data, installs the LaTeX packages used by `latex/main.tex` through `tlmgr`, generates the React and LaTeX data, compiles `latex/main.tex` with `pdflatex`, and copies the result to `src/assets/v<version>.pdf`. Previous PDF files are preserved. PDF filenames are derived from the version and must not be added to the JSON file.

If LaTeX is not installed locally, use the manual Overleaf workflow below instead.

The generated LaTeX build files are written to `latex/.build/`, which is ignored by Git.

#### Manual Overleaf workflow

1. Edit `data/datasheet.json` locally.
2. Run `npm run datasheet:generate` to update the generated React and LaTeX data.
3. Upload the complete `latex/` folder, including `generated/datasheet.tex`, to an Overleaf project.
4. Set `main.tex` as the main document and select pdfLaTeX.
5. Click **Recompile** and download `main.pdf`.
6. Save the downloaded PDF as `src/assets/v<currentVersion>.pdf`.
7. Run `npm run datasheet:generate` again so the website includes the new PDF, then run `npm run build`.

Overleaf compiles the generated LaTeX project but does not run the Node generator. Keep the generated files committed so the PDF can be reproduced manually in Overleaf.

---

### Deploying Changes

After making any edits to source files:

1. Commit and push to the `main` branch.
2. GitHub Actions will automatically build the site and deploy it to GitHub Pages.
