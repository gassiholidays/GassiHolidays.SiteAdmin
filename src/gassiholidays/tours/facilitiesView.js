function FacilitiesView(props) {  
    const program = props.program;  
    const programList = program.map((x) =>  
    <li key={x.id}> {x.id} *** {x.day} *** {x.title}</li>);  
    return (  
    <div>  
    <h2>Program List:</h2>  
    <ul>{programList}</ul>  
    </div>  
    );  
    }  


export default FacilitiesView;