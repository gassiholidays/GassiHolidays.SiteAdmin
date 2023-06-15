import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { AutoComplete } from 'primereact/autocomplete';

function HotelServiceDialog({ visible, onHotelServiceDialogCancel, onHotelServiceDialogOk }) {

    // const hideAddHotelDialog = () => {
    //     // setSubmitted(false);
    //     setAddHotelDialogVisible(false);
    // };
    const hotelsList = [
        {
            id: 1,
            name: "Aegean Melathron (Chalkidiki - Kassandra)"
        },
        {
            id: 2,
            name: "Sithonia Palace (Chalkidiki - Sithonia)"
        },
        {
            id: 3,
            name: "Pomegranate Hotel (Chalkidiki - Kassandra)"
        }
    ]

    const roomsList = [
        {
            id: 1,
            name: "Single Room"
        },
        {
            id: 2,
            name: "Double Room Standard"
        },
        {
            id: 3,
            name: "Family Room Sea View"
        },
        {
            id: 4,
            name: "Suite City View"
        }
    ]
    const [calendarValue, setCalendarValue] = useState();
    //hotels
    const [hotels, setHotels] = useState(hotelsList);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [autoFilteredHotel, setAutoFilteredHotel] = useState([]);

    //rooms
    const [rooms, setRooms] = useState(roomsList);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [autoFilteredRoom, setAutoFilteredRoom] = useState([]);

    const clearDialog = () => {
        setCalendarValue(null);
        setSelectedHotel(null);
        setSelectedRoom(null);
    }

    const onClose = () => {
        clearDialog();
        onHotelServiceDialogCancel();
    }

    const composeHotel = () => {
        const hotelService = {
                id: 3,
                serviceType: 1,
                serviceName: selectedHotel,
                dateFrom: new Date('2022-11-15'),
                dateTo: new Date('2022-11-26'),
                client: {
                    id: 1,
                    name: "client"
                },
                state: 0,
                createdAt: new Date('2022-11-25')
        };
        console.log('compose hotel');
        console.log(hotelService);
        clearDialog();
        return hotelService;
    }


    const addHotelDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-danger" onClick={onClose} />
            <Button label="Save" icon="pi pi-check" className="p-button-success" onClick={() => onHotelServiceDialogOk(composeHotel())} />
        </>
    );
    const searchHotel = (event) => {
        setTimeout(() => {
            if (!event.query.trim().length) {
                setAutoFilteredHotel([...hotels]);
            } else {
                setAutoFilteredHotel(
                    hotels.filter((hotel) => {
                        return hotel.name.toLowerCase().startsWith(event.query.toLowerCase());
                    })
                );
            }
        }, 100);
    };

    const searchRoom = (event) => {
        setTimeout(() => {
            if (!event.query.trim().length) {
                setAutoFilteredRoom([...rooms]);
            } else {
                setAutoFilteredRoom(
                    rooms.filter((room) => {
                        return room.name.toLowerCase().startsWith(event.query.toLowerCase());
                    })
                );
            }
        }, 100);
    };

    return (
        //const [visible, setVisible] = useState(false);
        <Dialog visible={visible} style={{ width: '450px' }} header="Add hotel service" modal className="p-fluid" footer={addHotelDialogFooter} onHide={onClose}>
            {/* <span className="p-float-label">
                <Calendar id="hotel-period-dates" showIcon showButtonBar numberOfMonths={2} selectionMode="range" value={calendarValue} onChange={(e) => setCalendarValue(e.value)}></Calendar>
                <label htmlFor="hotel-period-dates">Period</label>
            </span> */}
            <div className="field">
                <label htmlFor="hotel-dates">Dates</label>
                <Calendar id="hotel-dates" required showIcon showButtonBar dateFormat="dd/mm/yy" numberOfMonths={2} selectionMode="range" value={calendarValue} onChange={(e) => setCalendarValue(e.value)}></Calendar>
            </div>
            <div className="field">
                <label htmlFor="hotels-list">Hotel</label>
                <AutoComplete id="hotels-list" placeholder="Select hotel" dropdown value={selectedHotel} onChange={(e) => setSelectedHotel(e.value)} suggestions={autoFilteredHotel} completeMethod={searchHotel} field="name" />

            </div>
            <div className="field">
                <label htmlFor="hotel-rooms">Room</label>
                <AutoComplete id="hotels-rooms" placeholder="Select room" dropdown value={selectedRoom} onChange={(e) => setSelectedRoom(e.value)} suggestions={autoFilteredRoom} completeMethod={searchRoom} field="name" />
            </div>

            {/* {item.image && <img src={`assets/demo/images/product/${item.image}`} alt={item.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />}
          <div className="field">
            <label htmlFor="name">Name</label>
            <InputText id="name" value={item.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
            {submitted && !product.name && <small className="p-invalid">Name is required.</small>}
        </div>
        <div className="field">
            <label htmlFor="description">Description</label>
            <InputTextarea id="description" value={product.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
        </div>

        <div className="field">
            <label className="mb-3">Category</label>
            <div className="formgrid grid">
                <div className="field-radiobutton col-6">
                    <RadioButton inputId="category1" name="category" value="Accessories" onChange={onCategoryChange} checked={product.category === 'Accessories'} />
                    <label htmlFor="category1">Accessories</label>
                </div>
                <div className="field-radiobutton col-6">
                    <RadioButton inputId="category2" name="category" value="Clothing" onChange={onCategoryChange} checked={product.category === 'Clothing'} />
                    <label htmlFor="category2">Clothing</label>
                </div>
                <div className="field-radiobutton col-6">
                    <RadioButton inputId="category3" name="category" value="Electronics" onChange={onCategoryChange} checked={product.category === 'Electronics'} />
                    <label htmlFor="category3">Electronics</label>
                </div>
                <div className="field-radiobutton col-6">
                    <RadioButton inputId="category4" name="category" value="Fitness" onChange={onCategoryChange} checked={product.category === 'Fitness'} />
                    <label htmlFor="category4">Fitness</label>
                </div>
            </div>
        </div>

        <div className="formgrid grid">
            <div className="field col">
                <label htmlFor="price">Price</label>
                <InputNumber id="price" value={product.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
            </div>
            <div className="field col">
                <label htmlFor="quantity">Quantity</label>
                <InputNumber id="quantity" value={product.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} integeronly />
            </div>
        </div> */}
        </Dialog>);

}
export default React.memo(HotelServiceDialog);