import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { Checkbox } from 'primereact/checkbox';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Editor } from 'primereact/editor';
import { Image } from 'primereact/image';

import { Carousel } from 'primereact/carousel';
import ArticleService from '../../service/ArticleService';

import { BASE_API_URL } from '../constants/settings';
const DEFAULT_IMAGE_PATH = '/images/backgrounds/background-38-1920x900.jpg';

const Articles = () => {

    const [items, setItems] = useState([]);
    const [item, setItem] = useState(null);

    //item fields
    const [id, setId] = useState();
    const [title, setTitle] = useState();
    const [seoUrl, setSeoUrl] = useState();
    const [isActive, setIsActive] = useState();
    const [image, setImage] = useState();
    const [bodyText, setBodyText] = useState();

    const [globalFilter, setGlobalFilter] = useState(null);
    const [itemDialog, setItemDialog] = useState();
    const [deleteItemDialog, setDeleteItemDialog] = useState();
    const [carouselVisible, setCarouselVisible] = useState();
    const [images, setImages] = useState();
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);
    const dt = useRef(null);



    const defaultImagePath = '/images/backgrounds/background-38-1920x900.jpg';

    useEffect(() => {
        const articleService = new ArticleService();
        articleService.getArticles().then((data) => setItems(data));
        articleService.getImages().then((data) => setImages(data));
    }, []);

    const itemFromFields = () => {
        return {
            id: id,
            title: title,
            seoUrl: seoUrl,
            bodyText: bodyText,
            imagePath: image,
            isActive: isActive
        }
    };

    const itemToFields = (item) => {
        setId(item.id);
        setTitle(item.title);
        setSeoUrl(item.seoUrl);
        setBodyText(item.bodyText);
        setImage(item.imagePath);
        setIsActive(item.isActive);
    }

    const createNew = () => {
        setId(0);
        setTitle('');
        setImage(defaultImagePath);
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
            var articleService = new ArticleService();
            articleService.saveArticle({ ...item });
            setItemDialog(false);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Article has been saved', life: 2000 });
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
                <span className="p-column-title">Is active</span>
                <Checkbox inputId="top-destination-item-is-active" checked={rowData.isActive} />
            </>
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editItem(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeleteItem(rowData)} />
            </div>
        );
    };

    const imageBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Image</span>
                <img src={`${BASE_API_URL}${rowData.imagePath}`} alt={rowData.imagePath} className="shadow-2" width="100" />
            </>
        );
    };

    const imageSelected = (url) => {
        // if (tourId) {
        //     var tours = [...items];
        //     var tour = tours.find(x => x.id === tourId);
        //     tour.thumbnailUrl = url;
        //     setItems(tours);
        // }

        setImage(url);
        setCarouselVisible(false);
    }

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

    const itemTemplate = (image) => {
        var url = image.itemImageSrc;
        return <div>
            <img src={`${BASE_API_URL}${url}`} alt={url} width="150" height="100" onClick={(e) => imageSelected(url)} />;
        </div>
    };


    const CarouselView = (props) => {
        const visible = props.visible;
        if (visible) {
            return <Carousel className="ui-carousel" value={images} itemTemplate={itemTemplate} responsiveOptions={carouselResponsiveOptions} numVisible={3} numScroll={1}></Carousel>;
        }
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Manage Articles</h5>
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
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} articles"
                        globalFilter={globalFilter}
                        emptyMessage="No articles found."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column body={actionBodyTemplate} headerStyle={{ width: '2%', minWidth: '7rem' }}></Column>
                        <Column header="Image" body={imageBodyTemplate} headerStyle={{ width: '10%', minWidth: '10rem' }}></Column>
                        <Column field="title" header="Title" sortable headerStyle={{ width: '33%', minWidth: '10rem' }}></Column>
                        <Column field="isActive" header="Active" body={isActiveBodyTemplate} headerStyle={{ width: '3%', minWidth: '10rem' }}></Column>
                        <Column field="id" header="Id" sortable headerStyle={{ width: '5%', minWidth: '10rem' }}></Column>
                    </DataTable>

                    <Dialog visible={itemDialog} style={{ width: '900px' }} header={`Article [${id}]`} modal className="p-fluid" footer={itemDialogFooter} onHide={onCancelDialog}>
                        <div className="formgrid grid">
                            <div className="field col-6">
                                <div>
                                    <Image src={`${BASE_API_URL}${image}`} alt="Image" width="100%" />
                                </div>
                            </div>
                            <div className="field col-6">
                                <div className="field">
                                    <label htmlFor="article-title">Title (text on image)</label>
                                    <InputText id="article-title" value={title} onChange={(e) => setTitle(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !title })} />
                                    {submitted && !title && <small className="p-invalid">Title is required.</small>}
                                </div>
                                <div className="field">
                                    <label htmlFor="article-seourl">Seo Url</label>
                                    <InputText id="article-seourl" value={seoUrl} onChange={(e) => setSeoUrl(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !seoUrl })} />
                                    {submitted && !seoUrl && <small className="p-invalid">Seo url is required.</small>}
                                </div>
                                <div className="formgrid grid">
                                    <div className="field col-6">
                                        <Button className="w-auto mb-4" label="Select other image" icon="pi pi-check" onClick={(e) => setCarouselVisible(true)}></Button>
                                    </div>
                                    <div className="field col-6">
                                        <FileUpload name="thumbnail-image-upload" url={`${BASE_API_URL}/api/upload/backgrounds`} chooseOptions={{ label: 'Upload', icon: 'pi pi-upload', className: 'p-button-success' }} mode='basic' auto />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="formgrid grid">
                            <div className="field col">
                                <CarouselView visible={carouselVisible} />
                            </div>
                        </div>

                        <div className="field">
                            <Editor style={{ height: '400px' }} value={bodyText} onTextChange={(e) => setBodyText(e.htmlValue)} />
                        </div>

                        <div className="field-checkbox">
                            <Checkbox inputId="destination-is-active" checked={isActive} onChange={e => setIsActive(e.checked)} />
                            <label htmlFor="destination-is-active">Active</label>
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
            </div >
        </div >
    );
};

export default Articles;
