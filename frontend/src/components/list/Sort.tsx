import React from 'react';
import {Dropdown, DropdownProps} from "semantic-ui-react";

export type Order = "" | "ASC" | "DESC";

interface Props {
    onSort: (order: Order) => void;
}

const Sort: React.FunctionComponent<Props> = (props) => {

    const changeOrder = (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
        // @ts-ignore
        props.onSort(data.value);
    };

    const options = [
        {
            key: "",
            text: "",
            value: "",
            content: "Natural order"
        },
        {
            key: "ASC",
            text: "ASC",
            value: "ASC",
            content: "ASC"
        },
        {
            key: "DESC",
            text: "DESC",
            value: "DESC",
            content: "DESC"
        }
    ];

    return (
        <span>
            Sort by name {' '}
            <Dropdown inline options={options} defaultValue={""} onChange={changeOrder}/>
        </span>
    )
};

export default Sort;
