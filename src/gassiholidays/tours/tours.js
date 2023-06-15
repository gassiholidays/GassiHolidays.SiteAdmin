import React, { useState, useEffect, useRef } from 'react';

import { useSelector, useDispatch } from '../../app/store';

import { currencies } from '../constants/currencies';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { Carousel } from 'primereact/carousel';
import { Editor } from 'primereact/editor';
import { Checkbox } from 'primereact/checkbox';
import { PickList } from 'primereact/picklist';

import TinyEditor from '../../components/Editor';

// import TourProgram from './Tours/Program';
import TourService from '../../service/TourService';
import { getTours, addTourEvent, editTourEvent, updateTourMainImage, getTourGalleryPhotos, updateTourGalleryPhotos, getTourAvailableImages, saveTourPhotosGallery, updatePickList } from '../../app/tours';

// import TourProgramView from './Tours/tourProgramView';
// import FacilitiesView from './facilitiesView';

// import { Link } from "react-router-dom";
import '../../styles.css';
import '../../App.scss';

import { BASE_API_URL } from '../constants/settings';

const DEFAULT_IMAGE_PATH = '/images/tours/no-photo-270x210.png';

const Tours = () => {
    let emptyItem = {
        id: 0,
        title: '',
        sortOrder: 0,
        active: false
    };
    const dispatch = useDispatch();
    const toursState = useSelector((state) => state.toursReducer);
    const { tours, selectedTour, state } = toursState;
    const tourGalleryPhotos = selectedTour?.galleryImages;
    const tourAvailableImages = selectedTour?.availableImages;

    const [items, setItems] = useState(null);
    const [itemDialog, setItemDialog] = useState(false);
    const [deleteItemDialog, setDeleteItemDialog] = useState(false);
    // const [deleteItemsDialog, setDeleteItemsDialog] = useState(false);
    const [item, setItem] = useState(emptyItem);
    const [selectedItems, setSelectedItems] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    // const [descriptionsSubmitted, setDescriptionsSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    const [galleryPhotoTitle, setGalleryPhotoTitle] = useState();

    const [content, setContent] = useState();
    const [text, setText] = useState();

    //dictionaries
    const [tourTopDestinations, setTourTopDestinations] = useState([]);
    const [tourDestinations, setTourDestinations] = useState([]);
    const [tourDestinationDestinations, setTourDestinationDestinations] = useState([]);
    const [tourDepartureDepartures, setTourDepartureDepartures] = useState([]);
    const [tourHolidays, setTourHolidays] = useState([]);
    const [tourTransports, setTourTransports] = useState([]);
    const [tourAttributes, setTourAttributes] = useState([]);
    const [toursPrograms, setToursPrograms] = useState([]);
    const [tourProgramDays, setTourProgramDays] = useState([]);
    const [tourFacilities, setTourFacilities] = useState([]);
    const [includedFacilities, setIncludedFacilities] = useState([]);
    const [excludedFacilities, setExcludedFacilities] = useState([]);
    const [tourIncludedFacilities, setTourIncludedFacilities] = useState([]);
    const [tourExcludedFacilities, setTourExcludedFacilities] = useState([]);
    const [currenciesList] = useState(currencies());

    const [tourProgram, setTourProgram] = useState([]);

    //new tour fields
    const [tourId, setTourId] = useState();
    const [topDeparture, setTopDeparture] = useState([]);
    const [departure, setDeparture] = useState();
    const [topDestination, setTopDestination] = useState();
    const [destination, setDestination] = useState();
    const [holiday, setHoliday] = useState();
    const [transport, setTransport] = useState();
    const [attributes, setAttributes] = useState([]);
    const [dates, setDates] = useState();
    const [days, setDays] = useState();
    const [isTourDatesActive, setIsTourDatesActive] = useState();
    const [seoUrl, setSeoUrl] = useState();
    const [isTourPriceFrom, setIsTourPriceFrom] = useState();
    const [price, setPrice] = useState();
    const [currency, setCurrency] = useState();
    const [title, setTitle] = useState();
    const [shortDescription, setShortDescription] = useState();
    const [description, setDescription] = useState();
    const [metaDescription, setMetaDescription] = useState();
    const [metaKeywords, setMetaKeywords] = useState();
    const [thumbnailUrl, setThumbnailUrl] = useState();
    // const [images, setImages] = useState([]);
    const [isActive, setIsActive] = useState();
    const [mapLocation, setMapLocation] = useState();
    const [sortOrder, setSortOrder] = useState();
    const [isRecommended, setIsRecommended] = useState();

    // tour program fields
    const [programId, setProgramId] = useState();
    const [programDay, setProgramDay] = useState();
    const [programSelectedDay, setProgramSelectedDay] = useState();
    const [programDayTitle, setProgramDayTitle] = useState();
    const [programDayDescription, setProgramDayDescription] = useState(null);

    const [tourProgramDialogVisible, setTourProgramDialogVisible] = useState(false);
    const [tourDescriptionDialogVisibleN, setTourDescriptionDialogVisibleN] = useState(false);

    //tour description dialog
    const [tourDescriptionDialogVisible, setTourDescriptionDialogVisible] = useState(false);
    const [mainImageDialogVisible, setMainImageDialogVisible] = useState(false);
    const [carouselVisible, setCarouselVisible] = useState(false);
    const [tourGalleryImagesVisible, setTourGalleryImagesVisible] = useState(false);

    useEffect(() => {
        dispatch(getTours());
        const tourService = new TourService();
        tourService.getTopDestinations().then((data) => setTourTopDestinations(data));
        tourService.getDestinations(true).then((data) => setTourDestinations(data));
        tourService.getHolidays(true).then((data) => setTourHolidays(data));
        tourService.getTransports(true).then((data) => setTourTransports(data));
        tourService.getAttributes(true).then((data) => setTourAttributes(data));
        tourService.getProgram(0).then((data) => setToursPrograms(data));
        tourService.getFacilities(false, false).then((data) => setTourFacilities(data));
    }, []);

    const onTopDestinationChange = (value) => {
        setTopDestination(value);
        var destinations = tourDestinations.filter((x) => x.destination.key === value);
        setDestination(0);
        setTourDestinationDestinations(destinations);
    };

    const onTopDepartureChange = (value) => {
        setTopDeparture(value);
        var departures = tourDestinations.filter((x) => x.destination.key === value);
        setDeparture(0);
        setTourDepartureDepartures(departures);
    };

    const setDialogEmpty = () => {
        setTopDeparture(0);
        setDeparture(0);
        setTopDestination(0);
        setDestination(0);
        setHoliday(0);
        setTransport(0);
        setIncludedFacilities([]);
        setExcludedFacilities([]);
        setAttributes([]);
        setIsTourDatesActive(false);
        setDates([]);
        setDays(null);
        setSeoUrl('');
        setTitle('');
        setShortDescription('');
        setDescription('');
        setMetaDescription('');
        setMetaKeywords('');
        setIsTourPriceFrom(false);
        setPrice(0);
        setCurrency(0);
        setThumbnailUrl(DEFAULT_IMAGE_PATH);
        setIsActive(false);
        setMapLocation('');
        setIsRecommended();
        setSortOrder(0);
    };

    const setDialogItemValues = (item) => {
        var departure = tourDestinations.find((x) => x.id === item.departure.key);
        var destination = tourDestinations.find((x) => x.id === item.destination.key);
        var topDeparture = departure.destination.key;
        var topDestination = destination.destination.key;
        var departures = tourDestinations.filter((x) => x.destination.key === topDeparture);
        var destinations = tourDestinations.filter((x) => x.destination.key === topDestination);

        setTourDestinationDestinations(destinations);
        setTourDepartureDepartures(departures);
        setTopDeparture(topDeparture);
        setDeparture(item.departure.key);
        setTopDestination(topDestination);
        setDestination(item.destination.key);
        setTourId(item.id);
        setHoliday(item.holiday.key);
        setTransport(item.transport.key);
        setIsTourDatesActive(item.isTourDatesActive);
        if (!item.dates[0]) {
            setDates([]);
        } else {
            setDates([new Date(item.dates[0]), new Date(item.dates[1])]);
        }
        setDays(item.days);
        setSeoUrl(item.seoUrl);
        setTitle(item.title);
        setDescription(item.description);
        setShortDescription(item.shortDescription);
        setMetaDescription(item.metaDescription);
        setMetaKeywords(item.metaKeywords);
        setIsTourPriceFrom(item.isTourPriceFrom);
        setPrice(item.price);
        setCurrency(item.currency);
        setThumbnailUrl(item.thumbnailUrl);
        setAttributes(item.attributes.map((x) => x.key));
        setIsActive(item.isActive);
        setMapLocation(item.mapLocation);
        setIsRecommended(item.isRecommended);
        setSortOrder(item.sortOrder);
    };

    const onDescriptionChange = function (a, editor) {
        setContent(a);
        setText(editor.getContent({ format: 'html' }));
        console.log(editor);
    };

    const openNew = () => {
        setDialogEmpty();
        setTourId(0);
        setDescription('description template');
        var includedFacilities = [...tourFacilities];
        setIncludedFacilities(includedFacilities);
        setTourIncludedFacilities([]);
        var excludedFacilities = [...tourFacilities];
        setExcludedFacilities(excludedFacilities);
        setTourExcludedFacilities([]);
        setIsRecommended(0);
        setSubmitted(false);
        setItemDialog(true);
    };

    const hideItemDialog = () => {
        setSubmitted(false);
        setItemDialog(false);
        // setCarouselVisible(false);
    };

    // tour description
    const onTourDescriptionDialogCancel = () => {
        setSubmitted(false);
        setTourDescriptionDialogVisible(false);
        setTourDescriptionDialogVisibleN(false);
    };

    // const onTourGalleryImagesDialogCancel = () => {
    //     setTourGalleryImagesVisible(false);
    // }

    const onTourDescriptionDialogOk = () => {
        setSubmitted(true);
        if (content && content.trim().length > 0 && shortDescription && shortDescription.trim().length > 0 && metaDescription.trim().length > 0) {
            var itemToSave = {
                id: tourId,
                shortDescription: shortDescription,
                description: content,
                metaDescription: metaDescription,
                metaKeywords: metaKeywords
            };
            var toursService = new TourService();
            toursService.saveTourDescriptions({ ...itemToSave });
            setTourDescriptionDialogVisibleN(false);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Tour description has been saved', life: 3000 });
        }
        // if (description && description.trim().length > 0 && shortDescription && shortDescription.trim().length > 0) {
        //     var itemToSave = {
        //         id: tourId,
        //         shortDescription: shortDescription,
        //         description: description
        //     };
        //     var toursService = new TourService();
        //     toursService.saveTourDescriptions({ ...itemToSave });
        //     setTourDescriptionDialogVisible(false);
        //     toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Tour description has been saved', life: 3000 });
        // }
    };

    const onMainImageDialogOk = () => {
        dispatch(updateTourMainImage({ tourId: tourId, imageUrl: thumbnailUrl }));
        setMainImageDialogVisible(false);
    };

    const onUploadComplete = (imageType) => {
        const id = tourId;
        console.log('on upload complete');
        console.log(id);
        console.log(imageType);
        dispatch(getTourAvailableImages({ tourId: id, imageType: imageType }));
    };

    // tour description end
    const onTourDeleteDialogCancel = () => {
        setDeleteItemDialog(false);
    };

    // const hideDeleteItemsDialog = () => {
    //     setDeleteItemsDialog(false);
    // };

    const checkTour = () => {
        const validated =
            title.trim() &&
            topDeparture !== 0 &&
            departure !== 0 &&
            topDestination !== 0 &&
            destination !== 0 &&
            holiday !== 0 &&
            transport !== 0 &&
            attributes.length !== 0 &&
            ((isTourDatesActive && checkDateRange(dates)) || !isTourDatesActive) &&
            currency &&
            seoUrl;
        return validated;
    };

    const saveItem = () => {
        setSubmitted(true);
        if (checkTour()) {
            var itemToSave = {
                id: tourId,
                isActive: isActive,
                departure: departure,
                destination: destination,
                holiday: holiday,
                transport: transport,
                attributes: attributes,
                title: title,
                shortDescription: shortDescription,
                description: description,
                isTourDatesActive: isTourDatesActive,
                dates: dates ? dates : [null, null],
                days: days,
                isTourPriceFrom: isTourPriceFrom,
                price: price,
                currency: currency,
                seoUrl: seoUrl,
                thumbnailUrl: thumbnailUrl,
                imageUrl: thumbnailUrl,
                included: tourIncludedFacilities,
                excluded: tourExcludedFacilities,
                mapLocation: mapLocation,
                isRecommended: isRecommended,
                sortOrder: sortOrder
            };
            if (tourId === 0) {
                dispatch(addTourEvent(itemToSave));
            } else {
                dispatch(editTourEvent(itemToSave));
            }
            if (state.success) {
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Tour has been saved', life: 3000 });
            }
            // else
            // {
            //     toast.current.show({ severity: 'error', summary: 'Failure', detail: state.message, life: 3000 });
            // }

            // var toursService = new TourService();
            // toursService.saveTour({ ...itemToSave });
            setItemDialog(false);
            // toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Tour has been saved', life: 3000 });
        }
    };

    const getAvailableImages = (value) => {
        dispatch(getTourAvailableImages({ tourId: value, imageType: 0 }));
        setCarouselVisible(true);
    };

    const onMainImageDialogCancel = () => {
        setMainImageDialogVisible(false);
    };

    const editTour = (item) => {
        var includedFacilities = [...tourFacilities];
        setIncludedFacilities(includedFacilities);
        var excludedFacilities = [...tourFacilities];
        setExcludedFacilities(excludedFacilities);
        setDialogItemValues(item);
        var d = item.included.map((x) => x.key);
        var d1 = item.excluded.map((x) => x.key);
        onIncludedFacilitiesChange(d);
        onExcludedFacilitiesChange(d1);
        setItemDialog(true);
        console.log(item);
    };

    const deleteTour = (item) => {
        setTitle(item.title);
        setItem(item);
        setDeleteItemDialog(true);
    };

    const onTourDeleteDialogOk = () => {
        setDeleteItemDialog(false);
        let _items = items.filter((val) => val.id !== items.id);
        setItems(_items);

        setItem(emptyItem);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Item Deleted', life: 3000 });
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    // const confirmDeleteSelected = () => {
    //     setDeleteItemsDialog(true);
    // };

    // const deleteSelectedItems = () => {
    //     let _items = items.filter((val) => !selectedItems.includes(val));
    //     setItems(_items);
    //     setDeleteItemsDialog(false);
    //     setSelectedItems(null);
    //     toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    // };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Create new tour" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                    {/* <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedItems || !selectedItems.length} /> */}
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                {/* <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="mr-2 inline-block" /> */}
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </React.Fragment>
        );
    };

    const imageBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Image</span>
                <img src={`${BASE_API_URL}${rowData.thumbnailUrl}`} alt={rowData.thumbnailUrl} className="shadow-2" width="100" onClick={(event) => handleClick(event, rowData)} />
            </>
        );
    };

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    function formatDate(date) {
        return [padTo2Digits(date.getDate()), padTo2Digits(date.getMonth() + 1), date.getFullYear()].join('/');
    }

    const dateFromBodyTemplate = (rowData) => {
        return formatDate(new Date(rowData.dates[0]));
    };

    const dateToBodyTemplate = (rowData) => {
        return formatDate(new Date(rowData.dates[1]));
    };

    const tourProgramTemplate = (rowData) => {
        return (
            <i className="underlined" onClick={() => editTourProgram(rowData)}>
                {' '}
                TourProgram{' '}
            </i>
        );
    };

    const tourGalleryTemplate = (rowData) => {
        return (
            <i className="underlined" onClick={() => editTourGallery(rowData)}>
                {' '}
                Gallery{' '}
            </i>
        );
    };

    const tourDescriptionTemplate = (rowData) => {
        return (
            <i className="underlined" onClick={() => editTourDescription(rowData)}>
                {' '}
                Descriptions{' '}
            </i>
        );
    };

    const tourAttributesTemplate = (rowData) => {
        return (
            <ul className="no-bullets">
                {rowData.attributes.map((x) => (
                    <li>{x.value}</li>
                ))}
            </ul>
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning mr-2" onClick={() => editTour(rowData)} />
                {!rowData.isActive && <Button icon="pi pi-trash" className="p-button-rounded p-button-danger mt-2" onClick={() => deleteTour(rowData)} />}
            </div>
        );
    };

    const isActiveBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Active</span>
                <Checkbox inputId="tour-is-active" checked={rowData.isActive} />
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Manage Tours</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const itemDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideItemDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveItem} />
        </>
    );

    const tourDescriptionDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={onTourDescriptionDialogCancel} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={onTourDescriptionDialogOk} />
        </>
    );

    const mainImageDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={onMainImageDialogCancel} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={onMainImageDialogOk} />
        </>
    );

    const deleteItemDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={onTourDeleteDialogCancel} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={onTourDeleteDialogOk} />
        </>
    );

    const carouselResponsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    const imageSelected = (image) => {
        // if (tourId) {
        //     var tours = [...items];
        //     var tour = tours.find(x => x.id === tourId);
        //     tour.thumbnailUrl = url;
        //     setItems(tours);
        // }

        setThumbnailUrl(image.imageThumbnailUrl);
        setCarouselVisible(false);
    };

    const handleClick = (event, rowData) => {
        setTourId(rowData.id);
        setCarouselVisible(false);
        setThumbnailUrl(rowData.thumbnailUrl);
        setMainImageDialogVisible(true);
    };

    const itemTemplate = (image) => {
        var url = image.imageThumbnailUrl;
        return (
            <div className="carousel-image">
                <img src={`${BASE_API_URL}${url}`} alt={url} width="250" onClick={(e) => imageSelected(image)} />;
            </div>
        );
    };

    const CarouselView = (props) => {
        const visible = props.visible;
        if (visible) {
            return <Carousel className="ui-carousel" value={tourAvailableImages} itemTemplate={itemTemplate} responsiveOptions={carouselResponsiveOptions} numVisible={1} numScroll={1}></Carousel>;
        }
    };

    ///tour program dialog

    const editTourProgram = (data) => {
        const tourProgramArray = toursPrograms.filter((x) => x.tourId === data.id);
        setTourProgram(tourProgramArray);
        var days = getTourProgramDays(tourProgramArray);
        setTourProgramDays(days);
        setTitle(data.title);
        setTourId(data.id);
        if (tourProgramArray && tourProgramArray.length > 0) {
            var first = tourProgramArray[0];

            setProgramId(first.id);
            setProgramSelectedDay(first.day);
            setProgramDayTitle(first.title);
            setProgramDayDescription(first.description);
            setProgramDay(first.day);
        }
        setTourProgramDialogVisible(true);
    };

    const editTourDescription = (data) => {
        setTitle(data.title);
        setTourId(data.id);
        setDescription(data.description);
        setShortDescription(data.shortDescription);
        setMetaDescription(data.metaDescription);
        setMetaKeywords(data.metaKeywords);
        setTourDescriptionDialogVisibleN(true);
    };

    const onCancel = () => {
        setProgramDayTitle(null);
        setProgramDayDescription(null);
        setProgramDay(null);
        setProgramId(null);
        // setTourProgram([]);
        setTourProgramDialogVisible(false);
    };

    const onSubmit = () => {
        if (tourProgram) {
            var current = {
                id: programId,
                tourId: tourId,
                day: programDay,
                title: programDayTitle,
                description: programDayDescription
            };
            var programsCopy = [...tourProgram];
            var c = programsCopy.find((x) => x.id === programId);
            var i = programsCopy.indexOf(c);
            programsCopy[i] = current;
            // programsCopy[programDay] = current;
            setTourProgram(programsCopy);
            var tourService = new TourService();
            tourService.saveProgram(programsCopy);
        }

        setTourProgramDialogVisible(false);
        setProgramDayTitle(null);
        setProgramDayDescription(null);
        setProgramDay(null);
        setProgramId(null);
    };

    const saveCurrentProgramDay = (day) => {
        var current = {
            id: programId,
            tourId: tourId,
            day: programDay,
            title: programDayTitle,
            description: programDayDescription
        };
        var programsCopy = [...tourProgram];
        var c = programsCopy.find((x) => x.id === programId);
        var i = programsCopy.indexOf(c);
        programsCopy[i] = current;
        setTourProgram(programsCopy);
    };

    const addNewProgramDay = () => {
        var maxProgramId = !tourProgram || tourProgram.length === 0 ? 0 : tourProgram.map((x) => x.id).reduce((a, b) => Math.max(a, b), -Infinity);
        var max = !tourProgram || tourProgram.length === 0 ? 0 : tourProgramDays.map((x) => x.id).reduce((a, b) => Math.max(a, b), -Infinity);
        max += 1;
        maxProgramId += 1;
        //add to days array
        var programDays = [...tourProgramDays];
        programDays.push({ id: max });
        setTourProgramDays(programDays);

        //add new program day
        var programsCopy = [...tourProgram];
        var newProgramDay = {
            id: maxProgramId,
            tourId: tourId,
            day: max,
            title: 'title',
            description: 'description'
        };
        programsCopy.push(newProgramDay);
        setTourProgram(programsCopy);
    };

    const onDayChange = (data) => {
        saveCurrentProgramDay(data);
        var selectedProgramDay = tourProgram.find((x) => x.day === data);
        setProgramId(selectedProgramDay.id);
        setProgramSelectedDay(data);
        setProgramDay(data);
        setProgramDayTitle(selectedProgramDay.title);
        setProgramDayDescription(selectedProgramDay.description);
    };

    const getTourProgramDays = (data) => {
        return data.map((x) => {
            var container = {};
            container.id = x.day;
            return container;
        });
    };

    const tourProgramFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={onCancel} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={onSubmit} />
            {/* <div>{activeIndex}</div> */}
        </>
    );

    const editTourGallery = (data) => {
        setTitle(data.title);
        setTourId(data.id);
        dispatch(getTourAvailableImages({ tourId: data.id, imageType: 1 }));
        dispatch(getTourGalleryPhotos(data.id));
        // const tourProgramArray = toursPrograms.filter(x => x.tourId === data.id);
        // setTourProgram(tourProgramArray);
        // var days = getTourProgramDays(tourProgramArray);
        // setTourProgramDays(days);
        // setTitle(data.title);
        // setTourId(data.id);
        // if (tourProgramArray && tourProgramArray.length > 0) {
        //     var first = tourProgramArray[0];

        //     setProgramId(first.id);
        //     setProgramSelectedDay(first.day);
        //     setProgramDayTitle(first.title);
        //     setProgramDayDescription(first.description);
        //     setProgramDay(first.day);
        // }
        setTourGalleryImagesVisible(true);
    };

    const onTourPhotosGalleryDialogCancel = () => {
        setTourGalleryImagesVisible(false);
    };

    const onTourPhotosGalleryDialogOk = () => {
        dispatch(saveTourPhotosGallery({ tourId: tourId, galleryImages: tourGalleryPhotos }));
        setTourGalleryImagesVisible(false);
    };

    const tourPhotosGalleryDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={onTourPhotosGalleryDialogCancel} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={onTourPhotosGalleryDialogOk} />
        </>
    );

    const checkDateRange = (data) => {
        return data && data.length === 2 && data.every((element) => element);
    };
    //facilities
    const onIncludedFacilitiesChange = (data) => {
        let list = [...data];
        var facilities = [...tourFacilities];
        var excludedNewList = facilities.filter((x) => !list.includes(x.id));
        setExcludedFacilities(excludedNewList);
        setTourIncludedFacilities(list);
    };

    const onExcludedFacilitiesChange = (data) => {
        let list = [...data];
        var facilities = [...tourFacilities];
        var includedNewList = facilities.filter((x) => !list.includes(x.id));
        setIncludedFacilities(includedNewList);
        setTourExcludedFacilities(list);
    };

    const onTourDatesChange = (e) => {
        setDates(e.value);
        if (isTourDatesActive && checkDateRange(e.value)) {
            const days = (new Date(e.value[1]) - new Date(e.value[0])) / (1000 * 3600 * 24) + 1;
            setDays(days);
        }
    };

    const onTourDatesActive = (e) => {
        setIsTourDatesActive(e);
        if (e) {
            var datesValid = checkDateRange(dates);
            if (datesValid) {
                var d = [...dates];

                const days = (new Date(d[1]) - new Date(d[0])) / (1000 * 3600 * 24) + 1;
                setDays(days);
            }
        }
    };

    // const updateStoreTourGalleryPhotos = (value) => {
    //     dispatch(updateTourGalleryPhotos(value));
    // }

    const galleryImageItemTemplate = (item) => {
        return (
            <div>
                <div className="formgrid grid ">
                    <div className="field col-6  p-1 flex justify-content-center">
                        <img className="w-12rem shadow-2 flex-shrink-0 border-round" src={`${BASE_API_URL}${item.imageUrl}`} alt={item.imageDescription} />
                    </div>
                    <div className="field col-6 p-1">
                        <label htmlFor="tour-map-location1">Photo title</label>
                        <InputText small id="tour-map-location1" value={galleryPhotoTitle} onChange={(e) => setGalleryPhotoTitle(e.target.value)} />
                        {/* {item.imageUrl} */}
                    </div>
                </div>

                {/* <div className="field col-6">
                    <img className="w-12rem shadow-2 flex-shrink-0 border-round" src={`${BASE_API_URL}${item.imageUrl}`} alt={item.imageDescription} />
                </div>
                <div className="field">

                    <label htmlFor="tour-map-location1">Photo title</label>
                    <InputText small id="tour-map-location1" value={galleryPhotoTitle} onChange={(e) => setGalleryPhotoTitle(e.target.value)} />
                </div> */}
            </div>
        );
        // return (
        //     <div className="flex flex-wrap p-2 align-items-center gap-3">
        //         <img className="w-6rem shadow-2 flex-shrink-0 border-round" src={`${BASE_API_URL}${item.imageUrl}`} alt={item.imageDescription} />
        //         <div className="flex-1 flex flex-column gap-2 xl:mr-8">

        //             <label htmlFor="tour-map-location1">Photo title</label>
        //             <InputText small id="tour-map-location1" value={galleryPhotoTitle} onChange={(e) => setGalleryPhotoTitle(e.target.value)} />
        //         </div>
        //     </div>

        // );
    };

    const onTourGalleryPhotosChange = (event) => {
        dispatch(
            updatePickList({
                availableImages: event.source,
                galleryImages: event.target
            })
        );
    };

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}>
                        {' '}
                        <div>{thumbnailUrl}</div>
                    </Toolbar>

                    <DataTable
                        ref={dt}
                        value={tours}
                        selection={selectedItems}
                        onSelectionChange={(e) => setSelectedItems(e.value)}
                        dataKey="id"
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} tours"
                        globalFilter={globalFilter}
                        emptyMessage="No tours found."
                        header={header}
                        responsiveLayout="scroll"
                        showGridlines
                        resizableColumns
                    >
                        <Column body={actionBodyTemplate}></Column>
                        <Column field="isActive" header="Active" sortable body={isActiveBodyTemplate}></Column>
                        <Column header="Image" body={imageBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="title" header="Title" headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column header="Descriptions" body={tourDescriptionTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column header="Tour program" body={tourProgramTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column header="Gallery" body={tourGalleryTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="seoUrl" header="SeoUrl" headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="departure.value" header="Departure" sortable headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="destination.value" header="Destination" sortable headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="holiday.value" header="Holiday" sortable headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="transport.value" header="Transport" sortable headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column header="Attributes" body={tourAttributesTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column header="From" body={dateFromBodyTemplate} headerStyle={{ width: '7%', minWidth: '10rem' }}></Column>
                        <Column header="To" body={dateToBodyTemplate} headerStyle={{ width: '7%', minWidth: '10rem' }}></Column>
                        <Column field="days" header="Days" sortable headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="price" header="Price" sortable headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="currency" header="Currency" headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        {/* <Column field="shortDescription" header="Short description"></Column> */}
                        <Column field="isRecommended" header="Recommended" hidden></Column>
                        <Column field="id" header="Id" sortable headerStyle={{ width: '5%', minWidth: '10rem' }}></Column>
                    </DataTable>

                    <Dialog visible={itemDialog} style={{ width: '900px' }} header="Tour details" modal className="p-fluid" footer={itemDialogFooter} onHide={hideItemDialog}>
                        {/* {item.image && <img src={`assets/demo/images/product/${item.image}`} alt={item.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />} */}

                        <div className="field-checkbox">
                            <Checkbox inputId="tour-is-active" checked={isActive} onChange={(e) => setIsActive(e.checked)} />
                            <label htmlFor="tour-is-active">Active</label>
                        </div>
                        <div className="field-checkbox">
                            <Checkbox inputId="tour-is-recommended" checked={isRecommended} onChange={(e) => setIsRecommended(e.checked)} />
                            <label htmlFor="tour-is-recommended">Recommended</label>
                        </div>
                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="tour-top-destination">Top departure</label>
                                <Dropdown
                                    id="tour-top-destination"
                                    options={tourTopDestinations}
                                    value={topDeparture}
                                    optionLabel="title"
                                    optionValue="id"
                                    onChange={(e) => onTopDepartureChange(e.value)}
                                    placeholder="Select a top departure"
                                    className={classNames({ 'p-invalid': submitted && !topDeparture })}
                                />
                                {submitted && topDeparture === 0 && <small className="p-invalid">Top departure is required.</small>}
                            </div>
                            <div className="field col">
                                <label htmlFor="tour-destination">Departure</label>
                                <Dropdown
                                    id="tour-destination"
                                    options={tourDepartureDepartures}
                                    value={departure}
                                    optionLabel="title"
                                    optionValue="id"
                                    onChange={(e) => setDeparture(e.value)}
                                    placeholder="Select a departure"
                                    className={classNames({ 'p-invalid': submitted && !departure })}
                                />
                                {submitted && departure === 0 && <small className="p-invalid">Departure is required.</small>}
                            </div>
                            <div className="field col">
                                <label htmlFor="tour-top-destination">Top destination</label>
                                <Dropdown
                                    id="tour-top-destination"
                                    options={tourTopDestinations}
                                    value={topDestination}
                                    optionLabel="title"
                                    optionValue="id"
                                    onChange={(e) => onTopDestinationChange(e.value)}
                                    placeholder="Select a top destination"
                                    className={classNames({ 'p-invalid': submitted && !topDestination })}
                                />
                                {submitted && topDestination === 0 && <small className="p-invalid">Top destination is required.</small>}
                            </div>
                            <div className="field col">
                                <label htmlFor="tour-destination">Destination</label>
                                <Dropdown
                                    id="tour-destination"
                                    options={tourDestinationDestinations}
                                    value={destination}
                                    optionLabel="title"
                                    optionValue="id"
                                    onChange={(e) => setDestination(e.value)}
                                    placeholder="Select a destination"
                                    className={classNames({ 'p-invalid': submitted && !destination })}
                                />
                                {submitted && destination === 0 && <small className="p-invalid">Destination is required.</small>}
                            </div>
                        </div>
                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="tour-holiday">Holiday</label>
                                <Dropdown
                                    id="tour-holiday"
                                    options={tourHolidays}
                                    value={holiday}
                                    optionLabel="title"
                                    optionValue="id"
                                    onChange={(e) => setHoliday(e.value)}
                                    placeholder="Select a holiday"
                                    className={classNames({ 'p-invalid': submitted && !holiday })}
                                />
                                {submitted && holiday === 0 && <small className="p-invalid">Holiday is required.</small>}
                            </div>
                            <div className="field col">
                                <label htmlFor="tour-transport">Transport</label>
                                <Dropdown
                                    id="tour-transport"
                                    options={tourTransports}
                                    value={transport}
                                    optionLabel="title"
                                    optionValue="id"
                                    onChange={(e) => setTransport(e.value)}
                                    placeholder="Select a transport"
                                    className={classNames({ 'p-invalid': submitted && !transport })}
                                />
                                {submitted && transport === 0 && <small className="p-invalid">Transport is required.</small>}
                            </div>

                            <div className="field col-6">
                                <label htmlFor="tour-title">Title</label>
                                <InputText id="tour-title" value={title} onChange={(e) => setTitle(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !title })} />
                                {submitted && !title && <small className="p-invalid">Тitle is required.</small>}
                            </div>
                        </div>
                        <div className="formgrid grid">
                            <div className="field col-8">
                                <label htmlFor="tour-attributes">Attributes</label>
                                <MultiSelect
                                    id="tour-attributes"
                                    display="chip"
                                    optionLabel="title"
                                    optionValue="id"
                                    value={attributes}
                                    options={tourAttributes}
                                    onChange={(e) => setAttributes(e.value)}
                                    className={classNames({ 'p-invalid': submitted && attributes.length === 0 })}
                                />
                                {submitted && attributes.length === 0 && <small className="p-invalid">At least one attribute is required.</small>}
                            </div>
                            <div className="field col-4">
                                <label htmlFor="tour-seo-url">Seo url</label>
                                <InputText id="tour-seo-url" value={seoUrl} onChange={(e) => setSeoUrl(e.target.value)} className={classNames({ 'p-invalid': submitted && !seoUrl })} />
                                {submitted && !seoUrl && <small className="p-invalid">Seo-url is required.</small>}
                            </div>
                        </div>
                        <div className="formgrid grid">
                            <div className="field col-1 ">
                                <div className="field-checkbox center">
                                    <Checkbox inputId="tour-dates-active" checked={isTourDatesActive} onChange={(e) => onTourDatesActive(e.checked)} />
                                    <label htmlFor="tour-dates-active">Active</label>
                                </div>
                            </div>
                            <div className="field col-4">
                                <label htmlFor="tour-date-from">Dates</label>
                                <Calendar
                                    id="tour-date-from"
                                    required
                                    selectionMode="range"
                                    numberOfMonths="2"
                                    showIcon
                                    showButtonBar
                                    dateFormat="dd/mm/yy"
                                    value={dates}
                                    onChange={(e) => onTourDatesChange(e)}
                                    className={classNames({ 'p-invalid': submitted && isTourDatesActive && !checkDateRange(dates) })}
                                ></Calendar>
                                {submitted && isTourDatesActive && !checkDateRange(dates) && <small className="p-invalid">Dates required.</small>}
                            </div>
                            <div className="field col-2">
                                <label htmlFor="tour-days">Days</label>
                                <InputNumber inputId="tour-days" value={days} disabled={isTourDatesActive} onValueChange={(e) => setDays(e.value)} className={classNames({ 'p-invalid': submitted && !days })} />
                                {submitted && !days && <small className="p-invalid">Days required.</small>}
                            </div>
                            <div className="field col-1">
                                <div className="field-checkbox">
                                    <Checkbox inputId="is-tour-price-from" checked={isTourPriceFrom} onChange={(e) => setIsTourPriceFrom(e.checked)} />
                                    <label htmlFor="is-tour-price-from">From</label>
                                </div>
                            </div>
                            <div className="field col-2">
                                <label htmlFor="tour-price">Price</label>
                                <InputNumber id="tour-price" value={price} onValueChange={(e) => setPrice(e.value)} mode="decimal" />
                            </div>
                            <div className="field col-2">
                                <label htmlFor="tour-currency">Currency</label>
                                <Dropdown
                                    id="tour-currency"
                                    options={currenciesList}
                                    value={currency}
                                    optionLabel="title"
                                    optionValue="id"
                                    onChange={(e) => setCurrency(e.value)}
                                    placeholder="Select a currency"
                                    className={classNames({ 'p-invalid': submitted && !currency })}
                                />
                                {submitted && !currency && <small className="p-invalid">Currency is required.</small>}
                            </div>
                        </div>
                        <div className="field">
                            <label htmlFor="tour-included-facilities">Included facilities</label>
                            <MultiSelect id="tour-included-facilities" display="chip" optionLabel="title" optionValue="id" value={tourIncludedFacilities} options={includedFacilities} onChange={(e) => onIncludedFacilitiesChange(e.value)} />
                        </div>
                        <div className="field">
                            <label htmlFor="tour-excluded-facilities">Excluded facilities</label>
                            <MultiSelect id="tour-excluded-facilities" display="chip" optionLabel="title" optionValue="id" value={tourExcludedFacilities} options={excludedFacilities} onChange={(e) => onExcludedFacilitiesChange(e.value)} />
                        </div>
                        <div className="formgrid grid">
                            <div className="field col-8">
                                <label htmlFor="tour-map-location">Map location</label>
                                <InputText id="tour-map-location" value={mapLocation} onChange={(e) => setMapLocation(e.target.value)} />
                            </div>
                            <div className="field col-4">
                                <label htmlFor="tour-sort-order">Sort order</label>
                                <InputNumber inputId="tour-sort-order" value={sortOrder} onValueChange={(e) => setSortOrder(e.value)} />
                            </div>
                        </div>

                        {/* <div className="formgrid grid ">
                            <div className="field col-3">
                                <img src={`${BASE_API_URL}${thumbnailUrl}`} alt={thumbnailUrl} className="shadow-2" width="200" />
                            </div>
                            <div className={tourId == 0 ? "hidden" : "field col"}>
                                <Button className="w-auto mb-4" label="Select other image" icon="pi pi-check" onClick={(e) => setCarouselVisible(true)}></Button>
                                <FileUpload name="thumbnail-image-upload" url={`${BASE_API_URL}/api/upload/tours/${tourId}`} chooseOptions={{ label: 'Upload', icon: 'pi pi-upload', className: 'p-button-success' }} mode='basic' auto accept="image/*"/>
                            </div>
                        </div> */}

                        {/* <div className="formgrid grid">
                            <div className="field col">
                                <CarouselView visible={carouselVisible} />
                            </div>
                        </div> */}
                    </Dialog>

                    <Dialog visible={tourProgramDialogVisible} style={{ width: '900px' }} header={`${title}`} modal className="p-fluid" footer={tourProgramFooter} onHide={onCancel}>
                        {/* {item.image && <img src={`assets/demo/images/product/${item.image}`} alt={item.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />} */}
                        <div className="field">
                            <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={addNewProgramDay} />
                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="tour-program-days">Day</label>
                                <Dropdown id="tour-program-days" options={tourProgramDays} value={programSelectedDay} optionLabel="id" optionValue="id" onChange={(e) => onDayChange(e.value)} placeholder="Select a program day" />
                                {/* {submitted && !topDestination.value && <small className="p-invalid">Top destination is required.</small>} */}
                            </div>
                            <div className="field col-6">
                                <label htmlFor="tour-title">Title</label>
                                <InputText id="tour-title" value={programDayTitle} onChange={(e) => setProgramDayTitle(e.target.value)} required autoFocus /*className={classNames({ 'p-invalid': submitted && !title })}*/ />
                                {/* {submitted && !title && <small className="p-invalid">title is required.</small>} */}
                            </div>
                        </div>
                        <div className="field">
                            <Editor style={{ height: '320px' }} value={programDayDescription} onTextChange={(e) => setProgramDayDescription(e.htmlValue)} />
                        </div>
                    </Dialog>

                    <Dialog visible={tourDescriptionDialogVisible} style={{ width: '900px' }} header={`${title} descriptions`} modal className="p-fluid" footer={tourDescriptionDialogFooter} onHide={onTourDescriptionDialogCancel}>
                        <div className="field">
                            <label htmlFor="tour-short-description">Short description</label>
                            <InputTextarea
                                id="tour-short-description"
                                value={shortDescription}
                                onChange={(e) => setShortDescription(e.target.value)}
                                required
                                rows={2}
                                cols={20}
                                className={classNames({ 'p-invalid': submitted && !shortDescription })}
                            />
                            {submitted && !shortDescription && <small className="p-invalid">Short description is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="tour-description">Full description</label>
                            <Editor style={{ height: '400px' }} value={description} onTextChange={(e) => setDescription(e.htmlValue)} required className={classNames({ 'p-invalid': submitted && !description })} />
                            {submitted && !description && <small className="p-invalid">Description is required.</small>}
                        </div>
                    </Dialog>

                    <Dialog visible={tourDescriptionDialogVisibleN} style={{ width: '1200px' }} header={`${title} descriptions`} modal className="p-fluid" footer={tourDescriptionDialogFooter} onHide={onTourDescriptionDialogCancel}>
                        <div className="field">
                            <label htmlFor="tour-short-description">Short description</label>
                            <InputTextarea
                                id="tour-short-description"
                                value={shortDescription}
                                onChange={(e) => setShortDescription(e.target.value)}
                                required
                                rows={2}
                                cols={20}
                                className={classNames({ 'p-invalid': submitted && !shortDescription })}
                            />
                            {submitted && !shortDescription && <small className="p-invalid">Short description is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="tour-description">Full description</label>
                            {/* <Editor style={{ height: '400px' }} value={description} onTextChange={(e) => setDescription(e.htmlValue)} required className={classNames({ 'p-invalid': submitted && !description })} /> */}
                            <TinyEditor initialValue={description} onEditorChange={onDescriptionChange}></TinyEditor>
                            {submitted && !description && <small className="p-invalid">Description is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="tour-meta-description">Meta description</label>
                            <InputTextarea id="tour-meta-description" value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} required rows={6} cols={20} className={classNames({ 'p-invalid': submitted && !metaDescription })} />
                            {submitted && !metaDescription && <small className="p-invalid">Meta description is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="tour-meta-keywords">Meta keywords</label>
                            <InputTextarea id="tour-meta-keywords" value={metaKeywords} onChange={(e) => setMetaKeywords(e.target.value)} rows={2} cols={20} />
                            {/* {submitted && !shortDescription && <small className="p-invalid">Meta keywords is required.</small>} */}
                        </div>
                    </Dialog>

                    <Dialog visible={tourGalleryImagesVisible} style={{ width: '1200px', height: '800px' }} header={`${title} photo gallery`} modal className="p-fluid" footer={tourPhotosGalleryDialogFooter} onHide={onTourPhotosGalleryDialogCancel}>
                        <div>
                            <FileUpload
                                name="thumbnail-image-upload"
                                url={`${BASE_API_URL}/api/upload/${tourId}`}
                                multiple
                                chooseOptions={{ label: 'Upload new photos', icon: 'pi pi-upload', className: 'p-button-success' }}
                                mode="basic"
                                auto
                                accept="image/*"
                                onUpload={() => onUploadComplete(1)}
                            />
                        </div>
                        <div className="card xl:justify-content-center">
                            <PickList
                                source={tourAvailableImages}
                                target={tourGalleryPhotos}
                                onChange={onTourGalleryPhotosChange}
                                itemTemplate={galleryImageItemTemplate}
                                showSourceControls={false}
                                sourceHeader="Available photos"
                                targetHeader="Gallery photos"
                                sourceStyle={{ minHeight: '40rem', maxHeight: '40rem' }}
                                targetStyle={{ minHeight: '40rem', maxHeight: '40rem' }}
                            />
                        </div>
                    </Dialog>

                    <Dialog visible={deleteItemDialog} style={{ width: '450px' }} header="Delete confirm" modal footer={deleteItemDialogFooter} onHide={onTourDeleteDialogCancel}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {item && (
                                <span>
                                    Are you sure you want to delete tour <b>{title}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    {/* <Dialog visible={deleteItemsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteItemsDialogFooter} onHide={hideDeleteItemsDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {item && <span>Are you sure you want to delete the selected tour?</span>}
                        </div>
                    </Dialog> */}

                    <Dialog visible={mainImageDialogVisible} style={{ width: '450px' }} header="Tour main image" modal className="p-fluid" footer={mainImageDialogFooter} onHide={onMainImageDialogCancel}>
                        <div className="formgrid grid ">
                            <div className="field col-6">
                                <img src={`${BASE_API_URL}${thumbnailUrl}`} alt={thumbnailUrl} className="shadow-2" width="200px" />
                            </div>
                            <div className="field col-6">
                                <Button className="w-auto mb-4" label="Select other image" icon="pi pi-check" onClick={(e) => getAvailableImages(tourId)}></Button>
                                <FileUpload
                                    name="thumbnail-image-upload"
                                    url={`${BASE_API_URL}/api/upload/${tourId}`}
                                    multiple
                                    chooseOptions={{ label: 'Upload', icon: 'pi pi-upload', className: 'p-button-success' }}
                                    mode="basic"
                                    auto
                                    accept="image/*"
                                    onUpload={() => onUploadComplete(0)}
                                />
                            </div>
                        </div>
                        <div className="formgrid grid">
                            <div className="field col-12">
                                <CarouselView visible={carouselVisible} />
                            </div>
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default Tours;
