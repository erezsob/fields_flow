import React, { Component } from "react";
import ReactDOM from "react-dom";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import _ from "lodash";

import { calcFinalPrice, calcPurchase, calcMargin, calcNet } from "./utils";
import "./styles.css";

const cleanEmpty = obj => _.pickBy(obj, Boolean);
const isTrue = obj => Object.values(obj).filter(x => x === true).length;

const generateNewState = (newVal, field, state) => {
  const newState = cleanEmpty({ ...state, [`${field}`]: newVal });
  const obj = {
    purchase: calcPurchase(newState),
    // margin: calcMargin(newState),
    net: calcNet(newState),
    final: calcFinalPrice(newState)
  };
  obj[field] = newVal;
  console.log("newState", obj);
  return obj;
};

const handleChange = (e, field, state, changeState) => {
  const newState = generateNewState(e.target.value, field, state);
  changeState(newState);
};

const NumberField = props => <TextField type="number" {...props} />;

const PurchasePrice = ({ fields, setState, focused, ...rest }) => {
  const newFields = cleanEmpty(fields);
  return (
    <NumberField
      value={fields.purchase}
      onChange={e => handleChange(e, "purchase", newFields, setState)}
      placeholder="Purchase Price"
      {...rest}
    />
  );
};

const Margin = ({ fields, setState, ...rest }) => {
  const newFields = cleanEmpty(fields);
  return (
    <NumberField
      value={fields.margin}
      onChange={e => handleChange(e, "margin", newFields, setState)}
      placeholder="Margin (percent)"
      {...rest}
    />
  );
};

const Net = ({ fields, setState, ...rest }) => {
  const newFields = cleanEmpty(fields);
  return (
    <NumberField
      value={fields.net}
      onChange={e => handleChange(e, "net", newFields, setState)}
      placeholder="Net"
      {...rest}
    />
  );
};

const Tax = ({ fields, setState, ...rest }) => {
  const newFields = cleanEmpty(fields);
  return (
    <NumberField
      value={fields.tax}
      onChange={e => handleChange(e, "tax", newFields, setState)}
      placeholder="Tax (percent)"
      {...rest}
    />
  );
};

const FinalPrice = ({ fields, setState, ...rest }) => {
  const newFields = cleanEmpty(fields);
  return (
    <NumberField
      value={fields.final}
      onChange={e => handleChange(e, "final", newFields, setState)}
      placeholder="Final Price"
      {...rest}
    />
  );
};

const styles = {
  root: {
    display: "flex",
    height: "95vh",
    justifyContent: "space-evenly",
    alignItems: "center"
  }
};

class App extends Component {
  state = {
    purchase: "",
    margin: "",
    net: "",
    tax: "",
    final: "",
    purchaseFocus: false,
    marginFocus: false,
    taxFocus: false,
    netFocus: false,
    finalFocus: false
  };

  handleChange = field => (e, calculatedValue) => {
    // console.log("field", field);
    // console.log("e", e.target.value);
    this.setState({ [`${field}`]: e.target.value }, () => {
      console.log("state after", this.state);
    });
  };

  changeState = obj => {
    this.setState(
      state => ({ ...state, ...obj }),
      () => {
        console.log("state after", this.state);
      }
    );
  };

  handleFocus = (field, e) => {
    this.setState(({ [`${field}Focus`]: qwer }) => ({
      [`${field}Focus`]: !qwer
    }));
    e && this.handleChange(field)(e);
  };

  render() {
    const {
      purchaseFocus,
      marginFocus,
      netFocus,
      taxFocus,
      finalFocus
    } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <PurchasePrice fields={this.state} setState={this.changeState} />
        <Margin fields={this.state} setState={this.changeState} />
        <Net fields={this.state} setState={this.changeState} />
        <Tax fields={this.state} setState={this.changeState} />
        <FinalPrice fields={this.state} setState={this.changeState} />
      </div>
    );
  }
}

const StyledApp = withStyles(styles)(App);
const rootElement = document.getElementById("root");
ReactDOM.render(<StyledApp />, rootElement);
