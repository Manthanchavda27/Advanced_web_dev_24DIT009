function Skills ({skillslist}){

return(

    <div>
        <ul>
            {skillslist.map((s) => <li key={s}>{s}</li>)}
        </ul>
    </div>

);

}

export default Skills;