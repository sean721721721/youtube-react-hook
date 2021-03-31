import React, {useEffect} from 'react';
import SideBar from '../SideBar/SideBar';
import HomeContent from './HomeContent/HomeContent';
import './Home.scss';
import {connect} from "react-redux";
import * as videoActions from "../../store/actions/video";
import {bindActionCreators} from 'redux';
import {getYoutubeLibraryLoaded} from '../../store/reducers/api';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryIndex: 0,
    };
  }

  render() {
    return (
      <React.Fragment>
        <SideBar/>
        <HomeContent/>
      </React.Fragment>
    );
  }

  componentDidMount() {
    if (this.props.youtubeLibraryLoaded) {
        console.log(this.props)
      this.props.fetchMostPopularVideos();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.youtubeLibraryLoaded !== prevProps.youtubeLibraryLoaded) {
      this.props.fetchMostPopularVideos();
    }
  }
}

function mapStateToProps(state) {
  return {
    youtubeLibraryLoaded: getYoutubeLibraryLoaded(state),
  };
}

function mapDispatchToProps(dispatch) {
  const fetchMostPopularVideos = videoActions.mostPopular.request;
  console.log(fetchMostPopularVideos)
  return bindActionCreators({fetchMostPopularVideos}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

// const Home = () => {

//     useEffect(() => {
        
//     });

//     return (
//         <React.Fragment>
//             <SideBar/>
//             <HomeContent/>
//         </React.Fragment>
//     )
// }

// export default Home;