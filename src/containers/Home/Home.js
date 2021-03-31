import React, {useEffect, useState} from 'react';
import SideBar from '../SideBar/SideBar';
import HomeContent from './HomeContent/HomeContent';
import './Home.scss';
import {connect, useDispatch, useSelector} from "react-redux";
import * as videoActions from "../../store/actions/video";
import {bindActionCreators} from 'redux';
import {getYoutubeLibraryLoaded} from '../../store/reducers/api';
import {getVideoCategoryIds} from '../../store/reducers/videos';

// class Home extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       categoryIndex: 0,
//     };
//   }

//   render() {
//     return (
//       <React.Fragment>
//         <SideBar/>
//         <HomeContent/>
//       </React.Fragment>
//     );
//   }

//   componentDidMount() {
//     if (this.props.youtubeLibraryLoaded) {
//         this.fetchCategoriesAndMostPopularVideos();
//     }
//   }

//   componentDidUpdate(prevProps) {
//     if (this.props.youtubeLibraryLoaded !== prevProps.youtubeLibraryLoaded) {
//         this.fetchCategoriesAndMostPopularVideos();
//     }
//   }

//   fetchCategoriesAndMostPopularVideos() {
//     this.props.fetchMostPopularVideos();
//     this.props.fetchVideoCategories();
//   }
// }

// function mapStateToProps(state) {
//   return {
//     youtubeLibraryLoaded: getYoutubeLibraryLoaded(state),
//   };
// }

// function mapDispatchToProps(dispatch) {
//   const fetchMostPopularVideos = videoActions.mostPopular.request;
//   const fetchVideoCategories = videoActions.categories.request;
//   const fetchMostPopularVideosByCategory = videoActions.mostPopularByCategory.request;
//   return bindActionCreators({fetchMostPopularVideos, fetchVideoCategories, fetchMostPopularVideosByCategory}, dispatch);
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Home);

const fetchMostPopularVideos = videoActions.mostPopular.request;
const fetchVideoCategories = videoActions.categories.request;
const fetchMostPopularVideosByCategory = videoActions.mostPopularByCategory.request;

const Home = () => {
    const [categoryIndex, setCategoryIndex] = useState(0);
    const youtubeLibraryLoaded = useSelector(state => state.api.libraryLoaded);
    const videoCategories = useSelector(state => {
        return Object.keys(state.videos.categories || {});
    });
    const videoCategoriesLoaded = useSelector(state => Object.keys(state.videos.categories || {}).length !== 0);

    const dispatch = useDispatch();

    useEffect(() => { 
        console.log(youtubeLibraryLoaded)
        if (youtubeLibraryLoaded) {
            console.log('fetchMostPopularVideos');
            dispatch(fetchMostPopularVideos());
            console.log('fetchVideoCategories')
            dispatch(fetchVideoCategories());
        }

        // console.log(`fetchMostPopularVideosByCategory`)
        // const categories = videoCategories.slice(categoryIndex, categoryIndex + 3);
        // console.log(`fetchMostPopularVideosByCategory ${categories}`)
            // dispatch(fetchVideoCategories());
    }, [youtubeLibraryLoaded]);

    useEffect(() => {
        console.log(videoCategories);
        console.log(`fetchMostPopularVideosByCategory`)
        const categories = videoCategories.slice(categoryIndex, categoryIndex + 3);
        console.log(`fetchMostPopularVideosByCategory ${categories}`)
        dispatch(fetchMostPopularVideosByCategory(categories));
    }, []);

    function fetchVideosByCategory() {
        // const [categoryIndex, setCategoryIndex] = useState(0);
        const categories = videoCategories.slice(categoryIndex, categoryIndex + 3);
        fetchMostPopularVideosByCategory(categories);
        // setCategoryIndex(categoryIndex + 3);
    }

    function bottomReachedCallback() {
        if (!videoCategoriesLoaded) {
            return;
        }
        fetchVideosByCategory();
    }

    function shouldShowLoader() {
        if (videoCategoriesLoaded && videoCategoriesLoaded ) {
            return categoryIndex < videoCategories.length;
        }
    }

    return (
        <React.Fragment>
            <SideBar/>
            <HomeContent 
                bottomReachedCallback={bottomReachedCallback}
                showLoader={shouldShowLoader()}/>
        </React.Fragment>
    )
}

export default Home;