import { useState, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { useFetch } from "../hooks/useFetch"
import { useApi } from "../hooks/useApi"
import { useAuth } from "../components/AuthProvider"

function UserEdit({ broker, onClose }) {
    const { user } = useAuth()
    const [form, setForm] = useState(broker)
    const { patch, loading: loadingEdit, error: errorEdit } = useApi()
    const navigate = useNavigate()

    useEffect(() => {
        setForm(broker)
    }, [broker])

    const {
        data: roles,
        loading: rolesLoading,
        error: rolesError
    } = useFetch(`/api/role`, { credentials: "include" })

    const fields = useMemo(() => {
        return {
            name: {
                field: "input",
                type: "text",
                required: true,
                multiple: false,
                label: "Name"
            },
            surname: {
                field: "input",
                type: "text",
                required: true,
                multiple: false,
                label: "Surname"
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
                required: false,
                multiple: false,
                label: "Phone"
            },
            password: {
                field: "input",
                type: "password",
                required: false,
                multiple: false,
                label: "Password"
            },
            roleId: {
                field: "select",
                type: "",
                required: true,
                multiple: false,
                label: "User role",
                options: (roles || [])
                    .filter(r => user && r.importance <= user.importance)
                    .map(r => ({
                        value: r._id,
                        label: `${r.name} (${r.permissions.join(', ')})`
                    }))
            },
            status: {
                field: "select",
                type: "",
                required: true,
                multiple: false,
                label: "User status",
                options: [
                    { label: "Active", value: "active" },
                    { label: "Inactive", value: "inactive" }
                ]
            }
        }
    }, [roles, user])

    function SelectWrapper({ multiple, children }) {
        return multiple
            ? <as-select-multiple>{children}</as-select-multiple>
            : <as-select>{children}</as-select>
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
        const updated = await patch(`/api/user/patch/${broker._id}`, payload)
        if (errorEdit)
            return <p>Please fill in all fields</p>
        if (!loadingEdit && !errorEdit)
            navigate(`/users/${broker._id}`)
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
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>Edit user</h2>
                <a onClick={onClose} className="btn btn-transparent" size="m"><as-icon size="m" name="plus" rotate="45deg"></as-icon></a>
            </div>
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
                                            autocomplete="off"
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
                        <input type="submit" className="btn" value="Save changes" />
                    </div>
                </form >
            </div >
        </>
    )
}

export default UserEdit
