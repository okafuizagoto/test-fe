import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Paper, Typography } from '@mui/material';
import GymLogo from "../public/static/banner/gym.jpg";
import GymLogoOne from "../public/static/banner/gym1.jpg";
import GymLogoTwo from "../public/static/banner/gym2.jpg";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

// const images = [
//   'https://via.placeholder.com/600x400/FF0000/FFFFFF',
//   'https://via.placeholder.com/600x400/00FF00/FFFFFF',
//   'https://via.placeholder.com/600x400/0000FF/FFFFFF',
// ];

// const images = [
//   GymLogo,
//   GymLogoOne,
//   GymLogoTwo,
// ];

const images = [
  'https://cdn.pixabay.com/photo/2021/02/03/11/32/gym-5977600_1280.jpg',
  'https://cdn.pixabay.com/photo/2020/04/03/20/49/gym-5000169_960_720.jpg',
  'https://cdn.pixabay.com/photo/2014/11/11/15/24/gym-526995_960_720.jpg',
];

const SwipedPictures = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div>
      <Paper sx={{ flexGrow: 1, maxWidth: 1900, margin: 'auto', }}>
        <AutoPlaySwipeableViews index={activeStep} onChangeIndex={handleStepChange} axis="x">
          {images.map((img, index) => (
            <div key={index}>
              {Math.abs(activeStep - index) <= 2 ? (
                <img style={{ height: 1000, display: 'block', maxWidth: 1900, overflow: 'hidden', width: '100%', }} src={img} alt={`Step ${index}`} />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
      </Paper>
      <Typography variant="caption" align="center">{`Step ${activeStep + 1} of ${images.length}`}</Typography>
    </div>
  );
};

export default SwipedPictures;