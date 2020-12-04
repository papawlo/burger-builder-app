import React from 'react'
import classes from './Order.css'


const Order = (props) => {

    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push(
            {

                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        );
    }
    const ingredientOutput = ingredients.map(ig => {
        return (
            <li
                key={ig.name}
                style={{ textTransform: 'capitalize' }}
            >
                { ig.name} ({ ig.amount})
            </li >

        )
    })

    return (
        <div className={classes.Order} key={props.id}>
            <p>Ingredients:
            </p>
            <ul>
                {ingredientOutput}
            </ul>
            <p>Price:
                <strong>
                    {Intl.NumberFormat('en-ie', { style: 'currency', currency: 'EUR' }).format(props.price)}
                </strong>
            </p>
        </div>
    )
}

export default Order
