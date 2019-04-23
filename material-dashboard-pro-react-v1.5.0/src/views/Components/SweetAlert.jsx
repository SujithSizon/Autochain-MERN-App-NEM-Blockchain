import React from "react";
// react component used to create sweet alerts
import SweetAlert from "react-bootstrap-sweetalert";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import blockloader from "assets/img/block.gif";

// core components
import Heading from "components/Heading/Heading.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import ExtendedTables from "views/Tables/ExtendedTables.jsx";

class SweetAlertPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: null,
      show: false,
      isLoading: true,
      ownrtrns: [],
      isStarted: false,
      error: null
    };
    this.hideAlert = this.hideAlert.bind(this);
    this.successDelete = this.successDelete.bind(this);
    this.cancelDetele = this.cancelDetele.bind(this);
    this.inputConfirmAlert = this.inputConfirmAlert.bind(this);
    this.inputConfirmAlertNext = this.inputConfirmAlertNext.bind(this);
  }
  hellothere(){
    console.log("hello from the other side");
  }

  func3(vin, prtkey, toaddr) {
    fetch('http://localhost:1337/api/ownershipTransfer?vin='+vin+'&prtkey='+prtkey+'&toaddr='+toaddr)
    .then(response => response.json())
    .then(data => {
        this.setState({
          ownrtrns: data,
          isLoading: false,
          isStarted: true
        });
      }
    )
    .catch(error => this.setState({ error, isLoading: false }));
  }



  basicAlert() {
    this.setState({
      alert: (
        <SweetAlert
          style={{ display: "block", marginTop: "-100px" }}
          title="Here's a message!"
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
        />
      )
    });
  }
  titleAndTextAlert() {
    this.setState({
      alert: (
        <SweetAlert
          style={{ display: "block", marginTop: "-100px" }}
          title="Here's a message!"
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.info
          }
        >
          It's pretty, isn't it?
        </SweetAlert>
      )
    });
  }
  successAlert() {
    this.setState({
      alert: (
        <SweetAlert
          success
          style={{ display: "block", marginTop: "-100px" }}
          title="Good job!"
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
        >
          You clicked the button!
        </SweetAlert>
      )
    });
  }
  htmlAlert() {
    this.setState({
      alert: (
        <SweetAlert
          style={{ display: "block", marginTop: "-100px" }}
          title="HTML example"
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
        >
          You can use <b>bold</b> text,{" "}
          <a href="https://www.creative-tim.com/">links</a> and other HTML tags
        </SweetAlert>
      )
    });
  }
  warningWithConfirmMessage() {
    this.setState({
      alert: (
        <SweetAlert
          warning
          style={{ display: "block", marginTop: "-100px" }}
          title="Are you sure?"
          onConfirm={() => this.successDelete()}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
          cancelBtnCssClass={
            this.props.classes.button + " " + this.props.classes.danger
          }
          confirmBtnText="Yes, delete it!"
          cancelBtnText="Cancel"
          showCancel
        >
          You will not be able to recover this imaginary file!
        </SweetAlert>
      )
    });
  }
  warningWithConfirmAndCancelMessage() {
    this.setState({
      alert: (
        <SweetAlert
          warning
          style={{ display: "block", marginTop: "-100px" }}
          title="Are you sure?"
          onConfirm={() => this.successDelete()}
          onCancel={() => this.cancelDetele()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
          cancelBtnCssClass={
            this.props.classes.button + " " + this.props.classes.danger
          }
          confirmBtnText="Yes, delete it!"
          cancelBtnText="Cancel"
          showCancel
        >
          You will not be able to recover this imaginary file!
        </SweetAlert>
      )
    });
  }
  autoCloseAlert() {
    this.setState({
      alert: (
        <SweetAlert
          style={{ display: "block", marginTop: "-100px" }}
          title="Auto close alert!"
          onConfirm={() => this.hideAlert()}
          showConfirm={false}
        >
          I will close in 2 seconds.
        </SweetAlert>
      )
    });
    setTimeout(this.hideAlert, 2000);
  }
  inputAlert() {
    this.setState({
      alert: (
        <SweetAlert
          input
          showCancel
          style={{ display: "block", marginTop: "-100px" }}
          title="Enter your Private Key"
          onConfirm={e => this.inputConfirmAlert(e)}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.info
          }
          cancelBtnCssClass={
            this.props.classes.button + " " + this.props.classes.danger
          }
        />
      )
    });
  }

  inputConfirmAlert(e) {
    this.setState({ alert: e });
    setTimeout(this.inputConfirmAlertNext, 200);
  }
  inputConfirmAlertNext() {
    const inputValue = this.state.alert;
    this.setState({
      alert: (
        <SweetAlert
          style={{ display: "block", marginTop: "-100px" }}
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={ this.props.classes.button + " " + this.props.classes.info }
          title={
            <p>
              Transaction Submitted to the Blockchain
              {this.func3("wddug7gbxfa122533", inputValue, "TAWP5WVQCA7IDVRROJNNORFB7WQVHUAH6Y7J63QW")}
            </p>
          }
        />
      )
    });
  }
  successDelete() {
    this.setState({
      alert: (
        <SweetAlert
          success
          style={{ display: "block", marginTop: "-100px" }}
          title="Deleted!"
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
        >
          Your imaginary file has been deleted.
        </SweetAlert>
      )
    });
  }
  cancelDetele() {
    this.setState({
      alert: (
        <SweetAlert
          danger
          style={{ display: "block", marginTop: "-100px" }}
          title="Cancelled"
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
        >
          Your imaginary file is safe :)
        </SweetAlert>
      )
    });
  }
  hideAlert() {
    this.setState({
      alert: null
    });
  }
  render() {
    const { classes } = this.props;
    const {isLoading, subnsdata, allmosaicsdata, error, isStarted } = this.state;
    return (
      <div>

        {this.state.alert}
        <GridContainer>

            <GridItem xs={6}>
              <div className={classes.left}>
                {error ? <p>{error.message}</p> : null}
                {!isLoading ? (
                  this.state.ownrtrns.map(data => {
                    console.log(data);
                    const { code, message, transactionHash, type } = data;
                    return (
                      <div key={code}>
                        <h5>Code: {code}, Type: {type}</h5>
                        <h5>Status: {message}</h5>
                        <h5>Transaction Hash: {transactionHash.data}</h5>
                      </div>
                    );
                  })
                ) : (
                  <img style={{width:"25%", marginTop:"-70px", marginLeft:"-30px"}} src={blockloader} alt="loading..." />
                )}
              </div>
            </GridItem>

            <GridItem xs={6}>
                <div style={{marginTop:"45px"}} className={classes.right}>
                  <Button color="rose" onClick={this.inputAlert.bind(this)}> Buy Now </Button>
                </div>
            </GridItem>

        </GridContainer>



      </div>
    );
  }
}

export default withStyles(sweetAlertStyle)(SweetAlertPage);
