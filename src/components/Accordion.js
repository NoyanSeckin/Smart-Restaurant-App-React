import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function SimpleAccordion({header, renderTable, orderedItem}) {
  return (
    <div>
      <Accordion defaultExpanded='false' sx={{mb: 2}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{header}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {renderTable(orderedItem)}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}