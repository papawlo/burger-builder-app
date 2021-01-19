import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        formIsValid: false,
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    label: 'Name',
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'you@example.com'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    label: 'Street',
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    label: 'Zip Code',
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    label: 'Country',
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    label: 'Delivery Method',
                    options: [{
                        value: 'ASAP',
                        displayValue: 'ASAP'
                    },
                    {
                        value: 'cheapest',
                        displayValue: 'cheapest'
                    }],
                    placeholder: 'Your Name'
                },
                value: 'ASAP',
                validation: {},
                valid: true
            }
        },
        loading: false
    }


    orderHandle = (e) => {
        e.preventDefault();
        // console.log(this.props.ingredients);
        this.setState({ loading: true });
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
        }
        console.log(order);

        // axios.post('/orders.json', order)
        //     .then(response => {

        //         console.log(response);
        //         this.setState({ loading: false });
        //         this.props.history.push('/')
        //     }
        //     ).catch(error => {
        //         console.log('error', error)
        //         this.setState({ loading: false });
        //     });
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (rules !== null && rules !== undefined) {
            if (rules.required) {
                isValid = value.trim() !== '' && isValid;
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

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    }

    render() {
        // console.log(this.props.ingredients);
        const formElementsArray = [];
        for (const key in this.state.orderForm) {
            if (this.state.orderForm.hasOwnProperty(key)) {
                formElementsArray.push({
                    id: key,
                    config: this.state.orderForm[key]
                });
            }
        }


        let form = (
            <form onSubmit={this.orderHandle}>

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
                    ORDER
                    </Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        } else {

        }
        return (
            <div className={classes.ContactData}>
                <h4>
                    Enter your Contact Data
                </h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);
