import React from 'react'
import {Icon} from "semantic-ui-react";
import styles from "./NoCustomerSelected.module.scss";

const NoCustomerSelected: React.FunctionComponent = () => {
    return (
        <div className={styles.layout}>
            <Icon name={"user"} size={"massive"} className={styles.icon}/>
            <div className={styles.text}>No Customer Selected</div>
        </div>
    );
};

export default NoCustomerSelected;
