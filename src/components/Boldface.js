import * as React from 'react';
import Box from '@mui/material/Box';
import {Typography,TextField} from '@mui/material/';

const boldfaces = [
  {
    headerText: "Both Engine Flame Out",
    answerText: [
      { answerText: "IGNITION", isCorrect: false },
      { answerText: "BOTH ON", isCorrect: false }
    ]
  },
  {
    headerText: "Engine Fire / Severe Damage",
    answerText: [
      { answerText: "FUEL LEVER", isCorrect: false },
      { answerText: "SHUT", isCorrect: false },
      { answerText: "FIRE HANDLE", isCorrect: false },
      { answerText: "PULL AND DISCH 1", isCorrect: false }
    ]
  },
  {
    headerText: "Engine Out",
    promptText: "If no light-up within 10 seconds:",
    answerText: [
      { answerText: "FUEL LEVER", isCorrect: false },
      { answerText: "SHUT", isCorrect: false }
    ]
  },
  {
    headerText: "Engine Out",
    answerText: [
      { answerText: "POWER LEVER", isCorrect: false },
      { answerText: "SHUT", isCorrect: false }
    ]
  },
  {
    headerText: "Air-Start",
    promptText: "If no light-up within 10 seconds:",
    answerText: [
      { answerText: "FUEL LEVER", isCorrect: false },
      { answerText: "SHUT", isCorrect: false },
      { answerText: "START P/B", isCorrect: false },
      { answerText: "OFF", isCorrect: false },
      { answerText: "IGNITION", isCorrect: false },
      { answerText: "OFF", isCorrect: false }
    ]
  },
  {
    headerText: "Evacuation / On Ground",
    answerText: [
      { answerText: "PARK BRAKE", isCorrect: false },
      { answerText: "ON", isCorrect: false },
      { answerText: "BOTH FUEL LEVERS", isCorrect: false },
      { answerText: "SHUT", isCorrect: false }
    ]
  },
  {
    headerText: "Discountinued Engine Start On Ground",
    promptText: "If no light-up within 10 sec after advancing the fuel lever to START:",
    promptText2: "If no light-up within 10 sec after advancing the fuel lever to START:",
    answerText: [
      { answerText: "FUEL LEVER", isCorrect: false },
      { answerText: "SHUT", isCorrect: false },
      { answerText: "START P/B", isCorrect: false },
      { answerText: "OFF", isCorrect: false }
    ]
  },
  {
    headerText: "Discountinued Engine Start On Ground",
    promptText: "If ITT rises rapidly and the start limit is likely to be exceeeded:",
    answerText: [
      { answerText: "FUEL LEVER", isCorrect: false },
      { answerText: "SHUT", isCorrect: false },
      { answerText: "START P/B", isCorrect: false },
      { answerText: "OFF", isCorrect: false }
    ]
  },
  {
    headerText: "Ground Range Selectors",
    answerText: [
      { answerText: "GROUND RANGE SELECTORS", isCorrect: false },
      { answerText: "RELEASE", isCorrect: false },
      { answerText: "POWER LEVERS", isCorrect: false },
      { answerText: "MOVE FORWARD UNTIL ALERT LIGHT GOES OFF", isCorrect: false }
    ]
  },
  {
    headerText: "Jet-Pipe Fire",
    promptText5: "After fire has been extinguished:",
    answerText: [
      { answerText: "FUEL LEVER", isCorrect: false },
      { answerText: "SHUT", isCorrect: false },
      { answerText: "FUEL PUMPS", isCorrect: false },
      { answerText: "OFF", isCorrect: false },
      { answerText: "START P/B", isCorrect: false },
      { answerText: "ON", isCorrect: false },
      { answerText: "ENGINE SELECTOR", isCorrect: false },
      { answerText: "L OR R", isCorrect: false },
      { answerText: "START P/B", isCorrect: false },
      { answerText: "OFF", isCorrect: false }
    ]
  },
]

const objs = boldfaces.map((obj, index) => {
  return (<><Typography variant="body1">{obj.headerText}</Typography>
            <Typography variant="body2">{obj.promptText}</Typography>
          <Box
            sx={{display: 'flex' }
            }
            noValidate
            autoComplete="off"
          >
            {obj.answerText.map((ans) => (
                <TextField id="outlined-basic" label="" variant="outlined" size="small" />
              ))}
          </Box>
      </>);
});

const Boldface =() => {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: "90%" },
      }}
      noValidate
      autoComplete="off"
    >
      {objs}
    </Box>
  );
}

export default Boldface;
