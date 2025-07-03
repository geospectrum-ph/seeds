import React, {useContext, useState, useRef} from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Grow, Paper, Popper, MenuItem, MenuList, TextField, Typography, ClickAwayListener, ButtonGroup, 
        Button, Grid } from '@material-ui/core';
import { FeaturesContext } from '../../../context/FeaturesContext.js';

const options = ['Disease', 'Household'];

export default function DropdownDialog() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const {setInternalTableName, externalTableName, setExternalTableName} = useContext(FeaturesContext);

  useEffect(() => {
    setInternalTableName(options[selectedIndex])
  }, [selectedIndex]);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
    setExternalTableName('')
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  const handleExternalTableName = (event) => {
    setExternalTableName(event.target.value)
  }

  return (
    <Grid container direction="row" style={{padding:20}} spacing={3}>
      <Grid item xs={6} container spacing={2}>
        <Grid item xs={12}>
          <Typography>
            Internal Table to be Populated
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ButtonGroup fullWidth variant="contained" color="primary" ref={anchorRef}>
            <Button>{options[selectedIndex]}</Button>
            <Button style={{width:"10%"}} color="primary" size="small"
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined} onClick={handleToggle}>
              <ArrowDropDownIcon />
            </Button>
          </ButtonGroup>
          <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow {...TransitionProps} style={{
                  transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                }}>
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList>
                      {options.map((option, index) => (
                        <MenuItem key={option} disabled={index === 2} selected={index === selectedIndex}
                          onClick={(event) => handleMenuItemClick(event, index)}>
                          {option}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Grid>
      </Grid>
      <Grid item xs={6} container spacing={2}>
        <Grid item xs={12}><Typography>External Table Name</Typography></Grid>
        <Grid item xs={12}>
          <form noValidate autoComplete="off">
            <TextField required value={externalTableName} variant="outlined" label="Table"
              onChange={e =>handleExternalTableName(e)} size="small" fullWidth/>
          </form>
        </Grid>
      </Grid>
      
      <Grid item xs={12}>
        <Paper variant="outlined" style={{height:200}}>
          <Typography>Preview of table</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}