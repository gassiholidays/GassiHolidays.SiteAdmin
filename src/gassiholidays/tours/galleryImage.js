const GalleryImage = () => {
    const [title, setTitle] = useState();
    return (
        <div className="flex flex-wrap p-2 align-items-center gap-3">
            <img className="w-6rem shadow-2 flex-shrink-0 border-round" src={`${BASE_API_URL}${item.imageUrl}`} alt={item.imageDescription} />
            <div className="flex-1 flex flex-column gap-2 xl:mr-8">
                <label htmlFor="gallery-image-title">Photo title</label>
                <InputText id="gallery-image-title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
        </div>
    );
};

export default GalleryImage;
