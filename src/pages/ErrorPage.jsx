import { Fragment } from 'react'
import { Redirect, useHistory } from 'react-router-dom'

const ErrorPage = () => {
    const history = useHistory();

    return (
        <Fragment>
            <img style={{ maxHeight: 250, marginTop: 10, borderRadius: 10 }} src="/assets/sad-cat.png" />
            <h1 style={{ fontSize: 50, color: "#919191", marginTop: 10 }} >404</h1>
            <h2 style={{ fontSize: 22, color: "#919191" }}>Page not found</h2>
            <p style={{ fontSize: 18, color: "#919191", margin: 0, marginTop: 20 }}>The page you are looking for doesn't exist or has been moved.</p>
            <p onClick={() => history.goBack()} style={{ cursor: "pointer", fontSize: 18, color: "#919191", textDecoration: "underline" }}>Click here to go back.</p>
        </Fragment>
    );
}

export default ErrorPage;