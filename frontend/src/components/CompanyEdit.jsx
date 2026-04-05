import { useState, useEffect } from "react"
import { useFetch } from "../hooks/useFetch"
import { useApi } from "../hooks/useApi"
import { Loading } from "./Loading"

function CompanyEdit({ company }) {
    const [form, setForm] = useState(company)
    const [fieldStatusValue, setFieldStatusValue] = useState(["a"])
    const { patch, loading: loadingEdit, error: errorEdit } = useApi()

    useEffect(() => {
        setForm(company)
    }, [company])

    useEffect(() => {
        console.log('Form state:', form)
    }, [form])

    useEffect(() => {
        console.log(fieldStatusValue)
    }, [setFieldStatusValue])

    const {
        data: brokers,
        loading: brokersLoading,
        error: brokersError
    } = useFetch(`/api/user/all`, { credentials: "include" })

    const fields = {
        name: {
            field: "input",
            type: "text",
            required: true,
            multiple: false,
            label: "Company name"
        },
        address: {
            field: "input",
            type: "text",
            required: true,
            multiple: false,
            label: "Address"
        },
        city: {
            field: "input",
            type: "text",
            required: true,
            multiple: false,
            label: "City"
        },
        postCode: {
            field: "input",
            type: "text",
            required: true,
            multiple: false,
            label: "Post code"
        },
        email: {
            field: "input",
            type: "email",
            required: true,
            multiple: false,
            label: "E-mail"
        },
        phone: {
            field: "input",
            type: "text",
            required: true,
            multiple: false,
            label: "Phone"
        },
        status: {
            field: "select",
            type: "",
            required: true,
            multiple: false,
            label: "Company status",
            options: [
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" }
            ]
            // options: ["active", "inactive"]
        },
        companyType: {
            field: "select",
            type: "",
            required: true,
            label: "Company type",
            multiple: false,
            options: [
                { label: "Lead", value: "lead" },
                { label: "Prospect", value: "prospect" },
                { label: "Client", value: "client" }
            ]
            // options: ["lead", "prospect", "client"]
        },
        contactMethods: {
            field: "select",
            type: "",
            required: true,
            label: "Contact methods",
            multiple: true,
            options: [
                { label: "E-mail", value: "email" },
                { label: "Phone", value: "phone" },
                { label: "SMS", value: "sms" },
                { label: "Other", value: "other" }
            ]
            // options: ["email", "phone", "sms", "other"]
        },
        brokerId: {
            field: "select",
            type: "",
            required: true,
            label: "Broker name",
            multiple: false,
            options: [
                { label: "Ashoka Pako", value: "69c3ce6e6ad4b6bcf94eb4f2" }
            ]
        }
    }

    fields.brokerId.options = brokers.map(b => ({
        value: b._id,
        label: `${b.name} ${b.surname} (${b.email})`
    }))

    function SelectWrapper({ multiple, children }) {
        return multiple
            ? <as-select-multiple>{children}</as-select-multiple>
            : <as-select>{children}</as-select>
    }

    const handleChange = (e) => {
        const { name, multiple, options, value } = e.target

        const val = multiple
            ? Array.from(options)
                .filter(o => o.selected)
                .map(o => o.value)
            : value

        setForm(prev => ({
            ...prev,
            [name]: val
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        const payload = Object.fromEntries(
            Object.keys(fields).map((key) => {
                const field = fields[key];

                if (field.multiple) {
                    return [key, formData.getAll(key)]; // returns array
                }
                return [key, formData.get(key)];
            })
        );
        const updated = await patch(`/api/company/patch/${company._id}`, payload)
        console.log("loadingEdit", loadingEdit)
        if (loadingEdit)
            return <Loading />
        // if (updated)
        //     delete cache[`/api/company/query?_id=${company._id}`]
    }

    const normalizeSelectValue = (value, multiple) => {
        if (multiple) {
            if (!Array.isArray(value)) return []

            return value
                .map(v => {
                    if (v == null) return null
                    if (typeof v === 'object') return String(v.value ?? v._id ?? '')
                    return String(v)
                })
                .filter(Boolean)
        }

        if (value == null) return ''
        if (typeof value === 'object') return String(value.value ?? value._id ?? '')

        return String(value)
    }


    return (
        <>
            <h2>Edit company details</h2>
            <div className="form">
                <form method="POST" onSubmit={handleSubmit}>
                    {Object.entries(fields).map(([key, config], index) => {
                        const value = form[key] ?? ''

                        if (config.field === 'input') {
                            return (
                                <div key={key + index} className="data-line filtering">
                                    <as-form-validation>
                                        <label>{config.label}</label>
                                        <input
                                            name={key}
                                            type={config.type}
                                            required={config.required}
                                            value={value}
                                            onChange={handleChange}
                                        />
                                    </as-form-validation>
                                </div>
                            )
                        }

                        if (config.field === 'select') {

                            const normalizedValue = normalizeSelectValue(value, config.multiple)

                            return (
                                <div key={key} className="data-line filtering">
                                    <label>{config.label}</label>
                                    <SelectWrapper multiple={config.multiple}>
                                        <select
                                            name={key}
                                            multiple={config.multiple}
                                            value={normalizedValue}
                                            onChange={handleChange}
                                        >
                                            {!config.multiple && <option value="">Select...</option>}

                                            {config.options.map((opt, index) => {
                                                const matchesValue = config.multiple
                                                    ? Array.isArray(normalizedValue) && normalizedValue.includes(opt.value)
                                                    : normalizedValue === opt.value

                                                return (
                                                    <option key={opt.value + index} value={opt.value}>
                                                        {opt.label}
                                                    </option>
                                                )
                                            })}
                                        </select>
                                    </SelectWrapper>
                                </div>
                            )
                        }

                    })}

                    <div className="data-line filtering">
                        <input type="submit" className="btn" value="Save" />
                    </div>
                </form >
            </div >
        </>
    )
}

export default CompanyEdit
