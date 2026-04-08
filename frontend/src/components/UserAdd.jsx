import { useState, useEffect, useMemo } from "react"
import { useFetch } from "../hooks/useFetch"
import { useApi } from "../hooks/useApi"
import { useAuth } from "../components/AuthProvider"

function UserAdd({ onClose }) {
    const { user } = useAuth()

    const [form, setForm] = useState({})
    const { post, loading: loadingAdd, error: errorAdd } = useApi()

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
                required: true,
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

    async function handleSubmit(e) {
        e.preventDefault()

        const formData = new FormData(e.target)

        const payload = Object.fromEntries(
            Object.keys(fields).map((key) => {
                const field = fields[key]

                if (field.multiple) {
                    return [key, formData.getAll(key)]
                }
                return [key, formData.get(key)]
            })
        )

        await post(`/api/user/add`, payload)

        if (!errorAdd) location.reload()
    }

    if (rolesLoading) return <p>Loading...</p>
    if (rolesError) return <p>Error loading roles</p>

    return (
        <>
            <h2>Add new user</h2>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    {Object.entries(fields).map(([key, config]) => {
                        if (config.field === 'input') {
                            return (
                                <div key={key} className="data-line filtering">
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
                                            required={config.required}
                                        >
                                            {!config.multiple && <option value="">Select...</option>}

                                            {config.options.map((opt, index) => (
                                                <option key={opt.value + index} value={opt.value}>
                                                    {opt.label}
                                                </option>
                                            ))}
                                        </select>
                                    </SelectWrapper>
                                </div>
                            )
                        }

                        return null
                    })}

                    <div className="data-line filtering">
                        <input type="submit" className="btn" value="Add new user" />
                    </div>
                </form>
            </div>
        </>
    )
}

function SelectWrapper({ multiple, children }) {
    return multiple
        ? <as-select-multiple>{children}</as-select-multiple>
        : <as-select>{children}</as-select>
}

export default UserAdd