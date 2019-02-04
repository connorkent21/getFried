import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft, faSearch, faEdit, faCrop, faPalette, faSave, faFire } from '@fortawesome/free-solid-svg-icons'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import NavBar from './NavBar';
import { getImages } from '../api';


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
      results: [],
      slideIndex: 0,
    }

    this.searchImages = this.searchImages.bind(this);
   }


  async searchImages() {
    let key = this.searchBar;
    console.log('this is the value hopefully: ', key, ' in case that doesnt work, this is the bar: ', this.searchBar.value);
    getImages(this.searchBar.value).then((res) => {
      console.log('this is the res from getImages: ', res);
      this.setState({results: res}, () => {
        console.log('this is the new state: ', this.state);
      })
    })
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
              <input type='text' placeholder='Search...' className='searchBar' ref={el => this.searchBar = el} onKeyPress={async (e) => {
                if (e.key === 'Enter') {
                      await this.searchImages();
                      this.forceUpdate();
                    }
                }}/>
              <Button color='primary' variant='contained' className={classes.button} onClick={this.searchImages}>
                Search<FontAwesomeIcon icon={faSearch} size='lg' style={{marginLeft: '8px'}} />
              </Button>
            </div>
          </div>

          <div className='carouselContainer' >
            <div className='flexArrow' style={{textAlign: 'right'}} onClick={() => {
                this.changeSlide('left');
              }}>
              <FontAwesomeIcon icon={faChevronLeft} size='3x' style={{color: '#00BCD4'}}  className='arrow left'/>
            </div>
            <div className='flexImage'>
              <div className='imageOverlay'>
                <FontAwesomeIcon icon={faEdit} size='2x' className='editIcon'/>
                <FontAwesomeIcon icon={faCrop} size='2x' className='editIcon'/>
                <FontAwesomeIcon icon={faPalette} size='2x' className='editIcon'/>
                <FontAwesomeIcon icon={faSave} size='2x' className='editIcon'/>
              </div>
            </div>
            <div className='flexArrow'>
              <FontAwesomeIcon icon={faChevronRight} size='3x' style={{color: '#00BCD4'}} className='arrow right'/>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(Search);
