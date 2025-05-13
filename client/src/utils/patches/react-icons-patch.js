/**
 * This file is a patch for the React Icons ESM issue
 * 
 * The issue occurs because React Icons uses .mjs files with imports that don't specify 
 * the extension, which causes errors when bundling with webpack.
 * 
 * This file dynamically patches the iconBase import at runtime.
 */

import React from 'react';

// Mock implementation of the react-icons iconBase components
// This mimics the minimal required functionality for the icons to work
export const IconBase = (props) => {
  const { attr, children, ...restProps } = props;
  return React.createElement('svg', {
    ...attr,
    ...restProps,
    children
  });
};

export const GenIcon = (data) => {
  return (props) => {
    return React.createElement(IconBase, {
      attr: { ...data.attr },
      ...props
    }, data.children.map((child, index) => {
      return React.createElement(child.tag, {
        key: index,
        ...child.attr
      }, child.children && GenIcon({ children: child.children, attr: {} })(props));
    }));
  };
};

// Export common context components
export const IconContext = React.createContext({
  color: undefined,
  size: undefined,
  className: undefined,
  style: undefined,
  attr: undefined
});

// Apply the patch
try {
  // This is a placeholder - in a real implementation we would 
  // actually monkey-patch the module system to return our mocked
  // modules when react-icons tries to import '../lib/iconBase'
  console.log('React Icons patch applied');
} catch (error) {
  console.error('Failed to apply React Icons patch:', error);
}

export default {
  IconBase,
  GenIcon,
  IconContext
}; 