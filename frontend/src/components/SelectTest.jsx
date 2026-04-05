import { useState } from "react";

export default function StatusSelect() {
    const [fieldStatusValue, setFieldStatusValue] = useState(["a"]);

    console.log("render, fieldStatusValue:", fieldStatusValue); // add this

    return (
        <select
            multiple
            value={fieldStatusValue}
            onChange={e => {
                const values = Array.from(e.target.selectedOptions, o => o.value);
                setFieldStatusValue(values);
            }}
        >
            <option value="a">a</option>
            <option value="b">b</option>
            <option value="c">c</option>
        </select>
    );
}