import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';


class Auth extends Component {
    state = {
        formIsValid: false,
        isSignup: true,
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'email address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    label: 'Password',
                    type: 'password',
                    placeholder: 'password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8
                },
                valid: false,
                touched: false
            },
        }
    }


    checkValidity(value, rules) {
        let isValid = true;
        if (rules !== null && rules !== undefined) {
            if (rules.required) {
                isValid = value.trim() !== '' && isValid;
            }
            if (rules.isEmail) {
                isValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value.trim()) && isValid;
            }
            if (rules.minLength) {
                isValid = value.length >= rules.minLength && isValid;
            }
            if (rules.maxLength) {
                isValid = value.length <= rules.maxLength && isValid;
            }
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls
        };
        const updatedControlName = {
            ...updatedControls[controlName]
        }
        updatedControlName.value = event.target.value;
        updatedControlName.valid = this.checkValidity(updatedControlName.value, updatedControlName.validation);
        updatedControlName.touched = true;
        updatedControls[controlName] = updatedControlName;
        let formIsValid = true;
        for (let controlName in updatedControls) {
            formIsValid = updatedControls[controlName].valid && formIsValid;
        }
        this.setState({ controls: updatedControls, formIsValid: formIsValid });
    }

    submitHandler = (e) => {
        e.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup }
        })
    }
    render() {
        // console.log(this.props.ingredients);
        const formElementsArray = [];
        for (const key in this.state.controls) {
            if (this.state.controls.hasOwnProperty(key)) {
                formElementsArray.push({
                    id: key,
                    config: this.state.controls[key]
                });
            }
        }
        let form = (
            <form onSubmit={this.submitHandler}>

                {formElementsArray.map(formElement => {
                    return <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                })}

                <Button
                    disabled={!this.state.formIsValid}
                    btnType="Success">
                    SUBMIT
                    </Button>
            </form>

        );

        if (this.props.loading) {
            form = <Spinner />;
        }


        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p className={classes.ErrorMessage}>
                    {this.props.error.message}
                </p>
            )
        }
        return (
            <div className={classes.Auth}>
                {errorMessage}
                <h4>
                    LOG IN
                </h4>

                {form}
                <hr />
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType="Info">
                    SWITCH TO {this.state.isSignup ? 'SIGN IN' : 'SIGN UP'}
                </Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);