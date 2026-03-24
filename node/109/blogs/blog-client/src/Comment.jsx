import React from 'react'
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export default function Comment(props) {
  const {body, author, date} = props.comment;
  return (
    <div>
      <h5>{body}</h5>
      <h6>by {author} on {dayjs(date).fromNow()}</h6>
    </div>
  )
}
