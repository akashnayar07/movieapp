import React from 'react'

const PageTitle = (props) => {
    return (
   
        <div className="py-3">
          <h3 className="pageTitleHeading"> MoviesHUB | {props.pageTitle} </h3>
          <p className="mt-2 text-blue"> {props.pageTitle} </p>
        </div>

    );
}

export default PageTitle
