// This file provides mocks for react-icons to prevent import errors
import React from 'react';

// Mock icon components
const IconMock = ({ className, style }) => (
  <span className={className} style={style}>
    ■
  </span>
);

// Create mock exports for various icon libraries
const createIconExport = () => {
  return new Proxy({}, {
    get: (target, prop) => {
      // Return a component for any requested icon
      return IconMock;
    }
  });
};

// Export mock modules
export const FaIcons = createIconExport();
export const MdIcons = createIconExport();
export const TiIcons = createIconExport();

// Export named icons that might be used in the code
export const FaBed = IconMock;
export const FaTable = IconMock;
export const FaChair = IconMock;
export const FaDoorOpen = IconMock;
export const FaWindowMaximize = IconMock;
export const MdStage = IconMock;
export const MdRestaurant = IconMock;
export const MdLocalBar = IconMock;
export const TiEdit = IconMock; 