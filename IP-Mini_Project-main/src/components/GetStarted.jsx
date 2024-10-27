import React from 'react'
import { 
    Box,
    Grid,
    styled,
    Typography,
} from '@mui/material'
import Title from './Title.jsx'
// img
import imgDetail from '../assets/Track_expense.jpg';
import imgDetail2 from '../assets/Day.jpg';


const GetStarted = () => {

    const CustomGridItem = styled(Grid) ({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    })
    
    const CustomTypography = styled(Typography) ({
        fontSize: '1.1rem',
        textAlign: 'start',
        lineHeight: '1.5',
        color: '#515151',
        marginTop: '1.5rem',
    })

    return (
            
        <Grid container  rowSpacing={4} spacing={{ xs: 4, sm: 4, md: 0 }}   
        sx={{
            py: 10,
            px: 2,
            alignItems: 'flex-start', // Align items at the top 
            
        }}
        >
            <CustomGridItem item xs={12} sm={8} md={6} 
            component = 'section'
           
            >
                <Box component='article'
                sx={{
                    px: 4,
                }}
                >
                    <Title
                    text={
                        'We make it easy track Expense and Income'
                    }
                    textAlign={'start'}
                    />
                    <CustomTypography>
                        Effortlessly track your expenses and income with our intuitive platform.<br />
                        Gain full control of your finances with real-time updates, detailed reports, and easy budgeting—all in one place!
                    </CustomTypography> 
                </Box>

            </CustomGridItem>
            
            <Grid item xs={12} sm={4} md={6}>
                <img src={imgDetail} alt="" 
                style={{
                    width: '100%',
                    height: 'auto', // Maintain aspect ratio
                    maxHeight: '300px',
                    objectFit:'contain',
                    display: 'block', // Remove extra space below the image
                
                }}
                />
            </Grid>

            <Grid item xs={12} sm={4} md={6}
            sx={{
                order: {xs: 4, sm: 4, md: 3},
                
            }}
            >
                <img src={imgDetail2} alt="" 
                style={{ 
                    width: "100%",
                    height: 'auto', // Maintain aspect ratio
                    maxHeight: '300px',
                    objectFit:'contain',
                    display: 'block', // Remove extra space below the image
                }}
                />
            </Grid>

            <CustomGridItem item xs={12} sm={8} md={6}
            sx={{
                order: {xs: 3, sm: 3, md: 4},
                
            }}
            >
                <Box component='article'
                sx={{
                    px: 4,
                }}
                >
                    <Title
                    text={
                        'Match your Yearly, Monthly even Daily goals'
                        
                    }
                    textAlign={'start'}
                    />
                    <CustomTypography>
                    Set and achieve your financial goals effortlessly—whether it's for the year, month, or even day.<br /> 
                    Our platform helps you stay on track with customized budgeting and progress tracking tailored to your needs.
                    </CustomTypography>
                </Box>
            </CustomGridItem>
        </Grid>
    )
}

export default GetStarted;