import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft, faSearch } from '@fortawesome/free-solid-svg-icons'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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
   }


  render() {
    return(
      <MuiThemeProvider theme={theme}>
        <div>
          <div className='header'>
            <h1>
              Get Fried
            </h1>
            <div className='searchBarContainer'>
              <input type='text' className='searchBar' ref={el => this.searchBar = el} />
              <Button color='secondary' variant='contained'>
                Search<FontAwesomeIcon icon={faSearch} size='lg' style={{marginLeft: '8px'}} />
              </Button>
            </div>
          </div>

          <div className='carouselContainer' >
            <div className='flexArrow' style={{textAlign: 'right'}}>
              <FontAwesomeIcon icon={faChevronLeft} size='lg' />
            </div>
            <div className='flexImage'>
              <div className='imageOverlay'>
                <FontAwesomeIcon icon={faSearch} size='2x' />
                <FontAwesomeIcon icon={faSearch} size='2x' />
                <FontAwesomeIcon icon={faSearch} size='2x' />
              </div>
            </div>
            <div className='flexArrow'>
              <FontAwesomeIcon icon={faChevronRight} size='lg' />
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(Search);
