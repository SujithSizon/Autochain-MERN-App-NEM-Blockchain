import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Checkbox from "@material-ui/core/Checkbox";
import blockloader from "assets/img/block.gif";

// material-ui icons
import Assignment from "@material-ui/icons/Assignment";
import Person from "@material-ui/icons/Person";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";
import Remove from "@material-ui/icons/Remove";
import Add from "@material-ui/icons/Add";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";

import product1 from "assets/img/product1.jpg";
import product2 from "assets/img/product2.jpg";
import product3 from "assets/img/product3.jpg";

// @material-ui/core components
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
// import ContentCopy from "@material-ui/icons/ContentCopy";
import Store from "@material-ui/icons/Store";
// import InfoOutline from "@material-ui/icons/InfoOutline";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Refresh from "@material-ui/icons/Refresh";

import Place from "@material-ui/icons/Place";
import ArtTrack from "@material-ui/icons/ArtTrack";
import Language from "@material-ui/icons/Language";

// core components

import CardFooter from "components/Card/CardFooter.jsx";
import SweetAlert from "react-bootstrap-sweetalert";
import notificationsStyle from "assets/jss/material-dashboard-pro-react/views/notificationsStyle.jsx";
import noticeModal1 from "assets/img/card-1.jpeg";
import noticeModal2 from "assets/img/card-2.jpeg";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import AddAlert from "@material-ui/icons/AddAlert";
import {Link} from "react-router-dom";

import Badge from "components/Badge/Badge.jsx";
import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts";
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";
import priceImage1 from "assets/img/card-2.jpeg";
import priceImage2 from "assets/img/card-3.jpeg";
import priceImage3 from "assets/img/card-1.jpeg";
import merc from "assets/img/new/cars/merc.jpeg";
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";


import SweetAlertPage from "../Components/SweetAlert.jsx"

class ExtendedTables extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: [],
      isLoading: true,
      subnsdata: [],
      allmosaicsdata: [],
      error: null
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  async componentDidMount() {
      await this.func2();
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



  handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  }


  render() {

    const { checked, isLoading, subnsdata, allmosaicsdata, error } = this.state;

    const { classes } = this.props;
    const fillButtons = [
      { color: "info", icon: Person },
      { color: "success", icon: Edit },
      { color: "danger", icon: Close }
    ].map((prop, key) => {
      return (
        <Button color={prop.color} className={classes.actionButton} key={key}>
          <prop.icon className={classes.icon} />
        </Button>
      );
    });
    const simpleButtons = [
      { color: "info", icon: Person },
      { color: "success", icon: Edit },
      { color: "danger", icon: Close }
    ].map((prop, key) => {
      return (
        <Button
          color={prop.color}
          simple
          className={classes.actionButton}
          key={key}
        >
          <prop.icon className={classes.icon} />
        </Button>
      );
    });
    const roundButtons = [
      { color: "info", icon: Person },
      { color: "success", icon: Edit },
      { color: "danger", icon: Close }
    ].map((prop, key) => {
      return (
        <Button
          round
          color={prop.color}
          className={classes.actionButton + " " + classes.actionButtonRound}
          key={key}
        >
          <prop.icon className={classes.icon} />
        </Button>
      );
    });



    return (
      <GridContainer>



        <GridItem xs={12}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <Card product className={classes.cardHover}>
                <CardHeader>
                <Badge color="info">Owner Mosaic Transfer</Badge>
                  <h3>From</h3>
                </CardHeader>
                <CardBody>


                {error ? <p>{error.message}</p> : null}
                {!isLoading ? (
                  this.state.allmosaicsdata.map(data => {
                    const { meta, mosaic } = data;
                    if(mosaic.id.name == 'owner')
                    return (
                      <div style={{ fontSize: "11px", color: "#808080", marginTop: ""}} key={meta.id}>
                        <h5>Current Owner: Alec Thompson</h5>
                        <h5>Namespace: {mosaic.id.namespaceId}</h5>
                        <h5>Public Key: {mosaic.creator}</h5>
                      </div>
                    );
                  })
                ) : (
                  <h3><img src={blockloader} alt="loading..." /></h3>
                )}


                </CardBody>
                <CardFooter product>
                  <div className={classes.price}>
                    <h4 style={{ fontSize: "12px", color: "#505050"}}>Vehicle VIN: WDDUG7GBXFA122533</h4>
                  </div>
                  <div className={`${classes.stats} ${classes.productStats}`}>
                    <Place /> Dubai
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
            <Card product className={classes.cardHover}>
              <CardHeader>
              <Badge color="info">Owner Mosaic Transfer</Badge>
                <h3>To</h3>
              </CardHeader>
              <CardBody>

              <div style={{ fontSize: "11px", color: "#808080", marginTop: ""}} >
              <h5>Sujith Sizon</h5>
              <h5>Namespace: autochainv2.wddug7gbxfa122533</h5>
              <h5>Public Key: 9f66e25cfd313bf8a88403225aa434c0ca4f77c13447fd977ea202db6bc5e41d</h5>
              </div>

              </CardBody>
              <CardFooter product>
                <div className={classes.price}>
                  <h4 style={{ fontSize: "12px", color: "#505050"}}>Transaction Fee: 1 XEM</h4>
                </div>
                <div className={`${classes.stats} ${classes.productStats}`}>
                  <Place /> Dubai
                </div>
              </CardFooter>
            </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card product className={classes.cardHover}>
                <CardHeader>
                  <h4>Invoice #007612</h4>
                </CardHeader>
                <CardBody>
                  <div style={{ fontSize: "11px", color: "#808080"}}>
                    <h5><strong>Order ID: </strong>4F3S8J</h5>
                    <h5><strong>Payment Due: </strong>12/22/2018</h5>
                    <h5><strong>Account: </strong>968-34567</h5>
                  </div>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <Assignment />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Payment details</h4>
            </CardHeader>
            <CardBody>
              <Table
                striped
                tableHead={[
                  "#",
                  "",
                  "Product",
                  "Serial #",
                  "Description",
                  "Subtotal"
                ]}
                tableData={[
                  [
                    "1",
                    "",
                  "2015 Mercedes Maybach",
                    "455-981-221",
                    "The perfection of the S-Class, blended with the exclusivity of the Maybach, makes the Mercedes-Maybach S-Class the most luxurious and effortlessly superior sedan.The Mercedes-Maybach S-Class.",
                    "735,000 AED",
                  ],
                  [
                    "2",
                    "",
                  "Insurance Plan",
                    "247-925-726",
                    "Renew insurance plan for one year. Provider: Car Insurance Corp.",
                    "12,000 AED",
                  ],
                  [
                    "3",
                    "",
                  "Registration Fee",
                    "735-845-642",
                    "Renew Government Vehicle Registration for one year. Provider: RTA",
                    "3000 AED",
                  ],

                  { total: true, colspan: "4", amount: "750,000" }
                ]}
                customCellClasses={[
                  classes.center,
                  classes.right,
                  classes.right
                ]}
                customClassesForCells={[0, 5, 6]}
                customHeadCellClasses={[
                  classes.center,
                  classes.right,
                  classes.right
                ]}
                customHeadClassesForCells={[0, 5, 6]}
              />

              <SweetAlertPage />


            </CardBody>
          </Card>
        </GridItem>

        <GridItem xs={12}>
          <GridContainer>
            <GridItem md={4}>
          <Card plain>
            <CardHeader>
              <h4 className={classes.cardIconTitle}>
                Amount Due<small>
                  {" "}
                  - 12/22/2018
                </small>
              </h4>
            </CardHeader>
            <CardBody plain>
              <Table
                hover
                tableData={[
                  ["Subtotal:", "750,000 AED"],
                  ["VAT(5%)", "2950 AED"],
                  ["Total", "752, 950 AED"]
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>

          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(extendedTablesStyle)(ExtendedTables);
