import React,{ useState } from 'react'
// mui
import { 
    Typography,
    Box,
    Stack,
} from "@mui/material";
// carousel
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
// components
import Title from './Title.jsx'
import Paragraph from './Paragraph.jsx'

import image1 from '../assets/Day.jpg'; // Update with your image paths
import image2 from '../assets/analize_expense.jpg';
import image3 from '../assets/calculator_expense.jpg';
import image4 from '../assets/graph2_expense.jpg';
import image5 from '../assets/graph_expense.jpg';
import image6 from '../assets/pexels-tima-miroshnichenko-6694569.jpg';
import image7 from '../assets/schedule_expense.jpg';

const Gallery = () => {
    
    const [currentIndex, setCurrentIndex] = useState();

    const imageData = [
        {
            alt: 'image1',
            url: image1,
        },
        {
            alt: 'image2',
            url: image2,
        },
        {
            alt: "image3",
            url: image3,
        },
        {
            alt: "image4",
            url: image4,
        },
        {
            alt: "image5",
            url: image5,
        },
        {
            alt: "image6",
            url: image6,
        },
        {
            alt: "image7",
            url: image7,
        },
    ];
  
    const renderSlides = imageData.map((image) => (
    <div key={image.alt}>
        <img src={image.url} alt={image.alt} />
    </div>
    ));


    const handleChange = (index) => {
        setCurrentIndex(index);
    }

    return (
        <Stack
        direction='column'
        justifyContent= 'center'
        alignItems= 'center'
        sx={{
            py: 8,
            px: 2,
            display: { xs: 'flex'},
        }}
        >
            <Box
            component='section'
            sx={{
                paddingBottom: 3,
            }}
            >
                <Title 
                text={
                    'Our Reach'
                }
                textAlign={'center'}
                />
                <Typography
                variant='h5'
                component='h4'
                align='center'
                sx={{
                    paddingTop: 1,
                }}
                >
                    Gallery
                </Typography>
                <Paragraph text={
                    'We have more 5000 reviews and our\
                    customers trust on our quality product\
                    and trust own our product.'
                } 
                maxWidth = {'sm'}
                mx={'auto'}
                textAlign={'center'}
                />
            </Box>
            
            <Box sx={{ 
                maxWidth: 700,
                width: '100%',
            }}>
                <Carousel
                centerSlidePercentage={40}
                thumbWidth={180}
                dynamicHeight={false}
                centerMode={false}
                showArrows={false}
                autoPlay={false}
                infiniteLoop={true}
                selectedItem={imageData[currentIndex]}
                onChange={handleChange}
                className="carousel-container"
                >
                {renderSlides}
                </Carousel>
            </Box>
        </Stack>
    )
}

export default Gallery