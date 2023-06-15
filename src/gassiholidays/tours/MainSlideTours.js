import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Toolbar } from 'primereact/toolbar';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import TourService from '../../service/TourService';


const MainSlideTours = () => {

    const [items, setItems] = useState([]);
    const [item, setItem] = useState(null);
    const [tours, setTours] = useState([{ id: 1, title: "tour1" }, { id: 2, title: "tour2" }]);
    const [tour, setTour] = useState();

    //item fields
    const [id, setId] = useState();
    const [tourId, setTourId] = useState();
    const [tourTitle, setTourTitle] = useState();
    const [sortOrder, setSortOrder] = useState();
    const [showFrom, setShowFrom] = useState();
    const [showUntil, setShowUntil] = useState();

    const [itemDialog, setItemDialog] = useState(false);
    const [deleteItemDialog, setDeleteItemDialog] = useState(false);


    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        const tourService = new TourService();
        tourService.getSlideTours(0).then((data) => setItems(data));
        tourService.getSlideTours(1).then((data) => setTours(data));
    }, []);

    const itemFromFields = () => {
        return {
            id: id,
            tourId: tourId,
            tourTitle: tourTitle,
            showFrom: showFrom,
            showUntil: showUntil,
            sortOrder: sortOrder
        }
    };

    const itemToFields = (item) => {
        setId(item.id);
        setTourId(item.tourId);
        setTourTitle(item.tourTitle);
        setShowFrom(item.showFrom);
        setShowUntil(item.showTo);
        setSortOrder(item.sortOrder);
    }

    const createNew = () => {
        setId(0);
        setTourId(0);
        setTourTitle('');
        setShowFrom();
        setShowUntil();
        setSortOrder(0);
        setSubmitted(false);
        setItemDialog(true);
    };

    const editItem = (itemRow) => {
        const itemCopy = { ...itemRow };
        itemToFields(itemCopy);
        setItemDialog(true);
    };

    const onCancelDialog = () => {
        setSubmitted(false);
        setItemDialog(false);
    };

    const hideDeleteItemDialog = () => {
        setDeleteItemDialog(false);
    };

    const saveItem = () => {
        setSubmitted(true);
        if (tourId !== 0) {
            var slideTourItem = itemFromFields();
            var toursService = new TourService();
            toursService.saveMainSlideTours(slideTourItem);
            setItemDialog(false);
            var tempItems = [...items];
            tempItems.push(slideTourItem);
            setItems(tempItems);
            var newTours = tours.filter(function( obj ) {
                return obj.tourId !== tourId;
            });
            setTours(newTours);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Slide tour has been saved', life: 2000 });
        }
    };

    const confirmDeleteItem = (item) => {
        console.log('delete item');
        console.log(item);
        const itemCopy = { ...item };
        itemToFields(itemCopy);
        setDeleteItemDialog(true);
    };

    const deleteItem = () => {
        var tourService = new TourService();
        tourService.removeSlideTours([id]);

     
        var itemsCopy = [...items]
        console.log(itemsCopy);

        const newArray = itemsCopy.filter(function (item) {
            return item.id !== id;
        });

      
            setItems(newArray);
     

        // toast.current.show({ severity: 'error', summary: 'Delete error', detail: "An error occured while deleting item", life: 3000 });
        setDeleteItemDialog(false);
        toast.current.show({ severity: 'success', summary: 'Delete success', detail: "Item deleted", life: 3000 });
    };

    const setTourValues = (tourId) => {
        setTourId(tourId);
        var t = tours.find(x => x.tourId === tourId);
        setTourTitle(t.tourTitle);
    }


    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={createNew} />
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="mr-2 inline-block" />
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </React.Fragment>
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                {/* <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editItem(rowData)} /> */}
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger mt-2" onClick={() => confirmDeleteItem(rowData)} />
            </div>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Manage Main Slide Tours</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const itemDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={onCancelDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveItem} />
        </>
    );
    const deleteItemDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteItemDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteItem} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable
                        ref={dt}
                        value={items}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} main slide tours"
                        globalFilter={globalFilter}
                        emptyMessage="No destinations top found."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column body={actionBodyTemplate} headerStyle={{ width: '5%', minWidth: '5%' }}></Column>
                        <Column field="tourTitle" header="Tour title" sortable ></Column>
                        <Column field="sortOrder" header="Sort order" headerStyle={{ width: '10%', minWidth: '10%' }}></Column>
                        <Column field="showFrom" header="Show from" sortable headerStyle={{ width: '10%', minWidth: '10%' }}></Column>
                        <Column field="showUntil" header="Show until" sortable headerStyle={{ width: '10%', minWidth: '10%' }}></Column>
                        <Column field="id" header="Id" hidden headerStyle={{ width: '5%', minWidth: '10rem' }}></Column>
                        <Column field="tourId" header="Tour Id" hidden></Column>
                    </DataTable>

                    <Dialog visible={itemDialog} style={{ width: '450px' }} header={`Main slide tour [${tourId}]`} modal className="p-fluid" footer={itemDialogFooter} onHide={onCancelDialog}>
                        <div className="field">
                            <label htmlFor="main-slide-tour">Slide tour</label>
                            <Dropdown id="main-slide-tour" options={tours} value={tourId} optionLabel="tourTitle" optionValue="tourId" onChange={(e) => setTourValues(e.value)} placeholder="Select a tour" className={classNames({ 'p-invalid': submitted && !tourId })} />
                            {submitted && tourId && <small className="p-invalid">Tour is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="top-destination-sort-order">Sort order</label>
                            <InputNumber id="top-destination-sort-order" value={sortOrder} onValueChange={(e) => setSortOrder(e.value)} mode="decimal" />
                        </div>
                        <div className="field">
                            <label htmlFor="slide-tour-show-from">Show from</label>
                            <Calendar id="slide-tour-show-from" selectionMode="single" showIcon showButtonBar showTime hourFormat="24" dateFormat="dd/mm/yy" value={showFrom} onChange={(e) => setShowFrom(e.value)} ></Calendar>
                        </div>
                        <div className="field">
                            <label htmlFor="slide-tour-show-until">Show until</label>
                            <Calendar id="slide-tour-show-until" selectionMode="single" showIcon showButtonBar showTime hourFormat="24" dateFormat="dd/mm/yy" value={showUntil} onChange={(e) => setShowUntil(e.value)} ></Calendar>
                        </div>
                    </Dialog>

                    <Dialog visible={deleteItemDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteItemDialogFooter} onHide={hideDeleteItemDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {tourId > 0 && (
                                <span>
                                    Are you sure you want to delete tour <b>{tourTitle}</b> from main slide?
                                </span>
                            )}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default MainSlideTours;
