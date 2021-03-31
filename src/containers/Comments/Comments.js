import React from 'react';
import CommentsHeader from './CommentsHeader/CommentsHeader';
import AddComments from './AddComment/AddComment';
import Comment from './Comment/Comment';

const Comments = (props) => {
    return (
        <div>
            <CommentsHeader amountComments={props.amountComments}/>
            <AddComments/>
            <Comment/>
            <Comment/>
            <Comment/>
        </div>
    )
}

export default Comments;