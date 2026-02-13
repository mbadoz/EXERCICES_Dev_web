interface InputProps {
    richText?: boolean;
    type?: string;
    placeholder: string;
}
const Input = ({ richText, type, placeholder }: InputProps) => {
    return (
        <>
            {richText ? <textarea placeholder={placeholder} /> : <input type={type} placeholder={placeholder} />}
        </>
    )

}
export default Input;