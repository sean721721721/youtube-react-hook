import React from 'react';
import CommentsHeader from './CommentsHeader/CommentsHeader';
import AddComments from './AddComment/AddComment';
import Comment from './Comment/Comment';

const Comments = (props) => {
    if (!props.comments) {
        return <div/>;
    }
    const comments = props.comments.map((comment) => {
        return <Comment comment={comment} key={comment.id}/>
    })
    return (
        <div>
            <CommentsHeader amountComments={props.amountComments}/>
            <AddComments key="add-comment"/>
            {comments}
        </div>
    )
}

export default Comments;