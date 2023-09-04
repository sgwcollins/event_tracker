import React, { useState } from 'react';
import { Select } from 'antd';
import { AggregateItems } from '../../contexts/EventsContext';


export const SelectInput: React.FC<{ data: AggregateItems[], handleSearch?: ((value: string) => void), onSelect?: ((value: string) => void), placeholder: string; style: React.CSSProperties }> = (props) => {

    const { data, handleSearch, onSelect, placeholder } = props;
    const [value, setValue] = useState<string | null>(null);

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };


    const handleClear = () => {
        setValue('');
        handleSearch && handleSearch('')
        onSelect && onSelect('')

    };


    return (
        <Select
            data-testid="event-picker"
            showSearch
            value={value}
            allowClear
            placeholder={placeholder}
            style={props.style}
            defaultActiveFirstOption={true}
            suffixIcon={null}
            filterOption={false}
            onClear={handleClear}
            onSearch={handleSearch}
            onChange={handleChange}
            onSelect={onSelect}
            onClick={() => handleSearch && !value && handleSearch('')}
            notFoundContent={null}
            options={(data || []).map((d) => ({
                value: d.value,
                label: d.value,
            }))}
        />
    );
};