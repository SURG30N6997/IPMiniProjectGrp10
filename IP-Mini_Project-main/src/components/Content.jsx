import React from 'react';
import {  
    Grid, 
    Typography,
    IconButton,
    Card,
    CardContent,
} from "@mui/material";
// icons
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import WifiPasswordIcon from '@mui/icons-material/WifiPassword';
import LocalOfferIcon from '@mui/icons-material/LocalOffer'; // Added a new icon

// components
import Title from './Title.jsx';
import Paragraph from './Paragraph.jsx';

const Content = () => {
  return (    
        <Grid container spacing={2}   
        sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            py: 10,
            px: 2,
        }}
        >
            <Grid item xs={12} sm={12} md={5} component='section'>
                <Title
                text={'What we are offering?'}
                textAlign={'start'}
                />

                <Typography 
                variant='h6'
                component='h4' 
                sx={{
                    fontWeight: '400',
                    paddingTop: 1,
                }}
                >
                    Personal Expense Tracker
                </Typography>

                <Paragraph 
                text={
                    'We have more than 5000 reviews and our customers trust our quality products.'
                }
                maxWidth={'75%'}
                mx={0}
                textAlign={'start'}
                />
            </Grid>

            {/** Income Card **/}
            <Grid item xs={12} sm={6} md={3}>    
                <Card 
                square={true}
                sx={{ 
                    minHeight: 200,
                    display: 'flex',
                    flexDirection:'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center', 
                    border: '1px solid #ccc',
                }}>
                    <CardContent>
                        <IconButton>
                            <AccountBalanceWalletIcon 
                            fontSize="large"
                            color="secondary" />
                        </IconButton>
                        <Typography 
                        variant="h5" 
                        component="p"
                        sx={{
                            fontWeight: 700,
                            textTransform: 'capitalize',
                        }}
                        >
                        Income
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            {/** Health Card **/}
            <Grid item xs={12} sm={6} md={3}>
                <Card 
                square={true}
                sx={{ 
                    minHeight: 200,
                    display: 'flex',
                    flexDirection:'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center', 
                    border: '1px solid #ccc',
                }}>
                    <CardContent>
                        <IconButton>
                            <MedicationLiquidIcon 
                            fontSize="large"
                            color="secondary" />
                        </IconButton>
                        <Typography 
                        variant="h5" 
                        component="p"
                        sx={{
                            fontWeight: 700,
                            textTransform: 'capitalize',
                        }}
                        >
                        Health
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            {/** Shopping Card **/}
            <Grid item xs={12} sm={6} md={3}>
                <Card 
                square={true}
                sx={{ 
                    minHeight: 200,
                    display: 'flex',
                    flexDirection:'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center', 
                    border: '1px solid #ccc',
                }}>
                    <CardContent>
                        <IconButton>
                            <ShoppingCartIcon 
                            fontSize="large"
                            color="secondary" />
                        </IconButton>
                        <Typography 
                        variant="h5" 
                        component="p"
                        sx={{
                            fontWeight: 700,
                            textTransform: 'capitalize',
                        }}
                        >
                        Shopping
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            {/** Travel Card **/}
            <Grid item xs={12} sm={6} md={3}>
                <Card 
                square={true}
                sx={{ 
                    minHeight: 200,
                    display: 'flex',
                    flexDirection:'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center', 
                    border: '1px solid #ccc',
                }}>
                    <CardContent>
                        <IconButton>
                            <TravelExploreIcon  
                            fontSize="large"
                            color="secondary" />
                        </IconButton>
                        <Typography 
                        variant="h5" 
                        component="p"
                        sx={{
                            fontWeight: 700,
                            textTransform: 'capitalize',
                        }}
                        >
                        Travel
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            {/** Food Card **/}
            <Grid item xs={12} sm={6} md={3}>
                <Card 
                square={true}
                sx={{ 
                    minHeight: 200,
                    display: 'flex',
                    flexDirection:'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center', 
                    border: '1px solid #ccc',
                }}>
                    <CardContent>
                        <IconButton>
                            <FastfoodIcon 
                            fontSize="large"
                            color="secondary" />
                        </IconButton>
                        <Typography 
                        variant="h5" 
                        component="p"
                        sx={{
                            fontWeight: 700,
                            textTransform: 'capitalize',
                        }}
                        >
                        Food
                        </Typography>
                    </CardContent>
                </Card>
            </Grid> 

            {/** Technology Card **/}
            <Grid item xs={12} sm={6} md={3}>
                <Card 
                square={true}
                sx={{ 
                    minHeight: 200,
                    display: 'flex',
                    flexDirection:'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center', 
                    border: '1px solid #ccc',
                }}>
                    <CardContent>
                        <IconButton>
                            <WifiPasswordIcon
                            fontSize="large"
                            color="secondary" />
                        </IconButton>
                        <Typography 
                        variant="h5" 
                        component="p"
                        sx={{
                            fontWeight: 700,
                            textTransform: 'capitalize',
                        }}
                        >
                        Technology
                        </Typography>
                    </CardContent>
                </Card>
            </Grid> 

            {/** Expense Card **/}
            <Grid item xs={12} sm={6} md={3}>
                <Card 
                square={true}
                sx={{ 
                    minHeight: 200,
                    display: 'flex',
                    flexDirection:'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center', 
                    border: '1px solid #ccc',
                }}>
                    <CardContent>
                        <IconButton>
                            <LocalOfferIcon // Using a different icon for this card
                            fontSize="large"
                            color="secondary" />
                        </IconButton>
                        <Typography 
                        variant="h5" 
                        component="p"
                        sx={{
                            fontWeight: 700,
                            textTransform: 'capitalize',
                        }}
                        >
                        Expense
                        </Typography>
                    </CardContent>
                </Card>
            </Grid> 
        </Grid>
    );
}

export default Content;
