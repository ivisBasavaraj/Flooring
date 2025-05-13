import React from 'react';
import * as Three from 'three';
import { Catalog } from '../../planner/plannerCompatibility';

// Create a new catalog instance
let catalog = new Catalog();

// Add custom event planning properties
const eventProperties = {
  seats: {
    label: 'Seats',
    type: 'number',
    defaultValue: 8,
    min: 4,
    max: 12
  },
  tablecloth: {
    label: 'Tablecloth Color',
    type: 'color',
    defaultValue: '#ffffff'
  },
  eventType: {
    label: 'Event Type',
    type: 'enum',
    defaultValue: 'wedding',
    values: {
      wedding: 'Wedding',
      corporate: 'Corporate',
      birthday: 'Birthday',
      conference: 'Conference'
    }
  }
};

// Add basic structural elements (walls, doors, windows) manually
// Wall element
catalog.registerElement({
  name: 'wall',
  prototype: 'lines',
  info: {
    title: 'Wall',
    description: 'Wall for room layout',
    image: 'https://via.placeholder.com/150x150?text=Wall'
  },
  properties: {
    height: {
      label: 'Height',
      type: 'length-measure',
      defaultValue: {
        length: 300,
        unit: 'cm'
      }
    },
    thickness: {
      label: 'Thickness',
      type: 'length-measure',
      defaultValue: {
        length: 20,
        unit: 'cm'
      }
    }
  }
});

// Door element
catalog.registerElement({
  name: 'door',
  prototype: 'holes',
  info: {
    title: 'Door',
    description: 'Door for room access',
    image: 'https://via.placeholder.com/150x150?text=Door'
  },
  properties: {
    width: {
      label: 'Width',
      type: 'length-measure',
      defaultValue: {
        length: 90,
        unit: 'cm'
      }
    },
    height: {
      label: 'Height',
      type: 'length-measure',
      defaultValue: {
        length: 210,
        unit: 'cm'
      }
    },
    altitude: {
      label: 'Altitude',
      type: 'length-measure',
      defaultValue: {
        length: 0,
        unit: 'cm'
      }
    }
  }
});

// Window element
catalog.registerElement({
  name: 'window',
  prototype: 'holes',
  info: {
    title: 'Window',
    description: 'Window for natural light',
    image: 'https://via.placeholder.com/150x150?text=Window'
  },
  properties: {
    width: {
      label: 'Width',
      type: 'length-measure',
      defaultValue: {
        length: 120,
        unit: 'cm'
      }
    },
    height: {
      label: 'Height',
      type: 'length-measure',
      defaultValue: {
        length: 120,
        unit: 'cm'
      }
    },
    altitude: {
      label: 'Altitude',
      type: 'length-measure',
      defaultValue: {
        length: 90,
        unit: 'cm'
      }
    }
  }
});

// Add round table element
catalog.registerElement({
  name: 'round-table',
  prototype: 'items',
  info: {
    title: 'Round Table',
    description: 'Round table for event seating',
    image: 'https://via.placeholder.com/150x150?text=Round+Table'
  },
  properties: {
    width: {
      label: 'Width',
      type: 'length-measure',
      defaultValue: {
        length: 120,
        unit: 'cm'
      }
    },
    seats: eventProperties.seats,
    tablecloth: eventProperties.tablecloth
  },
  render2D: (element, layer, scene) => {
    let width = element.properties.get('width').get('length');
    
    let style = {
      stroke: '#000',
      strokeWidth: '2px',
      fill: element.properties.get('tablecloth')
    };

    let radius = width / 2;
    
    return `
      <g transform="translate(${-radius}, ${-radius})">
        <circle cx="${radius}" cy="${radius}" r="${radius}" style="${Object.entries(style).map(([key, value]) => `${key}: ${value}`).join(';')}"/>
        <text x="${radius}" y="${radius}" text-anchor="middle" alignment-baseline="central" style="font-weight: bold;">
          ${element.properties.get('seats')}
        </text>
      </g>
    `;
  },
  render3D: (element, layer, scene) => {
    let width = element.properties.get('width').get('length');
    let radius = width / 2;
    
    return `
      <g>
        <cylinder radius="${radius}" height="2" />
        <cylinder radius="5" height="75" />
      </g>
    `;
  }
});

// Add rectangular table element
catalog.registerElement({
  name: 'rect-table',
  prototype: 'items',
  info: {
    title: 'Rectangular Table',
    description: 'Rectangular table for event seating',
    image: 'https://via.placeholder.com/150x150?text=Rect+Table'
  },
  properties: {
    width: {
      label: 'Width',
      type: 'length-measure',
      defaultValue: {
        length: 200,
        unit: 'cm'
      }
    },
    depth: {
      label: 'Depth',
      type: 'length-measure',
      defaultValue: {
        length: 100,
        unit: 'cm'
      }
    },
    seats: eventProperties.seats,
    tablecloth: eventProperties.tablecloth
  },
  render2D: (element, layer, scene) => {
    let width = element.properties.get('width').get('length');
    let depth = element.properties.get('depth').get('length');
    
    let style = {
      stroke: '#000',
      strokeWidth: '2px',
      fill: element.properties.get('tablecloth')
    };
    
    return `
      <g transform="translate(${-width / 2}, ${-depth / 2})">
        <rect width="${width}" height="${depth}" style="${Object.entries(style).map(([key, value]) => `${key}: ${value}`).join(';')}"/>
        <text x="${width / 2}" y="${depth / 2}" text-anchor="middle" alignment-baseline="central" style="font-weight: bold;">
          ${element.properties.get('seats')}
        </text>
      </g>
    `;
  },
  render3D: (element, layer, scene) => {
    let width = element.properties.get('width').get('length');
    let depth = element.properties.get('depth').get('length');
    
    return `
      <g>
        <cube width="${width}" depth="${depth}" height="2" />
      </g>
    `;
  }
});

// Add stage element
catalog.registerElement({
  name: 'stage',
  prototype: 'items',
  info: {
    title: 'Stage',
    description: 'Performance area',
    image: 'https://via.placeholder.com/150x150?text=Stage'
  },
  properties: {
    width: {
      label: 'Width',
      type: 'length-measure',
      defaultValue: {
        length: 500,
        unit: 'cm'
      }
    },
    depth: {
      label: 'Depth',
      type: 'length-measure',
      defaultValue: {
        length: 300,
        unit: 'cm'
      }
    },
    height: {
      label: 'Height',
      type: 'length-measure',
      defaultValue: {
        length: 50,
        unit: 'cm'
      }
    }
  },
  render2D: (element, layer, scene) => {
    let width = element.properties.get('width').get('length');
    let depth = element.properties.get('depth').get('length');
    
    let style = {
      stroke: '#000',
      strokeWidth: '2px',
      fill: '#9c8352'
    };
    
    return `
      <g transform="translate(${-width / 2}, ${-depth / 2})">
        <rect width="${width}" height="${depth}" style="${Object.entries(style).map(([key, value]) => `${key}: ${value}`).join(';')}"/>
        <text x="${width / 2}" y="${depth / 2}" text-anchor="middle" alignment-baseline="central" style="font-weight: bold; fill: white;">
          STAGE
        </text>
      </g>
    `;
  },
  render3D: (element, layer, scene) => {
    let width = element.properties.get('width').get('length');
    let depth = element.properties.get('depth').get('length');
    let height = element.properties.get('height').get('length');
    
    return `
      <g>
        <cube width="${width}" depth="${depth}" height="${height}" />
      </g>
    `;
  }
});

// Add bar area element
catalog.registerElement({
  name: 'bar',
  prototype: 'items',
  info: {
    title: 'Bar',
    description: 'Bar area for drinks',
    image: 'https://via.placeholder.com/150x150?text=Bar'
  },
  properties: {
    width: {
      label: 'Width',
      type: 'length-measure',
      defaultValue: {
        length: 300,
        unit: 'cm'
      }
    },
    depth: {
      label: 'Depth',
      type: 'length-measure',
      defaultValue: {
        length: 80,
        unit: 'cm'
      }
    }
  },
  render2D: (element, layer, scene) => {
    let width = element.properties.get('width').get('length');
    let depth = element.properties.get('depth').get('length');
    
    let style = {
      stroke: '#000',
      strokeWidth: '2px',
      fill: '#5d4037'
    };
    
    return `
      <g transform="translate(${-width / 2}, ${-depth / 2})">
        <rect width="${width}" height="${depth}" style="${Object.entries(style).map(([key, value]) => `${key}: ${value}`).join(';')}"/>
        <text x="${width / 2}" y="${depth / 2}" text-anchor="middle" alignment-baseline="central" style="font-weight: bold; fill: white;">
          BAR
        </text>
      </g>
    `;
  },
  render3D: (element, layer, scene) => {
    let width = element.properties.get('width').get('length');
    let depth = element.properties.get('depth').get('length');
    
    return `
      <g>
        <cube width="${width}" depth="${depth}" height="110" />
      </g>
    `;
  }
});

// Add DJ booth element
catalog.registerElement({
  name: 'dj-booth',
  prototype: 'items',
  info: {
    title: 'DJ Booth',
    description: 'Music/DJ booth',
    image: 'https://via.placeholder.com/150x150?text=DJ+Booth'
  },
  properties: {
    width: {
      label: 'Width',
      type: 'length-measure',
      defaultValue: {
        length: 150,
        unit: 'cm'
      }
    },
    depth: {
      label: 'Depth',
      type: 'length-measure',
      defaultValue: {
        length: 100,
        unit: 'cm'
      }
    }
  },
  render2D: (element, layer, scene) => {
    let width = element.properties.get('width').get('length');
    let depth = element.properties.get('depth').get('length');
    
    let style = {
      stroke: '#000',
      strokeWidth: '2px',
      fill: '#424242'
    };
    
    return `
      <g transform="translate(${-width / 2}, ${-depth / 2})">
        <rect width="${width}" height="${depth}" style="${Object.entries(style).map(([key, value]) => `${key}: ${value}`).join(';')}"/>
        <text x="${width / 2}" y="${depth / 2}" text-anchor="middle" alignment-baseline="central" style="font-weight: bold; fill: white;">
          DJ
        </text>
      </g>
    `;
  },
  render3D: (element, layer, scene) => {
    let width = element.properties.get('width').get('length');
    let depth = element.properties.get('depth').get('length');
    
    return `
      <g>
        <cube width="${width}" depth="${depth}" height="90" />
      </g>
    `;
  }
});

// Add dance floor element
catalog.registerElement({
  name: 'dance-floor',
  prototype: 'items',
  info: {
    title: 'Dance Floor',
    description: 'Area for dancing',
    image: 'https://via.placeholder.com/150x150?text=Dance+Floor'
  },
  properties: {
    width: {
      label: 'Width',
      type: 'length-measure',
      defaultValue: {
        length: 400,
        unit: 'cm'
      }
    },
    depth: {
      label: 'Depth',
      type: 'length-measure',
      defaultValue: {
        length: 400,
        unit: 'cm'
      }
    }
  },
  render2D: (element, layer, scene) => {
    let width = element.properties.get('width').get('length');
    let depth = element.properties.get('depth').get('length');
    
    let style = {
      stroke: '#000',
      strokeWidth: '2px',
      fill: '#9e9e9e',
      fillOpacity: 0.5
    };
    
    return `
      <g transform="translate(${-width / 2}, ${-depth / 2})">
        <rect width="${width}" height="${depth}" style="${Object.entries(style).map(([key, value]) => `${key}: ${value}`).join(';')}"/>
        <text x="${width / 2}" y="${depth / 2}" text-anchor="middle" alignment-baseline="central" style="font-weight: bold;">
          DANCE FLOOR
        </text>
      </g>
    `;
  },
  render3D: (element, layer, scene) => {
    let width = element.properties.get('width').get('length');
    let depth = element.properties.get('depth').get('length');
    
    return `
      <g>
        <cube width="${width}" depth="${depth}" height="1" />
      </g>
    `;
  }
});

// Add seating area element
catalog.registerElement({
  name: 'seating-area',
  prototype: 'items',
  info: {
    title: 'Seating Area',
    description: 'Lounge seating area',
    image: 'https://via.placeholder.com/150x150?text=Seating+Area'
  },
  properties: {
    width: {
      label: 'Width',
      type: 'length-measure',
      defaultValue: {
        length: 300,
        unit: 'cm'
      }
    },
    depth: {
      label: 'Depth',
      type: 'length-measure',
      defaultValue: {
        length: 200,
        unit: 'cm'
      }
    }
  },
  render2D: (element, layer, scene) => {
    let width = element.properties.get('width').get('length');
    let depth = element.properties.get('depth').get('length');
    
    let style = {
      stroke: '#000',
      strokeWidth: '2px',
      fill: '#8d6e63',
      fillOpacity: 0.5
    };
    
    return `
      <g transform="translate(${-width / 2}, ${-depth / 2})">
        <rect width="${width}" height="${depth}" rx="20" ry="20" style="${Object.entries(style).map(([key, value]) => `${key}: ${value}`).join(';')}"/>
        <text x="${width / 2}" y="${depth / 2}" text-anchor="middle" alignment-baseline="central" style="font-weight: bold;">
          LOUNGE
        </text>
      </g>
    `;
  },
  render3D: (element, layer, scene) => {
    let width = element.properties.get('width').get('length');
    let depth = element.properties.get('depth').get('length');
    
    return `
      <g>
        <cube width="${width}" depth="${depth}" height="45" />
      </g>
    `;
  }
});

export default catalog; 