export const roleCheck = {
    admin: "ROLE_ADMIN",
    manager: "ROLE_MANAGER",
    staff: "ROLE_STAFF"
}

export const filteredValue = (rows, key) => {
    return rows.filter(row => {
        return Object.values(row).some(value => {
            return value.toString().toLowerCase().includes(key.toLowerCase());
        })
    })
}