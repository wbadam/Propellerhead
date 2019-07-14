import React, {useState} from 'react';
import {Input} from "semantic-ui-react";

interface Props {
    placeholder?: string;
    onFilter: (filter: string) => void;
}

const Filter: React.FunctionComponent<Props> = (props) => {
    const {placeholder} = props;

    const [value, setValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = e.target.value;
        setValue(newValue);
        props.onFilter(newValue);
    };

    return (
        <Input icon={'filter'} placeholder={placeholder} value={value} onChange={handleChange}/>
    );
};

Filter.defaultProps = {
    placeholder: "Filter..."
};

export default Filter;
