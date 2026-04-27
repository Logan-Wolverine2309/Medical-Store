import React from 'react'

// MUI
import { Box, Typography } from '@mui/material'
import { Favorite, LocalPharmacy } from '@mui/icons-material'

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 4,
        py: 2,
        px: 2,
        textAlign: 'center',
        borderTop: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper'
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={1}
        flexWrap="wrap"
      >
        <LocalPharmacy fontSize="small" />
        MedStore Pro © {new Date().getFullYear()} |
        Made with
        <Favorite sx={{ color: 'red', fontSize: 16 }} />
        for Better Healthcare Management
      </Typography>
    </Box>
  )
}

export default Footer