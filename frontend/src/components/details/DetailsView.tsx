import React from 'react';
import NoCustomerSelected from "./NoCustomerSelected";
import CustomerDetails from "./CustomerDetails";
import {Container, Divider} from "semantic-ui-react";
import NotesSection from "./note/NotesSection";

interface Props {
    customerId?: string;
}

const DetailsView: React.FunctionComponent<Props> = (props) => {
    const {customerId} = props;

    if (customerId) {
        return (
            <Container>
                <CustomerDetails id={customerId}/>
                <Divider/>  
                <NotesSection customerId={customerId}/>
            </Container>
        )
    } else {
        return (
            <NoCustomerSelected/>
        )
    }
};

export default DetailsView;
