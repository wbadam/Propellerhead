import React from 'react';
import NoCustomerSelected from "./NoCustomerSelected";
import CustomerDetails from "./CustomerDetails";
import {Container} from "semantic-ui-react";
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
