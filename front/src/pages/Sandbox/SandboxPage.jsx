import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import "../../components/cardCss.css";
import { Avatar } from "@mui/material";

const SandboxPage = () => {
  const [userFromServer, setUserFromServer] = useState([]);
  useEffect(() => {
    axios
      .get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users`)
      .then(({ data }) => {
        setUserFromServer(data);
      })
      .catch((err) => {});
  }, []);

  return (
    <Fragment>
      <Typography variant="h4" sx={{ mt: 12, mb: 2 }}>
        All Users:
      </Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {userFromServer.map((item, index) => (
          <Grid item key={index} sx={{ mt: 2 }} lg={12} md={10} sm={12} xs={12}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Avatar alt="profile" src={item?.image?.url} sx={{ mr: 2 }} />
                <Typography sx={{ width: "33%", flexShrink: 0, mt: 1 }}>
                  {`${item.name.first} ${item.name.middle} ${item.name.last}`}
                </Typography>
                {item.isAdmin && (
                  <Typography sx={{ color: "text.secondary", mr: 1, mt: 1 }}>
                    Admin
                  </Typography>
                )}
                {item.isBusiness && (
                  <Typography sx={{ color: "text.secondary", mt: 1 }}>
                    Business acount{" "}
                  </Typography>
                )}
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: "flex" }}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 700, variant: "subtitle1", mb: 1 }}
                  >{`phone:  `}</Typography>
                  <Typography variant="body1">{item.phone}</Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 700, variant: "subtitle1", mb: 1 }}
                  >{`email: `}</Typography>
                  <Typography>{item.email}</Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 700, variant: "subtitle1", mb: 1 }}
                >{`address: `}</Typography>
                <Typography variant="body1">{item.address.country} </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {`${item.address.city}, ${item.address.street}, ${item.address.hoseNumber}`}
                </Typography>
                <Box sx={{ display: "flex" }}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 700, variant: "subtitle1", mb: 1 }}
                  >{`state: `}</Typography>
                  <Typography>{item.address.state}</Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 700, variant: "subtitle1", mb: 1 }}
                  >{`zip: `}</Typography>
                  <Typography>{item.address.zip}</Typography>
                </Box>
              </AccordionDetails>
            </Accordion>{" "}
          </Grid>
        ))}
      </Grid>
    </Fragment>
  );
};
export default SandboxPage;
