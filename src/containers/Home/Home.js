import React, {useEffect, useRef, useState} from 'react';
import SideBar from '../SideBar/SideBar';
import HomeContent from './HomeContent/HomeContent';
import './Home.scss';
import {connect, useDispatch, useSelector} from "react-redux";
import * as videoActions from "../../store/actions/video";
import {bindActionCreators} from 'redux';
import {getYoutubeLibraryLoaded} from '../../store/reducers/api';
import {getVideoCategoryIds, getVideosByCategoryLoaded} from '../../store/reducers/videos';

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
    const prevVideoCategories = usePreviousVideoCategories(videoCategories);
    const videoCategoriesLoaded = useSelector(state => Object.keys(state.videos.categories || {}).length !== 0);
    const videosByCategoryLoaded = useSelector(state => {
        return getVideosByCategoryLoaded(state.videos.byCategory);
    })
    const dispatch = useDispatch();

    useEffect(() => {
        if (prevVideoCategories && (videoCategories.length !== prevVideoCategories.length)) {
            fetchVideosByCategory();
        }
    });

    useEffect(() => { 
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

    // useEffect(() => {
    //     console.log(videoCategories);
    //     console.log(`fetchMostPopularVideosByCategory`)
    //     // if (videoCategories !==)
    //     const categories = videoCategories.slice(categoryIndex, categoryIndex + 3);
    //     console.log(`fetchMostPopularVideosByCategory ${categories}`)
    //     dispatch(fetchMostPopularVideosByCategory(categories));
    // }, []);

    function usePreviousVideoCategories(categories) {
        const ref = useRef();
        useEffect(() => {
            ref.current = categories ? categories : [];
        });
        return ref.current;
    }

    function fetchVideosByCategory() {
        // const [categoryIndex, setCategoryIndex] = useState(0);
        const categories = videoCategories.slice(categoryIndex, categoryIndex + 3);
        dispatch(fetchMostPopularVideosByCategory(categories));
        setCategoryIndex(categoryIndex + 3);
    }

    function bottomReachedCallback() {
        console.log('bottomReachedCallback')
        console.log('videoCategoriesLoaded: ', videoCategoriesLoaded)
        if (!videoCategoriesLoaded) {
            return;
        }
        fetchVideosByCategory();
    }

    function shouldShowLoader() {
        // console.log(videoCategoriesLoaded, videosByCategoryLoaded);
        if (videoCategoriesLoaded && videosByCategoryLoaded ) {
            console.log('categoryIndex < videoCategories.length: ', categoryIndex < videoCategories.length)
            return categoryIndex < videoCategories.length;
        }
        return false;
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