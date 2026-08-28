import React, { useState } from "react";
import "./App.css";
import InteractivePCB from "./InteractivePCB";
import mechanicalSpecs from "./assets/mechanical_specs.png";
import imuSensingAxes from "./assets/IMU_sensing_axes.png";
import datasheet, { datasheetPdfAssets } from "./generated/datasheet";

const featureImages = {
  "IMU_sensing_axes.png": imuSensingAxes,
};

const datasheetFileName = (version) => `v${version}.pdf`;

const formatVoltage = (voltage) => (
  voltage.max ? `${voltage.min} - ${voltage.max}` : `${voltage.value}`
);

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <About />
        <SystemOverview />
        <PowerSection />
        <IOPinsSection />
        <FeaturesSection />
        <QuickStart />
        <MechanicalSpecifications />
        <HardwareRecommendations />
        <Archive />
      </main>
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <h1>Raspberry Pi Compute Module 5 Interface Board</h1>
        <p className="header-subtitle">
          Breakout board for the Raspberry Pi Compute Module 5
        </p>
      </div>
    </header>
  );
}

function About() {
  const handleDownload = (pdfUrl, fileName) => {
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = fileName;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToArchive = () => {
    const archiveSection = document.getElementById('archive');
    if (archiveSection) {
      archiveSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="section osl-card" id="about">
      <h2>About</h2>
      <p>{datasheet.overview}</p>
      <div className="download-buttons-container">
        <button
          className="download-button"
          onClick={() => handleDownload(
            datasheetPdfAssets[datasheet.currentVersion],
            datasheetFileName(datasheet.currentVersion)
          )}
        >
          <svg className="download-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Download Datasheet
        </button>
        {/* <button
          className="download-button"
          onClick={() => handleDownload(schematicPDF, 'RPi_CM5_Interface_Board_Schematic.pdf')}
        >
          <svg className="download-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Download Schematic
        </button> */}
      </div>
      <button className="see-older-versions-about" onClick={scrollToArchive}>
        See older versions ↓
      </button>
    </section>
  );
}

function SystemOverview() {
  return (
    <section className="section osl-card" id="system-overview">
      <h2>Interactive PCB Layout</h2>
      <p className="pcb-version">v{datasheet.currentVersion}</p>
      <p>
        Click on the individual components to learn more their functionality:
      </p>
      <InteractivePCB />
    </section>
  );
}

function PowerSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="section osl-card" id="power">
      <div className="quickstart-header">
        <h2>Power</h2>
        <button
          className="expand-button"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
        >
          <span className={`expand-icon ${expanded ? "expanded" : ""}`}>▼</span>
        </button>
      </div>

      {expanded && (
        <>
          <p>Input and output power specifications:</p>

          <h3>Input</h3>
          <table className="power-table">
            <thead>
              <tr>
                <th>Designator</th>
                <th>Connector</th>
                <th>Voltage (V)</th>
                <th>Power (W)</th>
              </tr>
            </thead>
            <tbody>
              {datasheet.power.inputs.map((input) => (
                <tr key={input.designator}>
                  <td>
                    <strong>
                      {input.designator}
                      {input.footnoteMarker && <sup style={{ fontSize: "0.8em" }}>*</sup>}
                    </strong>
                  </td>
                  <td>
                    <strong>{input.connector}</strong>
                  </td>
                  <td>{formatVoltage(input.voltage)}</td>
                  <td>{input.power}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div
            style={{ marginTop: "0.5em", fontStyle: "italic", color: "#666" }}
          >
            *{datasheet.power.inputNote}
          </div>

          <h3>Output</h3>
          <p>{datasheet.power.outputDescription}</p>
        </>
      )}
    </section>
  );
}

function IOPinsSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="section osl-card" id="io-pins">
      <div className="quickstart-header">
        <h2>I/O Pins</h2>
        <button
          className="expand-button"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
        >
          <span className={`expand-icon ${expanded ? "expanded" : ""}`}>▼</span>
        </button>
      </div>

      {expanded && (
        <>
          <table className="io-table">
            <thead>
              <tr>
                <th>Designator</th>
                <th>Bus Details</th>
                <th>Connector</th>
                <th>Mating Part No.</th>
              </tr>
            </thead>
            <tbody>
              {datasheet.ioPins.map((pin) => (
                <tr key={pin.designator}>
                  <td><strong>{pin.designator}</strong></td>
                  <td>{pin.busDetails}</td>
                  <td>{pin.connector}</td>
                  <td>
                    {pin.partNumber && (
                      <a href={pin.partUrl} target="_blank" rel="noopener noreferrer">
                        {pin.partNumber}
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="io-note">
            <strong>Note:</strong> {datasheet.ioPinsNote}{" "}
            <code>{datasheet.ioPinsNotePath}</code>. {datasheet.ioPinsNoteAfterPath}{" "}
            <a
              href={datasheet.ioPinsNoteUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              link
            </a>
            .
          </p>
        </>
      )}
    </section>
  );
}

function FeaturesSection() {
  const [expanded, setExpanded] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);

  const handleExpand = (isExpanded) => {
    setExpanded(isExpanded);
    if (isExpanded && !selectedFeature && features.length > 0) {
      setSelectedFeature(features[0]);
    }
  };

  const features = datasheet.features.map((feature) => ({
    ...feature,
    image: feature.imageAsset ? featureImages[feature.imageAsset] : undefined,
  }));

  return (
    <section className="section osl-card" id="features">
      <div className="quickstart-header">
        <h2>Features</h2>
        <button
          className="expand-button"
          onClick={() => handleExpand(!expanded)}
          aria-expanded={expanded}
        >
          <span className={`expand-icon ${expanded ? "expanded" : ""}`}>▼</span>
        </button>
      </div>

      {expanded && (
        <div className="features-container">
          <div className="features-list">
            {features.map((feature) => (
              <button
                key={feature.id}
                className={`feature-button ${
                  selectedFeature?.id === feature.id ? "active" : ""
                }`}
                onClick={() => setSelectedFeature(feature)}
              >
                <span className="feature-icon">{feature.icon}</span>
                {feature.title}
              </button>
            ))}
          </div>

          {selectedFeature && (
            <div className="feature-details">
              <h3>
                <span className="feature-icon">{selectedFeature.icon}</span>
                {selectedFeature.title}
              </h3>

              {selectedFeature.description.type === "simple" && (
                <p>{selectedFeature.description.content}</p>
              )}

              {selectedFeature.description.type === "list" && (
                <ul>
                  {selectedFeature.description.content.map((item, index) => (
                    <li key={index}>
                      <strong>{item.label}:</strong> {item.desc}
                    </li>
                  ))}
                </ul>
              )}

              {selectedFeature.description.type === "specs" && (
                <>
                  <dl className="specs-list">
                    {selectedFeature.description.content.map((spec, index) =>
                      typeof spec === "string" ? (
                        <p key={index} className="spec-note">
                          {spec}
                        </p>
                      ) : (
                        <div key={index} className="spec-item">
                          <dt>{spec.label}:</dt>
                          <dd>{spec.value}</dd>
                        </div>
                      )
                    )}
                  </dl>
                  {selectedFeature.description.image && (
                    <div className="feature-image-container">
                      <img
                        src={selectedFeature.description.image}
                        alt={selectedFeature.description.imageAlt || "Feature diagram"}
                        className="feature-image"
                      />
                      {selectedFeature.description.citation && (
                        <p className="image-citation">
                          <em>
                            {selectedFeature.description.citation.url ? (
                              <a
                                href={selectedFeature.description.citation.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {selectedFeature.description.citation.text}
                              </a>
                            ) : (
                              selectedFeature.description.citation.text
                            )}
                          </em>
                        </p>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function QuickStart() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="section osl-card" id="quick-start">
      <div className="quickstart-header">
        <h2>Flashing the CM5</h2>
        <button
          className="expand-button"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
        >
          <span className={`expand-icon ${expanded ? "expanded" : ""}`}>▼</span>
        </button>
      </div>

      {expanded && (
        <div className="quickstart-steps">
          <ol className="numbered-step-list">
            <li>Jump the J3 header pins to put the CM5 into storage mode</li>
            <li>
              Set up your host device (personal computer) and install{" "}
              <code>rpiboot</code> to detect the CM5 as a storage device by
              following these{" "}
              <a
                href="https://www.raspberrypi.com/documentation/computers/compute-module.html#set-up-the-host-device"
                target="_blank"
                rel="noopener noreferrer"
              >
                these instructions
              </a>
            </li>
            <li>
              Install the CM5 on the interface board and connect to the host
              device using USB J2.
            </li>
            <li>
              Run rpiboot following{" "}
              <a
                href="https://www.raspberrypi.com/documentation/computers/compute-module.html#set-up-the-host-device"
                target="_blank"
                rel="noopener noreferrer"
              >
                these instructions
              </a>{" "}
              and after a few seconds, the CM5 should be detected as a
              mass-storage device.
            </li>
            <li>
              Flash an operating system image using an imaging tool like{" "}
              <a
                href="https://www.raspberrypi.com/software/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Raspberry Pi Imager
              </a>
              . We highly recommend using the{" "}
              <a
                href="https://github.com/neurobionics/robot-ci"
                target="_blank"
                rel="noopener noreferrer"
              >
                Robot-CI image
              </a>{" "}
              by the Neurobionics Lab that auto-configures the peripheral ports
              to function with the interface board. Please follow the
              instructions in the repository descriptions to generate this
              image, and make sure to check the <em>Are you using the Neurobionics
              Interface Board</em> checkbox.
            </li>
          </ol>
        </div>
      )}
    </section>
  );
}

function MechanicalSpecifications() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="section osl-card" id="mechanical-specs">
      <div className="quickstart-header">
        <h2>Mechanical Specifications</h2>
        <button
          className="expand-button"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
        >
          <span className={`expand-icon ${expanded ? "expanded" : ""}`}>▼</span>
        </button>
      </div>

      {expanded && (
        <div className="mechanical-specs-content">
          <p>
            Mechanical dimensions and mounting specifications for the interface
            board:
          </p>
          <div className="specs-image-container">
            <img
              src={mechanicalSpecs}
              alt="Mechanical Specifications"
              className="specs-image"
            />
          </div>
        </div>
      )}
    </section>
  );
}

function HardwareRecommendations() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="section osl-card" id="hardware-recommendations">
      <div className="quickstart-header">
        <h2>Hardware Recommendations</h2>
        <button
          className="expand-button"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
        >
          <span className={`expand-icon ${expanded ? "expanded" : ""}`}>▼</span>
        </button>
      </div>

      {expanded && (
        <div className="quickstart-steps">
          <div className="quickstart-step no-numbers">
            <div className="step-content">
              <h3>Cooling</h3>
              <p>
                Since the RPi CM5 tends to run hotter than the standard RPi 5,
                we strongly recommend using active cooling (via the FAN-1 port)
                or a passive heatsink, along with ensuring adequate ventilation.
              </p>

              <h3>Grounding</h3>
              <p>
                For improved noise immunity in high-interference environments,
                use shielded cables for sensors and ground the interface board
                to the hardware chassis.
              </p>

              <h3>Strain Relieving</h3>
              <p>
                Provide adequate strain relief on all wiring to reduce
                mechanical stress and maintain signal integrity.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Archive() {
  const [expanded, setExpanded] = useState(false);

  const changeGroups = [
    ["newFeatures", "New Features"],
    ["changes", "Changes"],
    ["fixes", "Fixes"],
  ];

  const handleDownload = (pdfUrl, fileName) => {
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = fileName;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="section osl-card" id="archive" ref={(el) => { if (el) el.scrollMarginTop = '100px'; }}>
      <div className="quickstart-header">
        <h2>Archive</h2>
        <button
          className="expand-button"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
        >
          <span className={`expand-icon ${expanded ? "expanded" : ""}`}>▼</span>
        </button>
      </div>

      {expanded && (
        <>
          <p>Version history and changelog for the RPi CM5 Interface Board:</p>
          <table className="archive-table">
            <thead>
              <tr>
                <th>Version</th>
                <th>Release Date</th>
                <th>Changes</th>
                <th>Datasheet</th>
              </tr>
            </thead>
            <tbody>
              {datasheet.releases.map((release) => (
                <tr key={release.version}>
                  <td><strong>v{release.version}</strong></td>
                  <td>{release.releaseDate}</td>
                  <td>
                    <div className="changelog-content">
                      {changeGroups.map(([key, label]) => release[key]?.length > 0 && (
                        <React.Fragment key={key}>
                          <strong>{label}:</strong>
                          <ul>
                            {release[key].map((change) => <li key={change}>{change}</li>)}
                          </ul>
                        </React.Fragment>
                      ))}
                    </div>
                  </td>
                  <td>
                    <button
                      className="download-button"
                      onClick={() => handleDownload(
                        datasheetPdfAssets[release.version],
                        datasheetFileName(release.version)
                      )}
                    >
                      <svg className="download-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      Download Datasheet
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </section>
  );
}

export default App;
