// This file provides fully mocked implementation of react-planner components
// without relying on the original package to avoid compatibility issues

import React from 'react';
import { Map } from 'immutable';

// Create mock implementations of the react-planner exports
export const Catalog = class Catalog {
  constructor() {
    this.elements = {};
    this.categories = [];
  }
  
  registerElement(element) {
    this.elements[element.name] = element;
    
    // Add category if it doesn't exist
    const category = element.info && element.info.category ? element.info.category : 'other';
    if (!this.categories.includes(category)) {
      this.categories.push(category);
    }
  }
  
  getElement(type) {
    return this.elements[type];
  }
  
  getElements() {
    return this.elements;
  }
  
  getCategories() {
    return this.categories;
  }
};

export const Models = {
  State: class State {
    constructor() {
      return Map({
        mode: 'IDLE',
        scene: Map({}),
        camera: Map({})
      });
    }
  }
};

export const reducer = (state, action) => {
  // Mock reducer
  return state;
};

// Mock React component
export const ReactPlanner = React.forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <h3>React Planner Mock Component</h3>
      <p>This is a placeholder for the actual planner component</p>
    </div>
  );
});

export const Plugins = {
  Keyboard: () => ({ 
    onKeyDown: () => {}
  }),
  Autosave: (autosaveKey) => ({
    autosaveKey
  }),
  ConsoleDebugger: () => ({
    onStoreChange: () => {}
  })
};

export const fixIconsIssue = () => {
  console.log("Using completely mocked react-planner implementation without any dependence on the original package");
}; 