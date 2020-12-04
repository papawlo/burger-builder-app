import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner';

export default class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'you@example.com'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{
                        value: 'ASAP',
                        displayValue: 'ASAP'
                    }],
                    options: [{
                        value: 'cheapest',
                        displayValue: 'cheapest'
                    }],
                    placeholder: 'Your Name'
                },
                value: ''
            }
        },
        loading: false
    }

    orderHandle = (e) => {
        e.preventDefault();
        console.log(this.props.ingredients);
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,

        }

        axios.post('/orders.json', order)
            .then(response => {

                console.log(response);
                this.setState({ loading: false });
                this.props.history.push('/')
            }
            ).catch(error => {
                console.log('error', error)
                this.setState({ loading: false });
            });
    }

    render() {
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
            <form autoComplete="false">

                {formElementsArray.map(formElement => {
                    return <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                    />
                })}

                <Button
                    btnType="Success"
                    clicked={this.orderHandle}>
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
