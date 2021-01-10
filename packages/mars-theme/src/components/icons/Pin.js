import React from 'react';
import {SvgIcon} from "@material-ui/core";

const PinIcon = (props) => {
    return (
        <SvgIcon {...props} viewBox="0 0 32 32">
            <path fillRule="evenodd" clipRule="evenodd" d="M5 12.0448C5 5.95471 9.93469 1 15.9995 1C22.0647 1 26.9994 5.95471 27 12.0448C27 13.6333 26.6765 15.15 26.038 16.5531C23.2869 22.5962 18.014 28.9755 16.4637 30.7863C16.3475 30.9217 16.1781 30.9997 15.9998 30.9997C15.8216 30.9997 15.6522 30.9217 15.536 30.7863C13.9851 28.9752 8.71218 22.5956 5.96199 16.5531C5.32382 15.15 5 13.6333 5 12.0448ZM16 17C18.7614 17 21 14.7614 21 12C21 9.23858 18.7614 7 16 7C13.2386 7 11 9.23858 11 12C11 14.7614 13.2386 17 16 17Z"/>
        </SvgIcon>
    )
}

export default PinIcon;