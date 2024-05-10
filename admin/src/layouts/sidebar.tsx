import React from 'react';
import Link from 'next/link';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { BarChart, Inventory2, People, ShoppingCart, Store, Settings } from '@mui/icons-material';

const Sidebar = () => { 
  return (
    <Drawer variant="permanent" anchor="left" sx={{ width: 240, flexShrink: 0, '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box', marginTop: '64px' } }}> {/* Adjust marginTop to match Navbar height */}
      <List>
        {[
          { icon: <BarChart />, text: 'Overview', href: '/overview' },
          { icon: <Inventory2 />, text: 'Products', href: '/products' },
          { icon: <People />, text: 'Customers', href: '/customers' },
          { icon: <ShoppingCart />, text: 'Orders', href: '/orders' },
          { icon: <Store />, text: 'Inventory', href: '/inventory' },
          { icon: <Settings />, text: 'Settings', href: '/settings' },
        ].map((item, index) => (
          <Link href={item.href} key={index} passHref>
            <ListItem button component="a">
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
