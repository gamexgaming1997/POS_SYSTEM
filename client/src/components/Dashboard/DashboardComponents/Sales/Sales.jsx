import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaPlus, FaMinus } from 'react-icons/fa';

// import api 
import { add_sales } from '../../../../api/api.js';

const Sales = () => {

    // get products brandname,genericname,description/category,originalprice,sellingprice and multiply both origina
    const _get_products = useSelector(state => state.reducer.store);

    //hooks
    const [_get_product_id, set_Get_Product_ID] = useState();
    const [Localstorage] = useState(JSON.parse(localStorage.getItem('Administrator'))); // admin local
    const [counter, setCounter] = useState(0); // quantity done

    //check if found ID
    const check_id = useSelector(state => _get_product_id ? state.reducer.store.map(res => res.products.find(val => val._id === _get_product_id)) : state);

    // const [prod_constructor, setProd_Constructor] = useState({
    //     product_name: '',
    //     generic_name: '',
    //     description: '',
    //     quantity: 0,
    //     amount: '',
    //     profit: '',
    // });

    const add_sales_onHandlerSubmit = (e) => {
        e.preventDefault();

        const quantity_multiplier = check_id[0]?.selling_price * counter;
        const multiply_original_price = check_id[0]?.original_price * counter;
        const get_total_profit = quantity_multiplier - multiply_original_price;

        console.log(quantity_multiplier, multiply_original_price);

        if (check_id) {
            add_sales(
                Localstorage?.result?._id,
                Localstorage?.token,
                check_id[0]?.brand_name,
                check_id[0]?.generic_name,
                check_id[0]?.category_description,
                counter,
                quantity_multiplier,
                get_total_profit,
            )
        }

    }

    // fix tommorow add object into use state array 

    return (
        <div className='Sales'>
            <div className='innerContainer'>
                <div className='page-title-container'>
                    <span className='text'>
                        Sales
                    </span>
                </div>
                <div className='select-container'>
                    <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={(e) => {
                            set_Get_Product_ID(e.target.value)
                        }}
                    >
                        <option defaultValue="Select product">Select product</option>
                        {_get_products && Object.keys(_get_products[0].products).map((key, value) => {
                            return (
                                <option value={_get_products[0]?.products[value]?._id} key={_get_products[0]?.products[value]?._id}>{_get_products[0]?.products[value]?.brand_name}</option>
                            )
                        })}
                    </select>
                    <div className='counter-form-container'>
                        <button className='decrement-btn'
                            onClick={() => {
                                if (counter <= check_id[0]?.quantity) {
                                    setCounter(state => state - 1)
                                    if (counter <= 0) {
                                        setCounter(0)
                                    }
                                }
                            }}
                        >
                            <FaMinus />
                        </button>
                        <div className='count-container'>
                            {counter}
                        </div>
                        <button className='increment-btn'
                            onClick={() => {
                                if (counter >= check_id[0]?.quantity) {
                                    setCounter(check_id[0]?.quantity)
                                }
                                else if (counter <= check_id[0]?.quantity) {
                                    setCounter(state => state + 1)
                                }
                            }}
                        >
                            <FaPlus />
                        </button>
                    </div>

                    <form onSubmit={add_sales_onHandlerSubmit}>
                        <button className='addBtn'
                            type='submit'
                        >
                            Add
                        </button>
                    </form>
                </div>
                <div className='table-container'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Product_Name</th>
                                <th scope="col">Generic_Name</th>
                                <th scope="col">Category/Description</th>
                                <th scope="col">Qty</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Profit</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='btn-submit-container'>
                    <button className='btnSubmit'>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Sales;