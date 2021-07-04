import React from 'react';
import { Link } from 'react-router-dom'

const Error = () => {
    return (
        <>
            This page does not exist please go back to the home page <br/>
            <Link to='/'>Homepage</Link>
        </>
    )
}

export default Error;
