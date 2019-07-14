import React, {useEffect, useState} from 'react';
import {Customer, Status} from "../../model/Customer";
import api from "../../Api";
import {Field, Formik, FormikActions, FormikProps} from "formik";
import {Button, Form, List, Placeholder} from "semantic-ui-react";
import Moment from "react-moment";

interface FormValues {
    status: Status;
}

interface Props {
    id: string;
}

const CustomerDetails: React.FunctionComponent<Props> = (props) => {

    const [customer, setCustomer] = useState<Customer>();

    const statusOptions = [
        {key: "PROSPECTIVE", value: "PROSPECTIVE", text: "Prospective"},
        {key: "CURRENT", value: "CURRENT", text: "Current"},
        {key: "NON_ACTIVE", value: "NON_ACTIVE", text: "Non-active"}
    ];

    // Fetch customer details on component mount
    useEffect(() => {
        setCustomer(undefined);
        api.get("/customers/" + props.id).then(value => setCustomer(value.data));
    }, [props.id]);

    // API call to update status
    const saveStatus = (status: Status, actions:FormikActions<FormValues>) => {
        api.patch("/customers/" + props.id, {status: status})
            .finally(() => actions.setSubmitting(false));
    };

    if (customer) {
        return (
            <Formik initialValues={{status: customer.status}}
                    onSubmit={(values: FormValues, actions: FormikActions<FormValues>) => saveStatus(values.status, actions)}
                    render={(props: FormikProps<FormValues>) => (
                        <Form onSubmit={props.handleSubmit}>
                            <List>
                                <List.Item icon={"user"} content={customer.name}/>
                                <List.Item icon={"phone"} content={customer.phoneNumber}/>
                                <List.Item icon={"at"} content={customer.email}/>
                                <List.Item>
                                    <List.Icon name={"tag"}/>
                                    <List.Content>
                                        <Field name={"status"}
                                               component={"select"}>
                                            {statusOptions.map(opt => (
                                                <option key={opt.key} value={opt.value}>{opt.text}</option>
                                            ))}
                                        </Field>
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Icon name={"time"}/>
                                    <List.Content>
                                        <Moment date={customer.creationDateTime}/>
                                    </List.Content>
                                </List.Item>
                                <Button content={"Save"} type={"submit"} disabled={props.isSubmitting}/>
                            </List>
                        </Form>
                    )}/>
        )
    } else {
        return DetailsPlaceholder;
    }
};

export default CustomerDetails;

const DetailsPlaceholder = (
    <Placeholder>
        <Placeholder.Paragraph>
            <Placeholder.Line/>
            <Placeholder.Line/>
            <Placeholder.Line/>
            <Placeholder.Line/>
        </Placeholder.Paragraph>
    </Placeholder>
);
