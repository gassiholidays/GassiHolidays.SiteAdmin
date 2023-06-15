import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { Checkbox } from 'primereact/checkbox';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Toolbar } from 'primereact/toolbar';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import TourService from '../../service/TourService';

const TourHolidays = () => {

    const [items, setItems] = useState([]);
    // const [item, setItem] =useState(null);

    //item fields
    const [id, setId] = useState();
    const [title, setTitle] = useState();
    const [sortOrder, setSortOrder] = useState();
    const [isActive, setIsActive] = useState();

    const [itemDialog, setItemDialog] = useState(false);
    const [deleteItemDialog, setDeleteItemDialog] = useState(false);


    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        const tourService = new TourService();
        tourService.getHolidays().then((data) => setItems(data));
    }, []);

    const itemFromFields = () => {
        return {
            id: id,
            title: title,
            sortOrder: sortOrder,
            isActive: isActive
        }
    };

    const itemToFields = (item) => {
        setId(item.id);
        setTitle(item.title);
        setSortOrder(item.sortOrder);
        setIsActive(item.isActive);
    }

    const createNew = () => {
        setId(0);
        setTitle('');
        setSortOrder(0);
        setIsActive(false);

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
        if (title.trim()) {
            var item = itemFromFields();
            var toursService = new TourService();
            var result = toursService.saveHolidays({ ...item });
            if (result === 'Ok') {
                setItemDialog(false);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Transport has been saved', life: 2000 });
            }
            else {
                console.log(result);
                toast.current.show({ severity: 'error', summary: 'Failure', detail: 'Transport has not been saved', life: 2000 });
            }
        }

    };

    const confirmDeleteItem = (item) => {
        // setItem(item);
        setDeleteItemDialog(true);
    };

    const deleteItem = () => {
        let _items = items.filter((val) => val.id !== items.id);
        setItems(_items);
        setDeleteItemDialog(false);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Transport Deleted', life: 3000 });
    };


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

    const isActiveBodyTemplate = (rowData) => {
        return (
            <>
                {/* <span className="p-column-title">Is active</span> */}
                <Checkbox inputId="top-destination-item-is-active" checked={rowData.isActive} />
            </>
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning mr-2" onClick={() => editItem(rowData)} />
                {/* <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeleteItem(rowData)} /> */}
            </div>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Manage Holidays</h5>
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
                        // selection={selectedItems}
                        // onSelectionChange={(e) => setSelectedItems(e.value)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} holidays"
                        globalFilter={globalFilter}
                        emptyMessage="No holidays found."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column body={actionBodyTemplate} headerStyle={{ width: '5%', minWidth: '5%' }}></Column>
                        <Column field="isActive" header="Active" body={isActiveBodyTemplate} headerStyle={{ width: '5%', minWidth: '5%' }}></Column>
                        <Column field="title" header="Title" sortable></Column>
                        <Column field="sortOrder" header="Sort" sortable headerStyle={{ width: '10%', minWidth: '10%' }}></Column>
                        <Column field="id" header="Id" hidden sortable headerStyle={{ width: '10%', minWidth: '10%' }}></Column>
                    </DataTable>

                    <Dialog visible={itemDialog} style={{ width: '450px' }} header={`Destination top [${id}]`} modal className="p-fluid" footer={itemDialogFooter} onHide={onCancelDialog}>
                        <div className="field">
                            <label htmlFor="top-destination-title">Title</label>
                            <InputText id="top-destination-title" value={title} onChange={(e) => setTitle(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !title })} />
                            {submitted && !title && <small className="p-invalid">Title is required.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="top-destination-sort-order">Sort order</label>
                            <InputNumber id="top-destination-sort-order" value={sortOrder} onValueChange={(e) => setSortOrder(e.value)} mode="decimal" />
                        </div>
                        <div className="field-checkbox">
                            <Checkbox inputId="top-destination-is-active" checked={isActive} onChange={e => setIsActive(e.checked)} />
                            <label htmlFor="top-destination-is-active">Active</label>
                        </div>
                    </Dialog>

                    <Dialog visible={deleteItemDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteItemDialogFooter} onHide={hideDeleteItemDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {id > 0 && (
                                <span>
                                    Are you sure you want to delete <b>{title}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default TourHolidays;
