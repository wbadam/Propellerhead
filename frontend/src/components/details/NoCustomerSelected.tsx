import React from 'react'
import {Icon} from "semantic-ui-react";

const NoCustomerSelected: React.FunctionComponent = () => {
    return (
        <>
            <Icon name={"user"} size={"massive"} color={"grey"}/>
            No Customer Selected
        </>
    );
};

export default NoCustomerSelected;
