import React from 'react';
import Zoom from 'react-img-zoom-gdn';

const DisplayImageContainer = ({ currImg, setOpen }) => {



    return (
        <>

            <div className="fixed top-0 left-0 w-screen min-h-screen bg-black/50 z-[1000] d-flex justify-center" onClick={() => setOpen(false)}>
                <Zoom img={currImg} zoomScale={3} height={250} width={window.innerWidth} transitionTime={0.5}
                />
            </div>

        </>
    );
};

export default DisplayImageContainer;
