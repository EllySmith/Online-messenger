import React from "react";

const Input = React.forwardRef(({ value, onChange, onKeyDown, disabled, onClick }, ref) => {

     return (
     <form novalidate="" class="py-1 border rounded-2 w-100" onSubmit={onClick}>
     <div className="input-group has-validation">
 
       <input 
         name="body"
         placeholder="Type your message..." 
         value={value}
         onChange={onChange}
         onKeyDown={onKeyDown}
         disabled={disabled}
         ref={ref}
         className='border-0 p-0 ps-2 form-control'
       />
       <button type="submit" className="btn btn-group-vertical">
       Send      
       </button>
     </div>
     </form>
   );
 });

 export default Input;