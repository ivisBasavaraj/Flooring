import React, { useState } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { Map } from 'immutable';

// Import our compatibility layer instead of direct react-planner imports
import {
  Models as PlannerModels,
  reducer as PlannerReducer,
  Plugins as PlannerPlugins,
  fixIconsIssue
} from './plannerCompatibility';

// Import our custom event planning catalog
import MyCatalog from '../components/planner/MyCatalog';

// Apply compatibility fixes
fixIconsIssue();

// Define state
const AppState = Map({
  'react-planner': new PlannerModels.State()
});

// Define reducer
const reducer = (state, action) => {
  state = state || AppState;
  state = state.update('react-planner', plannerState => PlannerReducer(plannerState, action));
  return state;
};

// Initialize store using configureStore
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false
    })
});

// Define plugins
const plugins = [
  PlannerPlugins.Keyboard(),
  PlannerPlugins.Autosave('event-planner-autosave'),
  PlannerPlugins.ConsoleDebugger(),
];

// Create a functional planner component 
const EventPlannerUI = ({ width, height, onSave }) => {
  const [selectedTool, setSelectedTool] = useState('select');
  const [selectedItem, setSelectedItem] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  
  const toolOptions = [
    { id: 'select', label: 'Select' },
    { id: 'wall', label: 'Wall' },
    { id: 'door', label: 'Door' },
    { id: 'window', label: 'Window' },
    { id: 'items', label: 'Items' },
  ];
  
  const catalogItems = Object.values(MyCatalog.getElements()).map(item => ({
    id: item.name,
    label: item.info?.title || item.name
  }));
  
  const handleToolSelect = (toolId) => {
    setSelectedTool(toolId);
  };
  
  const handleItemSelect = (itemId) => {
    setSelectedItem(itemId);
    // When selecting a catalog item, automatically switch to items tool
    setSelectedTool('items');
  };
  
  const handleZoom = (direction) => {
    if (direction === 'in') {
      setZoomLevel(prev => Math.min(prev + 0.1, 2));
    } else {
      setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
    }
  };
  
  return (
    <div style={{ width, height, background: '#f5f5f5', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <h2 style={{ margin: '0' }}>Event Floor Plan Designer</h2>
        <div>
          <button 
            onClick={() => handleZoom('out')}
            style={{ padding: '5px 10px', margin: '0 5px' }}
          >
            -
          </button>
          <span>{Math.round(zoomLevel * 100)}%</span>
          <button 
            onClick={() => handleZoom('in')}
            style={{ padding: '5px 10px', margin: '0 5px' }}
          >
            +
          </button>
        </div>
      </div>
      
      <div style={{ 
        display: 'flex', 
        border: '1px solid #ccc', 
        height: 'calc(100% - 60px)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Tools Panel */}
        <div style={{ 
          position: 'absolute', 
          top: '10px', 
          left: '10px', 
          padding: '10px', 
          background: '#fff', 
          border: '1px solid #ccc', 
          borderRadius: '4px',
          zIndex: 100
        }}>
          <h4 style={{ margin: '0 0 10px 0' }}>Tools</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {toolOptions.map(tool => (
              <button 
                key={tool.id}
                onClick={() => handleToolSelect(tool.id)}
                style={{ 
                  padding: '5px 10px', 
                  background: selectedTool === tool.id ? '#3f51b5' : '#f5f5f5', 
                  color: selectedTool === tool.id ? '#fff' : '#000',
                  border: 'none', 
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {tool.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Catalog Panel */}
        <div style={{ 
          width: '200px', 
          borderRight: '1px solid #ccc', 
          padding: '10px',
          background: '#fff',
          overflowY: 'auto'
        }}>
          <h3>Catalog</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {catalogItems.map(item => (
              <li 
                key={item.id}
                onClick={() => handleItemSelect(item.id)}
                style={{ 
                  padding: '8px', 
                  margin: '4px 0', 
                  background: selectedItem === item.id ? '#e3f2fd' : '#eee', 
                  borderRadius: '4px',
                  cursor: 'pointer',
                  border: selectedItem === item.id ? '2px solid #2196f3' : 'none'
                }}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Drawing Area */}
        <div style={{ 
          flex: 1, 
          background: '#fff',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ 
            width: '100%', 
            height: '100%', 
            backgroundImage: 'linear-gradient(#eee 1px, transparent 1px), linear-gradient(90deg, #eee 1px, transparent 1px)',
            backgroundSize: `${20 * zoomLevel}px ${20 * zoomLevel}px`,
            transform: `scale(${zoomLevel})`,
            transformOrigin: '0 0',
          }}>
            {/* This would contain the actual plan elements */}
            <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
              <p>Click and drag to add elements</p>
              <p>Current tool: <strong>{selectedTool}</strong></p>
              {selectedItem && <p>Selected item: <strong>{selectedItem}</strong></p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReactPlannerWrapper = ({ projectData }) => {
  return (
    <Provider store={store}>
      <div style={{ width: '100%', height: '100%' }}>
        <EventPlannerUI
          width="100%"
          height="100%"
        />
      </div>
    </Provider>
  );
};

export default ReactPlannerWrapper; 