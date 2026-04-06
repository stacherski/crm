import { useState, useEffect } from "react"
import { useFetch } from "../hooks/useFetch"
import { useApi } from "../hooks/useApi"

function CompanyAdd() {
    const [form, setForm] = useState(null)
    const { post, loading: loadingAdd, error: errorAdd } = useApi()

    useEffect(() => {
        setForm()
    }, [])

    useEffect(() => {
        // console.log('Form state:', form)
    }, [form])

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
        vat: {
            field: "input",
            type: "text",
            required: false,
            multiple: false,
            label: "VAT No"
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
        },
        brokerId: {
            field: "select",
            type: "",
            required: true,
            label: "Broker name",
            multiple: false,
            options: []
        }
    }
    if (brokers)
        fields.brokerId.options = brokers.map(b => ({
            value: b._id,
            label: `${b.name} ${b.surname} (${b.email})`
        }))

    function SelectWrapper({ multiple, children }) {
        return multiple
            ? <as-select-multiple>{children}</as-select-multiple>
            : <as-select>{children}</as-select>
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        console.log("formData", formData)
        const payload = Object.fromEntries(
            Object.keys(fields).map((key) => {
                const field = fields[key];

                if (field.multiple) {
                    return [key, formData.getAll(key)]; // returns array
                }
                return [key, formData.get(key)];
            })
        );
        const added = await post(`/api/company/add`, payload)
        if (errorAdd)
            return <p>Please fill in all fields</p>
        if (!loadingAdd && !errorAdd)
            location.reload()
    }

    return (
        <>
            <h2>Add new company</h2>
            <div className="form">
                <form method="POST" onSubmit={handleSubmit}>
                    {Object.entries(fields).map(([key, config], index) => {
                        if (config.field === 'input') {
                            return (
                                <div key={key + index} className="data-line filtering">
                                    <as-form-validation>
                                        <label>{config.label}</label>
                                        <input
                                            name={key}
                                            type={config.type}
                                            required={config.required}
                                        />
                                    </as-form-validation>
                                </div>
                            )
                        }

                        if (config.field === 'select') {
                            return (
                                <div key={key} className="data-line filtering">
                                    <label>{config.label}</label>
                                    <SelectWrapper multiple={config.multiple}>
                                        <select
                                            name={key}
                                            multiple={config.multiple}
                                        >
                                            {!config.multiple && <option value="">Select...</option>}

                                            {config.options.map((opt, index) => {
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
                        <input type="submit" className="btn" value="Add Company" />
                    </div>
                </form >
            </div >
        </>
    )
}

export default CompanyAdd
