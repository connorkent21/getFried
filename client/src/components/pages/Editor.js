import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft, faSearch, faEdit, faCrop, faPalette, faSave, faFire } from '@fortawesome/free-solid-svg-icons'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/lab/Slider';
import { getImages } from '../../api';


const styles = {
  title: {
    fontFamily: "'Open Sans', sans-serif",
    margin: 'auto',
    textAlign: 'left',
    padding: '24px',
    paddingBottom: '8px',
    fontWeight: '700',
    color: '#22965E',
  },
  text: {
    fontSize: '1rem',
    fontFamily: "'Open Sans', sans-serif",
    padding: '24px',
  },
  headerContainer: {
    backgroundColor: 'white'
  },
  button: {
    height: '48px',
  },
  slider: {
    width: '20vw',
  },
  sliderTrack: {
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  sliderThumb: {
    backgroundColor: 'rgba(255,255,255,1)',
  }
};

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#00BCD4',
    },
    secondary: {
      main:'#607D8B'
    }
  },
});


class Editor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      saturation: 0,
      contrast: 0,
    }
  }

  // scaleImage() {
  //     let imageHeight = this.state.results[this.state.slideIndex].height;
  //     let imageWidth = this.state.results[this.state.slideIndex].width;
  //     let divHeight = this.imageWindow.getBoundingClientRect().height;
  //     let divWidth = this.imageWindow.getBoundingClientRect().width;
  //     return imageHeight/imageWidth >= divHeight/divWidth ? 'auto 100%' : '100% auto';
  // }

  saturationSlider = (event, value) => {
    console.log('slider: ', value);
    this.setState({saturation: value});
  }

  contrastSlider = (event, value) => {
    console.log('slider: ', value);
    this.setState({contrast: value});
  }

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        {console.log(this)}
        <div className='editorImage' style={{
          backgroundImage: `url(${this.props.history.location.pathname.replace('/editor/', '')})`,
          backgroundSize: 'auto 100%',}}/>
        <div className='editorBar'>
          <div className='sliderContainer'>
            <Slider step={5} max={100} min={-100}
              ref={el => this.slider1 = el}
              onChange={this.saturationSlider}
              value={this.state.saturation}
              classes={{root: classes.slider, track: classes.sliderTrack, thumb: classes.sliderThumb}} />
            <p className='sliderTitle'>Saturation: {this.state.saturation}</p>
            </div>
          <div className='sliderContainer'>
            <Slider step={5} max={100} min={-100}
              ref={el => this.slider2 = el}
              onChange={this.contrastSlider}
              value={this.state.contrast}
              classes={{root: classes.slider, track: classes.sliderTrack, thumb: classes.sliderThumb}} />
            <p className='sliderTitle'>Contrast: {this.state.contrast}</p>
        </div>
          <Button className='editorButton' color='rgba(150,150,150,.25)' variant='contained'>finish</Button>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default withRouter(withStyles(styles)(Editor))
