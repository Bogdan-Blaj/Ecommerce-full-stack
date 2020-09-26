import React from 'react';
import UserLayout from '../../hoc/userLayout';
import UpdatePersonalInfo from './update_personal_info';

const UpdateProfile = () => {
    return (
        <UserLayout>
            <h1>Profile</h1>
            <UpdatePersonalInfo />
        </UserLayout>
    )
};

export default UpdateProfile;