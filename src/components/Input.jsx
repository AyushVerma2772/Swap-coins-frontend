import React from 'react'

const Input = ({ type, name, label, readOnly, value, isTextArea, onChangeFunction }) => {
    return (
        <div className="relative w-full mb-7 md:mb-9 group">
            {isTextArea ?
                <textarea name={name} id={`floating_${name}`} className="peer input resize-none scrollbar-hide border-b-purple-400 text-purple-900 focus:border-purple-900" placeholder=" " required rows="3" readOnly={readOnly} value={value} onChange={e => onChangeFunction(e.target.value)}></textarea>
                :
                <input type={type} name={name} id={`floating_${name}`} className="peer input border-b-purple-400 text-purple-900 focus:border-purple-900" placeholder=" " required readOnly={readOnly} value={value} onChange={e => onChangeFunction(e.target.value)} />}

            <label htmlFor={`floating_${name}`} className="z-[10] input-label text-purple-700 peer-focus:text-purple-700">{label}</label>
        </div>
    )
}


export default Input;