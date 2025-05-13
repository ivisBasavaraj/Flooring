import React, { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';

// Import catalog for elements
import MyCatalog from './MyCatalog';

// Icons
import Icon from '@mui/material/Icon';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import MicExternalOnIcon from '@mui/icons-material/MicExternalOn';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PanToolIcon from '@mui/icons-material/PanTool';
import DeleteIcon from '@mui/icons-material/Delete';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

const GRID_SIZE = 20;

const EventPlanner = ({ 
  width = '100%', 
  height = '100%',
  initialData = null,
  onSave = null
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [selectedTool, setSelectedTool] = useState('select');
  const [selectedItem, setSelectedItem] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [items, setItems] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [dragItem, setDragItem] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 2000, height: 1500 });
  const [viewportOffset, setViewportOffset] = useState({ x: 0, y: 0 });

  // Initialize from data if provided
  useEffect(() => {
    if (initialData && initialData.items) {
      setItems(initialData.items);
      
      if (initialData.canvasSize) {
        setCanvasSize(initialData.canvasSize);
      }
    }
  }, [initialData]);

  // Tools available in the planner
  const tools = [
    { id: 'select', label: 'Select', icon: <PanToolIcon /> },
    { id: 'wall', label: 'Wall', icon: <SquareFootIcon /> },
    { id: 'rect', label: 'Rectangle', icon: <CheckBoxOutlineBlankIcon /> },
    { id: 'circle', label: 'Circle', icon: <RadioButtonUncheckedIcon /> },
    { id: 'round-table', label: 'Round Table', icon: <RadioButtonUncheckedIcon /> },
    { id: 'rect-table', label: 'Rect Table', icon: <TableRestaurantIcon /> },
    { id: 'seat', label: 'Seat', icon: <EventSeatIcon /> },
    { id: 'stage', label: 'Stage', icon: <MicExternalOnIcon /> },
    { id: 'bar', label: 'Bar', icon: <LocalBarIcon /> },
    { id: 'dj-booth', label: 'DJ Booth', icon: <MusicNoteIcon /> },
  ];

  // Catalog of items
  const catalogItems = Object.values(MyCatalog.getElements())
    .filter(item => item.info)
    .map(item => ({
      id: item.name,
      label: item.info.title || item.name,
      icon: getIconForItem(item.name),
      prototype: item.prototype || 'items'
    }));

  // Get icon for item type
  function getIconForItem(itemType) {
    switch(itemType) {
      case 'round-table': return <RadioButtonUncheckedIcon />;
      case 'rect-table': return <TableRestaurantIcon />;
      case 'stage': return <MicExternalOnIcon />;
      case 'bar': return <LocalBarIcon />;
      case 'dj-booth': return <MusicNoteIcon />;
      case 'dance-floor': return <SquareFootIcon />;
      case 'seating-area': return <EventSeatIcon />;
      default: return <AddCircleOutlineIcon />;
    }
  }

  // Handle tool selection
  const handleToolSelect = (event, newTool) => {
    if (newTool !== null) {
      setSelectedTool(newTool);
    }
  };

  // Handle catalog item selection
  const handleCatalogItemSelect = (itemId) => {
    setSelectedItem(itemId);
    setSelectedTool('add');
  };

  // Handle mouse events
  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;
    
    if (selectedTool === 'select') {
      // Check if we're clicking on an item
      const clickedItem = items.find(item => 
        x >= item.x && 
        x <= item.x + item.width && 
        y >= item.y && 
        y <= item.y + item.height
      );
      
      if (clickedItem) {
        setDragItem({
          ...clickedItem,
          offsetX: x - clickedItem.x,
          offsetY: y - clickedItem.y
        });
        setIsDragging(true);
      }
    } else if (selectedTool === 'add' && selectedItem) {
      // Add a new item
      const newItem = {
        id: `item-${Date.now()}`,
        type: selectedItem,
        x: Math.round(x / GRID_SIZE) * GRID_SIZE,
        y: Math.round(y / GRID_SIZE) * GRID_SIZE,
        width: 100,
        height: 100,
        properties: {}
      };
      
      setItems([...items, newItem]);
    }
  };

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;
    
    setMousePos({ x, y });
    
    if (isDragging && dragItem) {
      // Update the position of the dragged item
      const updatedItems = items.map(item => {
        if (item.id === dragItem.id) {
          return {
            ...item,
            x: Math.round((x - dragItem.offsetX) / GRID_SIZE) * GRID_SIZE,
            y: Math.round((y - dragItem.offsetY) / GRID_SIZE) * GRID_SIZE
          };
        }
        return item;
      });
      
      setItems(updatedItems);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragItem(null);
  };

  // Handle zoom
  const handleZoom = (direction) => {
    setZoom(prev => {
      const newZoom = direction === 'in' 
        ? Math.min(prev * 1.2, 3) 
        : Math.max(prev / 1.2, 0.3);
      return newZoom;
    });
  };

  // Handle delete selected
  const handleDelete = () => {
    if (dragItem) {
      const updatedItems = items.filter(item => item.id !== dragItem.id);
      setItems(updatedItems);
      setDragItem(null);
    }
  };

  // Handle save
  const handleSave = () => {
    if (onSave) {
      onSave({
        items,
        canvasSize
      });
    }
  };

  // Calculate the snapped position for display
  const getSnappedPosition = () => {
    return {
      x: Math.round(mousePos.x / GRID_SIZE) * GRID_SIZE,
      y: Math.round(mousePos.y / GRID_SIZE) * GRID_SIZE
    };
  };

  // Get cursor style based on selected tool
  const getCursorStyle = () => {
    switch(selectedTool) {
      case 'select': return 'default';
      case 'add': return 'copy';
      default: return 'crosshair';
    }
  };

  return (
    <Box sx={{ width, height, display: 'flex', flexDirection: 'column' }}>
      {/* Toolbar */}
      <Paper sx={{ p: 1, display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
        <Typography variant="subtitle1" sx={{ mr: 2 }}>Tools:</Typography>
        
        <ToggleButtonGroup
          value={selectedTool}
          exclusive
          onChange={handleToolSelect}
          size="small"
        >
          {tools.map((tool) => (
            <ToggleButton key={tool.id} value={tool.id}>
              <Tooltip title={tool.label}>
                <Icon>{tool.icon}</Icon>
              </Tooltip>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        
        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
        
        <Button 
          size="small" 
          startIcon={<DeleteIcon />} 
          disabled={!dragItem}
          onClick={handleDelete}
        >
          Delete
        </Button>
        
        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title="Zoom Out">
            <Button 
              size="small" 
              onClick={() => handleZoom('out')}
            >
              <ZoomOutIcon />
            </Button>
          </Tooltip>
          
          <Typography>{Math.round(zoom * 100)}%</Typography>
          
          <Tooltip title="Zoom In">
            <Button 
              size="small" 
              onClick={() => handleZoom('in')}
            >
              <ZoomInIcon />
            </Button>
          </Tooltip>
          
          {onSave && (
            <Button 
              variant="contained" 
              size="small" 
              onClick={handleSave}
              sx={{ ml: 2 }}
            >
              Save
            </Button>
          )}
        </Box>
      </Paper>
      
      {/* Main content */}
      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        {/* Catalog panel */}
        <Paper sx={{ width: 200, overflowY: 'auto', p: 1, mr: 1 }}>
          <Typography variant="h6" gutterBottom>Catalog</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            {catalogItems.map((item) => (
              <Button
                key={item.id}
                variant={selectedItem === item.id ? "contained" : "text"}
                startIcon={item.icon}
                onClick={() => handleCatalogItemSelect(item.id)}
                sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
                size="small"
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Paper>
        
        {/* Canvas */}
        <Paper 
          ref={containerRef}
          sx={{ 
            flexGrow: 1, 
            position: 'relative', 
            overflow: 'auto', 
            bgcolor: '#eee' 
          }}
        >
          <div 
            ref={canvasRef}
            style={{
              width: canvasSize.width,
              height: canvasSize.height,
              position: 'relative',
              backgroundImage: 'linear-gradient(#ccc 1px, transparent 1px), linear-gradient(90deg, #ccc 1px, transparent 1px)',
              backgroundSize: `${GRID_SIZE * zoom}px ${GRID_SIZE * zoom}px`,
              backgroundColor: '#f9f9f9',
              transform: `scale(${zoom})`,
              transformOrigin: '0 0',
              cursor: getCursorStyle()
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Render items */}
            {items.map((item) => (
              <div 
                key={item.id}
                style={{
                  position: 'absolute',
                  left: item.x,
                  top: item.y,
                  width: item.width,
                  height: item.height,
                  backgroundColor: dragItem && dragItem.id === item.id ? 'rgba(33, 150, 243, 0.3)' : 'rgba(0, 0, 0, 0.1)',
                  border: dragItem && dragItem.id === item.id ? '2px solid #2196f3' : '1px solid #999',
                  borderRadius: item.type.includes('round') || item.type === 'circle' ? '50%' : '0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  userSelect: 'none',
                  zIndex: dragItem && dragItem.id === item.id ? 100 : 1
                }}
              >
                {getIconForItem(item.type)}
                <div>{item.type}</div>
              </div>
            ))}
            
            {/* Preview for item placement */}
            {selectedTool === 'add' && selectedItem && (
              <div 
                style={{
                  position: 'absolute',
                  left: getSnappedPosition().x,
                  top: getSnappedPosition().y,
                  width: 100,
                  height: 100,
                  backgroundColor: 'rgba(33, 150, 243, 0.3)',
                  border: '2px dashed #2196f3',
                  borderRadius: selectedItem.includes('round') || selectedItem === 'circle' ? '50%' : '0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  pointerEvents: 'none'
                }}
              >
                {getIconForItem(selectedItem)}
                <div>{selectedItem}</div>
              </div>
            )}
          </div>
        </Paper>
      </Box>
      
      {/* Status bar */}
      <Paper sx={{ mt: 1, p: 0.5, display: 'flex', fontSize: '0.75rem', color: 'text.secondary' }}>
        <Box sx={{ mr: 2 }}>
          Position: {getSnappedPosition().x}, {getSnappedPosition().y}
        </Box>
        <Box sx={{ mr: 2 }}>
          Current Tool: {selectedTool}
        </Box>
        {selectedItem && (
          <Box>Selected Item: {selectedItem}</Box>
        )}
      </Paper>
    </Box>
  );
};

export default EventPlanner; 