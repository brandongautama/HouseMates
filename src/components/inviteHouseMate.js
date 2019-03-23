import React from "react";
import email from 'react-native-email';

export const handleEmail = (houseCode, e_mail) => {
    //const to = this.state.email;
    const code = houseCode;
    const to = e_mail;
    //const to = ['elfikyamr1@gmail.com'];
    email(to, {
        subject: 'Join HouseMates!',
        body: 'Hello!\n\nDownload HouseMates and join my household with code: ' + `${code}`
            + '.\n\n HouseMates Team'
    }).catch(console.error);
};
