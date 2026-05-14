import React, { useState } from 'react';
import './InteractivePCB.css';
import pcbBackImage from './assets/pcb-back.png';
import pcbFrontImage from './assets/pcb-front.png';
import i2c2_pinout from './assets/I2C2_pinout.png';
import i2c3_pinout from './assets/I2C3_pinout.png';
import uart1_pinout from './assets/UART1_pinout.png';
import uart2_pinout from './assets/UART2_pinout.png';
import spi_pinout from './assets/SPI1_pinout.png';
import can0_pinout from './assets/CAN0_pinout.png';
import GPIOheaders_pinout from './assets/J6_pinout.png';
import fan_pinout from './assets/FAN_pinout.png';
import rpiboot_pinout from './assets/RPIBOOT_pinout.png';

const InteractivePCB = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [hoveredComponent, setHoveredComponent] = useState(null);
  const [enlargedImage, setEnlargedImage] = useState(null);

  const frontComponents = {
    'sd-card': {
      name: 'SD Card Slot',
      description: 'Micro SD card slot for flashing RPi',
      position: { top: '68%', left: '12%' },
      boxArea: { top: '49%', left: '0%', width: '26%', height: '34%' },
      category: 'power'
    },
    'osl-website': {
      name: 'OSL Website',
      description: 'Links to the Open Source Leg website',
      position: { top: '65%', left: '71%' },
      boxArea: { top: '55%', left: '63.5%', width: '14%', height: '18.5%' },
      category: 'power'
    },
    'cm5-connector': {
      name: 'RPI CM5 Receptacle',
      description: 'Connector for RPi CM5 module',
      position: { top: '8%', left: '47%' },
      boxArea: { top: '0%', left: '24.5%', width: '42%', height: '15%' },
      category: 'main'
    }
  };

  const backComponents = {
    // Communication
    'i2c2': {
      name: 'I2C-2',
      description: (
        <>
          <p>I2C bus 2 with Molex Picoclasp connector</p>
          <div
            className="component-pinout"
            onClick={(e) => {
              e.stopPropagation();
              setEnlargedImage(i2c2_pinout);
            }}
          >
            <img src={i2c2_pinout} alt="I2C-2 Pinout" className="pinout-image" />
            <div className="enlarge-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h6v6M14 10l7-7M9 21H3v-6M10 14l-7 7" />
              </svg>
            </div>
          </div>
        </>
      ),
      position: { top: '9%', left: '58%' },
      boxArea: { top: '3%', left: '51%', width: '13.5%', height: '12%' },
      category: 'communication'
    },
    'i2c3': {
      name: 'I2C-3',
      description: (
        <>
          <p>I2C bus 3 with Molex Picoclasp connector</p>
          <div
            className="component-pinout"
            onClick={(e) => {
              e.stopPropagation();
              setEnlargedImage(i2c3_pinout);
            }}
          >
            <img src={i2c3_pinout} alt="I2C-3 Pinout" className="pinout-image" />
            <div className="enlarge-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h6v6M14 10l7-7M9 21H3v-6M10 14l-7 7" />
              </svg>
            </div>
          </div>
        </>
      ),
      position: { top: '26%', left: '64%' },
      boxArea: { top: '20%', left: '57%', width: '13.5%', height: '12%' },
      category: 'communication'
    },
    'spi': {
      name: 'SPI-1',
      description: (
        <>
          <p>SPI bus with SCLK, MISO, MOSI, and 3 chip select lines</p>
          <div
            className="component-pinout"
            onClick={(e) => {
              e.stopPropagation();
              setEnlargedImage(spi_pinout);
            }}
          >
            <img src={spi_pinout} alt="SPI-1 Pinout" className="pinout-image" />
            <div className="enlarge-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h6v6M14 10l7-7M9 21H3v-6M10 14l-7 7" />
              </svg>
            </div>
          </div>
        </>
      ),
      position: { top: '9%', left: '77%' },
      boxArea: { top: '0%', left: '67%', width: '20%', height: '15%' },
      category: 'communication'
    },
    'uart1': {
      name: 'UART-1',
      description: (
        <>
          <p>UART port 1 with Molex Picoclasp connector</p>
          <div
            className="component-pinout"
            onClick={(e) => {
              e.stopPropagation();
              setEnlargedImage(uart1_pinout);
            }}
          >
            <img src={uart1_pinout} alt="UART-1 Pinout" className="pinout-image" />
            <div className="enlarge-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h6v6M14 10l7-7M9 21H3v-6M10 14l-7 7" />
              </svg>
            </div>
          </div>
        </>
      ),
      position: { top: '9%', left: '41%' },
      boxArea: { top: '3%', left: '34%', width: '13.5%', height: '12%' },
      category: 'communication'
    },
    'uart2': {
      name: 'UART-2',
      description: (
        <>
          <p>UART port 2 with Molex Picoclasp connector</p>
          <div
            className="component-pinout"
            onClick={(e) => {
              e.stopPropagation();
              setEnlargedImage(uart2_pinout);
            }}
          >
            <img src={uart2_pinout} alt="UART-2 Pinout" className="pinout-image" />
            <div className="enlarge-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h6v6M14 10l7-7M9 21H3v-6M10 14l-7 7" />
              </svg>
            </div>
          </div>
        </>
      ),
      position: { top: '26%', left: '50%' },
      boxArea: { top: '20%', left: '43%', width: '14%', height: '12%' },
      category: 'communication'
    },
    'can-module': {
      name: 'CAN-0',
      description: (
        <>
          <p>CAN0 interface for communication over the Controller Area Network bus</p>
          <div
            className="component-pinout"
            onClick={(e) => {
              e.stopPropagation();
              setEnlargedImage(can0_pinout);
            }}
          >
            <img src={can0_pinout} alt="CAN0 Pinout" className="pinout-image" />
            <div className="enlarge-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h6v6M14 10l7-7M9 21H3v-6M10 14l-7 7" />
              </svg>
            </div>
          </div>
        </>
      ),
      position: { top: '26%', left: '37%' },
      boxArea: { top: '20%', left: '31%', width: '11%', height: '12%' },
      category: 'communication'
    },
    'can1-module': {
      name: 'CAN-1',
      description: (
        <>
          <p>CAN1 interface for communication over the Controller Area Network bus</p>
          <div
            className="component-pinout"
            onClick={(e) => {
              e.stopPropagation();
              setEnlargedImage(can0_pinout);
            }}
          >
            <img src={can0_pinout} alt="CAN1 Pinout" className="pinout-image" />
            <div className="enlarge-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h6v6M14 10l7-7M9 21H3v-6M10 14l-7 7" />
              </svg>
            </div>
          </div>
        </>
      ),
      position: { top: '38%', left: '32.5%' },
      boxArea: { top: '33%', left: '26.5%', width: '11%', height: '12%' },
      category: 'communication'
    },

    // PSU (Power Supply Units)
    'power-input': {
      name: '15-53V Input',
      description: 'XT30 connector for 15-53V input power from battery',
      position: { top: '34%', left: '91%' },
      boxArea: { top: '18%', left: '74%', width: '26%', height: '31%' },
      category: 'psu'
    },

    // Features
    'signal-leds': {
      name: 'Signal LEDs',
      description: 'Status LEDs: 5V, 3V3, PWR, ACT, and programmable LED',
      position: { top: '82%', left: '37.25%' },
      boxArea: { top: '74%', left: '33%', width: '7%', height: '24%' },
      category: 'features'
    },
    'fan-port': {
      name: 'Fan Port',
      description: (
        <>
          <p>Cooling fan connector (5V)</p>
          <div
            className="component-pinout"
            onClick={(e) => {
              e.stopPropagation();
              setEnlargedImage(fan_pinout);
            }}
          >
            <img src={fan_pinout} alt="Fan Port Pinout" className="pinout-image" />
            <div className="enlarge-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h6v6M14 10l7-7M9 21H3v-6M10 14l-7 7" />
              </svg>
            </div>
          </div>
        </>
      ),
      position: { top: '94%', left: '49%' },
      boxArea: { top: '87%', left: '42%', width: '13.5%', height: '12%' },
      category: 'features'
    },
    'test-pad': {
      name: 'Test Pads',
      description: 'Test pads for 5V and 3.3V outputs <em>(see features section for details)</em>',
      position: { top: '64%', left: '50%' },
      boxArea: { top: '56%', left: '44%', width: '11%', height: '16%' },
      category: 'features'
    },
    'rpi-boot-jumper': {
      name: 'RPi Boot Jumper',
      description: (
        <>
          <p>Boot mode jumper for flashing CM5 via USB (eMMC mode)</p>
          <div
            className="component-pinout"
            onClick={(e) => {
              e.stopPropagation();
              setEnlargedImage(rpiboot_pinout);
            }}
          >
            <img src={rpiboot_pinout} alt="RPi Boot Jumper Pinout" className="pinout-image" />
            <div className="enlarge-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h6v6M14 10l7-7M9 21H3v-6M10 14l-7 7" />
              </svg>
            </div>
          </div>
        </>
      ),
      position: { top: '92%', left: '84.5%' },
      boxArea: { top: '84%', left: '81%', width: '7%', height: '16%' },
      category: 'features'
    },
    'rpi-power-button': {
      name: 'RPi Power Button',
      description: 'Power on/off toggle switch for safe RPi shutdown',
      position: { top: '93%', left: '63.5%' },
      boxArea: { top: '87%', left: '56%', width: '14%', height: '12%' },
      category: 'features'
    },
    'external-switch': {
      name: 'External Switch for RPi Power Button',
      description: 'Port to connect an external switch to the RPi Power Button',
      position: { top: '93%', left: '76%' },
      boxArea: { top: '87%', left: '71%', width: '10%', height: '11.5%' },
      category: 'features'
    },
    'gpio-headers': {
      name: 'GPIO Headers',
      description: (
        <>
          <p>6x GPIO header for prototyping and signal breakout</p>
          <div
            className="component-pinout"
            onClick={(e) => {
              e.stopPropagation();
              setEnlargedImage(GPIOheaders_pinout);
            }}
          >
            <img src={GPIOheaders_pinout} alt="GPIO Headers Pinout" className="pinout-image" />
            <div className="enlarge-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h6v6M14 10l7-7M9 21H3v-6M10 14l-7 7" />
              </svg>
            </div>
          </div>
        </>
      ),
      position: { top: '9%', left: '23.5%' },
      boxArea: { top: '1%', left: '13%', width: '20%', height: '15%' },
      category: 'features'
    },

    // Components
    'imu': {
      name: 'IMU',
      description: 'Inertial Measurement Unit for motion and orientation sensing',
      position: { top: '40%', left: '55%' },
      boxArea: { top: '34%', left: '50%', width: '8%', height: '12%' },
      category: 'components'
    },
    'usb-c': {
      name: 'USB-C Port',
      description: 'USB-C data ports for high-speed data transfer between devices',
      position: { top: '30%', left: '10%' },
      boxArea: { top: '18%', left: '0%', width: '16%', height: '58%' },
      category: 'components'
    }
  };

  const getCategoryColor = (category) => {
    // All components use the same Vista Blue color
    return '#8594E8'; // Vista Blue
  };

  const handleComponentClick = (componentId, e) => {
    e.stopPropagation(); // Prevent background click from firing
    setSelectedComponent(componentId === selectedComponent ? null : componentId);
  };

  const handleComponentHover = (componentId) => {
    if (selectedComponent === componentId) {
      // If this component is selected and we hover over it, dismiss the selection
      setSelectedComponent(null);
    }
    setHoveredComponent(componentId);
  };

  const handleComponentLeave = () => {
    setHoveredComponent(null);
  };

  const handleBackgroundClick = (e) => {
    // Only dismiss if clicking directly on the PCB image or container (not on hotspots)
    if (e.target.classList.contains('pcb-image') || e.target.classList.contains('pcb-container')) {
      setSelectedComponent(null);
    }
  };

  const activeComponent = selectedComponent || hoveredComponent;

  // Calculate smart popup position to avoid covering the component
  const getPopupPosition = (component) => {
    if (!component.boxArea) return { top: '20px', left: '20px' };

    const boxTop = parseFloat(component.boxArea.top);
    const boxLeft = parseFloat(component.boxArea.left);
    const boxWidth = parseFloat(component.boxArea.width);
    const boxHeight = parseFloat(component.boxArea.height);
    const componentPosition = component.position;
    const markerTop = parseFloat(componentPosition.top);
    const markerLeft = parseFloat(componentPosition.left);

    let position = { top: '20px', left: '20px' };


    // Special positioning for other bottom-right components
    if (markerTop > 50 && markerLeft > 50) {
      if (component.name === 'RPi Boot Jumper') {
        position.top = `${Math.max(5, boxTop - 55)}%`;
        position.left = `${Math.max(5, boxLeft - 35)}%`;
      } else {
        position.top = `${Math.max(5, boxTop - 10)}%`;
        position.left = `${Math.max(5, boxLeft - 35)}%`;
      }
      return position;
    }

    if (component.name === 'Fan Port' || component.name === 'External Switch for RPi Power Button'){
      position.top = `${Math.max(5, boxTop - 15)}%`;
      position.left = `${Math.max(5, boxLeft - 35)}%`;
    }

    if (boxTop < 50) {
      if (component.name === 'USB-C Port') {
        position.top = `${Math.max(5, boxTop - 50)}%`;
        position.left = `${Math.max(5, boxLeft - 35)}%`;
      } else {
        position.top = `${boxTop + boxHeight + 5}%`;
      }
    } else {
      position.top = `${Math.max(5, boxTop - 25)}%`;
    }

    if (boxLeft < 50) {
      position.left = `${Math.min(70, boxLeft + boxWidth + 5)}%`;
    } else {
      position.left = `${Math.max(5, boxLeft - 25)}%`;
    }

    return position;
  };

  const renderPCBView = (components, image, label, viewId) => {
    return (
      <div className="pcb-view-section">
        <h3 className="pcb-view-label">{label}</h3>
        <div className="pcb-container" onClick={handleBackgroundClick}>
          <img
            src={image}
            alt={label}
            className="pcb-image"
            onClick={handleBackgroundClick}
          />

          {Object.entries(components).map(([id, component]) => (
            <div
              key={`box-${viewId}-${id}`}
              className={`component-box ${(hoveredComponent === `${viewId}-${id}` || selectedComponent === `${viewId}-${id}`) ? 'visible' : ''}`}
              style={{
                top: component.boxArea.top,
                left: component.boxArea.left,
                width: component.boxArea.width,
                height: component.boxArea.height,
                '--category-color': getCategoryColor(component.category)
              }}
            />
          ))}

          {/* Interactive hotspots */}
          {Object.entries(components).map(([id, component]) => {
            const fullId = `${viewId}-${id}`;
            return (
              <div
                key={fullId}
                className={`hotspot ${(activeComponent === fullId) ? 'active' : ''}`}
                style={{
                  top: component.position.top,
                  left: component.position.left,
                  '--category-color': getCategoryColor(component.category)
                }}
                onClick={(e) => handleComponentClick(fullId, e)}
                onMouseEnter={() => handleComponentHover(fullId)}
                onMouseLeave={handleComponentLeave}
                title={component.name}
              >
                <div className="hotspot-dot"></div>
                <div className="hotspot-pulse"></div>
              </div>
            );
          })}

          {/* Component info panel */}
          {activeComponent && activeComponent.startsWith(viewId) && (
            <div
              className="component-info"
              style={getPopupPosition(components[activeComponent.replace(`${viewId}-`, '')])}
            >
              <h3 style={{ color: getCategoryColor(components[activeComponent.replace(`${viewId}-`, '')].category) }}>
                {components[activeComponent.replace(`${viewId}-`, '')].name}
              </h3>
              <div className="component-description">
                {typeof components[activeComponent.replace(`${viewId}-`, '')].description === 'string' ? (
                  <p
                    dangerouslySetInnerHTML={{
                      __html: components[activeComponent.replace(`${viewId}-`, '')].description,
                    }}
                  ></p>
                ) : (
                  components[activeComponent.replace(`${viewId}-`, '')].description
                )}
              </div>
              <span className="component-category">
                {components[activeComponent.replace(`${viewId}-`, '')].category.toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="interactive-pcb" onClick={handleBackgroundClick}>
        {renderPCBView(frontComponents, pcbFrontImage, 'Front View', 'front')}
        {renderPCBView(backComponents, pcbBackImage, 'Back View', 'back')}
      </div>
      {enlargedImage && (
        <div 
          className="enlarged-overlay"
          onClick={() => setEnlargedImage(null)}
        >
          <img 
            src={enlargedImage} 
            alt="Enlarged Pinout"
            className="enlarged-image"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default InteractivePCB;