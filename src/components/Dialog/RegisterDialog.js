import React, { Component } from "react";
import { connect } from "react-redux";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@material-ui/core";

import grey from "@material-ui/core/colors/grey";
import Username from "../FormField/Username";
import Email from "../FormField/Email";
import Password from "../FormField/Password";
import ConfirmPassword from "../FormField/ConfirmPassword";

import { register } from "../../redux/user/actions";

class RegisterDialog extends Component {
    state = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        errors: {},
        loading: false,
    };
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };
    handleSubmit = (e) => {
        e.preventDefault();
        const { username, email, password, confirmPassword } = this.state;
        this.setState({ errors: {}, loading: true }, () => {
            this.props
                .register(username, email, password, confirmPassword)
                .then(() => this.handleClose())
                .catch((e) => {
                    if (e.error && e.error.errors) {
                        this.setState({
                            errors: e.error.errors,
                            loading: false,
                        });
                    } else {
                        // unknown error...
                        console.log(e);
                    }
                });
        });
    };
    handleClose = () => {
        this.setState({
            errors: {},
            loading: false,
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        });
        this.props.closeDialog();
    };
    render() {
        const { open } = this.props;
        const {
            errors,
            username,
            email,
            password,
            confirmPassword,
            loading,
        } = this.state;
        const isUnLocked =
            username !== "" &&
            email !== "" &&
            password !== "" &&
            confirmPassword !== "" &&
            !loading;
        return (
            <Dialog aria-labelledby="login-dialog-title" open={open}>
                <form onSubmit={this.handleSubmit}>
                    <DialogTitle id="login-dialog-title">
                        Login to create palettes
                    </DialogTitle>
                    <DialogContent>
                        <Email
                            color={grey[500]}
                            handleChange={this.handleChange}
                            value={email}
                            errorMsg={errors.email}
                        />
                        <Username
                            color={grey[500]}
                            handleChange={this.handleChange}
                            value={username}
                            errorMsg={errors.username}
                        />
                        <Password
                            name="password"
                            label="Password"
                            color={grey[500]}
                            handleChange={this.handleChange}
                            value={password}
                            errorMsg={errors.password}
                        />
                        <ConfirmPassword
                            name="confirmPassword"
                            password="Confirm Password"
                            color={grey[500]}
                            handleChange={this.handleChange}
                            value={confirmPassword}
                            errorMsg={errors.confirmPassword}
                        />
                    </DialogContent>
                    <DialogActions style={{ margin: "10px 20px 20px 20px" }}>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={!isUnLocked}
                        >
                            Register
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }
}

export default connect(null, { register })(RegisterDialog);
