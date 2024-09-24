import React from "react";
import { useTranslation } from 'react-i18next';


const Input = React.forwardRef(({ value, onChange, onKeyDown, disabled, onClick }, ref) => {
    const { t } = useTranslation();

     return (
     <form noValidate="" className="py-1 border rounded-2 w-100" onSubmit={onClick}>
     <div className="input-group has-validation">
 
       <input 
         name="body"
         placeholder={t('chat.messagePlaceholder')}
         value={value}
         onChange={onChange}
         onKeyDown={onKeyDown}
         disabled={disabled}
         ref={ref}
         className='border-0 p-0 ps-2 form-control'
       />
       <button type="submit" className="btn btn-group-vertical">
       {t('chat.sendMessage')} 
       </button>
     </div>
     </form>
   );
 });

 export default Input;