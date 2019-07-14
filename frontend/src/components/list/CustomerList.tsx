import React from 'react';
import {List} from "semantic-ui-react";
import {Customer} from "../../model/Customer";

interface Props {
    customers: Customer[];
    onCustomerSelected: (id: string) => void;
}

const CustomerList: React.FunctionComponent<Props> = (props: Props) => {
    const selectionHandler = (id: string) => props.onCustomerSelected(id);

    return (
        <List selection>
            {props.customers.map(customer => (
                <ListItem key={customer.id} customer={customer} onClick={selectionHandler}/>
            ))}
        </List>
    )
};

export default CustomerList;

// List item
interface ListItemProps {
    customer: Customer;
    onClick?: (id: string) => void;
}

const ListItem: React.FunctionComponent<ListItemProps> = (props: ListItemProps) => {
    const {id, name} = props.customer;
    const clickHandler = () => props.onClick && props.onClick(id);

    return (
        <List.Item onClick={clickHandler}>
            <List.Content>
                <List.Header>{name}</List.Header>
            </List.Content>
        </List.Item>
    )
};


