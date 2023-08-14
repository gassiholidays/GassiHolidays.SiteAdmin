import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { TabView, TabPanel } from 'primereact/tabview';
import { getCities, getAreas, getHotels, getBruttoCustomers, getBrutto1Customers, getBrutto1Hotels, getHotelItemCountries, getHotelItemTypes, getHotelItemCategories, getHotelItemCities, getHotelItemAreas, getHotelItemHotels } from '../../app/prices';
import { BASE_API_URL } from '../constants/settings';

const Home = () => {
    const propertyCategories = useSelector((state) => state.pricesReducer.propertyCategories);
    const countries = useSelector((state) => state.pricesReducer.countries);
    const cities = useSelector((state) => state.pricesReducer.cities);
    const areas = useSelector((state) => state.pricesReducer.areas);

    const hotels = useSelector((state) => state.pricesReducer.hotels);

    const bruttoCustomers = useSelector((state) => state.pricesReducer.bruttoCustomers);
    const [selectedBruttoCustomer, setSelectedBruttoCustomer] = useState();

    const bruttoCountries = useSelector((state) => state.pricesReducer.bruttoCountries);
    //const selectedBruttoCountry = useSelector((state) => state.pricesReducer.selectedBruttoCountry);
    const [selectedBruttoCountry, setSelectedBruttoCountry] = useState();

    const bruttoTypes = useSelector((state) => state.pricesReducer.bruttoTypes);
    //const selectedBruttoTypes = useSelector((state) => state.pricesReducer.selectedBruttoTypes);
    const [selectedBruttoTypes, setSelectedBruttoTypes] = useState();

    const bruttoCategories = useSelector((state) => state.pricesReducer.bruttoCategories);
    const [selectedBruttoCategories, setSelectedBruttoCategories] = useState();

    const bruttoCities = useSelector((state) => state.pricesReducer.bruttoCities);
    const [selectedBruttoCities, setSelectedBruttoCities] = useState();

    const bruttoAreas = useSelector((state) => state.pricesReducer.bruttoAreas);
    const [selectedBruttoAreas, setSelectedBruttoAreas] = useState();

    const bruttoHotels = useSelector((state) => state.pricesReducer.bruttoHotels);
    const [selectedBruttoHotels, setSelectedBruttoHotels] = useState();

    const brutto1Hotels = useSelector((state) => state.pricesReducer.brutto1Hotels);
    const [selectedBrutto1Hotels, setSelectedBrutto1Hotels] = useState([]);

    const brutto1Customers = useSelector((state) => state.pricesReducer.brutto1Customers);
    const [selectedBrutto1Customers, setSelectedBrutto1Customers] = useState([]);

    const [selectedCountry, setSelectedCountry] = useState([]);
    const [selectedCities, setSelectedCities] = useState([]);
    const [selectedAreas, setSelectedAreas] = useState([]);
    const [selectedHotels, setSelectedHotels] = useState([]);
    const [selectedPartner, setSelectedPartner] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBrutto1Hotels());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getBruttoCustomers());
    }, [dispatch]);

    const onCountriesChange = (value) => {
        setSelectedCountry(value);
        dispatch(getCities(value));
    };

    const onCitiesChange = (value) => {
        setSelectedCities(value);
        console.log(value);
        console.log('cities', value);
        dispatch(getAreas(value));
        dispatch(getHotels(value));
    };

    const onAreaChange = (value) => {
        setSelectedAreas(value);
        console.log(value);
        console.log('areas', value);
        dispatch(getHotels([], value));
    };

    const onBruttoCustomerChange = (value) => {
        setSelectedBruttoCustomer(value);
        dispatch(getHotelItemCountries(value));
    };

    const onBruttoCountryChange = (value) => {
        setSelectedBruttoCountry(value);
        dispatch(getHotelItemTypes(selectedBruttoCustomer, value, -1, -1, -1, -1));
    };

    const onBruttoTypesChange = (value) => {
        setSelectedBruttoTypes(value);
        dispatch(getHotelItemCategories(selectedBruttoCustomer, selectedBruttoCountry, value.toString(), -1, -1, -1));
    };

    const onBruttoCategoriesChange = (value) => {
        setSelectedBruttoCategories(value);
        dispatch(getHotelItemCities(selectedBruttoCustomer, selectedBruttoCountry, selectedBruttoTypes.toString(), value.toString(), -1, -1));
    };

    const onBruttoCitiesChange = (value) => {
        setSelectedBruttoCities(value);
        dispatch(getHotelItemAreas(selectedBruttoCustomer, selectedBruttoCountry, selectedBruttoTypes.toString(), selectedBruttoCategories.toString(), value.toString(), -1));
    };

    const onBruttoAreasChange = (value) => {
        setSelectedBruttoAreas(value);
        dispatch(getHotelItemHotels(selectedBruttoCustomer, selectedBruttoCountry, selectedBruttoTypes.toString(), selectedBruttoCategories.toString(), selectedBruttoCities.toString(), value.toString()));
    };

    const onBrutto1HotelsChange = (value) => {
        setSelectedBrutto1Hotels(value);
        dispatch(getBrutto1Customers(value));
    };

    const bruttoPrices = () => {
        if (brutto1Hotels && selectedPartner) {
            return `${BASE_API_URL}/api/hotels/brutto/prices?hotels=${selectedBrutto1Hotels.toString()}&partnerId=${selectedBrutto1Customers}`;
        }
        return '#';
    };

    const url = () => {
        if (selectedPartner) {
            return `${BASE_API_URL}/api/hotels/brutto/prices?hotels=${selectedHotels.toString()}&partnerId=${selectedPartner}`;
        }
    };

    // const onSubmit = () => {
    //     const hotelIds = selectedHotels.toString();
    //     console.log(hotelIds);
    //     //dispatch(getPrices({ hotels: hotelIds, market: 0 }));
    // };

    return (
        <div className="card">
            <TabView>
                <TabPanel header="Netto">
                    {' '}
                    <div className="card justify-content-center">
                        <div className="col-6">
                            <Dropdown value={selectedCountry} onChange={(e) => onCountriesChange(e.value)} options={countries} optionLabel="value" optionValue="key" placeholder="Select Country" className="w-full" />
                        </div>
                        <div className="col">
                            <a href={url()} download="Prices" rel="noreferrer">
                                <Button>Get prices</Button>
                            </a>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel header="Brutto">
                    <div className="card justify-content-center">
                        <div className="col-6">
                            <Dropdown filter value={selectedBruttoCustomer} onChange={(e) => onBruttoCustomerChange(e.value)} options={bruttoCustomers} optionLabel="value" optionValue="key" placeholder="Select partner" className="w-full" />
                        </div>
                        <div className="col-6">
                            <Dropdown filter value={selectedBruttoCountry} onChange={(e) => onBruttoCountryChange(e.value)} options={bruttoCountries} optionLabel="value" optionValue="key" placeholder="Select country" className="w-full" />
                        </div>

                        <div className="col-6">
                            <MultiSelect
                                filter
                                value={selectedBruttoTypes}
                                onChange={(e) => onBruttoTypesChange(e.value)}
                                options={bruttoTypes}
                                optionLabel="value"
                                optionValue="key"
                                placeholder="Select property types"
                                maxSelectedLabels={5}
                                className="w-full"
                            />
                        </div>
                        <div className="col-6">
                            <MultiSelect
                                filter
                                value={selectedBruttoCategories}
                                onChange={(e) => onBruttoCategoriesChange(e.value)}
                                options={bruttoCategories}
                                optionLabel="value"
                                optionValue="key"
                                placeholder="Select property category"
                                maxSelectedLabels={5}
                                className="w-full"
                            />
                        </div>

                        <div className="col-6">
                            <MultiSelect value={selectedBruttoCities} onChange={(e) => onBruttoCitiesChange(e.value)} options={bruttoCities} optionLabel="value" optionValue="key" placeholder="Select cities" className="w-full" />
                        </div>
                        <div className="col-6">
                            <MultiSelect value={selectedBruttoAreas} onChange={(e) => onBruttoAreasChange(e.value)} options={bruttoAreas} optionLabel="value" optionValue="key" placeholder="Select areas" className="w-full" />
                        </div>
                        <div className="col-6">
                            <MultiSelect value={selectedBruttoHotels} onChange={(e) => setSelectedBruttoHotels(e.value)} options={bruttoHotels} optionLabel="value" optionValue="key" placeholder="Select properties" className="w-full" />
                        </div>

                        <div className="col">
                            <a href={url()} download="Prices" rel="noreferrer">
                                <Button>Get prices</Button>
                            </a>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel header="Brutto-1">
                    <div className="card justify-content-center">
                        <div className="col-6">
                            <Dropdown
                                value={selectedBrutto1Hotels}
                                filter
                                onChange={(e) => onBrutto1HotelsChange(e.value)}
                                options={brutto1Hotels}
                                optionLabel="value"
                                optionValue="key"
                                placeholder="Select Hotel"
                                className="w-full"
                                panelStyle={{ overlowWrap: 'break-word' }}
                            />
                        </div>
                        <div className="col-6">
                            <Dropdown filter value={selectedBrutto1Customers} onChange={(e) => setSelectedBrutto1Customers(e.value)} options={brutto1Customers} optionLabel="value" optionValue="key" placeholder="Select Partner" className="w-full" />
                        </div>
                        <div className="col">
                            <a href={bruttoPrices()} download="Prices" rel="noreferrer">
                                <Button>Get prices</Button>
                            </a>
                        </div>
                    </div>
                </TabPanel>
            </TabView>
        </div>
    );
};

export default Home;
