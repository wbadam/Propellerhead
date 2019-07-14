import React, {useEffect, useState} from 'react';
import {Container, Grid} from "semantic-ui-react";
import CustomerList from "./components/list/CustomerList";
import api from "./Api";
import {Customer} from "./model/Customer";
import DetailsView from "./components/details/DetailsView";
import Filter from "./components/list/Filter";
import Sort, {Order} from "./components/list/Sort";
import styles from "./MainLayout.module.scss";

const MainLayout: React.FunctionComponent = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [selected, setSelected] = useState<string | undefined>(undefined);
    const [filter, setFilter] = useState();
    const [sort, setSort] = useState();

    // Fetch list of customers
    useEffect(() => {
        api.get("/customers", {
            params: {
                name: filter,
                sort: sort
            }
        }).then(response => setCustomers(response.data));
    }, [filter, sort]);

    // Filter and sort change handlers
    const handleFilterChange = (filter: string) => setFilter(filter);
    const handleSortChange = (order: Order) => {
        if (order) {
            setSort("name," + order);
        } else {
            setSort("");
        }
    };

    return (
        <Container>
            <Grid columns={'equal'}>
                <Grid.Column width={5}>
                    <div className={styles.header}>
                        <Filter onFilter={handleFilterChange}/>
                        <Sort onSort={handleSortChange}/>
                    </div>

                    <CustomerList customers={customers} onCustomerSelected={(id) => setSelected(id)}/>
                </Grid.Column>
                <Grid.Column>
                    <DetailsView customerId={selected}/>
                </Grid.Column>
            </Grid>
        </Container>
    )
};

export default MainLayout;
