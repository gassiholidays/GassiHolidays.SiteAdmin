import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TabView, TabPanel } from 'primereact/tabview';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import { getCountries } from '../app/prices';
//import { dispatch } from '../app/store';

const HotelPrices = () => {
    const countries = useSelector((state) => state.countries);
    const cities = useSelector((state) => state.cities);
    const areas = useSelector((state) => state.areas);
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [selectedCities, setSelectedCities] = useState([]);
    const [selectedAreas, setSelectedAreas] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCountries);
    }, [dispatch]);

    return (
        <div className="card">
            <TabView>
                <TabPanel header="Netto">
                    <p className="m-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    {/* <div className="grid">
                            <div className="col-12 md:col-6 lg:col-3 xl:col-3">
                                <MultiSelect value={selectedCountries} onChange={(e) => setSelectedCountries(e.value)} options={countries} optionLabel="name" placeholder="Select Country" maxSelectedLabels={5} className="w-full" />
                            </div>
                            <div className="col-12 md:col-6 lg:col-3 xl:col-3">
                                <MultiSelect value={selectedCities} onChange={(e) => setSelectedCities(e.value)} options={cities} optionLabel="name" placeholder="Select Cities" maxSelectedLabels={5} className="w-full" />
                            </div>
                            <div className="col-12 md:col-6 lg:col-3 xl:col-3">
                                <MultiSelect value={selectedAreas} onChange={(e) => setSelectedAreas(e.value)} options={areas} optionLabel="name" placeholder="Select Cities" maxSelectedLabels={5} className="w-full" />
                            </div>
                            <div className="col-12 md:col-6 lg:col-3 xl:col-3">
                                <MultiSelect value={selectedCities} onChange={(e) => setSelectedCities(e.value)} options={areas} optionLabel="name" placeholder="Select Cities" maxSelectedLabels={5} className="w-full" />
                            </div>
                            <div className="col-12 md:col-6 lg:col-3 xl:col-3">
                                <Button label="submit"></Button>
                            </div>
                        </div> */}
                </TabPanel>
                <TabPanel header="Brutto">
                    <p className="m-0">
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                        ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                    </p>
                </TabPanel>
                <TabPanel header="Brutto-1">
                    <p className="m-0">
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                        ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                    </p>
                </TabPanel>
            </TabView>
        </div>
    );
};

export default HotelPrices;
