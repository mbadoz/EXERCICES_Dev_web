type CoreConceptProps = {
    title: string;
    description: string;
    image: string;
}
const CoreConcept = (props: CoreConceptProps) => {
    return (
        <li>
            <h2>{props.title}</h2>
            <p>{props.description}</p>
            <img src={props.image} alt={props.title} />
        </li>
    );
}; export default CoreConcept;

