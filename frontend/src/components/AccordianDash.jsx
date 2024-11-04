import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function AccordionDash() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>Most Popular Accessory</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Ratings wadima accessory ek
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>No. 1 Customer</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            \orders wadima ekkena
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>Best Selling Giftbox</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            most sold gb ek
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>Glitter Gallery Service Rate</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Overall service rate ek
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
