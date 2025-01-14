/***
 * Sign.jsx
 *
 * Purpose: Main Sign Component and v2 editor created by SENSE.
 *
 *
 * Copyright 2024 Brown University -- Ibiyemisi Gbenebor
 *
 * All Rights Reserved
 *
 * Permission to use, copy, modify, and distribute this software and its
 * documentation for any purpose other than its incorporation into a
 * commercial product is hereby granted without fee, provided that the
 * above copyright notice appear in all copies and that both that
 * copyright notice and this permission notice appear in supporting
 * documentation, and that the name of Brown University not be used in
 * advertising or publicity pertaining to distribution of the software
 * without specific, written prior permission.
 *
 * BROWN UNIVERSITY DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS
 * SOFTWARE, INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS FOR ANY PARTICULAR PURPOSE. IN NO EVENT SHALL BROWN UNIVERSITY
 * BE LIABLE FOR ANY SPECIAL, INDIRECT OR CONSEQUENTIAL DAMAGES OR ANY
 * DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS,
 * WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS
 * ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE
 * OF THIS SOFTWARE.
 ***/

import React, { useState } from 'react';
import { Grid2, Box, Button, IconButton, MenuItem, Select, InputLabel, FormControl, Typography, TextField, Stack } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import TopBar from "../Topbar/TopBar.jsx";
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import { useSignData } from './hooks/getSignData.jsx'

const Sign = ({ signData }) => {

  return (
      <>
    <Box
      component="img"
      sx={{
        maxHeight: { xs: 233, md: 357 },
        maxWidth: { xs: 350, md: 500 },
        boxShadow: 3
      }}
      alt="User's current sign."
      src={signData?.imageurl}
    >

    </Box>
      </>
  );
}

export function SignTextFormatterSizeMenuItem() {
  return (
    <TextField
      id="outlined-uncontrolled"
      label="Size"
      defaultValue="14"
      size="small"
      sx={{ m: 1, minWidth: 70, maxWidth: 70 }}
    />
  )
}

export function SignTextFormatterFontMenuItem() {
  const [font, setFont] = useState('Arial');

  const handleChange = (event) => {
    setFont(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
      <InputLabel id="demo-select-small-label">Font</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        label="Font"
        value={font}
        onChange={handleChange}
        inputprops={{'data-testid':'sign-component'}}
      >
        <MenuItem aria-label="Arial" value="Arial">Arial</MenuItem>
        <MenuItem aria-label="Times New Roman" value="Times New Roman" >Times New Roman </MenuItem>
        <MenuItem aria-label="Courier" value="Courier">Courier</MenuItem>
        <MenuItem aria-label="Bradley Hand" value="Bradley Hand">Bradley Hand</MenuItem>
      </Select>
    </FormControl>
  )
}

export function SignTextFormatterMenu() {

  return (
    <Stack direction="row" spacing={2} >
      <SignTextFormatterFontMenuItem />
      <SignTextFormatterSizeMenuItem />
      <IconButton>
        <FormatBoldIcon aria-label={"Bold"} />
      </IconButton>
      <IconButton>
        <FormatItalicIcon aria-label={"Italic"} />
      </IconButton>
      <IconButton>
        <FormatUnderlinedIcon aria-label={"Underlined"} />
      </IconButton>
      <IconButton>
        <FormatColorTextIcon aria-label={"Text Color"} />
      </IconButton>
    </Stack>
  )
}

export function SignTextFormatter() {

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <SignTextFormatterMenu />
      <TextField
        id="outlined-multiline"
        label="Sign Text"
        multiline
        rows={4}
        defaultValue="Default Sign Text"
        sx={{ mt: 4, width: "100%"}}
      />
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3, backgroundColor: 'black', color: 'white' }}
      >
        SAVE
      </Button>
    <Button
        variant="contained"
        color="black"
        sx={{ ml: 2, mt: 3, backgroundColor: 'green', color: 'white' }}
    >
        Display Sign
    </Button>
    </Box >
  );

}

// currently lacks backend functionality 
export function SignEditor() {
  const { signData, isLoading } = useSignData(); 
  if (isLoading) {
    return <div>Loading...</div>;
  } 

  return (
    <>
      <TopBar></TopBar>
      <Grid2
        container
        spacing={4}
        sx={{
          background: 'white',
          display: 'flex',
          flexDirection: 'row',
          gap: 4,
          alignItems: 'left',
          justifyContent: 'left',
          marginTop: '100px'
        }}
      >

        <Grid2 item xs={12} sm={6}>
          <SignTextFormatter />
        </Grid2>

        <Grid2 item container direction="column" alignItems="flex-start">
          <Sign signData={signData}/>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, backgroundColor: 'black', color: 'white'}}
            startIcon={<EditIcon />} 
            component={Link} to="/gallery"
          >
            Edit Background
          </Button>
        </Grid2>
      </Grid2>
    </>
  );
}

export function SignEditorPage() {
  return SignEditor();
}

export default Sign;
