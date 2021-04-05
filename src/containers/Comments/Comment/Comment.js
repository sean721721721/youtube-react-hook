import React from 'react';
import './Comment.scss';
import {Button, Image} from "semantic-ui-react";
import Rating from '../../../components/Rating/Rating';

const Comment = (props) => {
    const topLevelComment = props.comment.snippet.topLevelComment;
    const {authorPropfileImageUrl, authorDisplayName, textOriginal} = topLevelComment.snippet;
    const likeCount = topLevelComment.snippet.likeCount;
    console.log(authorPropfileImageUrl)
    if (!props.comment) {
        return <div/>
    }
    return (
        <div className="comment">
            <Image className="user-image" src={authorPropfileImageUrl} circular />
            <div>
                <div className="user-name">{authorDisplayName}</div>
                <span>{textOriginal}</span>
                <div className="comment-actions">
                    <Rating likeCount={likeCount}/>
                    <Button size="mini" compact>REPLY</Button>
                </div>
            </div>
        </div>
    )
}

export default Comment;