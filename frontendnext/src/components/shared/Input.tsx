interface InputTextProps{
    id?: string;
    value?: string;
    type?: string;
    style?: string;
    placeholder?: string;
    onChange?: (event:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const InputText: React.FC<InputTextProps> = ({
    style, type="text", ...inputProps 
}: InputTextProps) => {
    return (
<input 
type={type}
{...inputProps}
className={`${style} border border-zinc-800 px-3 py-2 rounded-lg text-zinc-900`}/>
    );
}

export const TextArea: React.FC<InputTextProps> = ({
    style, ...textProps 
}: InputTextProps) => {
    return (
<textarea 
{...textProps}
className={`${style} border border-zinc-800 px-3 py-3 rounded-xl text-zinc-900`}>
</textarea>
    );
}