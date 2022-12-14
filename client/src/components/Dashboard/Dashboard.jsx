import React from 'react';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import {
    FaTimes,
    FaBars,
    FaTachometerAlt,
    FaShoppingCart,
    FaTable,
    FaUser,
    FaTruck,
    FaChartBar,
    FaSignOutAlt,
    FaChartLine,
    FaStore
} from 'react-icons/fa';

// Dashboard Components
import HomeDashboard from './DashboardComponents/Home/HomeDashboard';
import Sales from './DashboardComponents/Sales/Sales';
import Products from './DashboardComponents/Products/Product';
import Inventory from './DashboardComponents/Inventory/Inventory';
import Customer from './DashboardComponents/Customer/Customer';
import Supplier from './DashboardComponents/Supplier/Supplier';
import SalesReport from './DashboardComponents/SalesReport/SalesReport';
import Activity from './DashboardComponents/Activity/Activity';

// admin settings component
import AdminSettings from './DashboardComponents/AdminSettings/AdminSettings';

// action thunk 
// import { add_supplier } from '../../controllers/actions.js';
import { add_supplier, edit_supplier, add_customer, edit_customer, add_products, edit_products, edit_admin } from '../../api/api.js';

// brand img
import brand from '../../assets/img/brand.png';
import newlogo from '../../assets/img/newlogo.png'

import '../../scss/_Dashboard.scss';

const Dashboard = () => {

    const [open_modal_admin_setting, setOpen_Modal_Admin_Setting] = useState(false);
    // const [open_modal_admin_setting_2, setOpen_Modal_Admin_Setting_2] = useState(false);
    const [open_modal_supplier, setOpen_Modal_Supplier] = useState(false);
    const [open_modal_customer, setOpen_Modal_Customer] = useState(false);
    const [open_modal_products, setOpen_Modal_Products] = useState(false);
    const [check_if_edit, setCheck_If_Edit] = useState(false);
    // const [check_if_add, setCheck_If_Add] = useState(false);
    const [getId] = useState(); // get id of product
    const [increment, setIncrement] = useState(0); // increment point system
    // const [dummy_increment, setDummy_increment] = useState(0);
    const [modaltitle, setModalTitle] = useState(''); // modal title 

    // const findSupplier = useSelector(state => getId ? state.reducer?.store?.map(val => val.supplier.find(sup => sup._id === getId)) : null);
    // const findCustomer = useSelector(state => getId ? state.reducer?.store?.map(val => val.customer.find(sup => sup._id === getId)) : null);

    const [targetSales, setTargetSales] = useState({
        january: 4000,
        february: 3500,
        march: 3500,
        april: 4800,
        may: 2800,
        june: 1200,
        july: 5500,
        august: 2030,
        september: 2200,
        october: 3200,
        november: 4200,
        december: 3100,
    })

    // call to navigate on routes
    const navigate = useNavigate();

    // action call dispatch
    const dispatch = useDispatch();

    //hooks 
    const [Component, setComponent] = useState(<HomeDashboard targetSales={targetSales} setTargetSales={setTargetSales} />);
    const [tabswitch, setTabswitch] = useState(false);
    const [expire_date, setExpire_Date] = useState();
    const [get_parsed_date, setGet_Parsed_Date] = useState();

    // get custormer 
    const get_admin = useSelector(state => state.reducer.store);

    // get supplier for select 
    const get_suppliers = useSelector(state => state.reducer.store);

    // console.log(get_suppliers[0]);
    // const [time, setTime] = useState();
    const [nav, setNav] = useState('/ Dashboard');

    // localstorage 
    const [storage] = useState(JSON.parse(localStorage.getItem('Administrator')));

    //supplier
    const [supplier, setSupplier] = useState({
        _id: storage?.result?._id,
        token: storage?.token,
        identifier: uuidv4().split('-')[0],
        supplier_name: '',
        address: '',
        contact_person: '',
        contact_number: '',
        note: ''
    });

    const [customer, setCustomer] = useState({
        _id: storage?.result?._id,
        token: storage?.token,
        identifier: uuidv4().split('-')[0],
        fullname: '',
        address: '',
        contact_number: '',
        product_name: '',
        total: '',
        note: '',
        due_date: ''
    });

    const [products, setProducts] = useState({
        _id: storage?.result?._id,
        token: storage?.token,
        identifier: uuidv4().split('-')[0],
        brand_name: '',
        variant: '',
        category_description: '',
        supplier: '',
        added_date: '',
        // expiration_date: get_parsed_date,
        // expiration_date_js_format: '',
        original_price: '',
        selling_price: '',
        quantity: ''
    })

    const [changeuser, setChangeuser] = useState({
        admin: '',
        old_admin: '',
        password: '',
        old_password: ''
    })

    // const [changepass, setChangepass] = useState({
    //     password: '',
    //     newpassword: '',
    //     repeatpassword: ''
    // })

    const _date_month = new Date().getMonth();
    const _date_date = new Date().getDate();
    const _date_year = new Date().getFullYear();

    // redux storage
    // const redux_storage = useSelector(state => state.reducer.store);

    const _tabs = useRef(null);
    const nav_1 = useRef(null);
    const nav_2 = useRef(null);
    const nav_3 = useRef(null);
    const rended_tag = useRef(null);

    const nav_tab = useRef(null);

    //side effect
    useEffect(() => {
        if (tabswitch) {
            _tabs.current.style.width = '100vw';
            nav_1.current.style.width = '100vw';
            nav_2.current.style.width = '100vw';
            nav_3.current.style.width = '100vw';
            rended_tag.current.style.width = '100vw';
            nav_tab.current.style.transform = 'translateX(-13vw)';
        } else {
            _tabs.current.style.width = '87vw';
            nav_1.current.style.width = '87vw';
            nav_2.current.style.width = '87vw';
            nav_3.current.style.width = '87vw';
            rended_tag.current.style.width = '87vw';
            nav_tab.current.style.transform = 'translateX(0vw)';
        }
    }, [tabswitch]);

    useEffect(() => {
        if (check_if_edit) {
            setChangeuser({
                ...changeuser,
                admin: '',
                old_admin: get_admin[0]?.admin,
                password: ''
            })
        }
    }, [check_if_edit])

    // useEffect(() => {
    // }, [products])

    const add_supplier_onHandleSubmit = (e) => {

        e.preventDefault();

        console.log(supplier)

        if (supplier._id && supplier.token && supplier.supplier_name && supplier.address && supplier.contact_number && supplier.contact_person && supplier.note) {
            add_supplier(supplier);
            dispatch({ type: 'ADD_SUPPLIER', payload: supplier });
            setOpen_Modal_Supplier(state => !state)

            navigate(0);

        }

    }

    const edit_supplier_onHandleSubmit = (e) => {
        e.preventDefault();

        console.log(supplier);

        if (supplier) {
            edit_supplier(supplier);
            setOpen_Modal_Supplier(state => !state)

            window.location.reload();
        }

    }

    const add_customer_onHandleSubmit = (e) => {
        e.preventDefault();

        if (customer) {

            console.log(customer)

            add_customer(customer);

            setOpen_Modal_Customer(state => !state)

            navigate(0);
        }

    }

    const edit_customer_onHandleSubmit = (e) => {
        e.preventDefault();

        if (customer) {

            edit_customer(
                customer._id,
                customer.token,
                customer.identifier,
                customer.fullname,
                customer.address,
                customer.contact_number,
                customer.product_name,
                customer.total,
                customer.note,
                customer.due_date,
                increment
            );

            setOpen_Modal_Customer(state => !state)

            window.location.reload()

        }
    }

    const add_product_onHandleSubmit = (e) => {
        e.preventDefault();

        if (products && expire_date) {
            let new_date = new Date(expire_date)?.toISOString()
            let parsed_date = Date.parse(new_date);
            // let submit_date = Math.floor((parsed_date - Date.now()) / (1000 * 60 * 60 * 24))
            setGet_Parsed_Date(parsed_date)

            add_products(products, parsed_date)
        }

        setOpen_Modal_Products(state => !state)

        navigate(0);

    }

    const edit_products_onHandleSubmit = (e) => {
        e.preventDefault();

        console.log(products);

        if (products) edit_products(products);

        setOpen_Modal_Products(state => !state)

        navigate(0);
    }

    return (
        <div className='Dashboard'>
            <nav className='nav-tab' ref={nav_tab}>
                <div className='titleContainer'>
                    <img src={newlogo} className='brand' alt='brand logo' />
                </div>
                <div className='navigation'>
                    <button className='category'
                        onClick={() => {
                            setComponent(<HomeDashboard
                                targetSales={targetSales}
                                setTargetSales={setTargetSales}
                            />)
                            setNav('/Dashboard')
                            navigate('/Dashboard')
                        }}
                    >
                        <FaTachometerAlt className='meter' />
                        <span className='text'>
                            Dashboard
                        </span>
                    </button>
                    <button className='btn-1' style={{
                        marginTop: '1.5vh'
                    }}
                        onClick={() => {
                            setComponent(<Sales setComponent={setComponent} setNav={setNav} />)
                            setNav('/Sales')
                            navigate('/Sales')
                        }}
                    >
                        <FaShoppingCart className='cartIcon' />
                        <span className='text'>
                            Sales
                        </span>
                    </button>
                    <button className='btn-1'
                        onClick={() => {
                            setComponent(<Products
                                setOpen_Modal_Products={setOpen_Modal_Products}
                                setCheck_If_Edit={setCheck_If_Edit}
                                setModalTitle={setModalTitle}
                                setProducts={setProducts}
                                products={products}
                            />)
                            setNav('/Products')
                            navigate('/Products')
                        }}
                    >
                        <FaTable className='tableIcon' />
                        <span className='text'>
                            Products
                        </span>
                    </button>
                    <button className='btn-1'
                        onClick={() => {
                            setComponent(<Inventory />)
                            setNav('/Inventory')
                            navigate('/Inventory')
                        }}
                    >
                        <FaStore className='chartIcon' />
                        <span className='text'>
                            Inventory
                        </span>
                    </button>
                    <button className='btn-1'
                        onClick={() => {
                            setComponent(<Customer
                                setOpen_Modal_Customer={setOpen_Modal_Customer}
                                setCheck_If_Edit={setCheck_If_Edit}
                                setModalTitle={setModalTitle}
                                setCustomer={setCustomer}
                                customer={customer}
                                setIncrement={setIncrement}
                            />)
                            setNav('/Customer')
                            navigate('/Customer')
                        }}
                    >
                        <FaUser className='personIcon' />
                        <span className='text'>
                            Customer
                        </span>
                    </button>
                    <button className='btn-1'
                        onClick={() => {
                            setComponent(<Supplier
                                setOpen_Modal_Supplier={setOpen_Modal_Supplier}
                                setCheck_If_Edit={setCheck_If_Edit}
                                setModalTitle={setModalTitle}
                                setSupplier={setSupplier}
                                supplier={supplier}
                                getId={getId}
                            />)
                            setNav('/Supplier')
                            navigate('/Supplier')
                        }}
                    >
                        <FaTruck className='truckIcon' />
                        <span className='text'>
                            Supplier
                        </span>
                    </button>
                    <button className='btn-1'
                        onClick={() => {
                            setComponent(<SalesReport />)
                            setNav('/Report')
                            navigate('/Report')
                        }}
                    >
                        <FaChartBar className='chartIcon' />
                        <span className='text'>
                            Sales report
                        </span>
                    </button>
                    <button className='btn-1'
                        onClick={() => {
                            setComponent(<Activity />)
                            setNav('/Activity')
                            navigate('/Activity')
                        }}
                    >
                        <FaChartLine className='chartIcon' />
                        <span className='text'>
                            Activity Log
                        </span>
                    </button>
                </div>
                <button className='btnLogout'
                    onClick={() => {
                        localStorage.clear();
                        navigate('/');
                    }}
                >
                    <FaSignOutAlt className='signoutIcon' />
                    <span className='text'>
                        Logout
                    </span>
                </button>
            </nav>
            <div className='dashboard-container' ref={_tabs}>
                <div className='navContainer' ref={nav_1}>
                    <div className='tabsContainer' ref={nav_2}>
                        <button className='tabsBtn'
                            onClick={() => {
                                setTabswitch(state => !state)
                            }}
                        >
                            <FaBars className='bars' />
                        </button>
                        <button className='DashboardBtn'
                            onClick={() => {
                                setComponent(<HomeDashboard targetSales={targetSales} setTargetSales={setTargetSales} />)
                                setNav('/Dashboard')
                                navigate('/Dashboard')
                            }}
                        >
                            Dashboard
                        </button>
                        <button className='SettingsBtn'
                            onClick={() => {
                                navigate('/Settings')
                                setComponent(<AdminSettings
                                    setOpen_Modal_Admin_Setting={setOpen_Modal_Admin_Setting}
                                    // setOpen_Modal_Admin_Setting_2={setOpen_Modal_Admin_Setting_2}
                                    // changepass={changepass}
                                    // setChangepass={setChangepass}
                                    // check_if_edit={check_if_edit}
                                    setCheck_If_Edit={setCheck_If_Edit}
                                    changeuser={changeuser}
                                    setChangeuser={setChangeuser}
                                />)
                            }}
                        >
                            Settings
                        </button>

                        <span className='time'>
                            {window.setInterval(() => {
                                moment().format('MMMM Do YYYY, h:mm:ss a')
                            }, 1000)}
                        </span>
                    </div>
                    <div className='tabsContainer_2' ref={nav_3}>
                        <span className='text'>
                            {nav}
                        </span>
                    </div>
                </div>
                <div className='renderComponentContainer' ref={rended_tag}>
                    {Component}
                </div>
            </div>

            {open_modal_supplier ? (
                <div className='modal-supplies'>
                    <form onSubmit={check_if_edit ? edit_supplier_onHandleSubmit : add_supplier_onHandleSubmit}>
                        <div className='modal-container'>
                            <div className='titleContainer'>
                                <span className='text'>
                                    {modaltitle}
                                </span>
                            </div>
                            <div className='form-input-container'>
                                <div className='supplier-name-container'>
                                    <span className='text'>Supplier name: </span>
                                    <input className='supplier-name--form'
                                        value={check_if_edit ? supplier.supplier_name : supplier.supplier_name}
                                        type='text'
                                        placeholder='supplier name'
                                        onChange={(e) => {
                                            setSupplier({ ...supplier, supplier_name: e.target.value })
                                        }} />
                                </div>
                                <div className='address-container'>
                                    <span className='text'>Address: </span>
                                    <input className='address-form'
                                        value={check_if_edit ? supplier.address : supplier.address}
                                        type='text'
                                        placeholder='address'
                                        onChange={(e) => {
                                            setSupplier({ ...supplier, address: e.target.value })
                                        }} />
                                </div>
                                <div className='contact-person-container'>
                                    <span className='text'>Contact person: </span>
                                    <input className='contact-person-form'
                                        value={check_if_edit ? supplier.contact_person : supplier.contact_person}
                                        type='text'
                                        placeholder='contact person'
                                        onChange={(e) => {
                                            setSupplier({ ...supplier, contact_person: e.target.value })
                                        }} />
                                </div>
                                <div className='contact-number-container'>
                                    <span className='text'>Contact number: </span>
                                    <input className='contact-number-form'
                                        value={check_if_edit ? supplier.contact_number : supplier.contact_number}
                                        type='text'
                                        placeholder='contact number'
                                        onChange={(e) => {
                                            setSupplier({ ...supplier, contact_number: e.target.value })
                                        }} />
                                </div>
                                <div className='note-container'>
                                    <span className='text'>Note: </span>
                                    <textarea className='note-form'
                                        value={check_if_edit ? supplier.note : supplier.note}
                                        type='text'
                                        placeholder='note'
                                        onChange={(e) => {
                                            setSupplier({ ...supplier, note: e.target.value })
                                        }} />
                                </div>
                                <div className='btnContainerSubmit'>
                                    <button className='btnAddSubmit'>
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>

                    <button className='btnClose' onClick={() => {
                        setOpen_Modal_Supplier(state => !state)
                        setCheck_If_Edit(false)
                    }}>
                        <FaTimes className='icon' />
                    </button>

                </div>
            ) : (
                <>
                </>
            )}

            {open_modal_customer ? (
                <div className='modal-customer'>
                    <form onSubmit={check_if_edit ? edit_customer_onHandleSubmit : add_customer_onHandleSubmit}>
                        <div className='modal-container'>
                            <div className='titleContainer'>
                                <span className='text'>
                                    {modaltitle}
                                </span>
                            </div>
                            <div className='form-input-container'>
                                <div className='customer-name-container'>
                                    <span className='text'>Customer name: </span>
                                    <input className='customer-name--form'
                                        value={check_if_edit ? customer.fullname : customer.fullname}
                                        type='text'
                                        placeholder='customer name'
                                        onChange={(e) => {
                                            setCustomer({ ...customer, fullname: e.target.value })
                                        }} />
                                </div>
                                <div className='address-container'>
                                    <span className='text'>Address: </span>
                                    <input className='address-form'
                                        value={check_if_edit ? customer.address : customer.address}
                                        type='text'
                                        placeholder='address'
                                        onChange={(e) => {
                                            setCustomer({ ...customer, address: e.target.value })
                                        }} />
                                </div>
                                <div className='contact-number-container'>
                                    <span className='text'>Contact number: </span>
                                    <input className='contact-number-form'
                                        value={check_if_edit ? customer.contact_number : customer.contact_number}
                                        type='text'
                                        placeholder='contact number'
                                        onChange={(e) => {
                                            setCustomer({ ...customer, contact_number: e.target.value })
                                        }} />
                                </div>
                                <div className='product-name-container'>
                                    <span className='text'>Product name: </span>
                                    <input className='product-name-form'
                                        value={check_if_edit ? customer.product_name : customer.product_name}
                                        type='text'
                                        placeholder='product name'
                                        onChange={(e) => {
                                            setCustomer({ ...customer, product_name: e.target.value })
                                        }} />
                                </div>
                                <div className='total-container'>
                                    <span className='text'>total: </span>
                                    <input className='total-form'
                                        value={check_if_edit ? customer.total : customer.total}
                                        type='text'
                                        placeholder='total'
                                        onChange={(e) => {
                                            setCustomer({ ...customer, total: e.target.value })
                                        }} />
                                </div>
                                <div className='note-container'>
                                    <span className='text'>Note: </span>
                                    <textarea className='note-form'
                                        value={check_if_edit ? customer.note : customer.note}
                                        type='text'
                                        placeholder='note'
                                        onChange={(e) => {
                                            setCustomer({ ...customer, note: e.target.value })
                                        }} />
                                </div>
                                {check_if_edit ? (
                                    <div className='due_date-container'>
                                        <span className='text'>Points: </span>
                                        <input className='due_date-form'
                                            value={check_if_edit ? increment : increment}
                                            type='number'
                                            placeholder='click any'
                                            onChange={(e) => {
                                                setIncrement(e.target.value)
                                            }} />
                                    </div>
                                ) : (
                                    <>

                                    </>
                                )}
                                <div className='due_date-container'>
                                    <span className='text'>Due date: </span>
                                    <input className='due_date-form'
                                        value={check_if_edit ? customer.due_date : customer.due_date}
                                        type='text'
                                        placeholder='click any'
                                        onChange={(e) => {
                                            setCustomer({ ...customer, due_date: _date_month + 1 + `-` + _date_date + `-` + _date_year })
                                        }} />
                                </div>
                                <div className='btnContainerSubmit'>
                                    <button className='btnAddSubmit'
                                        type='submit'
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>

                    <button className='btnClose' onClick={() => {
                        setOpen_Modal_Customer(state => !state)
                        setCheck_If_Edit(false)
                    }}>
                        <FaTimes className='icon' />
                    </button>
                </div>
            ) : (
                <>
                </>
            )}

            {open_modal_products ? (
                <div className='modal-products'>
                    <form onSubmit={check_if_edit ? edit_products_onHandleSubmit : add_product_onHandleSubmit}>
                        <div className='modal-container'>
                            <div className='titleContainer'>
                                <span className='text'>
                                    {modaltitle}
                                </span>
                            </div>
                            <div className='form-input-container'>
                                <div className='brand-name-container'>
                                    <span className='text'>Brand name: </span>
                                    <input className='brand-name-form'
                                        value={check_if_edit ? products.brand_name : products.brand_name}
                                        type='text'
                                        placeholder='brand name'
                                        onChange={(e) => {
                                            setProducts({ ...products, brand_name: e.target.value })
                                        }} />
                                </div>
                                <div className='generic-name-container'>
                                    <span className='text'>Variant: </span>
                                    <input className='generic-name-form'
                                        value={check_if_edit ? products.variant : products.variant}
                                        type='text'
                                        placeholder='variant'
                                        onChange={(e) => {
                                            setProducts({ ...products, variant: e.target.value })
                                        }} />
                                </div>
                                <div className='category-description-container'>
                                    <span className='text'>Category description: </span>
                                    <input className='category-description-form'
                                        value={check_if_edit ? products.category_description : products.category_description}
                                        type='text'
                                        placeholder='category description'
                                        onChange={(e) => {
                                            setProducts({ ...products, category_description: e.target.value })
                                        }} />
                                </div>
                                <div className='supplier-container'>
                                    <span className='text'>Supplier: </span>
                                    <select className='supplier-form' aria-label="Default select example"
                                        onChange={(e) => {
                                            setProducts({
                                                ...products,
                                                supplier: e.target.value
                                            })
                                        }}
                                    >
                                        <option defaultValue="Open this select menu">Open this select menu</option>
                                        {get_suppliers[0] && Object.keys(get_suppliers[0]?.supplier).map((value, key) => {
                                            return (
                                                <option
                                                    value={get_suppliers[0]?.supplier[value]?.supplier_name}
                                                    key={get_suppliers[0]?.supplier[value]?._id}>
                                                    {get_suppliers[0]?.supplier[value]?.supplier_name}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className='receive-date-container'>
                                    <span className='text'>Receive-date: </span>
                                    <input className='receive-date-form'
                                        value={check_if_edit ? products.added_date : products.added_date}
                                        type='text'
                                        placeholder={_date_month + 1 + '-' + _date_date + '-' + _date_year}
                                        onChange={() => {
                                            setProducts({ ...products, added_date: _date_month + 1 + '/' + _date_date + '/' + _date_year })
                                        }} />
                                </div>
                                <div className='expire-date-container'>
                                    <span className='text'>Expire date: </span>
                                    <input className='expire-date-form'
                                        value={check_if_edit ? expire_date : expire_date}
                                        type='date'
                                        placeholder='mm-dd-yyyy'
                                        onChange={(e) => {
                                            setExpire_Date(e.target.value)
                                        }} />
                                </div>
                                <div className='original-price-container'>
                                    <span className='text'>Original price: </span>
                                    <input className='original-price-form'
                                        value={check_if_edit ? products.original_price : products.original_price}
                                        type='text'
                                        placeholder='original price'
                                        onChange={(e) => {
                                            setProducts({ ...products, original_price: e.target.value })
                                        }} />
                                </div>
                                <div className='selling-price-container'>
                                    <span className='text'>Selling price: </span>
                                    <input className='selling-price-form'
                                        value={check_if_edit ? products.selling_price : products.selling_price}
                                        type='text'
                                        placeholder='selling price'
                                        onChange={(e) => {
                                            setProducts({ ...products, selling_price: e.target.value })
                                        }} />
                                </div>
                                <div className='quantity-container'>
                                    <span className='text'>Quantity: </span>
                                    <input className='quantity-form'
                                        value={check_if_edit ? products.quantity : products.quantity}
                                        type='text'
                                        placeholder='quantity'
                                        onChange={(e) => {
                                            setProducts({ ...products, quantity: e.target.value })
                                        }} />
                                </div>
                                <div className='btnContainerSubmit'>
                                    <button className='btnAddSubmit'
                                        type='submit'
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>

                    <button className='btnClose' onClick={() => {
                        setOpen_Modal_Products(state => !state)
                        setCheck_If_Edit(false)
                    }}>
                        <FaTimes className='icon' />
                    </button>
                </div>
            ) : (
                <>
                </>
            )}

            {open_modal_admin_setting ? (
                // <form onSubmit={admin_account_settings_onHandleSubmit} >
                <div className='modal-admin'>
                    <div className='modal-container'>
                        <div className='titleContainer'>
                            <span className='text'>
                                Edit Admin
                            </span>
                            <button className='btnClose' onClick={() => {
                                setOpen_Modal_Admin_Setting(state => !state)
                                setCheck_If_Edit(false)
                            }}>
                                <FaTimes className='icon' />
                            </button>
                        </div>
                        <div className='form-input-container'>
                            <div className='username-container'>
                                <span className='text'>new username: </span>
                                <input className='brand-name-form'
                                    value={check_if_edit ? changeuser.admin : changeuser.admin}
                                    type='text'
                                    placeholder='username'
                                    onChange={(e) => {
                                        setChangeuser({ ...changeuser, admin: e.target.value })
                                    }} />
                            </div>
                            <div className='username-container'>
                                <span className='text'>old username: </span>
                                <input className='brand-name-form'
                                    value={check_if_edit ? changeuser.old_admin : changeuser.old_admin}
                                    type='text'
                                    placeholder='username'
                                    onChange={(e) => {
                                        setChangeuser({ ...changeuser, old_admin: e.target.value })
                                    }} />
                            </div>
                            <div className='password-container'>
                                <span className='text'>new password: </span>
                                <input className='generic-name-form'
                                    value={check_if_edit ? changeuser.password : changeuser.password}
                                    type='password'
                                    placeholder='new password'
                                    onChange={(e) => {
                                        setChangeuser({ ...changeuser, password: e.target.value })
                                    }} />
                            </div>
                            <div className='password-container'>
                                <span className='text'>old password: </span>
                                <input className='generic-name-form'
                                    value={check_if_edit ? changeuser.old_password : changeuser.old_password}
                                    type='password'
                                    placeholder='old password'
                                    onChange={(e) => {
                                        setChangeuser({ ...changeuser, old_password: e.target.value })
                                    }} />
                            </div>

                            <div className='btnContainerSubmit'>
                                <button className='btnAddSubmit'
                                    onClick={() => {
                                        if (changeuser.admin && changeuser.password) {

                                            console.log(storage?.result?._id,
                                                storage?.token,
                                                changeuser.admin,
                                                changeuser.old_admin,
                                                changeuser.password,
                                                changeuser.old_password)

                                            edit_admin(
                                                storage?.result?._id,
                                                storage?.token,
                                                changeuser.admin,
                                                changeuser.old_admin,
                                                changeuser.password,
                                                changeuser.old_password
                                            )

                                            window.location.reload()

                                        }
                                    }}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                // </form>
            ) : (
                <>
                </>
            )}

        </div>
    )
}

export default Dashboard;