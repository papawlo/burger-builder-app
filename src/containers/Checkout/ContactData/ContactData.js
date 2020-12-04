import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css'
import axios from '../../../axios-order'
import Spinner from '../../../components/UI/Spinner/Spinner';

export default class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
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
            customer: {
                name: 'Djow Silva',
                address: {
                    street: 'Test Street',
                    zipCode: '3999384',
                    country: 'Ireland'
                },
                email: 'teste@teste.com',
            },
            deliveryMethod: 'ASAP'
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
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your name" />
                <input className={classes.Input} type="email" name="email" placeholder="Your email" />
                <input className={classes.Input} type="text" name="street" placeholder="Street" />
                <input className={classes.Input} type="text" name="postalCode" placeholder="Posta Code" />
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
