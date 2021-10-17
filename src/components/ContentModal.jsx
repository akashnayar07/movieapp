import React, { useState, useEffect } from "react";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import YouTubeIcon from "@mui/icons-material/YouTube";
import axios from "axios";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "550px",

  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ContentModal({ children, id, media_type, data }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [videoKey, setvideoKey] = useState("")
  


    const fetchData = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );

 
      // console.log(data);
    };

    const fetchVideo = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );

      setvideoKey(data.results[0]?.key);
    };


  useEffect(() => {
    fetchData();
   fetchVideo();
  }, []);
  return (
    <div>
      <Button onClick={handleOpen} className="movieCardDesign">
        {children}
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              <h4>
            
                {data.title || data.name}
                <span className="ml-3 btn btn-sm bg-blue font-weight-bold">
                  {data.vote_average} imdb
                </span>
              </h4>
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <p>{data.overview}</p>

              <div className="embed-responsive embed-responsive-16by9">
                <iframe
                  title={data.title || data.name}
                  class="embed-responsive-item"
                  src={`https://www.youtube.com/embed/${videoKey}?rel=0`}
                  allowfullscreen
                ></iframe>
              </div>
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://www.youtube.com/watch?v=${videoKey}`}
                className="text-dark text-center p-2 my-2 bg-blue h6 d-block my-3 "
              >
                Watch Trailer on Youtube <YouTubeIcon />
              </a>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
