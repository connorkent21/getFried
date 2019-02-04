import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft, faSearch, faEdit, faCrop, faPalette, faSave, faFire } from '@fortawesome/free-solid-svg-icons'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import NavBar from './NavBar';
import getNodeDimensions from 'get-node-dimensions';


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


class Search extends Component {
  constructor(props) {
      super(props);
      this.state = {
          results: [
              {
                  url: 'https://i.kym-cdn.com/entries/icons/medium/000/023/805/783.png',
                  width: 200,
                  height: 200,
              },
              {
                  url: 'https://i.imgur.com/HKuWUAD.jpg',
                  width: 597,
                  height: 609,
              },
              {
                  url: 'https://pics.me.me/me-spamming-the-group-chat-with-deep-fried-memes-quality-36355675.png',
                  width: 486,
                  height: 609,
              },
              {
                  url: 'https://i.imgur.com/smIamLU.jpg',
                  width: 725,
                  height: 305,
              },
          ],
        slideIndex: 0,
      }
  }

  changeSlide(direction) {
    if (direction === 'left') {
        this.setState({
            slideIndex: this.state.slideIndex ? this.state.slideIndex - 1 : this.state.results.length - 1
        });
        console.log('index = ', this.state.slideIndex);
    }
    else {
        this.setState({
            slideIndex: this.state.slideIndex === this.state.results.length - 1 ? 0 : this.state.slideIndex + 1
        });
        console.log('index = ', this.state.slideIndex);
        console.log(this.imageWindow.getBoundingClientRect().height)
    }
  }

  scaleImage() {
      let imageHeight = this.state.results[this.state.slideIndex].height;
      let imageWidth = this.state.results[this.state.slideIndex].width;
      // let div = document.getElementById('flexImage');
      // let divHeight = getNodeDimensions(div).height;
      // let divWidth = getNodeDimensions(div).width;
      // let divHeight = document.getElementById('flexImage').getBoundingClientRect().height;
      // let divWidth = document.getElementById('flexImage').getBoundingClientRect().width;
      let divHeight = this.imageWindow.getBoundingClientRect().height;
      let divWidth = this.imageWindow.getBoundingClientRect().width;
      return imageHeight/imageWidth >= divHeight/divWidth ? '100% auto' : 'auto 100%';
  }

  render() {
    const { classes } = this.props;
    return(
      <MuiThemeProvider theme={theme}>
        <div>
          <NavBar />
          <div className='header'>
            <h1>
              GetFried <FontAwesomeIcon icon={faFire} size='1x' style={{marginLeft: '12px'}} />
            </h1>
            <div className='searchBarContainer'>
              <input type='text' placeholder='Search...' className='searchBar' ref={el => this.searchBar = el} />
              <Button color='primary' variant='contained' className={classes.button}>
                Search<FontAwesomeIcon icon={faSearch} size='lg' style={{marginLeft: '8px'}} />
              </Button>
            </div>
          </div>

          <div className='carouselContainer' >
            <div className='flexArrow' style={{textAlign: 'right'}} onClick={() => {
                    this.changeSlide('left');
                }}>
              <FontAwesomeIcon icon={faChevronLeft} size='3x' style={{color: '#00BCD4'}} className='arrow left'/>
            </div>
            <div className='flexImage' id='flexImage' ref={el => this.imageWindow = el} style={{
                    backgroundImage: `url(${this.state.results[this.state.slideIndex].url})`,
                    // backgroundSize: this.scaleImage()
                }}>
              <div className='imageOverlay'>
                <FontAwesomeIcon icon={faEdit} size='2x' className='editIcon' onClick={this.openEditor}/>
                <FontAwesomeIcon icon={faCrop} size='2x' className='editIcon'/>
                <FontAwesomeIcon icon={faPalette} size='2x' className='editIcon'/>
                <FontAwesomeIcon icon={faSave} size='2x' className='editIcon'/>
              </div>
            </div>
            <div className='flexArrow' onClick={() => {
                    this.changeSlide('right');
                }}>
              <FontAwesomeIcon icon={faChevronRight} size='3x' style={{color: '#00BCD4'}} className='arrow right'/>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(Search);
