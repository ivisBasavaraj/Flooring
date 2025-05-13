import React from 'react';
import { IconButton, Tooltip, Box } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import GridOnIcon from '@mui/icons-material/GridOn';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

// Create a simplified toolbar component
const ToolbarButtons = ({ iconSize = 30 }) => {
  const iconColor = '#AAA';
  const activeIconColor = '#0094D9';
  
  const toolbarBoxStyle = {
    position: 'absolute',
    right: '1em',
    top: '5em',
    zIndex: 10,
    background: 'rgba(255, 255, 255, 0.9)',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.3)',
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'column',
    padding: '8px',
  };

  // Mock handlers for demonstration
  const handleAction = (action) => {
    console.log(`Action triggered: ${action}`);
  };

  return (
    <Box sx={toolbarBoxStyle}>
      {/* Mode Icons */}
      <Tooltip title="2D View">
        <IconButton onClick={() => handleAction('set2DMode')} size="small" sx={{ mb: 1 }}>
          <GridOnIcon sx={{ width: iconSize, height: iconSize, color: activeIconColor }} />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="3D View">
        <IconButton onClick={() => handleAction('set3DMode')} size="small" sx={{ mb: 1 }}>
          <ViewInArIcon sx={{ width: iconSize, height: iconSize, color: iconColor }} />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Top View">
        <IconButton onClick={() => handleAction('setTopView')} size="small" sx={{ mb: 1 }}>
          <KeyboardArrowUpIcon sx={{ width: iconSize, height: iconSize, color: iconColor }} />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Front View">
        <IconButton onClick={() => handleAction('setFrontView')} size="small" sx={{ mb: 1 }}>
          <KeyboardArrowRightIcon sx={{ width: iconSize, height: iconSize, color: iconColor }} />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Side View">
        <IconButton onClick={() => handleAction('setSideView')} size="small" sx={{ mb: 1 }}>
          <KeyboardArrowLeftIcon sx={{ width: iconSize, height: iconSize, color: iconColor }} />
        </IconButton>
      </Tooltip>
      
      <hr style={{ margin: '8px 0', border: 'none', borderTop: '1px solid #ddd', width: '100%' }} />
      
      {/* Zoom Icons */}
      <Tooltip title="Zoom In">
        <IconButton onClick={() => handleAction('zoomIn')} size="small" sx={{ mb: 1 }}>
          <ZoomInIcon sx={{ width: iconSize, height: iconSize, color: iconColor }} />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Zoom Out">
        <IconButton onClick={() => handleAction('zoomOut')} size="small" sx={{ mb: 1 }}>
          <ZoomOutIcon sx={{ width: iconSize, height: iconSize, color: iconColor }} />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Fit To Screen">
        <IconButton onClick={() => handleAction('fitToScreen')} size="small" sx={{ mb: 1 }}>
          <FullscreenIcon sx={{ width: iconSize, height: iconSize, color: iconColor }} />
        </IconButton>
      </Tooltip>
      
      <hr style={{ margin: '8px 0', border: 'none', borderTop: '1px solid #ddd', width: '100%' }} />
      
      {/* Edit Icons */}
      <Tooltip title="Undo">
        <IconButton onClick={() => handleAction('undo')} size="small" sx={{ mb: 1 }}>
          <UndoIcon sx={{ width: iconSize, height: iconSize, color: iconColor }} />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Redo">
        <IconButton onClick={() => handleAction('redo')} size="small" sx={{ mb: 1 }}>
          <RedoIcon sx={{ width: iconSize, height: iconSize, color: iconColor }} />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Copy">
        <IconButton onClick={() => handleAction('copy')} size="small" sx={{ mb: 1 }}>
          <ContentCopyIcon sx={{ width: iconSize, height: iconSize, color: iconColor }} />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Paste">
        <IconButton onClick={() => handleAction('paste')} size="small" sx={{ mb: 1 }}>
          <ContentPasteIcon sx={{ width: iconSize, height: iconSize, color: iconColor }} />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Delete">
        <IconButton onClick={() => handleAction('delete')} size="small" sx={{ mb: 1 }}>
          <DeleteIcon sx={{ width: iconSize, height: iconSize, color: iconColor }} />
        </IconButton>
      </Tooltip>
      
      <hr style={{ margin: '8px 0', border: 'none', borderTop: '1px solid #ddd', width: '100%' }} />
      
      {/* Export Icons */}
      <Tooltip title="Export to JSON">
        <IconButton onClick={() => handleAction('export')} size="small" sx={{ mb: 1 }}>
          <DownloadIcon sx={{ width: iconSize, height: iconSize, color: iconColor }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default ToolbarButtons; 