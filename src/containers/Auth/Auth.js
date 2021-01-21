import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class Auth extends Component {
    state = {
        formIsValid: false,
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

        // const formData = {};
        // for (let controlName in this.state.controls) {
        //     formData[controlName] = this.state.controls[controlName].value;
        // }

        // const order = {
        //     ingredients: this.props.ings,
        //     price: this.props.price,
        //     orderData: formData,
        // }
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value);
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
                    btnType="Success"                    >
                    SUBMIT
                    </Button>
            </form>
        );
        return (
            <div className={classes.ContactData}>
                <h4>
                    LOG IN
                </h4>
                {form}
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password))
    }
}

export default connect(null, mapDispatchToProps)(Auth);