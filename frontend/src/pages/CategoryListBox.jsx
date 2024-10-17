import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

export default function CategoryListBox() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List component="nav" aria-label="secondary mailbox folder">
        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemText primary="Necklaces" />
        </ListItemButton>

        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemText primary="Scrunchies" />
        </ListItemButton>

        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 4)}
        >
          <ListItemText primary="Earrings" />
        </ListItemButton>

        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 5)}
        >
          <ListItemText primary="Rings" />
        </ListItemButton>

        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 6)}
        >
          <ListItemText primary="Flowers" />
        </ListItemButton>

        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 7)}
        >
          <ListItemText primary="Bottles" />
        </ListItemButton>

        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 8)}
        >
          <ListItemText primary="Bracelets" />
        </ListItemButton>

        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 9)}
        >
          <ListItemText primary="Hair Bands and pins" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 10)}
        >
          <ListItemText primary="Stationary" />
        </ListItemButton>
        
        <ListItemButton
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 11)}
        >
          <ListItemText primary="Mugs and Glasses" />
        </ListItemButton>

        <ListItemButton
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 10)}
        >
          <ListItemText primary="Keytags" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 10)}
        >
          <ListItemText primary="Others..." />
        </ListItemButton>
      </List>
    </Box>
  );
}
