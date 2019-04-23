import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import axios from 'axios';
// core components
import Heading from "components/Heading/Heading.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import Timeline from "components/Timeline/Timeline.jsx";
import {Link} from "react-router-dom";
import CardAvatar from "components/Card/CardAvatar.jsx";
import Clearfix from "components/Clearfix/Clearfix.jsx";
import Button from "components/CustomButtons/Button.jsx";
import PermIdentity from "@material-ui/icons/PermIdentity";
import merc from "assets/img/new/cars/merc.jpeg";
import merc1 from "assets/img/new/cars/merc1.jpg";
import blockloader from "assets/img/block.gif";
import merc2 from "assets/img/new/cars/merc2.jpg";
import merc3 from "assets/img/new/cars/merc3.jpg";
import merclogo from "assets/img/new/cars/merclogo.jpg";
import stars from "assets/img/new/stars.jpg";
import overview from "assets/img/new/overview.png";
import avatar from "assets/img/faces/marc.jpg";
import NavPills from "components/NavPills/NavPills.jsx";

import Home from "@material-ui/icons/Home";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import FormatQuote from "@material-ui/icons/FormatQuote";
// core components
import Table from "components/Table/Table.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import CardText from "components/Card/CardText.jsx";

import CardTravel from "@material-ui/icons/CardTravel";
import Extension from "@material-ui/icons/Extension";
import Fingerprint from "@material-ui/icons/Fingerprint";
import FlightLand from "@material-ui/icons/FlightLand";
import Build from "@material-ui/icons/Build";

import AvTimer from "@material-ui/icons/AvTimer";
import Commute from "@material-ui/icons/Commute";
import LocalCarWash from "@material-ui/icons/LocalCarWash";
import Whatshot from "@material-ui/icons/Whatshot";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";


import { bugs, website, server } from "variables/general.jsx";
import image from "assets/img/faces/card-profile1-square.jpg";
import {
  cardTitle,
  roseColor
} from "assets/jss/material-dashboard-pro-react.jsx";

import {
  roundedLineChart,
  straightLinesChart,
  simpleBarChart,
  colouredLineChart,
  multipleBarsChart,
  colouredLinesChart,
  pieChart
} from "variables/charts.jsx";

import chartsStyle from "assets/jss/material-dashboard-pro-react/views/chartsStyle.jsx";
import Badge from "components/Badge/Badge.jsx";

const styles = {
  cardTitle,
  cardTitleWhite: {
    ...cardTitle,
    color: "#FFFFFF",
    marginTop: "0"
  },
  cardCategoryWhite: {
    margin: "0",
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: ".875rem"
  },
  cardCategory: {
    color: "#999999",
    marginTop: "10px"
  },
  icon: {
    color: "#333333",
    margin: "10px auto 0",
    width: "130px",
    height: "130px",
    border: "1px solid #E5E5E5",
    borderRadius: "50%",
    lineHeight: "174px",
    "& svg": {
      width: "55px",
      height: "55px"
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      width: "55px",
      fontSize: "55px"
    }
  },
  iconRose: {
    color: roseColor
  },
  marginTop30: {
    marginTop: "30px"
  },
  testimonialIcon: {
    marginTop: "30px",
    "& svg": {
      width: "40px",
      height: "40px"
    }
  },
  cardTestimonialDescription: {
    fontStyle: "italic",
    color: "#999999"
  }
};




class Charts extends React.Component {
  state = {
    isLoading: true,
    subnsdata: [],
    allmosaicsdata: [],
    error: null
  }

  async componentDidMount() {
      await this.func1();
      await this.func2();
  }

  func1() {
    fetch('http://localhost:1337/api/getVehicleInfo?vin=wddug7gbxfa122533')
    .then(response => response.json())
    .then(data => {
        this.setState({
          subnsdata: data,
          isLoading: false,
        });
      }
    )
    .catch(error => this.setState({ error, isLoading: false }));
  }

  func2() {
    fetch('http://localhost:1337/api/getAllMosaicData?vin=wddug7gbxfa122533')
    .then(response => response.json())
    .then(data => {
        this.setState({
          allmosaicsdata: data,
          isLoading: false,
        });
      }
    )
    .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    const { classes } = this.props;
    const { isLoading, subnsdata, allmosaicsdata, error } = this.state;
    const widgetStories = [
      {
        // Third story
        inverted: true,
        badgeColor: "info",
        badgeIcon: LocalCarWash,
        title: "Service Update - Mosaic",
        titleColor: "info",
        body: (
          <div>

          {error ? <p>{error.message}</p> : null}
          {!isLoading ? (
            this.state.allmosaicsdata.map(data => {
              const { meta, mosaic } = data;
              console.log(data);
              if(mosaic.id.name == 'serviceupdate'){
                return (
                  <div key={meta.id}>
                    <h4 className={classes.cardTestimonialDescription}>"{mosaic.description}"</h4>
                    <p>Meta ID: {meta.id}, Mosaic Name: {mosaic.id.name}, Mosaic Namespace: {mosaic.id.namespaceId}</p>
                    <p>Mosaic Properties: {mosaic.properties[0].name}: {mosaic.properties[0].value}, {mosaic.properties[1].name}: {mosaic.properties[1].value}, {mosaic.properties[2].name}: {mosaic.properties[2].value}, {mosaic.properties[3].name}: {mosaic.properties[3].value}</p>
                    <h6 className={classes.cardCategory}>Blockchain Address: {mosaic.creator}</h6>
                  </div>
                );
              }
            })
          ) : (
            <h3><img src={blockloader} alt="loading..." /></h3>
          )}

          </div>
        ),
        footer: (
          <CustomDropdown
            buttonIcon={Build}
            buttonProps={{
              round: true,
              style: { marginBottom: "0" },
              color: "info"
            }}
            dropdownList={[
              "Buy Detailed Report for 3 XEM",
              "Add Service Report"
            ]}
          />
        )
      },
      {
        // Second story
        inverted: true,
        badgeColor: "success",
        badgeIcon: AvTimer,
        title: "Odometer Check - Mosaic",
        titleColor: "success",
        body: (
          <p>
          {error ? <p>{error.message}</p> : null}
          {!isLoading ? (
            this.state.allmosaicsdata.map(data => {
              const { meta, mosaic } = data;
              console.log(data);
              if(mosaic.id.name == 'odometercheck'){
                return (
                  <div key={meta.id}>
                    <h4 className={classes.cardTestimonialDescription}>"{mosaic.description}"</h4>
                    <p>Meta ID: {meta.id}, Mosaic Name: {mosaic.id.name}, Mosaic Namespace: {mosaic.id.namespaceId}</p>
                    <p>Mosaic Properties: {mosaic.properties[0].name}: {mosaic.properties[0].value}, {mosaic.properties[1].name}: {mosaic.properties[1].value}, {mosaic.properties[2].name}: {mosaic.properties[2].value}, {mosaic.properties[3].name}: {mosaic.properties[3].value}</p>
                    <h6 className={classes.cardCategory}>Blockchain Address: {mosaic.creator}</h6>
                  </div>
                );
              }
            })
          ) : (
            <h3><img src={blockloader} alt="loading..." /></h3>
          )}
          </p>
        )
      },
      {
        // First story
        inverted: true,
        badgeColor: "danger",
        badgeIcon: Whatshot,
        title: "Accident Report Mosaic",
        titleColor: "danger",
        body: (
          <p>
          {error ? <p>{error.message}</p> : null}
          {!isLoading ? (
            this.state.allmosaicsdata.map(data => {
              const { meta, mosaic } = data;
              console.log(data);
              if(mosaic.id.name == 'accident'){
                return (
                  <div key={meta.id}>
                    <h4 className={classes.cardTestimonialDescription}>"{mosaic.description}"</h4>
                    <p>Meta ID: {meta.id}, Mosaic Name: {mosaic.id.name}, Mosaic Namespace: {mosaic.id.namespaceId}</p>
                    <p>Mosaic Properties: {mosaic.properties[0].name}: {mosaic.properties[0].value}, {mosaic.properties[1].name}: {mosaic.properties[1].value}, {mosaic.properties[2].name}: {mosaic.properties[2].value}, {mosaic.properties[3].name}: {mosaic.properties[3].value}</p>
                    <h6 className={classes.cardCategory}>Blockchain Address: {mosaic.creator}</h6>
                  </div>
                );
              }
            })
          ) : (
            <h3><img src={blockloader} alt="loading..." /></h3>
          )}
          </p>
        ),
        footerTitle: "11 months ago via RTA"
      }
    ];

    return (
      <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={7}>
          <Card>
            <CardHeader color="primary" icon>
              <h3 style={{color:"#000"}} className={classes.cardIconTitle}>
                Mercedes Benz Maybach S600 <small>2015</small>
            </h3>
            </CardHeader>
            <CardBody>
              <div style={{paddingBottom: "10px"}}>
              <img src={merc} style={{ borderRadius:"10px",width: "99%", boxShadow: "0 4px 8px rgba(0,0,0,0.2), 0 6px 20px rgba(0,0,0,0.2)"}} />
              </div>
            <br />
              <GridContainer style={{ padding: "5px !important"}}>
                <GridItem xs={2} sm={2} md={3} style={{ padding: "5px !important"}}>
                  <img src={merc1} style={{ borderRadius:"15px", width: "100%", boxShadow: "0 4px 8px rgba(0,0,0,0.14), 0 6px 20px rgba(0,0,0,0.14)"}} />
                </GridItem>
                <GridItem xs={2} sm={2} md={3} style={{ padding: "5px !important"}}>
                  <img src={merc2} style={{ borderRadius:"15px",width: "100%", boxShadow: "0 4px 8px rgba(0,0,0,0.14), 0 6px 20px rgba(0,0,0,0.14)"}} />
                </GridItem>
                <GridItem xs={2} sm={2} md={3} style={{ padding: "5px !important"}}>
                  <img src={merc3} style={{ borderRadius:"15px",width: "100%", boxShadow: "0 4px 8px rgba(0,0,0,0.14), 0 6px 20px rgba(0,0,0,0.14)"}} />
                </GridItem>
                <GridItem xs={2} sm={2} md={6} style={{ visibility: "hidden"}}>
                  <img src={merc3} style={{ width: "8%", boxShadow: "0 4px 8px rgba(0,0,0,0.14), 0 6px 20px rgba(0,0,0,0.14)"}} />
                </GridItem>
              </GridContainer>
              <Clearfix />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={5}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={merclogo} alt="..." style={{ width: "100%"}}/>
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>Mercedes Benz</h6>
              <p className={classes.description}>
              The perfection of the S-Class, blended with the exclusivity of the Maybach,
               makes this car the most luxurious and effortlessly superior sedan.
              </p>
              <div style={{ paddingBottom: "40px", paddingTop: "30px"}}>
              <h4 className={classes.cardTitle}>Seller rating</h4>
              <img src={stars} alt="..." style={{ width: "30%"}}/>
            </div>
            <div style={{ paddingBottom: "50px", paddingTop: "0px"}}>
              <h4 className={classes.cardTitle}>Overview</h4>
              <img src={overview} alt="..." style={{ width: "80%", paddingTop: "10px"}}/>
            </div>
            <div style={{borderStyle: "dotted", borderRadius: "25px", borderColor: "#e0e0e0"}}>
              <div style={{display: "flex"}}>
                <div style={{paddingTop: "10px", paddingBottom: "10px", paddingLeft: "20%"}} align="left">
                  <h2 className={classes.cardTitle}><small>AED </small>735,000</h2>
                </div>
                <div style={{paddingTop: "10px", paddingBottom: "10px", paddingLeft: "30px"}} align="right">
                  <Link to={"./checkout"}>
                    <Button color="success" round className={classes.firstButton} >Checkout</Button>
                  </Link>
                </div>
              </div>
            </div>

            </CardBody>
            <div style={{paddingBottom: "10px"}}>
            </div>
          </Card>
        </GridItem>

        <h2>

        </h2>


        <GridItem xs={12} sm={12} md={6}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="warning" text>
                  <CardText color="warning">
                    <h4 className={classes.cardTitleWhite}>OnChain Vehicle Data</h4>
                    <h4 className={classes.cardCategoryWhite}>
                      Fetched from NEM Test Net
                    </h4>
                  </CardText>
                </CardHeader>
                <CardBody>

                {error ? <p>{error.message}</p> : null}
                {!isLoading ? (
                  subnsdata.map(subnsdata => {
                    const { fqn, height, owner } = subnsdata;
                    return (
                      <div key={fqn}>
                        <p>Block Height: {height}</p>
                        <p>Namespace ID: {fqn}</p>
                        <p>Owner Address: {owner}</p>
                        <p>Number of Available Mosaics: {this.state.allmosaicsdata.length}</p>
                      </div>
                    );
                  })
                ) : (
                  <h3><img src={blockloader} alt="loading..." /></h3>
                )}
                <h4 className={classes.cardTitle}>Vehicle VIN: WDDUG7GBXFA122533</h4>
                </CardBody>
              </Card>
            </GridItem>

            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader>
                  <Badge color="warning">Owner - Mosaic</Badge>
                </CardHeader>
                <CardBody>

                <div style={{ marginTop: "-15px"}}>
                  <NavPills
                    color="warning"
                    tabs={[
                      {
                        tabButton: "Testimonial",
                        tabContent: (
                          <span>
                          {error ? <p>{error.message}</p> : null}
                          {!isLoading ? (
                            this.state.allmosaicsdata.map(data => {
                              const { meta, mosaic } = data;
                              if(mosaic.id.name == 'owner')
                              return (
                                <div key={meta.id}>
                                  <h3 style={{ marginTop: "0px", marginBottom: "-5px"}} className={classes.cardTestimonialDescription}>"{mosaic.description}"</h3>
                                  <br />
                                  <h4 className={classes.cardTitle}>Owner: Alec Thompson</h4>
                                  <h6 className={classes.cardCategory}>Blockchain Address: {mosaic.creator}</h6>
                                </div>
                              );
                            })
                          ) : (
                            <h3><img src={blockloader} alt="loading..." /></h3>
                          )}
                          </span>
                        )
                      },
                      {
                        tabButton: "Properties",
                        tabContent: (
                          <span>
                          {error ? <p>{error.message}</p> : null}
                          {!isLoading ? (
                            this.state.allmosaicsdata.map(data => {
                              const { meta, mosaic } = data;
                              if(mosaic.id.name == 'owner')
                              return (
                                <div key={meta.id}>
                                  <h4 className={classes.cardTitle}>{mosaic.properties[0].name}: {mosaic.properties[0].value}</h4>
                                  <h4 className={classes.cardTitle}>{mosaic.properties[1].name}: {mosaic.properties[1].value}</h4>
                                  <h4 className={classes.cardTitle}>{mosaic.properties[2].name}: {mosaic.properties[2].value}</h4>
                                  <h4 className={classes.cardTitle}>{mosaic.properties[3].name}: {mosaic.properties[3].value}</h4>
                                </div>
                              );
                            })
                          ) : (
                            <h3><img src={blockloader} alt="loading..." /></h3>
                          )}
                          </span>
                        )
                      },
                      {
                        tabButton: "Info",
                        tabContent: (
                          <span>
                          {error ? <p>{error.message}</p> : null}
                          {!isLoading ? (
                            this.state.allmosaicsdata.map(data => {
                              const { meta, mosaic } = data;
                              if(mosaic.id.name == 'owner')
                              return (
                                <div key={meta.id}>
                                  <h4 className={classes.cardTitle}>Meta ID: {meta.id}</h4>
                                  <h4 className={classes.cardTitle}>Mosaic Name: {mosaic.id.name}</h4>
                                  <h4 className={classes.cardTitle}>Mosaic Namespace: {mosaic.id.namespaceId}</h4>
                                </div>
                              );
                            })
                          ) : (
                            <h3><img src={blockloader} alt="loading..." /></h3>
                          )}
                          </span>
                        )
                      }

                    ]}
                  />
                </div>

                </CardBody>
              </Card>
            </GridItem>


          </GridContainer>
        </GridItem>

        <GridItem xs={12} sm={12} md={6}>

          <Timeline simple stories={widgetStories} />
        </GridItem>


      </GridContainer>
    </div>
    );
  }
}

export default withStyles(styles)(Charts);
