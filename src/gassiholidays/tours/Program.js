import React, { useState} from 'react';
// import { classNames } from 'primereact/utils';
import { Dialog } from 'primereact/dialog';
import { Editor } from 'primereact/editor';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';


const TourProgram = (props) => {

    const [day, setDay] = useState();
    const [selectedDay, setSelectedDay] = useState();
    const [title, setTitle] = useState();
    const [text, setText] = useState(null);

    const [programs, setPrograms] = useState(props.program);
    const [program, setProgram] = useState();

    const onCancel = () => {
        setProgram(null);
        props.onClose(program);
    }

    const onSubmit = () => {
    }

    const onDayChange = (data) => {
        if (day) {
            var edited = {
                day: day,
                title: title,
                description: text
            };
            var programsCopy = [...programs];
            programsCopy[day] = edited;
            setPrograms(programsCopy);
        }

        setProgram(programs.find(x => x.day === data));
        setSelectedDay(data);
        setDay(data);
        setTitle(program.title);
        setText(program.description);
    }

    const tourProgramFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={onCancel} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={onSubmit} />
        </>
    );

    return (
        <Dialog visible={props.visible} style={{ width: '900px' }} header={`${props.tourTitle} program`} modal className="p-fluid" footer={tourProgramFooter} onHide={onCancel}>
            {/* {item.image && <img src={`assets/demo/images/product/${item.image}`} alt={item.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />} */}
            <div className="formgrid grid">
                <div className="field col">
                    <label htmlFor="tour-program-days">Day</label>
                    <Dropdown id="tour-program-days" options={props.days} value={selectedDay} optionLabel="id" optionValue="id" onChange={(e) => onDayChange(e.value)} placeholder="Select a program day" />
                    {/* {submitted && !topDestination.value && <small className="p-invalid">Top destination is required.</small>} */}
                </div>
                <div className="field col-6">
                    <label htmlFor="tour-title">Title</label>
                    <InputText id="tour-title" value={title} onChange={(e) => setTitle(e.target.value)} required autoFocus /*className={classNames({ 'p-invalid': submitted && !title })}*/ />
                    {/* {submitted && !title && <small className="p-invalid">title is required.</small>} */}
                </div>
            </div >
            <div className="field">
                <Editor style={{ height: '320px' }} value={text} onTextChange={(e) => setText(e.htmlValue)} />
            </div>
        </Dialog>);
}
export default TourProgram;
