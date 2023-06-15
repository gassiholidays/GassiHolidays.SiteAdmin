
function TourProgramView(props) {  
    const program = props.program;  
    const programList = program.map((x) =>  
    <li key={x.day}> {x.id} *** {x.day} *** {x.title} *** {x.description}</li>);  
    return (  
    <div>  
    <h2>Program List:</h2>  
    <ul>{programList}</ul>  
    </div>  
    );  
    }  


export default TourProgramView;